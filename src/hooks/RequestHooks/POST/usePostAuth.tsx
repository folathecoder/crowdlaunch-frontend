import { useState, useEffect } from 'react';
import { FetchingStatus } from '@/types/fetchingTypes';
import useWallet from '@/wallet/useWallet';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleSettings } from '@/redux/slices/profileSettingSlice';

interface AuthType {
  walletAddress: string;
  accountCreated: boolean;
  accountSignedIn: boolean;
  accountExists: boolean;
  invalidAddress: boolean;
  errorMessage: string | null;
  token: string;
}

interface AuthReturnType {
  userData: AuthType | null;
  error: string | null;
  fetchingStatus: FetchingStatus;
}

const usePostAuth = (): AuthReturnType => {
  const dispatch = useDispatch();

  const { wallet } = useWallet();
  const [userData, setUserData] = useState<AuthType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>(
    FetchingStatus.Default
  );

  useEffect(() => {
    const data = {
      userName: '',
      walletAddress: wallet.walletAddress,
      socials: {
        websiteUrl: '',
        twitterUrl: '',
        telegramUrl: '',
        discordUrl: '',
      },
    };

    setFetchingStatus(FetchingStatus.Loading);

    if (wallet.walletAddress) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEFAULT_JWT}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setFetchingStatus(FetchingStatus.Fetched);
        })
        .catch((error) => {
          setError(error);
          setFetchingStatus(FetchingStatus.Error);
        });
    }
  }, [wallet]);

  // Show the profile update modal for only newly registered users
  useEffect(() => {
    if (fetchingStatus == 2 && userData?.accountExists === false) {
      dispatch(setToggleSettings(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingStatus, userData]);

  return { userData, error, fetchingStatus };
};

export default usePostAuth;
