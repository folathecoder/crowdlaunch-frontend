import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { SessionProvider } from 'next-auth/react';
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}` }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'CrowdLaunch',
  projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_CLOUD_KEY}`,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to Crowdlaunch to create projects or fund projects.',
});

export {
  chains,
  wagmiConfig,
  WagmiConfig,
  RainbowKitProvider,
  darkTheme,
  SessionProvider,
  RainbowKitSiweNextAuthProvider,
  getSiweMessageOptions,
};
