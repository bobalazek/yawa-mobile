import { StyleSheet, View } from 'react-native';

import ActionsList from '../components/ActionsList/ActionsList';
import ActionsListFilters from '../components/ActionsListFilters/ActionsListFilters';

const ActionsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <ActionsListFilters />
      </View>
      <ActionsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  filters: {
    marginBottom: 20,
  },
});

export default ActionsScreen;
