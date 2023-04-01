import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

import { RootStackParams } from '../../../App';
import ActionsList from '../components/ActionsList/ActionsList';
import ActionsListFilters from '../components/ActionsListFilters/ActionsListFilters';

type Props = NativeStackScreenProps<RootStackParams, 'Actions'>;

const ActionsScreen = ({ navigation }: Props) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.filtersWrapper}>
          <ActionsListFilters />
        </View>
        <ActionsList />
      </View>
      <FAB
        style={styles.fab}
        size="small"
        icon="plus"
        onPress={() => {
          navigation.navigate('NewAction');
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  filtersWrapper: {
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ActionsScreen;
