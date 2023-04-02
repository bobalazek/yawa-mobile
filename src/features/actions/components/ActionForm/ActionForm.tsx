import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { ActionSchema, ActionType } from '../../schemas/ActionSchema';
import ActionFormGoalType from './ActionFormGoalType';

const ActionForm = ({ data }: { data?: ActionType }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ActionType>({
    resolver: zodResolver(ActionSchema),
    defaultValues: {
      name: data?.name ?? '',
      goalType: data?.goalType ?? 'binary',
      goalAmount: data?.goalAmount ?? 30,
      goalUnit: data?.goalUnit ?? 'min',
      goalIntervalUnit: data?.goalIntervalUnit ?? 'day',
    },
  });
  const goalType = useWatch({ control, name: 'goalType' });

  return (
    <View>
      {/* ========== Name ========== */}
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.buttonGroup}>
            <TextInput label="Name" value={value} onChangeText={onChange} onBlur={onBlur} />
          </View>
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
      {/* ========== Goal ========== */}
      <Text style={styles.heading}>Goal</Text>
      {/* ========== Goal - select ========== */}
      <Text>TODO: add goal selector modal</Text>
      {/* ========== Goal - Goal type ========== */}
      <Controller
        name="goalType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.buttonGroup}>
            <ActionFormGoalType value={value} onChange={onChange} />
          </View>
        )}
      />
      {errors.goalType && <Text style={styles.error}>{errors.goalType.message}</Text>}
      {goalType !== 'binary' && (
        <>
          {/* ========== Goal - Goal amount ========== */}
          <Controller
            name="goalAmount"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.buttonGroup}>
                <TextInput
                  label="Goal amount"
                  keyboardType="numeric"
                  value={value?.toString()}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </View>
            )}
          />
          {errors.goalAmount && <Text style={styles.error}>{errors.goalAmount.message}</Text>}
          {/* ========== Goal - Goal unit ========== */}
          <Controller
            name="goalUnit"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.buttonGroup}>
                <TextInput label="Goal unit" value={value} onChangeText={onChange} onBlur={onBlur} />
              </View>
            )}
          />
          {errors.goalUnit && <Text style={styles.error}>{errors.goalUnit.message}</Text>}
        </>
      )}
      {/* ========== Goal - Goal interval unit ========== */}
      <Controller
        name="goalIntervalUnit"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.buttonGroup}>
            <TextInput
              label="Goal interval unit"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          </View>
        )}
      />
      {errors.goalIntervalUnit && <Text style={styles.error}>{errors.goalIntervalUnit.message}</Text>}
      {/* ========== Save button ========== */}
      <Button
        mode="contained"
        onPress={handleSubmit((formData) => {
          console.log(formData);
        })}
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
  error: {
    color: 'red',
  },
});

export default ActionForm;
