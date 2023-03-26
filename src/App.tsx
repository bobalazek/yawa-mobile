/**
 * @format
 */
import Toast from 'react-native-toast-message';

import AuthNavigationStack from './auth/navigation/AuthNavigationStack';

const App = () => {
  return (
    <>
      <AuthNavigationStack />
      <Toast />
    </>
  );
};

export default App;
