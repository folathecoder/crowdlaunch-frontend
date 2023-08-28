// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./marketplaceContract.sol";

/**
* @notice Error code
* 1 - already registered
*/

contract UserContract is MarketplaceContract {
    
    constructor(uint256 _campaignFee, uint256 _nftListingPrice) MarketplaceContract(_campaignFee, _nftListingPrice){}

    /**
    * @notice Register a new user on the platform.
    * @dev Registers a new user by creating a new User struct and setting its status to 'Active'.
    * This function can only be called by an address that is not banned.
    *
    * Emits a {userCreated} event upon successful registration.
    */

    function registerUser() external {
        // Ensure the address calling the function is not already registered
        require(isUserRegistered(msg.sender) == false, "1");

        // Increment the user count
        _userCount += 1;

        // Create a new user in storage and set its properties
        User storage newUser = users[msg.sender];
        newUser.status = UserStatus.Active;       
        newUser.userAddress = payable(msg.sender); 
        newUser.userId = _userCount;

        // Emit a userCreated event with the new user's address and ID
        emit userCreated(newUser.userAddress, newUser.userId);
    }
}