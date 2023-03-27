import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const ProfileSettingsScreen = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  return (
    <View style={styles.container}>
      <TextInput label="First name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <Button
        onPress={() => {
          // TODO
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
