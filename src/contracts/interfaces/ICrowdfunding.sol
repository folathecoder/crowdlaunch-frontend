// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "../crowdfundContract.sol";

interface ICrowdFundingContract {
  function payDividend(address _campaignAddress, uint256 _accountBalance, uint256 _startBalance) external payable;
}