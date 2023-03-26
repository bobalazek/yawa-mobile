import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import AppContainer from './src/AppContainer';

export default function Main() {
  return <AppContainer />;
}

AppRegistry.registerComponent(appName, () => Main);
