// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.4 <0.9.0;

contract CrowdLaunchContract {
    address payable private _platformAddress;
    uint256 private _campaignFee;

    event CampaignCreated(
        address indexed creatorAddress,
        uint256 campaignCount,
        CampaignStatus status
    );

    event userCreated(address indexed userAddress, uint256 userId);

    /**
     * @dev CampaignStatus Enum
     * This enum represents the possible states of a crowdfunding campaign:
     * - NotStarted: The campaign has been created but not yet started.
     * - Active: The campaign is currently ongoing and accepting contributions.
     * - Expired: The deadline for the campaign has passed without it reaching its funding goal.
     * - Completed: The campaign has successfully reached its funding goal within the set deadline.
     * - Cancelled: The campaign was cancelled before it could reach its conclusion.
     */

    enum CampaignStatus {
        NotStarted,
        Active,
        Expired,
        Completed,
        Cancelled
    }

    /**
     * @dev Enum representing the status of a backer in a campaign.
     * - Active: The backer still has funds invested in the campaign and has backer privileges, e.g. "Backer can vote".
     * - Inactive: The backer has withdrawn all funds and is no longer eligible for dividends, e.g. "Backer cannot vote".
     */

    enum BackerStatus {
        Active,
        Inactive
    }

    /**
     * @dev Represents the status of a user in the system.
     *
     * @param Inactive - An inactive user is unregistered on the platform
     * @param Active - An active user has full access to all functions they are authorized to use.
     * @param Banned - A banned user has attempted to access critical functions that are out of their reach,
     * such as accessing the campaign withdrawal function. After the first such attempt, they lose access to all functions in the contract.
     */

    enum UserStatus {
        Inactive,
        Active,
        Banned
    }

    /**
     * @dev Represents a user in the system, who can be either a campaign creator or a backer.
     *
     * @param status - The current status of the user (represented by the UserStatus enum).
     * @param userId - The unique identifier of the user for easy tracking.
     * @param userAddress - The Ethereum address of the user, which allows for fund transfers.
     * @param totalInvestedAmount - The total amount of funds that the user has contributed across all campaigns they have backed.
     * @param totalDividendEarned - The total amount of dividends earned by the user from all campaigns they have backed.
     * @param campaignsCreated - Array containing the campaigns created by the user.
     * @param campaignsBacked - Array containing the campaigns backed by the user.
     */

    struct User {
        UserStatus status;
        uint256 userId;
        address payable userAddress;
        uint256 totalInvestedAmount;
        uint256 totalDividendEarned;
        uint256 campaignsCreatedCount;
        uint256 campaignsBackedCount;
        Campaign[] campaignsCreated;
        Campaign[] campaignsBacked;
    }

    /**
     * @dev Represents a crowdfunding campaign.
     * Each campaign has a status, a unique ID, a current and target funding amount, a deadline,
     * minimum and maximum contribution limits, the creator's address, and an array of backers.
     *
     * @param status - The current status of the campaign (represented by the CampaignStatus enum).
     * @param campaignId - The unique identifier of the campaign.
     * @param raisedAmount - The total amount of funds currently raised in the campaign.
     * @param targetAmount - The funding goal that the campaign aims to reach.
     * @param targetDeadline - The timestamp (in seconds since Unix Epoch) by which the campaign aims to reach its funding goal.
     * @param minFunding - The minimum contribution amount that a backer can contribute to the campaign.
     * @param maxFunding - The maximum contribution amount that a backer can contribute to the campaign.
     * @param creatorAddress - The Ethereum address of the user who created the campaign.
     * @param backers - Array containing the backers who have contributed to the campaign.
     */

    struct Campaign {
        CampaignStatus status;
        uint256 campaignId;
        uint256 raisedAmount;
        uint256 targetAmount;
        uint256 targetDeadline;
        uint256 minFunding;
        address payable creatorAddress;
        uint256 backersCount;
        Backer[] backers;
    }

    /**
     * @dev Represents a backer who supports a campaign by contributing funds.
     *
     * @param status - The current status of the backer (represented by the BackerStatus enum).
     * @param backerId - The unique identifier of the backer for easy tracking.
     * @param backerAddress - The Ethereum address of the backer, which allows for fund transfers.
     * @param backedAmount - The total amount of funds that the backer has contributed to the campaign.
     */

    struct Backer {
        BackerStatus status;
        uint256 backerId;
        address payable backerAddress;
        uint256 backedAmount;
        uint256 dividendAmount;
    }

    mapping(uint256 => Campaign) private campaigns;
    mapping(address => User) private users;

    uint256 private _campaignCount = 0;
    uint256 private _userCount = 0;

    /**
     * @dev Constructor Function
     * This function is called once during the deployment of the contract.
     * It initializes the _platformAddress state variable with the address of the contract deployer.
     * The payable keyword allows this address to receive and transfer Ether.
     * It also sets the _campaignFee state variable with the fee (in wei) required for creating a campaign.
     * @param campaignFee - The fee (in Wei) required for creating a campaign.
     */

    constructor(uint256 campaignFee) {
        _platformAddress = payable(msg.sender);
        _campaignFee = campaignFee;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MODIFIERS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    modifier requireCampaignFee() {
        require(
            msg.value == _campaignFee,
            "campaign creation fee is insufficient"
        );
        _;
    }

    modifier requireOnlyPlatform() {
        require(
            msg.sender == _platformAddress,
            "only platform admin can call this function"
        );
        _;
    }

    modifier noBannedUser() {
        require(
            isUserBanned(msg.sender) == false,
            "user is banned and cannot access this function"
        );
        _;
    }

    modifier requireRegisteredUser() {
        require(
            isUserRegistered(msg.sender),
            "Only a registered and active user can call this function"
        );
        _;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PLATFORM FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @dev Retrieves the address of the crowdfunding platform.
     * This function is a view function, meaning it does not modify the state of the contract.
     * It allows external callers to query and view the address of the platform.
     *
     * @return The Ethereum address of the crowdfunding platform.
     */

    function getPlatformAddress() external view returns (address) {
        return _platformAddress;
    }

    /**
     * @dev Sets the address of the crowdfunding platform.
     * This function allows only the platform administrator to update the platform's address.
     * To execute this function, the caller must be the current platform administrator.
     *
     * @param _newAddress The new Ethereum address to set as the crowdfunding platform address.
     */

    function setPlatformAddress(
        address _newAddress
    ) external requireOnlyPlatform {
        _platformAddress = payable(_newAddress);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // USER FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @dev Checks if a user is registered in the system.
     *
     * This function accepts the Ethereum address of a user. It then retrieves the user's information from the 'users' mapping,
     * and checks if the user's status is set to Active. If the status is 'Active', the function returns true; otherwise, it returns false.
     *
     * @param _userAddress - The Ethereum address of the user.
     * @return A boolean value indicating whether the user is registered (Active or not.
     */

    function isUserRegistered(
        address _userAddress
    ) internal view returns (bool) {
        return users[_userAddress].status == UserStatus.Active;
    }

    /**
     * @dev Checks if a user is banned in the system.
     *
     * This function accepts the Ethereum address of a user. It then retrieves the user's information from the 'users' mapping,
     * and checks if the user's status is set to Banned. If the status is 'Banned', the function returns true; otherwise, it returns false.
     *
     * @param _userAddress - The Ethereum address of the user.
     * @return A boolean value indicating whether the user is banned or not.
     */

    function isUserBanned(address _userAddress) internal view returns (bool) {
        return users[_userAddress].status == UserStatus.Banned;
    }

    /**
     * @dev Bans a user from the platform. This function can only be called by the platform itself.
     * If the user is not registered, they will be registered and then banned.
     *
     * @param _banAddress The address of the user to be banned.
     *
     * Requirements:
     * - The user to be banned must not be the platform itself.
     */

    function banUser(address _banAddress) internal {
        require(
            _banAddress != _platformAddress,
            "Platform address cannot be banned"
        ); // prevent backfire attack

        if (isUserRegistered(_banAddress)) {
            users[_banAddress].status = UserStatus.Banned;
        } else {
            _userCount += 1;

            User storage newUser = users[_banAddress];
            newUser.status = UserStatus.Banned;
        }
    }

    /*
     * @dev Registers a new user in the system.
     *
     * This function allows a user to register their Ethereum address with the system. It first checks whether the user is not banned and is not already registered.
     * If the checks pass, the function increases the user count (_userCount), creates a new User instance, sets the user's status to 'Active', and initializes other parameters.
     * It then stores this new User instance in the 'users' mapping.
     * The function emits a 'userCreated' event upon successful user creation.
     *
     * @notice This function can only be called by non-banned users.
     * @emit userCreated - Event emitted when a new user is successfully created. Contains the Ethereum address and user ID of the new user.
     */

    function registerUser() external noBannedUser {
        require(
            isUserRegistered(msg.sender) == false,
            "This user is already registered"
        );

        _userCount += 1;

        User storage newUser = users[msg.sender];

        newUser.status = UserStatus.Active;
        newUser.userAddress = payable(msg.sender);
        newUser.userId = _userCount;

        emit userCreated(newUser.userAddress, newUser.userId);
    }

    /**
     * @dev Retrieves the details of a specific user.
     * The function will return various parameters of the user, including status, ID, address, total invested amount,
     * total dividends earned, and the IDs of the campaigns created and backed by the user.
     *
     * @param _userAddress The address of the user to retrieve.
     *
     * Requirements:
     * - The function caller must not be a banned user.
     * - The user must be registered.
     */

    function getUser(
        address _userAddress
    )
        external
        view
        noBannedUser
        returns (
            UserStatus status,
            uint256 userId,
            address payable userAddress,
            uint256 totalInvestedAmount,
            uint256 totalDividendEarned,
            Campaign[] memory campaignsCreated,
            Campaign[] memory campaignsBacked
        )
    {
        require(isUserRegistered(_userAddress), "User is not registered");

        User storage user = users[_userAddress];

        Campaign[] memory allCampaignsCreated = new Campaign[](
            user.campaignsCreatedCount
        );
        Campaign[] memory allCampaignsBacked = new Campaign[](
            user.campaignsBackedCount
        );

        for (uint256 i = 0; i < user.campaignsCreatedCount; i++) {
            allCampaignsCreated[i] = user.campaignsCreated[i];
        }

        for (uint256 i = 0; i < user.campaignsBackedCount; i++) {
            allCampaignsBacked[i] = user.campaignsBacked[i];
        }

        return (
            user.status,
            user.userId,
            user.userAddress,
            user.totalInvestedAmount,
            user.totalDividendEarned,
            allCampaignsCreated,
            allCampaignsBacked
        );
    }

    /**
     * @dev Retrieves the total count of registered users in the crowdfunding platform.
     * This function is a view function, meaning it does not modify the state of the contract.
     * It allows external callers to query and view the total count of registered users.
     *
     * @return The total count of registered users in the platform.
     */

    function getUserCount() external view returns (uint256) {
        return _userCount;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CAMPAIGN FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @dev Updates the fee required to create a campaign.
     * This function can only be called by the platform (enforced by the requireOnlyPlatform modifier).
     * @param _newCampaignFee The new fee for creating a campaign, measured in Wei.
     *
     * Requirements:
     * - The function caller must be the platform.
     */

    function setCampaignFee(uint _newCampaignFee) external requireOnlyPlatform {
        _campaignFee = _newCampaignFee;
    }

    /**
     * @dev Returns the current fee required to create a campaign.
     * As a view function, it does not change the state and can be called without gas costs.
     *
     * @return uint256 The current fee required to create a campaign, in Wei.
     */

    function getCampaignFee() external view returns (uint256) {
        return _campaignFee;
    }

    /*
     * @dev This function enables a registered and non-banned user to create a new campaign with the given parameters.
     * The function requires the campaign creator to send an amount equal to the campaign fee.
     * The fee received is then transferred to the platform address before creating the new campaign.
     * The function emits a CampaignCreated event upon successful creation of a new campaign.
     *
     * @param _targetAmount The desired fundraising goal for the campaign.
     * @param _targetDeadline The length of the campaign in seconds from the current time.
     * @param _minFunding The minimum fundraising goal that the campaign aims to reach.
     *
     * Requirements:
     * - The function caller must be an active, registered user and not banned.
     * - The function caller must send an amount equal to the campaign fee.
     * @notice This function is payable and modifies state variables.
     * @emit CampaignCreated - Event emitted when a new campaign is successfully created. The event logs the creator's address, the campaign's ID, and its initial status.
     */

    function createCampaign(
        uint256 _targetAmount,
        uint256 _targetDeadline,
        uint256 _minFunding
    ) external payable requireCampaignFee noBannedUser requireRegisteredUser {
        // Transfer the received campaign fee to the platform address
        _platformAddress.transfer(msg.value);

        // Increment the total count of campaigns
        _campaignCount += 1;

        // Create a new campaign and store it in the campaigns mapping
        Campaign storage newCampaign = campaigns[_campaignCount];

        // Initialize the parameters for the new campaign
        newCampaign.creatorAddress = payable(msg.sender);
        newCampaign.targetAmount = _targetAmount;
        newCampaign.targetDeadline = block.timestamp + _targetDeadline;
        newCampaign.minFunding = _minFunding;
        newCampaign.status = CampaignStatus.Active;
        newCampaign.campaignId = _campaignCount;

        // Emit an event indicating the successful creation of a new campaign
        emit CampaignCreated(msg.sender, _campaignCount, newCampaign.status);
    }

    /**
     * @dev This function retrieves the details of a specific campaign identified by its ID.
     * It is a view function, meaning it does not modify state and can be executed without any gas cost.
     * Note that the function will return the various parameters of the campaign, including its status, ID, raised amount,
     * target amount, deadline, minimum funding goal,the creator's address, backers count and all backers.
     *
     * @param _campaignId The unique identifier of the campaign to retrieve.
     */

    function getCampaign(
        uint256 _campaignId
    )
        external
        view
        returns (
            CampaignStatus status,
            uint256 campaignId,
            uint256 raisedAmount,
            uint256 targetAmount,
            uint256 targetDeadline,
            uint256 minFunding,
            address payable creatorAddress,
            uint256 backersCount,
            Backer[] memory backers
        )
    {
        Campaign storage campaign = campaigns[_campaignId];

        Backer[] memory allBackers = new Backer[](campaign.backersCount);

        for (uint256 i = 0; i < campaign.backersCount; i++) {
            allBackers[i] = campaign.backers[i];
        }

        return (
            campaign.status,
            campaign.campaignId,
            campaign.raisedAmount,
            campaign.targetAmount,
            campaign.targetDeadline,
            campaign.minFunding,
            campaign.creatorAddress,
            campaign.backersCount,
            allBackers
        );
    }

    /**
     * @dev Retrieves the total number of campaigns that have been created.
     * This is a view function, so it does not modify the state and can be called without gas costs.
     *
     * @return uint256 The total number of campaigns that have been created.
     */

    function getCampaignCount() external view returns (uint256) {
        return _campaignCount;
    }

    /**
     * @dev Fund a campaign.
     * This function allows registered users to invest funds (Ether) to a specific campaign identified by _campaignId.
     * The contributed funds are transferred to the smart contract's account, held in escrow until the campaign is completed.
     * The function ensures the campaign is active and the minimum funding requirement is met before accepting the contribution.
     * This function modifies the state of the contract as it updates the campaign's raised amount.
     *
     * @param _campaignId The unique identifier of the campaign to which the user wants to contribute funds.
     */

    function fundCampaign(
        uint256 _campaignId
    ) external payable noBannedUser requireRegisteredUser {
        require(
            campaigns[_campaignId].status == CampaignStatus.Active,
            "The campaign is not active"
        );
        require(
            msg.value >= campaigns[_campaignId].minFunding,
            "The minimum funding requirement is not met"
        );

        // Increase the campaign's raised amount by the value sent with the transaction.
        campaigns[_campaignId].raisedAmount += msg.value;
    }
}
