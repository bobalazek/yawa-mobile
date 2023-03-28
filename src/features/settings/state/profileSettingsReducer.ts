import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState, StoreExtra } from '../../../store';
import { refreshUser } from '../../auth/state/authReducer';
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
  async ({ email, firstName }, { dispatch, rejectWithValue, extra }) => {
    try {
      dispatch(setIsLoading(true));

      const responseMessage = await settingsService.updateProfile(email, firstName);
      await dispatch(refreshUser());

      extra.showToast({
        type: 'success',
        text1: 'Update profile',
        text2: responseMessage,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      extra.showToast({
        type: 'error',
        text1: 'Error',
        text2: err.message,
      });

      return rejectWithValue(err.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const { setIsLoading } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.profileSettings.isLoading;

export default slice.reducer;