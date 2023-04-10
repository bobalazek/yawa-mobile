import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

import { RootStackParams } from '../../../App';
import ActionsList from '../components/ActionsList/ActionsList';
import ActionsListFilters from '../components/ActionsListFilters/ActionsListFilters';

type Props = NativeStackScreenProps<RootStackParams, 'Actions'>;

const ActionsScreen = ({ navigation }: Props) => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView bounces={false} style={styles.filtersContainer}>
          <ActionsListFilters />
        </ScrollView>
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
  filtersContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    width: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ActionsScreen;
