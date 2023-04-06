import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ActionType } from '../../schemas/ActionSchema';

const Action = ({ data }: { data: ActionType }) => {
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    width: '100%',
    borderRadius: 10,
  },
});

export default Action;
