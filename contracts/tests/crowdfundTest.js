// Import necessary modules
const { ethers } = require('hardhat');
const { expect } = require('chai');

// Declare variables for storing user and contract information
let platform, user1, user2, user3, user4, contract, accountContractAddress;

// Declare constants for the test
// Initialize fees and campaign parameters as Big Numbers for easy manipulation
const CAMPAIGN_FEE = ethers.utils.parseEther('1');
const NFT_LISTING_FEE = ethers.utils.parseEther('1');
const CAMPAIGN_TARGET_AMOUNT = ethers.utils.parseEther('2000');
const CAMPAIGN_MIN_FUNDING = ethers.utils.parseEther('10');
const WITHDRAWAL_AMOUNT = ethers.utils.parseEther('100');
const DEPOSIT_AMOUNT = ethers.utils.parseEther('1');
const CAMPAIGN_DEADLINE = 1000000;
const TOKEN_URI = 'https://token-uri.com';
const NFT_SALE_PRICE = ethers.utils.parseEther('100');

describe('CrowdfundContract Test', function () {
  before(async function () {
    // TODO: Test user accounts
    [platform, user1, user2, user3, user4] = await ethers.getSigners();

    // TODO: Contract deployment
    const CrowdFundContract = await ethers.getContractFactory(
      'CampaignContract',
      platform
    );
    contract = await CrowdFundContract.deploy(CAMPAIGN_FEE, NFT_LISTING_FEE);
  });

  it('Check that a New User Can Successfully Register', async function () {
    await contract.connect(user1).registerUser();
    const user = await contract.users(user1.address);

    expect(user.userAddress).to.equal(user1.address);
  });

  it('Check that an Already Registered User Cannot Re-Register', async function () {
    const REVERT_REASON = '1'; // Error CODE: Already Registered
    await expect(contract.connect(user1).registerUser()).to.be.revertedWith(
      REVERT_REASON
    );
  });

  it('Check that Campaign Listing Fee Can Be Accurately Retrieved', async function () {
    expect(await contract._campaignFee()).to.equal(CAMPAIGN_FEE);
  });

  it('Check that NFT Listing Fee Can Be Accurately Retrieved', async function () {
    expect(await contract._nftListingPrice()).to.equal(NFT_LISTING_FEE);
  });

  it('Check if the Platform Address Is Correctly Returned', async function () {
    expect(await contract._platformAddress()).to.equal(platform.address);
  });

  it('Check that the User Count Is Accurately Reported', async function () {
    await contract.connect(user2).registerUser();
    await contract.connect(user3).registerUser();

    expect(await contract._userCount()).to.equal(3);
  });

  it('Check that a Registered User Can Successfully Create a Campaign', async function () {
    await contract
      .connect(user1)
      .createCampaign(
        CAMPAIGN_TARGET_AMOUNT,
        CAMPAIGN_DEADLINE,
        CAMPAIGN_MIN_FUNDING,
        {
          value: CAMPAIGN_FEE,
        }
      );

    const campaign = await contract.campaigns(user1.address);

    expect(campaign.creatorAddress).to.equal(user1.address);
  });

  it('Check that an Unregistered User Cannot Create a Campaign', async function () {
    const REVERT_REASON = '3'; // Error CODE: Only registered user

    await expect(
      contract
        .connect(user4)
        .createCampaign(
          CAMPAIGN_TARGET_AMOUNT,
          CAMPAIGN_DEADLINE,
          CAMPAIGN_MIN_FUNDING,
          {
            value: CAMPAIGN_FEE,
          }
        )
    ).to.be.revertedWith(REVERT_REASON);
  });

  it('Check that Creating a Campaign with Insufficient Fee Is Reverted', async function () {
    const REVERT_REASON = '1'; // Error CODE: Low campaign fee

    await expect(
      contract
        .connect(user1)
        .createCampaign(
          CAMPAIGN_TARGET_AMOUNT,
          CAMPAIGN_DEADLINE,
          CAMPAIGN_MIN_FUNDING,
          {
            value: CAMPAIGN_FEE,
          }
        )
    ).to.be.revertedWith(REVERT_REASON);
  });

  it('Check that a User Can Successfully Fund a Campaign', async function () {
    const FUND_AMOUNT = ethers.utils.parseEther('1000');

    await contract.connect(user2).fundCampaign(user1.address, TOKEN_URI, {
      value: FUND_AMOUNT,
    });

    const fundedCampaign = await contract.campaigns(user1.address);

    expect(fundedCampaign.raisedAmount).to.equal(FUND_AMOUNT);
  });

  it('Check that Funding Below the Minimum Amount is Reverted', async function () {
    const REVERT_REASON = '2'; // Error CODE: Inactive Campaign OR Minimum funding Amount not met
    const FUND_AMOUNT = ethers.utils.parseEther('0.9');

    await expect(
      contract.connect(user3).fundCampaign(user1.address, TOKEN_URI, {
        value: FUND_AMOUNT,
      })
    ).to.be.revertedWith(REVERT_REASON);
  });

  it('Check that NFT is Minted Successfully after Funding a Campaign', async function () {
    const backer = await contract.tokenIdToBacker(1);

    expect(backer.backerAddress).to.equal(user2.address);
  });

  it('Check that NFT Sale Listing without Paying Listing Fee is Reverted', async function () {
    const REVERT_REASON = '1'; // Error CODE: Low NFT listing fee

    await expect(
      contract.connect(user2).listNFTForSale(1, NFT_SALE_PRICE, {
        value: 0,
      })
    ).to.be.revertedWith(REVERT_REASON);
  });

  it('Check that NFT can be Listed for Sale by the Owner Successfully', async function () {
    await contract.connect(user2).listNFTForSale(1, NFT_SALE_PRICE, {
      value: NFT_LISTING_FEE,
    });

    const saleListing = await contract.tokenIdToSaleListing(1);

    expect(saleListing.isActive).to.equal(true);
  });

  it('Check that a Reversion Occurs When a User Buys NFT Without Paying The Sale Price', async function () {
    const REVERT_REASON = '1'; // Error CODE: Insufficient sale price

    await expect(
      contract.connect(user3).buyListedNFT(1, {
        value: 0,
      })
    ).to.be.revertedWith(REVERT_REASON);
  });

  it('Check that the Listed NFT Can be Bought Successfully by Another User (NFT Ownership Transfer)', async function () {
    await contract.connect(user3).buyListedNFT(1, {
      value: NFT_SALE_PRICE,
    });

    expect(await contract.ownerOf(1)).to.equal(user3.address);
  });

  it('Check that an Account Contract is Deployed After Campaign Meets Target Funding Amount', async function () {
    const FUND_AMOUNT = ethers.utils.parseEther('1000');

    await contract.connect(user4).registerUser();
    await contract.connect(user4).fundCampaign(user1.address, TOKEN_URI, {
      value: FUND_AMOUNT,
    });

    const campaignData = await contract.campaigns(user1.address);
    accountContractAddress = campaignData[7];

    expect(accountContractAddress.toString()).to.have.lengthOf(42);
  });
});

describe('Account Wallet Test', function () {
  let accountContract, balance;

  before(async function () {
    const AccountContract = await ethers.getContractFactory('AccountContract');
    accountContract = await AccountContract.attach(accountContractAddress);
  });

  it('Check that the Account Contract is Funded with Target Amount', async function () {
    balance = await ethers.provider.getBalance(accountContractAddress);
    expect(balance).to.be.at.least(CAMPAIGN_TARGET_AMOUNT);
  });

  it('Check that the Campaign Creator is the Account Owner', async function () {
    expect(await accountContract.accountOwner()).to.equal(user1.address);
  });

  it('Check that account owner can withdraw funds', async function () {
    const startBalance = await accountContract.startBalance();
    await accountContract.connect(user1).withdraw(WITHDRAWAL_AMOUNT);
    balance = await ethers.provider.getBalance(accountContractAddress);

    expect(Number(ethers.utils.formatEther(startBalance))).to.be.greaterThan(
      Number(ethers.utils.formatEther(balance))
    );
  });

  it('Check that the Total Withdrawals can be Fetched', async function () {
    expect(await accountContract.totalWithdrawals()).to.equal(
      WITHDRAWAL_AMOUNT
    );
  });

  it('Check that the Total Deposits can be Fetched', async function () {
    const previousBalance = await ethers.provider.getBalance(
      accountContractAddress
    );

    await user4.sendTransaction({
      to: accountContractAddress,
      value: DEPOSIT_AMOUNT,
    });

    balance = await ethers.provider.getBalance(accountContractAddress);
    const expectedNewBalance = previousBalance.add(DEPOSIT_AMOUNT);

    expect(balance.toString()).to.equal(expectedNewBalance.toString());
  });

  it('Check that the Starting Balance can be Fetched', async function () {
    const campaignData = await contract.campaigns(user1.address);
    const amountRaised = campaignData[1];
    const startBalance = await accountContract.startBalance();

    expect(Number(ethers.utils.formatEther(startBalance))).to.equal(
      Number(ethers.utils.formatEther(amountRaised))
    );
  });
});
