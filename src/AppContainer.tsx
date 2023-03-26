import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import store from './common/store';

export default function AppContainer() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
