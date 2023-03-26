import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Dashboard</Title>
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
});

export default DashboardScreen;
