import axios from 'axios';
import { useState } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { UserUpdateType } from '@/types/projectTypes';


interface UserReturnType {
  fetchingStatus: FetchingStatus;
  error: any;
  updateUserData: (data: UserUpdateType) => Promise<any>;
}

interface PropsType {
  jwtToken?: string;
}

const usePatchUser = ({ jwtToken }: PropsType): UserReturnType => {
  const [error, setError] = useState<any>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  const updateUserData = async (data: UserUpdateType) => {
    try {
      setFetchingStatus(FetchingStatus.Loading);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/User`,
        data,
        {
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${jwtToken}`,
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

  return { error, fetchingStatus, updateUserData };
};

export default usePatchUser;
