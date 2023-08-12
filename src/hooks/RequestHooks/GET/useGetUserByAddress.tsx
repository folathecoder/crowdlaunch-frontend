import axios from 'axios';
import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import { UserProfileType } from '@/types/projectTypes';
import useWallet from '@/wallet/useWallet';

interface UserReturnType {
  user: UserProfileType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

interface PropsType {
  jwtToken?: string;
}

const useGetUserByAddress = ({ jwtToken }: PropsType): UserReturnType => {
  const { wallet } = useWallet();
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  useEffect(() => {
    setFetchingStatus(FetchingStatus.Loading);

    if (wallet?.walletAddress && jwtToken) {
      axios
        .get<UserProfileType>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/User/get-by-wallet-address`,
          {
            headers: {
              walletAddress: `${wallet.walletAddress}`,
              Authorization: `Bearer ${jwtToken}`,
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
    }
  }, [wallet.walletAddress, jwtToken]);

  return { user, error, fetchingStatus };
};

export default useGetUserByAddress;
