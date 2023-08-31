// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "../accountContract.sol";

interface IAccountContract {
  function depositStartBalance() payable external;
}