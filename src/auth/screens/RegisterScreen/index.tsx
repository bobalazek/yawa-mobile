//import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

//import { AuthStackParams } from '../../navigation/AuthNavigationStack';
import authService from '../../services/authService';

//type Props = NativeStackScreenProps<AuthStackParams, 'Register'>;

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegisterPress = async () => {
    try {
      await authService.register(firstName, email, password);

      Toast.show({
        type: 'success',
        text1: 'Login',
        text2: 'You have successfully logged in',
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome to YAWA</Title>
      <Title style={styles.subtitle}>Register</Title>
      <TextInput label="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={onRegisterPress} style={styles.button}>
        Register
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
