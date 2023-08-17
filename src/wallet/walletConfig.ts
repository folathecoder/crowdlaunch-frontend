import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal, useWeb3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  mainnet,
  polygon,
  bsc,
  avalanche,
  fantom,
} from 'wagmi/chains';

const chains = [arbitrum, mainnet, polygon, bsc, avalanche, fantom];
const projectId = '201547027406abdbd2521d63a4c827af';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export {
  chains,
  ethereumClient,
  projectId,
  wagmiConfig,
  Web3Modal,
  WagmiConfig,
  useWeb3Modal,
};
