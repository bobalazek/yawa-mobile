import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import store from './store';

const queryClient = new QueryClient();

export default function AppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PaperProvider theme={DefaultTheme}>
          <App />
        </PaperProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
