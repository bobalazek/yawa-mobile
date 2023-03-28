import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { useAppDispatch } from '../../../hooks';
import { changePassword } from '../state/passwordSettingsReducer';

const PasswordSettingsScreen = () => {
  const dispatch = useAppDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="New password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Repeat new password"
        value={newPasswordConfirm}
        onChangeText={setNewPasswordConfirm}
        secureTextEntry
        style={styles.input}
      />
      <Button
        onPress={() => {
          dispatch(changePassword({ currentPassword, newPassword, newPasswordConfirm }));
        }}
        mode="contained"
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 16,
  },
});

export default PasswordSettingsScreen;
