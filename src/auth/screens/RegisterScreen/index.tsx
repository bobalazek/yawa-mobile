import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';

import { useAppDispatch } from '../../../common/hooks';
import { register } from '../../state/authReducer';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Title style={styles.title}>YAWA</Title>
      <Title style={styles.subtitle}>Sign up</Title>
      <TextInput label="First name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button
        mode="contained"
        onPress={() => {
          dispatch(register({ firstName, email, password }));
        }}
        style={styles.button}
      >
        Sign up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    width: '100%',
  },
});

export default RegisterScreen;
