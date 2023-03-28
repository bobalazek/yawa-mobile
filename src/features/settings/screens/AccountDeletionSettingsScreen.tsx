import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useAppDispatch } from '../../../hooks';
import { requestAccountDeletion } from '../state/accountDeletionSettingsReducer';

const AccountDeletionSettingsScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You sure you want to do this?</Text>
      <Button
        onPress={() => {
          dispatch(requestAccountDeletion());
        }}
        mode="contained"
      >
        Request account deletion
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    marginBottom: 16,
  },
});

export default AccountDeletionSettingsScreen;
