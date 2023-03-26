import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import AuthNavigator from './auth/navigators/AuthNavigator';
import { RootState } from './common/store';
import DashboardNavigator from './dashboard/navigators/DashboardNavigator';

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      {user ? <DashboardNavigator /> : <AuthNavigator />}
      <Toast />
    </>
  );
};

export default App;
