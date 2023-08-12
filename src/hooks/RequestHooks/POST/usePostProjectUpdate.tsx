import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import usePostAuth from './usePostAuth';

interface ProjectUpdateType {
  projectId: string;
  updateTitle: string;
  updateMessage: string;
}

interface ProjectUpdateResponseType {
  projectUpdateId: string;
  projectId: string;
  updateTitle: string;
  updateMessage: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectUpdateReturnType {
  submitProjectUpdate: (update: ProjectUpdateType) => void;
  updateData: ProjectUpdateResponseType | null;
  error: string | null;
  fetchingStatus: FetchingStatus;
  deleteProjectUpdate: (updateId: string) => void;
  deleteStatus: FetchingStatus;
}

interface PropType {
  update: ProjectUpdateType;
}

const usePostProjectUpdate = () => {
  const { userData } = usePostAuth();
  const [updateData, setUpdateData] =
    useState<ProjectUpdateResponseType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );
  const [deleteStatus, setDeleteStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  const submitProjectUpdate = async (update: ProjectUpdateType) => {
    setFetchingStatus(FetchingStatus.Loading);

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-updates/ProjectUpdate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData?.token}`,
        },
        body: JSON.stringify(update),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUpdateData(data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error);
        setFetchingStatus(FetchingStatus.Error);
      });
  };

  const deleteProjectUpdate = async (updateId: string) => {
    setDeleteStatus(FetchingStatus.Loading);

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project-updates/ProjectUpdate/${updateId}`,
      {
        method: 'DELETE',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${userData?.token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 204) {
          setDeleteStatus(FetchingStatus.Fetched);
        }
      })
      .catch((error) => {
        setError(error);
        setDeleteStatus(FetchingStatus.Error);
      });
  };

  return {
    submitProjectUpdate,
    updateData,
    error,
    fetchingStatus,
    deleteProjectUpdate,
    deleteStatus,
  };
};

export default usePostProjectUpdate;
