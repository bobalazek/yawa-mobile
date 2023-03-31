import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Text } from 'react-native-paper';

import { RootStackParams } from '../../../App';
import { useAppSelector } from '../../../hooks';
import { userSelector } from '../../auth/state/authReducer';

type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const user = useAppSelector(userSelector);

  return (
    <View>
      <Appbar.Header style={styles.appbarHeader}>
        {user?.avatarUrl && (
          <Avatar.Image source={{ uri: user.avatarUrl }} style={styles.appBarHeaderAvatar} size={48} />
        )}
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
      <View style={styles.content}>
        <Button
          onPress={() => {
            navigation.navigate('Actions');
          }}
        >
          View actions
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appbarHeader: {
    backgroundColor: '#ffffff',
  },
  appBarHeaderAvatar: {
    marginLeft: 5,
    marginRight: 10,
  },
  appbarContentTitle: {
    fontSize: 16,
  },
  appbarContentTitleName: {
    fontWeight: 'bold',
  },
  content: {
    paddingTop: 10,
  },
});

export default HomeScreen;
