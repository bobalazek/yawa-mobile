import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const ActionFormGoalTypeInput = ({ value, onChange }: { value?: string; onChange: (newValue: string) => void }) => {
  return (
    <View style={styles.container}>
      <Button
        compact
        mode={value === 'binary' ? 'contained' : 'outlined'}
        onPress={() => {
          onChange('binary');
        }}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Yes/No
      </Button>
      <Button
        compact
        mode={value === 'measurable' ? 'contained' : 'outlined'}
        onPress={() => {
          onChange('measurable');
        }}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Measurable
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
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

export default ActionFormGoalTypeInput;
