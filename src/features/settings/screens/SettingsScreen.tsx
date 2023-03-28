import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Divider, List, useTheme } from 'react-native-paper';

import { RootStackParams } from '../../../App';
import { WEB_URL } from '../../../constants';
import { useAppDispatch } from '../../../hooks';
import useConfirmationDialog from '../../../hooks/useConfirmationDialog';
import { logout } from '../../auth/state/loginAuthReducer';

type Props = NativeStackScreenProps<RootStackParams, 'Settings'>;

const SettingsScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [showConfirmationDialog, ConfirmationDialog] = useConfirmationDialog();

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Edit profile"
          onPress={() => {
            navigation.navigate('ProfileSettings');
          }}
        />
        <List.Item
          title="Change password"
          onPress={() => {
            navigation.navigate('PasswordSettings');
          }}
        />
        <List.Item
          title="Account deletion"
          onPress={() => {
            navigation.navigate('AccountDeletionSettings');
          }}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>Legal</List.Subheader>
        <List.Item
          title="Terms of service"
          onPress={async () => {
            await Linking.openURL(`${WEB_URL}/terms-of-service`);
          }}
        />
        <List.Item
          title="Privacy policy"
          onPress={async () => {
            await Linking.openURL(`${WEB_URL}/privacy-policy`);
          }}
        />
      </List.Section>
      <Button
        onPress={() => {
          showConfirmationDialog(() => {
            dispatch(logout());
          });
        }}
        mode="contained"
        buttonColor={theme.colors.error}
        style={styles.logoutButton}
      >
        Logout
      </Button>
      <ConfirmationDialog title="Confirm logout" message="Are you sure you want to logout?" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    margin: 20,
  },
});

export default SettingsScreen;
