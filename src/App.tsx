/**
 * @format
 */
import React from 'react';
import Toast from 'react-native-toast-message';

import LoginScreen from './auth/screens/LoginScreen';

function App(): JSX.Element {
  return (
    <>
      <LoginScreen />
      <Toast />
    </>
  );
}

export default App;
