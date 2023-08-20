import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { UserType } from '@/types/projectTypes';

interface UserReturnType {
  users: UserType[] | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

const useGetUsers = (): UserReturnType => {
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  useEffect(() => {
    setFetchingStatus(FetchingStatus.Loading);

    axios
      .get<UserType[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/User`)
      .then((response) => {
        setUsers(response.data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error.message);
        setFetchingStatus(FetchingStatus.Error);
      });
  }, []);

  return { users, fetchingStatus, error };
};

export default useGetUsers;
