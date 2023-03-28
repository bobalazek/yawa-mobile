import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { useAppDispatch } from '../../../hooks';
import { updateProfile } from '../state/profileSettingsReducer';

const ProfileSettingsScreen = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  return (
    <View style={styles.container}>
      <TextInput label="First name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
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
});

export default ProfileSettingsScreen;
