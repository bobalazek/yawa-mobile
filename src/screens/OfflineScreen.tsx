import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OfflineScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Oh blimey. Our programmers haven't yet managed to implement offline mode? Yikes. Don't worry there. We'll
        replace them with ChatGPT very soon anyway.
      </Text>
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
});

export default OfflineScreen;
