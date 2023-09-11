// /** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const {
  NEXT_PUBLIC_ETHERSCAN_API_KEY,
  NEXT_PUBLIC_SEPOLIA_PRIVATE_KEY,
  NEXT_PUBLIC_INFURA_API_KEY,
} = process.env;

module.exports = {
  solidity: '0.8.2',
  defaultNetwork: 'sepolia',
  plugins: [require('@nomiclabs/hardhat-waffle')],
  etherscan: {
    apikey: `${NEXT_PUBLIC_ETHERSCAN_API_KEY}`,
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${NEXT_PUBLIC_INFURA_API_KEY}`,
      accounts: [`${NEXT_PUBLIC_SEPOLIA_PRIVATE_KEY}`],
    },
  },
};
