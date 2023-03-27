import NetInfo from '@react-native-community/netinfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import LoginScreen from './features/auth/screens/LoginScreen';
import RegisterScreen from './features/auth/screens/RegisterScreen';
import { isAuthenticatedSelector } from './features/auth/state/authReducer';
import DashboardScreen from './features/home/screens/DashboardScreen';
import SettingsScreen from './features/settings/screens/SettingsScreen';
import { useAppDispatch, useAppSelector } from './hooks';
import { setConnectionType, setIsConnected } from './state/networkReducer';

export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Settings: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParams>();

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
      <RootStack.Navigator>
        {isAuthenticated ? (
          <RootStack.Group>
            <RootStack.Screen name="Dashboard" component={DashboardScreen} />
            <RootStack.Screen name="Settings" component={SettingsScreen} />
          </RootStack.Group>
        ) : (
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} options={{ title: 'Sign up' }} />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
      <Toast />
    </>
  );
};

export default App;
