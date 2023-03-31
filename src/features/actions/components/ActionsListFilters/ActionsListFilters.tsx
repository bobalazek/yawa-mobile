import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const filterButtons = [
  { label: 'Today', key: 'today' },
  { label: 'Tomorrow', key: 'tomorrow' },
  { label: 'This week', key: 'this_week' },
  { label: 'Next week', key: 'next_week' },
  { label: 'This month', key: 'this_month' },
  { label: 'All time', key: 'all_time' },
];

const ActionsListFilters = () => {
  const [activeTab, setActiveTab] = useState(filterButtons[0].key);

  return (
    <View style={styles.container}>
      {filterButtons.map(({ label, key }) => (
        <Button
          key={key}
          compact
          mode={activeTab === key ? 'contained' : 'outlined'}
          onPress={() => {
            setActiveTab(key);
          }}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          {label}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 2,
    borderRadius: 16,
    verticalAlign: 'middle',
  },
  buttonContent: {
    height: 24,
  },
  buttonLabel: {
    fontSize: 10,
    height: 20,
  },
});

export default ActionsListFilters;
