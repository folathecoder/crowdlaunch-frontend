import useWallet from '@/wallet/useWallet';
import CrowdfundContractABI from 'contracts/abi/crowdfundContractABI.json';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { weiConverter } from '@/helpers/weiConverter';
import { NFT_LISTING_FEE } from '@/data/appInfo';
import { extractNumberBehindLastHash } from '@/helpers/formatters';

interface ReturnType {
  listNftForSale: () => void;
  isListingSuccess: boolean;
  isListingLoading: boolean;
  isListingIdle: boolean;
  isListingError: boolean;
}

interface PropType {
  nftName: string;
  listPrice: number | '';
}

const useListNFTForSale = ({ nftName, listPrice }: PropType): ReturnType => {
  const { wallet } = useWallet();

  // Prepare contract write configuration for listNFTForSale function
  const { config: listNftForSaleConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CrowdfundContractABI,
    functionName: 'listNFTForSale',
    chainId: 11155111,
    account: wallet.walletAddress as `0x${string}`,
    args: [
      extractNumberBehindLastHash(nftName),
      weiConverter(Number(listPrice)),
    ],
    value: weiConverter(NFT_LISTING_FEE),
  });

  // Write list nft for sale data to the contract
  const { write: writeListNftForSale, data: listNftForSaleData } =
    useContractWrite(listNftForSaleConfig);

  // Wait for the Listing function transaction to complete
  const {
    isSuccess: isListingSuccess,
    isLoading: isListingLoading,
    isError: isListingError,
    isIdle: isListingIdle,
  } = useWaitForTransaction({
    hash: listNftForSaleData?.hash,
  });

  const listNftForSale = async () => {
    await writeListNftForSale?.();
  };

  return {
    listNftForSale,
    isListingSuccess,
    isListingLoading,
    isListingIdle,
    isListingError,
  };
};

export default useListNFTForSale;
