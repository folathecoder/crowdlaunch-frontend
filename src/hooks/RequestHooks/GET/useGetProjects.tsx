import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';

interface ProjectType {
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

interface ProjectReturnType {
  projects: ProjectType[] | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

const useGetProjects = (): ProjectReturnType => {
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  useEffect(() => {
    setFetchingStatus(FetchingStatus.Loading);

    axios
      .get<ProjectType[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/Project`
      )
      .then((response) => {
        setProjects(response.data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error.message);
        setFetchingStatus(FetchingStatus.Error);
      });
  }, []);

  return { projects, fetchingStatus, error };
};

export default useGetProjects;
