import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

import { KEYCHAIN_USERNAME_KEY } from '../../../constants';
import { RootState, StoreExtra } from '../../../store';
import authService from '../services/authService';
import { refreshUser, setAccessToken } from './authSlice';

interface RegisterAuthState {
  isLoading: boolean;
}

const initialState: RegisterAuthState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'registerAuth',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const register = createAsyncThunk<
  undefined,
  { firstName: string; email: string; password: string },
  { extra: StoreExtra }
>('registerAuth/register', async ({ firstName, email, password }, { dispatch, rejectWithValue, extra }) => {
  try {
    setIsLoading(true);

    const accessToken = await authService.register(firstName, email, password);

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
});

export const { setIsLoading } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.registerAuth.isLoading;

export default slice.reducer;
