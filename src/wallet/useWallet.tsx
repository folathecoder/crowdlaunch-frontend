import { useState, useEffect } from 'react';
import {
  useAccount,
  useConnect,
  useEnsName,
  useDisconnect,
  useBalance,
} from 'wagmi';
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

  const { address, isConnected, isDisconnected, isReconnecting, isConnecting } =
    useAccount();

  const {
    data: balance,
    isLoading: balanceIsLoading,
    isFetching: balanceIsFetching,
    isSuccess: balanceIsSuccess,
    isError: balanceIsError,
    isFetched: balanceIsFetched,
  } = useBalance({
    address: '0x1d3d3fbfa8a6d1a24b651f8cac6859d4589c9d49',
  });

  const { disconnect: disconnectWallet } = useDisconnect();

  useEffect(() => {
    const walletData: ActiveWalletTypes = {
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
