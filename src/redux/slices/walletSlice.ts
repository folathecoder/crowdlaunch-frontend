import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActiveWalletTypes {
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
      state.activeWallet = {
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
      };
    },
  },
});

export const { setActiveWallet, clearActiveWallet } = walletSlice.actions;
export default walletSlice.reducer;
