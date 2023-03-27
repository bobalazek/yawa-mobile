import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

import { KEYCHAIN_USERNAME_KEY } from '../../../constants';
import { RootState, StoreExtra } from '../../../store';
import { UserInterface } from '../../../types/UserInterface';
import authService from '../services/authService';
import { setAccessToken, setUser } from './authReducer';

interface AuthRegisterState {
  isLoading: boolean;
}

const initialState: AuthRegisterState = {
  isLoading: false,
};

const slice = createSlice({
  name: 'authRegister',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const register = createAsyncThunk<
  UserInterface | null,
  { firstName: string; email: string; password: string },
  { extra: StoreExtra }
>('authRegister/register', async ({ firstName, email, password }, { dispatch, rejectWithValue, extra }) => {
  try {
    setIsLoading(true);

    const accessToken = await authService.register(firstName, email, password);

    await Keychain.setGenericPassword(KEYCHAIN_USERNAME_KEY, accessToken);

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
    dispatch(setIsLoading(false));
  }
});

export const { setIsLoading } = slice.actions;

export const isLoadingSelector = (state: RootState) => state.authRegister.isLoading;

export default slice.reducer;