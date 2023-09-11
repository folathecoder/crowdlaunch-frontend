import useWallet from '@/wallet/useWallet';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { weiConverter } from '@/helpers/weiConverter';
import CrowdfundContractABI from 'contracts/abi/crowdfundContractABI.json';

interface ReturnType {
  fundCampaign: () => void;
  isFundingSuccess: boolean;
  isFundingLoading: boolean;
  isFundingError: boolean;
  isFundingIdle: boolean;
}

interface PropType {
  campaignAddress: `0x${string}`;
  fundAmount: number;
  tokenURI: string;
}

const useFundCampaign = ({
  campaignAddress,
  fundAmount,
  tokenURI,
}: PropType): ReturnType => {
  const { wallet } = useWallet();

  // Prepare contract write configuration for fundCampaign function
  const { config: fundCampaignConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CrowdfundContractABI,
    functionName: 'fundCampaign',
    chainId: 11155111,
    account: wallet.walletAddress as `0x${string}`,
    args: [campaignAddress, tokenURI],
    value: weiConverter(fundAmount),
  });

  // Write camapaign fund data to the contract
  const { write: writeCampaignFund, data: campaignFundData } =
    useContractWrite(fundCampaignConfig);

  // Wait for the campaign fund function transaction to complete
  const {
    isSuccess: isFundingSuccess,
    isLoading: isFundingLoading,
    isError: isFundingError,
    isIdle: isFundingIdle,
  } = useWaitForTransaction({
    hash: campaignFundData?.hash,
  });

  // Function to fund campaign
  const fundCampaign = async () => {
    await writeCampaignFund?.();
  };

  return {
    fundCampaign,
    isFundingSuccess,
    isFundingLoading,
    isFundingError,
    isFundingIdle,
  };
};

export default useFundCampaign;
