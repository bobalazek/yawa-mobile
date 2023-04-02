import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

interface ButtonGroupOption {
  key: string;
  label: string;
}

interface ButtonGroupProps {
  value?: string;
  onChange: (newValue: string) => void;
  options: ButtonGroupOption[];
}

const ButtonGroup = ({ value, onChange, options }: ButtonGroupProps) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <Button
          compact
          key={option.key}
          mode={value === option.key ? 'contained' : 'outlined'}
          onPress={() => {
            onChange(option.key);
          }}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          {option.label}
        </Button>
      ))}
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

export default ButtonGroup;
