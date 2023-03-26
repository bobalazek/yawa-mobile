import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { StoreExtra } from '../../common/store';
import { UserInterface } from '../../common/types/UserInterface';
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
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
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

export const { setAccessToken, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
