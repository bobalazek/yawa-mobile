import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import { NODE_ENV } from './constants';
import authLoginReducer from './features/auth/state/authLoginReducer';
import authReducer from './features/auth/state/authReducer';
import authRegisterReducer from './features/auth/state/authRegisterReducer';
import settingsPasswordReducer from './features/settings/state/settingsPasswordReducer';
import settingsProfileReducer from './features/settings/state/settingsProfileReducer';
import networkReducer from './state/networkReducer';

const reducer = combineReducers({
  auth: authReducer,
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  settingsPassword: settingsPasswordReducer,
  settingsProfile: settingsProfileReducer,
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
