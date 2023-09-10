import axios from 'axios';
import { useState, useEffect } from 'react';
import useWallet from '@/wallet/useWallet';
import usePostAuth from './usePostAuth';
import { FetchingStatus } from '@/types/fetchingTypes';
import useGetUserByAddress from '../GET/useGetUserByAddress';
import { ProjectFormType } from '@/types/projectTypes';
import { durationInSeconds } from '@/helpers/formatters';

interface ProjectCreationReturnType {
  projectId: string;
  userId: string;
  categoryId: string;
  projectName: string;
  bannerImageUrl: string;
  targetAmount: number;
  amountRaised: number;
  minInvestment: number;
  noOfInvestors: number;
  noOfDaysLeft: number;
  noOfLikes: number;
  projectWalletAddress: string;
  customColour: {
    fontColour: string;
    bgColour1: string;
    bgColour2: string;
  };
  projectStatus: number;
  createdAt: string;
  updatedAt: string;
}

interface PostProjectReturnType {
  projectCreationStatus: FetchingStatus;
  projectCreationError: string | null;
  projectDetailCreationStatus: FetchingStatus;
  projectDetailCreationError: string | null;
  createProject: () => void;
  projectData: ProjectCreationReturnType | null;
}

interface PropType {
  data: ProjectFormType;
}

const usePostProject = ({ data }: PropType): PostProjectReturnType => {
  const { wallet } = useWallet();
  const { userData, fetchingStatus: userFetched } = usePostAuth();
  const { token } = userData || {};
  const { user } = useGetUserByAddress({
    jwtToken: token,
  });

  // Project Creation States
  const [projectData, setProjectData] =
    useState<ProjectCreationReturnType | null>(null);
  const [projectCreationStatus, setProjectCreationStatus] =
    useState<FetchingStatus>(FetchingStatus.Default);
  const [projectCreationError, setProjectCreationError] = useState<
    string | null
  >(null);

  //Project Detail Creation States
  const [projectDetailCreationStatus, setProjectDetailCreationStatus] =
    useState<FetchingStatus>(FetchingStatus.Default);
  const [projectDetailCreationError, setProjectDetailCreationError] = useState<
    string | null
  >(null);

  const createProject = async () => {
    setProjectCreationStatus(FetchingStatus.Loading);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/Project`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        categoryId: data.main.categoryId,
        projectName: data.main.projectName,
        bannerImageUrl: data.main.bannerImageUrl,
        targetAmount: data.main.targetAmount,
        minInvestment: data.main.minInvestment,
        noOfDaysLeft: durationInSeconds(data.main.noOfDaysLeft.toString()),
        projectWalletAddress: data.main.projectWalletAddress,
        customColour: {
          fontColour: data.main.customColour.fontColour,
          bgColour1: data.main.customColour.bgColour1,
          bgColour2: data.main.customColour.bgColour2,
        },
        projectStatus: data.main.projectStatus,
        amountRaised: data.main.amountRaised,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjectData(data);
        setProjectCreationStatus(FetchingStatus.Fetched);
      })
      .catch((err) => {
        setProjectCreationError(err.message);
        setProjectCreationStatus(FetchingStatus.Error);
      });
  };

  const createProjectDetail = async (projectId: string) => {
    setProjectDetailCreationStatus(FetchingStatus.Loading);

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-details/ProjectDetail`,
      {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId: projectId,
          overview: data.detail.overview,
          competitors: data.detail.competitors,
          strategy: data.detail.strategy,
          financials: data.detail.financials,
          dividend: data.detail.dividend,
          risks: data.detail.risks,
          performance: data.detail.performance,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) setProjectDetailCreationStatus(FetchingStatus.Fetched);
      })
      .catch((err) => {
        setProjectDetailCreationError(err.message);
        setProjectDetailCreationStatus(FetchingStatus.Error);
      });
  };

  useEffect(() => {
    if (projectData?.projectId && projectData?.projectId !== '') {
      createProjectDetail(projectData?.projectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData?.projectId]);

  return {
    projectCreationStatus,
    projectCreationError,
    projectDetailCreationStatus,
    projectDetailCreationError,
    createProject,
    projectData,
  };
};

export default usePostProject;
