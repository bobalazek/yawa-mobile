import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState, StoreExtra } from '../../../store';
import settingsService from '../services/settingsService';

interface PasswordSettingsState {
  isLoading: boolean;
}

const initialState: PasswordSettingsState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'passwordSettings',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const changePassword = createAsyncThunk<
  undefined,
  { currentPassword: string; newPassword: string; newPasswordConfirm: string },
  { extra: StoreExtra }
>(
  'passwordSettings/changePassword',
  async ({ currentPassword, newPassword, newPasswordConfirm }, { dispatch, rejectWithValue, extra }) => {
    try {
      dispatch(setIsLoading(true));

      const responseMessage = await settingsService.changePassword(currentPassword, newPassword, newPasswordConfirm);

      extra.showToast({
        type: 'success',
        title: 'Change password',
        description: responseMessage,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      extra.showToast({
        type: 'error',
        title: 'Error',
        description: errorMessage,
      });

      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const { setIsLoading } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.passwordSettings.isLoading;

export default slice.reducer;
