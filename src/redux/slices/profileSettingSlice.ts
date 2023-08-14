import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileSettingsType {
  toggleSettings: boolean;
}

const initialState: ProfileSettingsType = {
  toggleSettings: false,
};

const profileSettingsSlice = createSlice({
  name: 'profileSettings',
  initialState,
  reducers: {
    setToggleSettings: (state, action: PayloadAction<boolean>) => {
      state.toggleSettings = action.payload;
    },
    clearToggleSettings: (state) => {
      state.toggleSettings = initialState.toggleSettings;
    },
  },
});

export const { setToggleSettings, clearToggleSettings } =
  profileSettingsSlice.actions;
export default profileSettingsSlice.reducer;
