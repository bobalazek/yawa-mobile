import Toast from 'react-native-toast-message';

import AuthNavigator from './auth/navigators/AuthNavigator';
import { useAppSelector } from './common/hooks';
import { RootState } from './common/store';
import DashboardNavigator from './dashboard/navigators/DashboardNavigator';

const App = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <>
      {user ? <DashboardNavigator /> : <AuthNavigator />}
      <Toast />
    </>
  );
};

export default App;
