const CAMPAIGN_FEE = ethers.utils.parseEther('0.00001');
const NFT_LISTING_FEE = ethers.utils.parseEther('0.00001');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const ContractFactory = await ethers.getContractFactory('CampaignContract');
  const contract = await ContractFactory.deploy(CAMPAIGN_FEE, NFT_LISTING_FEE);

  console.log('contract address:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
