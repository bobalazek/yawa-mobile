import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, Title } from 'react-native-paper';

import { RootStackParams } from '../../../../App';
import { WEB_URL } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { isLoginLoadingSelector, login } from '../../state/authReducer';

type Props = NativeStackScreenProps<RootStackParams, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoginLoading = useAppSelector(isLoginLoadingSelector);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome to YAWA</Title>
      <Title style={styles.subtitle}>Login</Title>
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button
        mode="contained"
        onPress={() => {
          dispatch(login({ email, password }));
        }}
        style={styles.button}
        loading={isLoginLoading}
        disabled={isLoginLoading}
      >
        Login
      </Button>
      <Text
        style={styles.forgotenPasswordText}
        onPress={async () => {
          await Linking.openURL(`${WEB_URL}/auth/password-reset`);
        }}
      >
        Forgot password?
      </Text>
      <Text style={styles.noAccountYetText}>No account yet?</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          navigation.navigate('Register');
        }}
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
  forgotenPasswordText: {
    marginTop: 30,
    color: 'blue',
    alignSelf: 'flex-start',
  },
  noAccountYetText: {
    marginTop: 30,
    marginBottom: 10,
  },
});

export default LoginScreen;
