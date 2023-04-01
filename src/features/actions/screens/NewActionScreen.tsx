import { StyleSheet, View } from 'react-native';

import ActionForm from '../components/ActionForm/ActionForm';

const NewActionScreen = () => {
  return (
    <View style={styles.container}>
      <ActionForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default NewActionScreen;
