import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState, StoreExtra } from '../../../store';
import { UserInterface } from '../../../types/UserInterface';
import authService from '../services/authService';

interface AuthState {
  accessToken: string | null;
  user: UserInterface | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;
    },
  },
});

export const login = createAsyncThunk<UserInterface | null, { email: string; password: string }, { extra: StoreExtra }>(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue, extra }) => {
    try {
      const accessToken = await authService.login(email, password);

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
    const accessToken = await authService.register(firstName, email, password);

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
  }
});

export const { setAccessToken, setUser } = authSlice.actions;

export const isAuthenticatedSelector = (state: RootState) => !!state.auth.user;
export const userSelector = (state: RootState) => state.auth.user;

export default authSlice.reducer;
