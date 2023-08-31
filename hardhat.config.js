/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.2',
  plugins: [require('@nomiclabs/hardhat-waffle')],
};
