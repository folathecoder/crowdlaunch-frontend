import React, { useState, ReactElement, useEffect } from 'react';
const { utils } = require('ethers');
import useGetUserByAddress from '@/hooks/RequestHooks/GET/useGetUserByAddress';
import { FetchingStatus } from '@/types/fetchingTypes';
import { UserProfileType } from '@/types/projectTypes';
import usePostAuth from '@/hooks/RequestHooks/POST/usePostAuth';
import useGetWalletBalance from '@/wallet/useGetWalletBalance';

type Props = {
  children: JSX.Element;
};

export interface ProfileReturnTypes {
  toggleSettings: boolean;
  setToggleSettings: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProfileType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
  profileMetrics: ProfileMetricsType;
}

interface ProfileMetricsType {
  totalInvestment: number;
  walletBalance: string;
  totalDividend: number;
  claimableDividend: number;
}

export const ProfileContext = React.createContext<ProfileReturnTypes | null>(
  null
);

export const ProfileProvider = ({ children }: Props): ReactElement => {
  const { userData } = usePostAuth();
  const { user, error, fetchingStatus } = useGetUserByAddress({
    jwtToken: userData?.token,
  });
  const { data: walletMetrics, isFetched } = useGetWalletBalance({
    userWalletAddress: userData?.walletAddress as `0x${string}`,
  });

  const [toggleSettings, setToggleSettings] = useState(false);
  const [profileMetrics, setProfileMetrics] = useState<ProfileMetricsType>({
    totalInvestment: 0,
    walletBalance: '0.0',
    totalDividend: 0,
    claimableDividend: 0,
  });

  // Fetch and set the wallet balance state
  useEffect(() => {
    if (isFetched) {
      setProfileMetrics((prevState) => ({
        ...prevState,
        walletBalance: utils.formatEther(walletMetrics?.value ?? BigInt(0)),
      }));
    }
  }, [isFetched, walletMetrics?.value]);


  return (
    <ProfileContext.Provider
      value={{
        toggleSettings,
        setToggleSettings,
        user,
        error,
        fetchingStatus,
        profileMetrics,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
