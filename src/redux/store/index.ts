import { configureStore } from '@reduxjs/toolkit';
import walletReducer from '../slices/walletSlice';
import profileSettingReducer from '../slices/profileSettingSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    profileSettings: profileSettingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
