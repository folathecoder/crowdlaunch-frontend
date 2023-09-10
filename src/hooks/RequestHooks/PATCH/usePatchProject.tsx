import axios from 'axios';
import { useState } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { ProjectPostType } from '@/types/projectTypes';

interface ReturnType {
  fetchingStatus: FetchingStatus;
  error: any;
  updateProjectData: (data: ProjectPostType, projectId: string) => Promise<any>;
}

interface PropsType {
  jwtToken?: string;
}

const usePatchProject = ({ jwtToken }: PropsType): ReturnType => {
  const [error, setError] = useState<any>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  const updateProjectData = async (
    data: ProjectPostType,
    projectId: string
  ) => {
    if (data)
      try {
        setFetchingStatus(FetchingStatus.Loading);

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/Project/${projectId}`,
          data,
          {
            headers: {
              accept: '*/*',
            },
          }
        );

        if (response.status === 204) {
          setFetchingStatus(FetchingStatus.Fetched);
        }

        return response.data;
      } catch (error) {
        setError(error);
        setFetchingStatus(FetchingStatus.Error);
      }
  };

  return { fetchingStatus, error, updateProjectData };
};

export default usePatchProject;
