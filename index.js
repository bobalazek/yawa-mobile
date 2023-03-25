/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {RecoilRoot} from 'recoil';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import App from './src/App';
import {name as appName} from './app.json';

const theme = {
  ...DefaultTheme,
};

export default function Main() {
  return (
    <RecoilRoot>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </RecoilRoot>
  );
}

AppRegistry.registerComponent(appName, () => Main);
