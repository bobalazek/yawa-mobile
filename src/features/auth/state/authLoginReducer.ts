import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

import { KEYCHAIN_USERNAME_KEY } from '../../../constants';
import { RootState, StoreExtra } from '../../../store';
import authService from '../services/authService';
import { refreshUser, setAccessToken, setUser } from './authReducer';

interface AuthLoginState {
  isLoading: boolean;
}

const initialState: AuthLoginState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'authLogin',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const login = createAsyncThunk<undefined, { email: string; password: string }, { extra: StoreExtra }>(
  'authLogin/login',
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

export const logout = createAsyncThunk<undefined, undefined, { extra: StoreExtra }>(
  'authLogin/logout',
  async (_, { dispatch, rejectWithValue, getState, extra }) => {
    try {
      const state = getState() as RootState;
      if (state.auth.accessToken) {
        try {
          await authService.logout(state.auth.accessToken);
        } catch (err) {
          // Not a big deal if logout fails
        }
      }

      await Keychain.resetGenericPassword();

      dispatch(setAccessToken(null));
      dispatch(setUser(null));

      extra.showToast({
        type: 'success',
        text1: 'Logout',
        text2: 'You have successfully logged out',
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      extra.showToast({
        type: 'error',
        text1: 'Error',
        text2: err.message,
      });

      return rejectWithValue(err.message);
    }
  }
);

export const { setIsLoading } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.authLogin.isLoading;

export default slice.reducer;
