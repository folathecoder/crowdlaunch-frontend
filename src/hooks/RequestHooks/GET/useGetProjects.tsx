import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { ProjectType } from '@/types/projectTypes';

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
