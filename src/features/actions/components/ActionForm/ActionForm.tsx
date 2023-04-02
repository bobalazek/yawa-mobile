import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { ActionSchema, ActionType } from '../../schemas/ActionSchema';
import ActionFromGoalIntervalUnitCustomDialog from './ActionFormGoalIntervalUnitCustomDialog';
import ActionFormGoalTypeInput from './ActionFormGoalTypeInput';

const CUSTOM_KEY = '__custom';

const ActionForm = ({ data }: { data?: ActionType }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ActionType>({
    resolver: zodResolver(ActionSchema),
    defaultValues: {
      name: data?.name ?? '',
      goalType: data?.goalType ?? 'binary',
      goalAmount: data?.goalAmount ?? 30,
      goalUnit: data?.goalUnit ?? 'minutes',
      goalIntervalUnit: data?.goalIntervalUnit ?? 'day',
    },
  });
  const goalType = useWatch({ control, name: 'goalType' });
  const goalUnit = useWatch({ control, name: 'goalUnit' });
  const [goalUnitVisible, setGoalUnitVisible] = useState(false);
  const [goalUnitCustom, setGoalUnitCustom] = useState('');

  useEffect(() => {
    if (goalUnit === CUSTOM_KEY && !goalUnitVisible) {
      setGoalUnitVisible(true);
    }
  }, [goalUnit, goalUnitVisible]);

  return (
    <View>
      <View style={styles.inputGroup}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput label="Name" value={value} onChangeText={onChange} onBlur={onBlur} />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
      </View>
      <Text style={styles.heading}>Goal</Text>
      <Text style={styles.inputGroup}>TODO: add goal selector modal</Text>
      <View style={styles.inputGroup}>
        <Controller
          name="goalType"
          control={control}
          render={({ field: { onChange, value } }) => <ActionFormGoalTypeInput value={value} onChange={onChange} />}
        />
        {errors.goalType && <Text style={styles.errorText}>{errors.goalType.message}</Text>}
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.goalIntervalContainer}>
          {goalType !== 'binary' && (
            <>
              <Controller
                name="goalAmount"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput keyboardType="numeric" value={value?.toString()} onChangeText={onChange} onBlur={onBlur} />
                )}
              />
              <Controller
                name="goalUnit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
                    <Picker.Item label="minutes" value="minutes" />
                    <Picker.Item label="deciliters" value="deciliters" />
                    <Picker.Item label="pages" value="pages" />
                    <Picker.Item
                      label={goalUnitCustom ? `${goalUnitCustom} (edit custom)` : 'custom'}
                      value={CUSTOM_KEY}
                    />
                  </Picker>
                )}
              />
              <Text style={styles.perText}>per</Text>
            </>
          )}
          <Controller
            name="goalIntervalUnit"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
                <Picker.Item label="day" value="day" />
                <Picker.Item label="week" value="week" />
                <Picker.Item label="month" value="month" />
                <Picker.Item label="year" value="year" />
              </Picker>
            )}
          />
        </View>
      </View>
      {errors.goalAmount && <Text style={styles.errorText}>{errors.goalAmount.message}</Text>}
      {errors.goalUnit && <Text style={styles.errorText}>{errors.goalUnit.message}</Text>}
      {errors.goalIntervalUnit && <Text style={styles.errorText}>{errors.goalIntervalUnit.message}</Text>}
      <Button
        mode="contained"
        onPress={handleSubmit((formData) => {
          console.log(formData);
        })}
      >
        Save
      </Button>
      <ActionFromGoalIntervalUnitCustomDialog
        visible={goalUnitVisible}
        title="Custom name"
        inputLabel="What unit do you want to choose?"
        onConfirmButton={(text) => {
          if (text) {
            setGoalUnitCustom(text);
          } else {
            setValue('goalUnit', 'minutes', { shouldDirty: true });
          }

          setGoalUnitVisible(false);
        }}
        onCancelButton={() => {
          setValue('goalUnit', 'minutes', { shouldDirty: true });
          setGoalUnitVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    marginBottom: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
  },
  picker: {
    minWidth: 140,
  },
  perText: {
    verticalAlign: 'middle',
  },
  goalIntervalContainer: {
    flexDirection: 'row',
  },
});

export default ActionForm;
