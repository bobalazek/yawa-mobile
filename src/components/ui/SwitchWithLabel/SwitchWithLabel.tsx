import { StyleSheet, View } from 'react-native';
import { Switch, SwitchProps, Text } from 'react-native-paper';

interface SwitchPropsWithLabel extends SwitchProps {
  label: string;
}

const SwitchWithLabel = (props: SwitchPropsWithLabel) => {
  const { label, ...switchProps } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch {...switchProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginRight: 8,
  },
});

export default SwitchWithLabel;
