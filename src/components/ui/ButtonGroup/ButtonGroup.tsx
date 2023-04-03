import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface ButtonGroupOption {
  key: string;
  label: string;
}

interface ButtonGroupProps {
  label?: string;
  value?: string;
  onChange: (newValue: string) => void;
  options: ButtonGroupOption[];
}

const ButtonGroup = ({ label, value, onChange, options }: ButtonGroupProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.optionsContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 12,
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
