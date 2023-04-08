import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import { AUTHORIZATION_HEADER_NAME } from '../../../constants';
import { RootState, StoreExtra } from '../../../store';
import { UserInterface } from '../../../types/UserInterface';
import authService from '../services/authService';
import { logout } from './loginAuthSlice';

interface AuthState {
  isReady: boolean;
  accessToken: string | null;
  user: UserInterface | null;
}

const initialState: AuthState = {
  isReady: false,
  accessToken: null,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;

      axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = state.accessToken || undefined;
    },
    setUser: (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;
    },
  },
});

export const init = createAsyncThunk<void, void, { extra: StoreExtra }>(
  'auth/init',
  async (_, { dispatch, rejectWithValue, extra }) => {
    dispatch(setIsReady(false));

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }

        return Promise.reject(error);
      }
    );

    try {
      const credentials = await Keychain.getGenericPassword();
      const accessToken = credentials ? credentials.password : null;
      if (accessToken) {
        dispatch(setAccessToken(accessToken));
        await dispatch(refreshUser());
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      extra.showToast({
        type: 'error',
        title: 'Error',
        description: errorMessage,
      });

      return rejectWithValue(errorMessage);
    } finally {
      dispatch(setIsReady(true));
    }
  }
);

export const refreshUser = createAsyncThunk<void, void, { extra: StoreExtra }>(
  'auth/refreshUser',
  async (_, { dispatch, rejectWithValue, extra }) => {
    try {
      const user = await authService.getProfile();
      if (user) {
        dispatch(setUser(user));
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';

      extra.showToast({
        type: 'error',
        title: 'Error',
        description: errorMessage,
      });

      return rejectWithValue(errorMessage);
    }
  }
);

export const { setIsReady, setAccessToken, setUser } = slice.actions;

export const isReadySelector = (state: RootState) => state.auth.isReady;
export const isAuthenticatedSelector = (state: RootState) => !!state.auth.user;
export const accessTokenSelector = (state: RootState) => !!state.auth.accessToken;
export const userSelector = (state: RootState) => state.auth.user;

export default slice.reducer;
