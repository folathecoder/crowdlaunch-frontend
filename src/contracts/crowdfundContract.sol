// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./structs/globalStructs.sol";
import "./enums/globalEnums.sol";
import "./interfaces/IAccountContract.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
* @notice Error code
* 1 - low create fee
* 2 - only platform
* 3 - only registered user
* 4 - not the campaign creator
* 5 = campaign not completed
*/

contract CrowdFundContract is ERC721URIStorage {
    // Events
    event CampaignCreated(address indexed creatorAddress,CampaignStatus status);
    event userCreated(address indexed userAddress, uint256 userId);
    event CampaignFunded(address indexed campaignAddress, address indexed backerAddress, uint256 amount);
    event DividendClaimed(address indexed userAddress, uint256 claimedAmount, uint256 totalDividendEarned);
    event DividendsPaid(uint256 indexed tokenId, uint256 amount);
    event NFTListedForSale(uint256 indexed tokenId, uint256 price);
    event NFTPurchased(uint256 indexed tokenId, address indexed newOwner, uint256 price);

    IAccountContract public accountContract;

    address payable public _platformAddress;
    uint256 public _campaignFee;
    uint256 public _nftListingPrice;
    uint256 public _userCount = 0;
    uint256 public _nextTokenId = 0;

    // Data structure with mapping
    mapping(address => Campaign) public campaigns;
    mapping(address => User) public users;
    mapping(uint256 => Backer) public tokenIdToBacker;
    mapping(uint256 => SaleListing) public tokenIdToSaleListing;


    constructor(uint256 campaignFee, uint256 nftListingPrice) ERC721("CrowdShare", "CSHR") {
        _platformAddress = payable(msg.sender);
        _campaignFee = campaignFee;
        _nftListingPrice = nftListingPrice;
    }

    receive() external payable {
        if (campaigns[msg.sender].status == CampaignStatus.Completed) {
            campaigns[msg.sender].dividendAmount.push(msg.value);
        }
    }

    modifier requireCampaignFee() {
        require(msg.value == _campaignFee, "1");
        _;
    }

    modifier requireOnlyPlatform() {
        require(msg.sender == _platformAddress, "2");
        _;
    }

    modifier requireRegisteredUser() {
        require(isUserRegistered(msg.sender), "3");
        _;
    }

    function isUserRegistered(address _userAddress) view internal returns(bool) {
        return users[_userAddress].status == UserStatus.Active;
    }

    function _validateCampaign(address _campaignAddress) internal view {
        require(campaigns[_campaignAddress].creatorAddress == _campaignAddress, "4");
        require(campaigns[_campaignAddress].status == CampaignStatus.Completed, "5");
    }

    function isUserBacker(address _campaignAddress, address _userAddress) public view returns (bool) {
        bool isBacker = false;

        Campaign storage campaign = campaigns[_campaignAddress];

        for (uint256 i = 0; i < campaign.backers.length; i++) {
            if (campaign.backers[i].backerAddress == _userAddress) {
                isBacker = true;
            }
        }

        return isBacker;
    }

    function completeCampaign(address _campaignAddress) internal {
        Campaign storage campaign = campaigns[_campaignAddress];
        campaign.depositAddress = payable(address(new AccountContract{value: campaign.raisedAmount}(_campaignAddress)));
        campaign.status = CampaignStatus.Completed;
    }
}