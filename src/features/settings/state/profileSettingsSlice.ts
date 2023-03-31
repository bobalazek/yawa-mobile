import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState, StoreExtra } from '../../../store';
import { refreshUser } from '../../auth/state/authSlice';
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

export const updateProfile = createAsyncThunk<
  undefined,
  { email: string; firstName: string; timezone: string; birthday: string | null },
  { extra: StoreExtra }
>(
  'settingsProfile/updateProfile',
  async ({ email, firstName, timezone, birthday }, { dispatch, rejectWithValue, extra }) => {
    try {
      dispatch(setIsLoading(true));

      const responseMessage = await settingsService.updateProfile(email, firstName, timezone, birthday);
      await dispatch(refreshUser());

      extra.showToast({
        type: 'success',
        text1: 'Update profile',
        text2: responseMessage,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      extra.showToast({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });

      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const resendNewEmailConfirmationEmail = createAsyncThunk<undefined, void, { extra: StoreExtra }>(
  'settingsProfile/resendNewEmailConfirmationEmail',
  async (_, { rejectWithValue, extra }) => {
    try {
      const responseMessage = await settingsService.resendNewEmailConfirmationEmail();

      extra.showToast({
        type: 'success',
        text1: 'Resend new email confirmation email',
        text2: responseMessage,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      extra.showToast({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });

      return rejectWithValue(errorMessage);
    }
  }
);

export const cancelNewEmail = createAsyncThunk<undefined, void, { extra: StoreExtra }>(
  'settingsProfile/resendNewEmailConfirmationEmail',
  async (_, { rejectWithValue, dispatch, extra }) => {
    try {
      const responseMessage = await settingsService.cancelNewEmail();
      await dispatch(refreshUser());

      extra.showToast({
        type: 'success',
        text1: 'Cancel new email',
        text2: responseMessage,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      extra.showToast({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });

      return rejectWithValue(errorMessage);
    }
  }
);

export const { setIsLoading } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.profileSettings.isLoading;

export default slice.reducer;
