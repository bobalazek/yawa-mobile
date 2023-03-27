import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsNavigator from '../../settings/navigators/SettingsNavigator';
import DashboardScreen from '../screens/DashboardScreen';

export type HomeStackParams = {
  Dashboard: undefined;
  Settings: undefined;
};

export const DashboardStack = createNativeStackNavigator<HomeStackParams>();

const HomeNavigator = () => {
  return (
    <DashboardStack.Navigator initialRouteName="Dashboard">
      <DashboardStack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <DashboardStack.Screen name="Settings" component={SettingsNavigator} />
    </DashboardStack.Navigator>
  );
};

export default HomeNavigator;
