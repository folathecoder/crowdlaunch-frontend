import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { UserProfileType } from '@/types/projectTypes';

interface UserReturnType {
  user: UserProfileType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

interface PropsType {
  userId: string;
}

const useGetUserById = ({ userId }: PropsType): UserReturnType => {
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  useEffect(() => {
    setFetchingStatus(FetchingStatus.Loading);

    axios
      .get<UserProfileType>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/User/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEFAULT_JWT}`,
            accept: 'application/json',
          },
        }
      )
      .then((response) => {
        setUser(response.data);
        setFetchingStatus(FetchingStatus.Fetched);
      })
      .catch((error) => {
        setError(error.message);
        setFetchingStatus(FetchingStatus.Error);
      });
  }, [userId]);

  return { user, error, fetchingStatus };
};

export default useGetUserById;
