import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/DashboardScreen';

export type DashboardStackParams = {
  Dashboard: undefined;
};

export const DashboardStack = createNativeStackNavigator<DashboardStackParams>();

const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator initialRouteName="Dashboard">
      <DashboardStack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
    </DashboardStack.Navigator>
  );
};

export default DashboardNavigator;
