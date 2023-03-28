import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading</Text>
      <ActivityIndicator style={styles.indicator} animating={true} color={MD2Colors.red800} />
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
  },
  indicator: {
    marginTop: 24,
  },
});

export default SplashScreen;
