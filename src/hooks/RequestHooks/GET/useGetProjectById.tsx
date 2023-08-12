import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { ProjectDetailType } from '@/types/projectTypes';

interface ProjectReturnType {
  project: ProjectDetailType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
  refetch: () => void;
}

interface PropsType {
  projectId: string;
}

const useGetProjectById = ({ projectId }: PropsType): ProjectReturnType => {
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  const fetchProject = () => {
    setFetchingStatus(FetchingStatus.Loading);

    axios
      .get<ProjectDetailType>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/Project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEFAULT_JWT}`,
            accept: 'application/json',
          },
        }
      )
      .then((response) => {
        setProject(response.data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error.message);
        setFetchingStatus(FetchingStatus.Error);
      });
  };

  const refetch = () => {
    fetchProject();
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return { project, fetchingStatus, error, refetch };
};

export default useGetProjectById;
