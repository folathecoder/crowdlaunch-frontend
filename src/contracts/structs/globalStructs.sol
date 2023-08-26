// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "../enums/globalEnums.sol";

/**
 * @dev Represents a user in the system.
 * @param status The current status of the user (e.g., active, banned).
 * @param userId A unique identifier for the user.
 * @param userAddress The address of the user.
 * @param totalInvestedAmount Total amount the user has invested in campaigns.
 * @param totalDividendEarned Total dividends the user has earned from successful campaigns.
 * @param campaignsCreatedCount The number of campaigns this user has created.
 * @param campaignsBackedCount The number of campaigns this user has backed.
 * @param claimableBalance The amount of money the user can currently claim.
 * @param campaignsCreated An array containing campaigns created by the user.
 * @param campaignsBacked An array containing campaigns backed by the user.
 */
struct User {
    UserStatus status;
    uint256 userId;
    address payable userAddress;
    uint256 totalInvestedAmount;
    uint256 totalDividendEarned;
    uint256 campaignsCreatedCount;
    uint256 campaignsBackedCount;
    uint256 claimableBalance;
    Campaign[] campaignsCreated;
    Campaign[] campaignsBacked;
}

/**
 * @dev Represents a crowdfunding campaign.
 * @param status The current status of the campaign (e.g., ongoing, completed).
 * @param raisedAmount The amount raised so far in the campaign.
 * @param targetAmount The funding goal for the campaign.
 * @param targetDeadline The deadline by which the campaign needs to meet its funding goal.
 * @param minFunding The minimum amount that must be raised for the campaign to be considered successful.
 * @param creatorAddress The address of the user who created the campaign.
 * @param backersCount The number of backers for this campaign.
 * @param backers An array of Backer structs, representing the backers of the campaign.
 * @param reportCount The number of reports made against this campaign.
 * @param depositAddress The address where the raised funds are deposited.
 */
struct Campaign {
    CampaignStatus status;
    uint256 raisedAmount;
    uint256 targetAmount;
    uint256 targetDeadline;
    uint256 minFunding;
    address payable creatorAddress;
    uint256 backersCount;
    Backer[] backers;
    uint256 reportCount;
    address payable depositAddress;
    uint256[] dividendAmount;
}

/**
 * @dev Represents a backer of a campaign.
 * @param status The current status of the backer (e.g., refunded, active).
 * @param reporter Whether the backer is also a reporter of the campaign.
 * @param backerId A unique identifier for the backer.
 * @param backerAddress The address of the backer.
 * @param backedAmount The amount this backer has contributed to the campaign.
 * @param dividendAmount The amount of dividends this backer has earned from the campaign.
 * @param tokenId A unique token identifier associated with this backer's contribution.
 */
struct Backer {
    BackerStatus status;
    bool reporter;
    uint256 backerId;
    address payable backerAddress;
    uint256 backedAmount;
    uint256 dividendAmount;
    uint256 tokenId;

    uint256 claimedDividendRounds;
}

/**
 * @dev Represents a token sale listing.
 * @param tokenId The unique identifier for the token being sold.
 * @param price The selling price for the token.
 * @param isActive Whether the sale listing is currently active or not.
 */
struct SaleListing {
    uint256 tokenId;
    uint256 price;
    bool isActive;
}