import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { useAppSelector } from '../../../../hooks';
import { userSelector } from '../../../auth/state/authReducer';

const DashboardScreen = () => {
  const user = useAppSelector(userSelector);

  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title={
            <Text style={styles.appbarTitle}>
              Hello <Text style={styles.appbarTitleName}>{user?.firstName}</Text>
            </Text>
          }
        />
        <Appbar.Action icon="bell" onPress={() => console.log('Pressed notification icon')} />
        <Appbar.Action icon="cog" onPress={() => console.log('Pressed settings icon')} />
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#fff',
  },
  appbarTitle: {
    fontSize: 16,
  },
  appbarTitleName: {
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
