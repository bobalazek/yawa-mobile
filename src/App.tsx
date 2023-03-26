import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import AuthNavigator from './features/auth/navigators/AuthNavigator';
import { isAuthenticatedSelector } from './features/auth/state/authReducer';
import DashboardNavigator from './features/dashboard/navigators/DashboardNavigator';
import { useAppDispatch, useAppSelector } from './hooks';
import { setConnectionType, setIsConnected } from './state/networkReducer';

const App = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  useEffect(() => {
    (async () => {
      const state = await NetInfo.fetch();
      dispatch(setIsConnected(!!state.isConnected));
      dispatch(setConnectionType(state.type));
    })();

    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setIsConnected(!!state.isConnected));
      dispatch(setConnectionType(state.type));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      {isAuthenticated ? <DashboardNavigator /> : <AuthNavigator />}
      <Toast />
    </>
  );
};

export default App;
