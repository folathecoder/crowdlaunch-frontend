import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { ProjectType } from '@/types/projectTypes';
import { useRouter } from 'next/router';

interface ProjectReturnType {
  projects: ProjectType[] | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

const useGetProjects = (): ProjectReturnType => {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  useEffect(() => {
    setFetchingStatus(FetchingStatus.Loading);

    axios
      .get<ProjectType[]>(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/projects/Project/get-with-filters${
          router.asPath.split('/explore')[1] || ''
        }`
      )
      .then((response) => {
        setProjects(response.data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error.message);
        setFetchingStatus(FetchingStatus.Error);
      });
  }, [router.asPath]);

  return { projects, fetchingStatus, error };
};

export default useGetProjects;
