import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

function LoadingScreen(): JSX.Element {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Loading</Text>
      <ActivityIndicator style={styles.indicator} animating={true} color={MD2Colors.red800} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
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

export default LoadingScreen;
