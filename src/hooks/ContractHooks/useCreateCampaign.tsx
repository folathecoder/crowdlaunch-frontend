import useWallet from '@/wallet/useWallet';
import CrowdfundContractABI from 'contracts/abi/crowdfundContractABI.json';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { weiConverter } from '@/helpers/weiConverter';
import { secondsFutureDate } from '@/helpers/formatters';
import { CAMPAIGN_FEE } from '@/data/appInfo';

interface ReturnType {
  createCampaign: () => void;
  isCreationSuccess: boolean;
  isCreationLoading: boolean;
  isCreationIdle: boolean;
  isCreationError: boolean;
}

interface PropType {
  targetAmount: number;
  minInvestment: number;
  endDate: number;
}

const useCreateCampaign = ({
  targetAmount,
  minInvestment,
  endDate,
}: PropType): ReturnType => {
  const { wallet } = useWallet();

  // Prepare contract write configuration for createCampaign function
  const { config: createCampaignConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CrowdfundContractABI,
    functionName: 'createCampaign',
    chainId: 11155111,
    account: wallet.walletAddress as `0x${string}`,
    args: [
      weiConverter(targetAmount),
      weiConverter(minInvestment),
      secondsFutureDate(endDate.toString()),
    ],
    value: weiConverter(CAMPAIGN_FEE),
  });

  // Write camapaign creation data to the contract
  const { write: writeCampaignCreation, data: campaignCreationData } =
    useContractWrite(createCampaignConfig);

  // Wait for the campaign creation function transaction to complete
  const {
    isSuccess: isCreationSuccess,
    isLoading: isCreationLoading,
    isError: isCreationError,
    isIdle: isCreationIdle,
  } = useWaitForTransaction({
    hash: campaignCreationData?.hash,
  });

  // Function to create campaign
  const createCampaign = async () => {
    await writeCampaignCreation?.();
  };

  return {
    createCampaign,
    isCreationSuccess,
    isCreationLoading,
    isCreationIdle,
    isCreationError,
  };
};

export default useCreateCampaign;
