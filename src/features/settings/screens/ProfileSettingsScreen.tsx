import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { refreshUser, userSelector } from '../../auth/state/authReducer';
import { updateProfile } from '../state/profileSettingsReducer';

const ProfileSettingsScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [email, setEmail] = useState(user?.email ?? '');
  const [firstName, setFirstName] = useState(user?.firstName ?? '');

  useEffect(() => {
    // We do want to refresh the user, especially in the case the email was confirmed/changed
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <TextInput label="First name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      {user?.newEmail && (
        <Text style={styles.textLeft}>
          Your new email is set to <Text style={styles.textBold}>{user.newEmail}</Text>. Please confirm it with the
          email we sent to you.
        </Text>
      )}
      <Button
        onPress={() => {
          dispatch(updateProfile({ firstName, email }));
        }}
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
  textLeft: {
    textAlign: 'left',
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default ProfileSettingsScreen;
