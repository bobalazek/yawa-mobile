import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { NODE_ENV } from './constants';
import authReducer from './features/auth/state/authReducer';
import networkReducer from './state/networkReducer';

const reducer = combineReducers({
  auth: authReducer,
  network: networkReducer,
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
