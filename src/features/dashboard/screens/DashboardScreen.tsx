import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { RootStackParams } from '../../../App';
import { useAppSelector } from '../../../hooks';
import { userSelector } from '../../auth/state/authReducer';

type Props = NativeStackScreenProps<RootStackParams, 'Dashboard'>;

const DashboardScreen = ({ navigation }: Props) => {
  const user = useAppSelector(userSelector);

  return (
    <View>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Content
          title={
            <Text style={styles.appbarContentTitle}>
              Hello <Text style={styles.appbarContentTitleName}>{user?.firstName}</Text>
            </Text>
          }
        />
        <Appbar.Action
          icon="bell"
          onPress={() => {
            navigation.navigate('Notifications');
          }}
        />
        <Appbar.Action
          icon="cog"
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  appbarHeader: {
    backgroundColor: '#ffffff',
  },
  appbarContentTitle: {
    fontSize: 16,
  },
  appbarContentTitleName: {
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
