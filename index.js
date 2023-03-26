/**
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';

import { name as appName } from './app.json';
import App from './src/App';

const theme = {
  ...DefaultTheme,
};

export default function Main() {
  return (
    <RecoilRoot>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  );
}

AppRegistry.registerComponent(appName, () => Main);
