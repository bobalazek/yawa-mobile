import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState, StoreExtra } from '../../../store';
import { logout } from '../../auth/state/loginAuthSlice';
import settingsService from '../services/settingsService';

interface AccountDeletionSettingsState {
  isLoading: boolean;
}

const initialState: AccountDeletionSettingsState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'accountDeletionSettings',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const requestAccountDeletion = createAsyncThunk<undefined, undefined, { extra: StoreExtra }>(
  'accountDeletionSettings/requestAccountDeletion',
  async (_, { dispatch, rejectWithValue, extra }) => {
    try {
      dispatch(setIsLoading(true));

      const responseMessage = await settingsService.requestAccountDeletion();

      dispatch(logout());

      extra.showToast({
        type: 'success',
        title: 'Account deletion',
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

export const isLoadingSelector = (state: RootState) => state.accountDeletionSettings.isLoading;

export default slice.reducer;
