import { useState, useEffect } from 'react';
import {
  useAccount,
  useConnect,
  useEnsName,
  useDisconnect,
  useBalance,
} from 'wagmi';
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
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

interface ActiveWalletTypes {
  walletName: string | null;
  walletAddress?: `0x${string}` | null;
}

const useWallet = () => {
  const { address, isConnected, isDisconnected, isReconnecting, isConnecting } =
    useAccount();

  // const { disconnect: disconnectWallet } = useDisconnect();
  const [activeWallet, setActiveWallet] = useState<ActiveWalletTypes>({
    walletName: null,
    walletAddress: null,
  });

  useEffect(() => {
    setActiveWallet({
      walletName: null,
      walletAddress: address,
    });
  }, [address, isConnected, isDisconnected]);

  // console.log(data);

  return {
    chains,
    ethereumClient,
    projectId,
    wagmiConfig,
    Web3Modal,
    WagmiConfig,
    useWeb3Modal,
    address,
    isConnected,
    isDisconnected,
    activeWallet,
  };
};

export default useWallet;
