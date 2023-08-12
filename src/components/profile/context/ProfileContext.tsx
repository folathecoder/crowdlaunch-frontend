import React, { useState, ReactElement } from 'react';
import useGetUserByAddress from '@/hooks/RequestHooks/GET/useGetUserByAddress';
import { FetchingStatus } from '@/types/fetchingTypes';
import { UserProfileType } from '@/types/projectTypes';
import usePostAuth from '@/hooks/RequestHooks/POST/usePostAuth';
import { StdioNull } from 'child_process';

type Props = {
  children: JSX.Element;
};

export interface ProfileReturnTypes {
  toggleSettings: boolean;
  setToggleSettings: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProfileType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
}

export const ProfileContext = React.createContext<ProfileReturnTypes | null>(
  null
);

export const ProfileProvider = ({ children }: Props): ReactElement => {
  const { userData } = usePostAuth();
  const { user, error, fetchingStatus } = useGetUserByAddress({
    jwtToken: userData?.token,
  });

  const [toggleSettings, setToggleSettings] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        toggleSettings,
        setToggleSettings,
        user,
        error,
        fetchingStatus,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
