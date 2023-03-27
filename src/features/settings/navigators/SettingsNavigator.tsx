import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/SettingsScreen';

export type SettingsStackParams = {
  Settings: undefined;
};

export const SettingsStack = createNativeStackNavigator<SettingsStackParams>();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
