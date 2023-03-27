import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

import { RootState, StoreExtra } from '../../../store';
import { UserInterface } from '../../../types/UserInterface';
import authService from '../services/authService';

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
    },
    setUser: (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;
    },
  },
});

export const init = createAsyncThunk<void, void, { extra: StoreExtra }>(
  'auth/init',
  async (_, { dispatch, rejectWithValue, extra }) => {
    try {
      dispatch(setIsReady(false));

      const credentials = await Keychain.getGenericPassword();
      const accessToken = credentials ? credentials.password : null;
      if (accessToken) {
        dispatch(setAccessToken(accessToken));

        const user = await authService.getProfile(accessToken);
        if (user) {
          dispatch(setUser(user));
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      extra.showToast({
        type: 'error',
        text1: 'Error',
        text2: err.message,
      });

      return rejectWithValue(err.message);
    } finally {
      dispatch(setIsReady(true));
    }
  }
);

export const refreshUser = createAsyncThunk<void, void, { extra: StoreExtra }>(
  'auth/refreshUser',
  async (_, { dispatch, rejectWithValue, getState, extra }) => {
    try {
      const state = getState() as RootState;
      if (state.auth.accessToken) {
        const user = await authService.getProfile(state.auth.accessToken);
        if (user) {
          dispatch(setUser(user));
        }
      }
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

export const { setIsReady, setAccessToken, setUser } = slice.actions;

export const isReadySelector = (state: RootState) => state.auth.isReady;
export const isAuthenticatedSelector = (state: RootState) => !!state.auth.user;
export const userSelector = (state: RootState) => state.auth.user;

export default slice.reducer;
