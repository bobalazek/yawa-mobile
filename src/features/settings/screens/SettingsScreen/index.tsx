import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Divider, List, useTheme } from 'react-native-paper';

import { RootStackParams } from '../../../../App';
import { useAppDispatch } from '../../../../hooks';
import useConfirmationDialog from '../../../../hooks/useConfirmationDialog';
import { logout } from '../../../auth/state/authReducer';

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
        <List.Item title="Change password" />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Item
          title="Logout"
          titleStyle={[styles.logoutListItem, { borderColor: theme.colors.error, color: theme.colors.error }]}
          onPress={() => {
            showConfirmationDialog(() => {
              dispatch(logout());
            });
          }}
        />
      </List.Section>
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
  logoutListItem: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
});

export default SettingsScreen;