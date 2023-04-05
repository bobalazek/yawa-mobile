import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { NODE_ENV } from './constants';
import actionsReducer from './features/actions/state/actionsSlice';
import authReducer from './features/auth/state/authSlice';
import loginAuthReducer from './features/auth/state/loginAuthSlice';
import registerAuthReducer from './features/auth/state/registerAuthSlice';
import accountDeletionSettingsReducer from './features/settings/state/accountDeletionSettingsSlice';
import passwordSettingsReducer from './features/settings/state/passwordSettingsSlice';
import profileSettingsReducer from './features/settings/state/profileSettingsSlice';
import networkReducer from './state/networkSlice';
import { showNotification } from './utils/notifications';

const reducer = combineReducers({
  auth: authReducer,
  loginAuth: loginAuthReducer,
  registerAuth: registerAuthReducer,
  passwordSettings: passwordSettingsReducer,
  profileSettings: profileSettingsReducer,
  accountDeletionSettings: accountDeletionSettingsReducer,
  actions: actionsReducer,
  network: networkReducer,
});

const storeThunkExtraArgument = {
  showToast: showNotification,
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
