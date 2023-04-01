import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading</Text>
      <ActivityIndicator animating={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default SplashScreen;
