// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @dev Enum representing the various statuses a campaign can be in.
 * NotStarted: The campaign has been initialized but not yet started.
 * Active: The campaign is currently active and accepting contributions.
 * Paused: The campaign has been temporarily paused.
 * Expired: The campaign has reached its deadline without meeting its funding goal.
 * Completed: The campaign has reached its deadline and met its funding goal.
 * Cancelled: The campaign has been cancelled by the creator or due to reports.
 */
enum CampaignStatus { NotStarted, Active, Paused, Expired, Completed, Cancelled }

/**
 * @dev Enum representing the statuses a backer can be in.
 * Active: The backer has made a contribution and is considered active in a campaign.
 * Inactive: The backer has either been refunded or has withdrawn their funds.
 */
enum BackerStatus { Active, Inactive }

/**
 * @dev Enum representing the statuses a user can be in.
 * Inactive: The user has not participated in any campaign yet.
 * Active: The user is active and has participated in at least one campaign.
 * Banned: The user has been banned due to fraudulent activities or other reasons.
 */
enum UserStatus { Inactive, Active, Banned }
