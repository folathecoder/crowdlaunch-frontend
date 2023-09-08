import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import CrowdfundContractABI from 'contracts/abi/crowdfundContractABI.json';
import { weiToEther } from '@/helpers/weiConverter';

interface ReturnType {
  campaign: CampaignDataType | null;
  isCampaignDataError: boolean;
  isCampaignDataLoading: boolean;
}

interface PropType {
  projectAddress: `0x${string}`;
}

interface CampaignStatus {
  NotStarted: number; // 0
  Active: number; // 1
  Paused: number; // 2
  Expired: number; // 3
  Completed: number; // 4
  Cancelled: number; // 5
}

interface CampaignDataType {
  campaignStatus: number;
  raisedAmount: string;
  targetAmount: string;
  targetDeadline: number;
  minFunding: string;
  creatorAddress: `0x${string}`;
  backersCount: number;
  depositAddress: `0x${string}`;
}

const useGetCampaign = ({ projectAddress }: PropType): ReturnType => {
  const [campaign, setCampaign] = useState<CampaignDataType | null>(null);

  // Read campaign data from the contract
  const {
    data: campaignData,
    isError: isCampaignDataError,
    isLoading: isCampaignDataLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: CrowdfundContractABI,
    functionName: 'campaigns',
    chainId: 11155111,
    args: [projectAddress as `0x${string}`],
  });

  const campaignReadData = campaignData as Array<any>;

  // Destruct the array into a readable object
  useEffect(() => {
    if (campaignReadData)
      setCampaign({
        campaignStatus: campaignReadData[0],
        raisedAmount: weiToEther(campaignReadData[1]),
        targetAmount: weiToEther(campaignReadData[2]),
        minFunding: weiToEther(campaignReadData[3]),
        targetDeadline: Number(campaignReadData[4]),
        creatorAddress: campaignReadData[5],
        backersCount: Number(campaignReadData[6]),
        depositAddress: campaignReadData[7],
      });
  }, [campaignReadData]);

  return { campaign, isCampaignDataError, isCampaignDataLoading };
};

export default useGetCampaign;
