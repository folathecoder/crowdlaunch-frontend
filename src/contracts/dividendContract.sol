// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./userContract.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
* @notice Error code
* 1 - no claimable balance
* 2 - Transfer failed
*/

contract DividendContract is UserContract {
    using SafeMath for uint256;
    
    constructor(uint256 _campaignFee, uint256 _nftListingPrice) UserContract(_campaignFee, _nftListingPrice){}
    
    /**
    * @notice Allows users to claim their dividends.
    * @dev Function can only be called by a registered and non-banned user.
    * It transfers the claimable balance to the user's account and updates the state.
    */
    function claimDividend() external requireRegisteredUser {
        // Fetch the user details from storage
        User storage user = users[msg.sender];

        // Ensure that the user has a claimable balance
        require(user.claimableBalance > 0, "1");

        // Attempt to transfer the claimable dividend balance to the user
        (bool success, ) = user.userAddress.call{value: user.claimableBalance}("");
        require(success, "2");

        // Update the total dividends earned by the user
        user.totalDividendEarned += user.claimableBalance;

        // Emit an event to log the dividend claim
        emit DividendClaimed(msg.sender, user.claimableBalance, user.totalDividendEarned);

        // Reset the user's claimable balance to zero
        user.claimableBalance = 0;
    }
}