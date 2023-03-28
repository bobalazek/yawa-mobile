import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import Toast, { BaseToastProps, ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message';

import LoginScreen from './features/auth/screens/LoginScreen';
import RegisterScreen from './features/auth/screens/RegisterScreen';
import { init, isAuthenticatedSelector, isReadySelector } from './features/auth/state/authReducer';
import DashboardScreen from './features/dashboard/screens/DashboardScreen';
import NotificationsScreen from './features/notifications/screens/NotificationsScreen';
import PasswordSettingsScreen from './features/settings/screens/PasswordSettingsScreen';
import ProfileSettingsScreen from './features/settings/screens/ProfileSettingsScreen';
import SettingsScreen from './features/settings/screens/SettingsScreen';
import { useAppDispatch, useAppSelector } from './hooks';
import OfflineScreen from './screens/OfflineScreen';
import SplashScreen from './screens/SplashScreen';
import { attachEventListeners, detachEventListeners, isConnectedSelector } from './state/networkReducer';

// Very confusing that the number of lines needs to be set
const toastConfig = {
  success: (props: BaseToastProps) => <SuccessToast {...props} text2NumberOfLines={3} />,
  error: (props: BaseToastProps) => <ErrorToast {...props} text2NumberOfLines={3} />,
  info: (props: BaseToastProps) => <InfoToast {...props} text2NumberOfLines={3} />,
};

export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Settings: undefined;
  ProfileSettings: undefined;
  PasswordSettings: undefined;
  Notifications: undefined;
  Offline: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  const dispatch = useAppDispatch();
  const navigationRef = useNavigationContainerRef<RootStackParams>();
  const isReady = useAppSelector(isReadySelector);
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const isConnected = useAppSelector(isConnectedSelector);

  useEffect(() => {
    dispatch(init());
    dispatch(attachEventListeners());

    return () => {
      dispatch(detachEventListeners());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!navigationRef || !navigationRef.isReady()) {
      return;
    }

    const route = navigationRef.getCurrentRoute();
    if (route?.name !== 'Offline' && !isConnected) {
      navigationRef.navigate('Offline');
    } else if (route?.name === 'Offline' && isConnected) {
      navigationRef.goBack();
    }
  }, [navigationRef, isConnected]);

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        {isAuthenticated ? (
          <RootStack.Group>
            <RootStack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="Settings" component={SettingsScreen} />
            <RootStack.Screen
              name="ProfileSettings"
              component={ProfileSettingsScreen}
              options={{ title: 'Profile settings' }}
            />
            <RootStack.Screen
              name="PasswordSettings"
              component={PasswordSettingsScreen}
              options={{ title: 'Password settings' }}
            />
            <RootStack.Screen name="Notifications" component={NotificationsScreen} />
          </RootStack.Group>
        ) : (
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} options={{ title: 'Sign up' }} />
          </RootStack.Group>
        )}
        <RootStack.Screen
          name="Offline"
          component={OfflineScreen}
          options={{ presentation: 'modal', headerShown: false }}
        />
      </RootStack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default App;
