import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { ActionInterface } from '../../types/ActionInterface';
import ActionFormGoalType from './ActionFormGoalType';

const ActionForm = ({ data }: { data?: ActionInterface }) => {
  const [name, setName] = useState(data?.name ?? '');
  const [goalName, setGoalName] = useState(data?.goalType ?? '');
  const [goalType, setGoalType] = useState(data?.goalType ?? 'binary');

  return (
    <View>
      <View style={styles.buttonGroup}>
        <TextInput label="Name" value={name} onChangeText={setGoalName} />
      </View>
      <Text style={styles.heading}>Goal</Text>
      <View style={styles.buttonGroup}>
        <TextInput label="Goal name" value={goalName} onChangeText={setName} />
      </View>
      <View style={styles.buttonGroup}>
        <ActionFormGoalType value={goalType} onChange={setGoalType} />
      </View>
      <Button
        mode="contained"
        onPress={() => {
          console.log('Save');
        }}
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    marginBottom: 5,
  },
  buttonGroup: {
    marginBottom: 10,
  },
});

export default ActionForm;
