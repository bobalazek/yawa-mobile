import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

import { KEYCHAIN_USERNAME_KEY } from '../../../constants';
import { RootState, StoreExtra } from '../../../store';
import authService from '../services/authService';
import { refreshUser, setAccessToken, setUser } from './authReducer';

interface LoginAuthState {
  isLoading: boolean;
}

const initialState: LoginAuthState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'loginAuth',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const login = createAsyncThunk<undefined, { email: string; password: string }, { extra: StoreExtra }>(
  'loginAuth/login',
  async ({ email, password }, { dispatch, rejectWithValue, extra }) => {
    try {
      dispatch(setIsLoading(true));

      const accessToken = await authService.login(email, password);

      await Keychain.setGenericPassword(KEYCHAIN_USERNAME_KEY, accessToken);

      dispatch(setAccessToken(accessToken));
      await dispatch(refreshUser());

      extra.showToast({
        type: 'success',
        text1: 'Login',
        text2: 'You have successfully logged in',
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

export const logout = createAsyncThunk<undefined, undefined, { extra: StoreExtra }>(
  'loginAuth/logout',
  async (_, { dispatch, rejectWithValue, extra }) => {
    try {
      try {
        await authService.logout();
      } catch (err) {
        // Not a big deal if logout fails
      }

      await Keychain.resetGenericPassword();

      dispatch(setAccessToken(null));
      dispatch(setUser(null));

      extra.showToast({
        type: 'success',
        text1: 'Logout',
        text2: 'You have successfully logged out',
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

export const isLoadingSelector = (state: RootState) => state.loginAuth.isLoading;

export default slice.reducer;
