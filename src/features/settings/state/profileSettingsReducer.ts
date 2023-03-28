import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState, StoreExtra } from '../../../store';
import settingsService from '../services/settingsService';

interface ProfileSettingsState {
  isLoading: boolean;
}

const initialState: ProfileSettingsState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'profileSettings',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const updateProfile = createAsyncThunk<undefined, { email: string; firstName: string }, { extra: StoreExtra }>(
  'settingsProfile/updateProfile',
  async ({ email, firstName }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setIsLoading(true));

      await settingsService.updateProfile(email, firstName);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const { setIsLoading } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.profileSettings.isLoading;

export default slice.reducer;
