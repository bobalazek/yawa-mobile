import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import AuthNavigator from './auth/navigators/AuthNavigator';
import { isAuthenticatedSelector } from './auth/state/authReducer';
import { useAppDispatch, useAppSelector } from './common/hooks';
import { setConnectionType, setIsConnected } from './common/state/networkReducer';
import DashboardNavigator from './dashboard/navigators/DashboardNavigator';

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
