import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import { NODE_ENV } from './constants';
import authLoginReducer from './features/auth/state/authLoginReducer';
import authReducer from './features/auth/state/authReducer';
import authRegisterReducer from './features/auth/state/authRegisterReducer';
import passwordSettingsReducer from './features/settings/state/passwordSettingsReducer';
import profileSettingsReducer from './features/settings/state/profileSettingsReducer';
import networkReducer from './state/networkReducer';

const reducer = combineReducers({
  auth: authReducer,
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  passwordSettings: passwordSettingsReducer,
  profileSettings: profileSettingsReducer,
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
