import React, { ReactElement, ReactNode, useState } from 'react';
import usePostAuth, { AuthType } from '@/hooks/RequestHooks/POST/usePostAuth';
import useGetUserByAddress from '@/hooks/RequestHooks/GET/useGetUserByAddress';
import { FetchingStatus } from '@/types/fetchingTypes';
import { UserProfileType } from '@/types/projectTypes';

export interface AppContextReturnTypes {
  user: UserProfileType | null;
  fetchingStatus: FetchingStatus;
  error: string | null;
  crop: {
    aspect: number;
  };
  userData: AuthType | null;
}

interface PropTypes {
  children: ReactNode;
}

export const AppContext = React.createContext<AppContextReturnTypes | null>(
  null
);

const AppProvider = ({ children }: PropTypes): ReactElement => {
  const { userData } = usePostAuth();
  const { user, error, fetchingStatus } = useGetUserByAddress({
    jwtToken: userData?.token,
  });

  const [crop] = useState({
    aspect: 1 / 1,
  });

  return (
    <AppContext.Provider
      value={{ user, error, fetchingStatus, crop, userData }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
