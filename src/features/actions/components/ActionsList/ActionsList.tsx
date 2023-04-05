import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { entriesSelector, fetchEntries, isLoadingSelector } from '../../state/actionsSlice';
import Action from '../Action/Action';

const ActionsList = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const entries = useAppSelector(entriesSelector);

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.textCenter}>No actions found yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {entries.map((action) => {
        return <Action key={action.id} data={action} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
  },
  loadingContainer: {
    padding: 24,
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default ActionsList;
