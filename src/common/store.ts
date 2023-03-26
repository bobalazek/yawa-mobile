import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import authSlice from '../auth/state/authState';
import { NODE_ENV } from './constants';

const reducer = combineReducers({
  auth: authSlice,
});

const storeThunkExtraArgument = {
  showToast: Toast.show,
};

export const store = configureStore({
  reducer,
  devTools: NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: storeThunkExtraArgument,
      },
    });
  },
});

export type StoreExtra = typeof storeThunkExtraArgument;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
