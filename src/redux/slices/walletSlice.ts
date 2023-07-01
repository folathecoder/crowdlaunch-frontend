import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActiveWalletTypes {
  walletStatus: {
    isConnected: boolean;
    isDisconnected: boolean;
    isReconnecting: boolean;
    isConnecting: boolean;
  };
  walletName: string | null;
  walletAddress?: `0x${string}` | null;
  balance?: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  } | null;
  balanceStatus: {
    isLoading: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    isFetched: boolean;
  };
}

interface WalletState {
  activeWallet: ActiveWalletTypes;
}

const initialState: WalletState = {
  activeWallet: {
    walletStatus: {
      isConnected: false,
      isDisconnected: false,
      isReconnecting: false,
      isConnecting: false,
    },
    walletName: null,
    walletAddress: null,
    balance: null,
    balanceStatus: {
      isLoading: false,
      isFetching: false,
      isSuccess: false,
      isError: false,
      isFetched: false,
    },
  },
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setActiveWallet: (state, action: PayloadAction<ActiveWalletTypes>) => {
      state.activeWallet = action.payload;
    },
    clearActiveWallet: (state) => {
      state.activeWallet = initialState.activeWallet;
    },
  },
});

export const { setActiveWallet, clearActiveWallet } = walletSlice.actions;
export default walletSlice.reducer;
