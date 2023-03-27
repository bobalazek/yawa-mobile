import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState, StoreExtra } from '../../../store';
import settingsService from '../services/settingsService';

interface SettingsProfileState {
  isLoading: boolean;
}

const initialState: SettingsProfileState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'settingsProfile',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const updateProfile = createAsyncThunk<undefined, { email: string; firstName: string }, { extra: StoreExtra }>(
  'settingsProfile/updateProfile',
  async ({ email, firstName }, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setIsLoading(true));

      const state = getState() as RootState;
      await settingsService.updateProfile(state.auth.accessToken ?? '', email, firstName);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const { setIsLoading } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.settingsProfile.isLoading;

export default slice.reducer;
