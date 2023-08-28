// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
* @notice Error code
* 1 - not owner
* 2 - low funds
* 3 - transfer failed
*/

contract AccountContract {
    address payable public accountOwner;
    address payable public crowdLaunchContractAddress;
    uint256 public startBalance;
    uint256 public totalWithdrawals;
    uint256 public totalDeposits;
    uint256 public paidDividends;

    event DividendPaid(address indexed owner, uint256 amount);

    constructor(address _campaignAddress) payable {
        accountOwner = payable(_campaignAddress);
        crowdLaunchContractAddress = payable(msg.sender);
        startBalance = msg.value;
        totalDeposits += msg.value; 
    }

    modifier onlyAccountOwner() {
        require(msg.sender == accountOwner, "1");
        _;
    }

    receive() external payable {
        totalDeposits += msg.value; 
    }

    function withdraw( uint256 _amount) external onlyAccountOwner {
        require(_amount <= address(this).balance, "2");
        accountOwner.transfer(_amount);
        totalWithdrawals += _amount;
    }

    function payDividend() external onlyAccountOwner {
        uint amountToPay = address(this).balance - startBalance;

        require(amountToPay > 0, "2");

        (bool success, ) = crowdLaunchContractAddress.call{value: amountToPay}("");
        require(success, "3");

        paidDividends += amountToPay;

        emit DividendPaid(accountOwner, amountToPay);
    }
}