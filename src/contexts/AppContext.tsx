import React, { ReactElement, ReactNode } from 'react';
import useWallet from '@/wallet/useWallet';

export interface AppContextReturnTypes {
  // activeWallet: ActiveWalletTypes;
  // walletConnected: boolean;
  // disconnectWallet: () => void;
  // isDisconnected: boolean;
  // connectWallet: (options?: any) => Promise<void>;
}

interface PropTypes {
  children: ReactNode;
}

export const AppContext = React.createContext<AppContextReturnTypes | null>(
  null
);

const AppProvider = ({ children }: PropTypes): ReactElement => {
  // const {
  //   walletConnected,
  //   activeWallet,
  //   isDisconnected,
  //   disconnectWallet,
  //   connectWallet,
  // } = useWallet();

  const appContextValue: AppContextReturnTypes = {
    // walletConnected,
    // activeWallet,
    // isDisconnected,
    // disconnectWallet,
    // connectWallet,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
