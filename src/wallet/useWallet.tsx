import { useEffect } from 'react';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import {
  setActiveWallet,
  clearActiveWallet,
  type ActiveWalletTypes,
} from '@/redux/slices/walletSlice';

const useWallet = () => {
  const dispatch = useDispatch();
  const wallet = useSelector((state: RootState) => state.wallet.activeWallet);

  const {
    address,
    isConnected: walletIsConnected,
    isDisconnected: walletIsDisconnected,
    isReconnecting: walletIsReconnecting,
    isConnecting: walletIsConnecting,
  } = useAccount();

  const {
    data: balance,
    isLoading: balanceIsLoading,
    isFetching: balanceIsFetching,
    isSuccess: balanceIsSuccess,
    isError: balanceIsError,
    isFetched: balanceIsFetched,
  } = useBalance({
    address: address,
  });

  const { disconnect: disconnectWallet } = useDisconnect();

  useEffect(() => {
    const walletData: ActiveWalletTypes = {
      walletStatus: {
        isConnected: walletIsConnected,
        isDisconnected: walletIsDisconnected,
        isReconnecting: walletIsReconnecting,
        isConnecting: walletIsConnecting,
      },
      walletName: 'My Wallet',
      walletAddress: address,
      balance: balance,
      balanceStatus: {
        isLoading: balanceIsLoading,
        isFetching: balanceIsFetching,
        isSuccess: balanceIsSuccess,
        isError: balanceIsError,
        isFetched: balanceIsFetched,
      },
    };
    dispatch(setActiveWallet(walletData));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    balance,
    balanceIsError,
    balanceIsFetched,
    balanceIsFetching,
    balanceIsLoading,
    balanceIsSuccess,
    walletIsConnected,
    walletIsConnecting,
    walletIsDisconnected,
    walletIsReconnecting,
  ]);

  const handleClearWallet = () => {
    dispatch(clearActiveWallet());
  };

  console.log('my wallet', wallet);

  return {
    wallet,
    handleClearWallet,
    disconnectWallet,
  };
};

export default useWallet;
