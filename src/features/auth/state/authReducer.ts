import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

import { RootState, StoreExtra } from '../../../store';
import { UserInterface } from '../../../types/UserInterface';
import authService from '../services/authService';

interface AuthState {
  isReady: boolean;
  accessToken: string | null;
  user: UserInterface | null;
  isLoginLoading: boolean;
  isRegisterLoading: boolean;
}

const initialState: AuthState = {
  isReady: false,
  accessToken: null,
  user: null,
  isLoginLoading: false,
  isRegisterLoading: false,
};

const authSlice = createSlice({
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
    setIsLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoginLoading = action.payload;
    },
    setIsRegisterLoading: (state, action: PayloadAction<boolean>) => {
      state.isRegisterLoading = action.payload;
    },
  },
});

export const init = createAsyncThunk<void, void, { extra: StoreExtra }>(
  'auth/refreshUser',
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

export const login = createAsyncThunk<UserInterface | null, { email: string; password: string }, { extra: StoreExtra }>(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue, extra }) => {
    try {
      dispatch(setIsLoginLoading(true));

      const accessToken = await authService.login(email, password);

      await Keychain.setGenericPassword('access_token', accessToken);

      dispatch(setAccessToken(accessToken));

      const user = await authService.getProfile(accessToken);
      if (user) {
        dispatch(setUser(user));
      }

      extra.showToast({
        type: 'success',
        text1: 'Login',
        text2: 'You have successfully logged in',
      });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      extra.showToast({
        type: 'error',
        text1: 'Error',
        text2: err.message,
      });

      return rejectWithValue(err.message);
    } finally {
      dispatch(setIsLoginLoading(false));
    }
  }
);

export const logout = createAsyncThunk<undefined, undefined, { extra: StoreExtra }>(
  'auth/logout',
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

export const register = createAsyncThunk<
  UserInterface | null,
  { firstName: string; email: string; password: string },
  { extra: StoreExtra }
>('auth/register', async ({ firstName, email, password }, { dispatch, rejectWithValue, extra }) => {
  try {
    setIsRegisterLoading(true);

    const accessToken = await authService.register(firstName, email, password);

    await Keychain.setGenericPassword('access_token', accessToken);

    dispatch(setAccessToken(accessToken));

    const user = await authService.getProfile(accessToken);
    if (user) {
      dispatch(setUser(user));
    }

    extra.showToast({
      type: 'success',
      text1: 'Login',
      text2: 'You have successfully logged in',
    });

    return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    extra.showToast({
      type: 'error',
      text1: 'Error',
      text2: err.message,
    });

    return rejectWithValue(err.message);
  } finally {
    dispatch(setIsRegisterLoading(false));
  }
});

export const { setIsReady, setAccessToken, setUser, setIsLoginLoading, setIsRegisterLoading } = authSlice.actions;

export const isReadySelector = (state: RootState) => state.auth.isReady;
export const isAuthenticatedSelector = (state: RootState) => !!state.auth.user;
export const isLoginLoadingSelector = (state: RootState) => state.auth.isLoginLoading;
export const isRegisterLoadingSelector = (state: RootState) => state.auth.isRegisterLoading;
export const userSelector = (state: RootState) => state.auth.user;

export default authSlice.reducer;
