import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import CrowdfundContractABI from 'contracts/abi/crowdfundContractABI.json';
import { weiToEther } from '@/helpers/weiConverter';
import { ProjectDetailType } from '@/types/projectTypes';
import usePatchProject from '@/hooks/RequestHooks/PATCH/usePatchProject';

interface ReturnType {
  campaign: CampaignDataType | null;
  isCampaignDataError: boolean;
  isCampaignDataLoading: boolean;
}

interface PropType {
  projectAddress: `0x${string}`;
  project: ProjectDetailType | null;
  token: string;
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

const useGetCampaign = ({
  projectAddress,
  project,
  token,
}: PropType): ReturnType => {
  const [campaign, setCampaign] = useState<CampaignDataType | null>(null);

  // Update Project Details after Funding
  const { updateProjectData } = usePatchProject({
    jwtToken: token ?? '',
  });

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
    watch: true,
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

  // Update the project data on the backend on every contract read
  useEffect(() => {
    if (campaign && project) {
      updateProjectData(
        {
          categoryId: project?.category.categoryId ?? '',
          projectName: project?.project.projectName ?? '',
          bannerImageUrl: project?.project.bannerImageUrl ?? '',
          targetAmount: Number(campaign.targetAmount),
          minInvestment: Number(campaign.minFunding),
          noOfDaysLeft: campaign.targetDeadline,
          projectWalletAddress: project?.project.projectWalletAddress ?? '',
          customColour: {
            fontColour: project?.project.customColour.fontColour ?? '',
            bgColour1: project?.project.customColour.bgColour1 ?? '',
            bgColour2: project?.project.customColour.bgColour2 ?? '',
          },
          projectStatus: campaign.campaignStatus,
          amountRaised: Number(campaign.raisedAmount),
        },
        project?.project.projectId
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign, project]);

  return { campaign, isCampaignDataError, isCampaignDataLoading };
};

export default useGetCampaign;
