import React from 'react';
import useWallet from '@/wallet/useWallet';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import CrowdfundContractABI from 'contracts/abi/crowdfundContractABI.json';
import { extractNumberBehindLastHash } from '@/helpers/formatters';
import { weiConverter } from '@/helpers/weiConverter';

interface ReturnType {
  buyListedNFT: () => Promise<void>;
  isBuyingSuccess: boolean;
  isBuyingLoading: boolean;
  isBuyingIdle: boolean;
  isBuyingError: boolean;
}

interface PropType {
  nftName: string;
  nftPrice: number;
}

const useBuyListedNft = ({ nftName, nftPrice }: PropType): ReturnType => {
  const { wallet } = useWallet();

  // Prepare contract write configuration for buyListedNFT function
  const { config: buyListedNFTConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CrowdfundContractABI,
    functionName: 'buyListedNFT',
    chainId: 11155111,
    account: wallet.walletAddress as `0x${string}`,
    args: [extractNumberBehindLastHash(nftName)],
    value: weiConverter(nftPrice),
  });

  // Write buy nft for sale data to the contract
  const { write: writeBuyListedNFT, data: buyListedNFTData } =
    useContractWrite(buyListedNFTConfig);

  // Wait for the Buying function transaction to complete
  const {
    isSuccess: isBuyingSuccess,
    isLoading: isBuyingLoading,
    isError: isBuyingError,
    isIdle: isBuyingIdle,
  } = useWaitForTransaction({
    hash: buyListedNFTData?.hash,
  });

  const buyListedNFT = async (): Promise<void> => {
    await writeBuyListedNFT?.();
  };

  return {
    buyListedNFT,
    isBuyingSuccess,
    isBuyingLoading,
    isBuyingIdle,
    isBuyingError,
  };
};

export default useBuyListedNft;
