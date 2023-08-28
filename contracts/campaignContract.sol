// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./dividendContract.sol";

/**
* @notice Error code
* 1 - User already has a campaign
* 2 - Inactive or no min fund
*/

contract CampaignContract is DividendContract {
    
    constructor(uint256 _campaignFee, uint256 _nftListingPrice) DividendContract(_campaignFee, _nftListingPrice){}

    /**
    * @notice Allows users to create a new crowdfunding campaign.
    * @dev Function can only be called by a registered and non-banned user 
    * who has also paid the campaign fee.
    * @param _targetAmount The funding target for the campaign.
    * @param _targetDeadline The time duration (in seconds) until the campaign expires.
    * @param _minFunding The minimum amount that must be raised for the campaign to be successful.
    */
    function createCampaign(
        uint256 _targetAmount,
        uint256 _targetDeadline,
        uint256 _minFunding
    ) external requireCampaignFee requireRegisteredUser payable {
        require(campaigns[msg.sender].status == CampaignStatus.NotStarted, "1");

        _platformAddress.transfer(msg.value);

        Campaign storage newCampaign = campaigns[msg.sender];

        // Initialize the campaign details
        newCampaign.creatorAddress = payable(msg.sender);
        newCampaign.targetAmount = _targetAmount;
        newCampaign.targetDeadline = block.timestamp + _targetDeadline;
        newCampaign.minFunding = _minFunding;
        newCampaign.status = CampaignStatus.Active;

        emit CampaignCreated(msg.sender, newCampaign.status);
    }

    /**
     * @dev Funds a specific campaign and issues a token to the backer.
     * @param _campaignAddress The address of the campaign to be funded.
     * @param _tokenURI The URI for the minted token.
     * 
     * Requirements:
     * - Caller must be a registered user.
     * - The campaign must be active.
     * - The funding amount must meet or exceed the minimum funding requirement of the campaign.
     *
     * Emits a {CampaignFunded} event.
     */
    function fundCampaign(address _campaignAddress, string calldata _tokenURI) external payable requireRegisteredUser {
        Campaign storage campaign = campaigns[_campaignAddress];

        require(campaign.status == CampaignStatus.Active && msg.value >= campaign.minFunding, "2");

        // Mint a new token for the sender
        _mint(msg.sender, ++_nextTokenId);
        _setTokenURI(_nextTokenId, _tokenURI);

        // Create a new backer and add to the campaign
        Backer memory newBacker = Backer(BackerStatus.Active, false, ++campaign.backersCount, payable(msg.sender), msg.value, 0, 0, 0);
        campaign.backers.push(newBacker);
        tokenIdToBacker[_nextTokenId] = newBacker;

        // Update the total raised amount for the campaign and the total invested amount for the user
        campaign.raisedAmount += msg.value;
        users[msg.sender].totalInvestedAmount += msg.value;

        // Emit a CampaignFunded event
        emit CampaignFunded(_campaignAddress, msg.sender, msg.value);

        // Complete the campaign if the target amount has been reached
        if (campaign.raisedAmount >= campaign.targetAmount) completeCampaign(_campaignAddress);
    }
}