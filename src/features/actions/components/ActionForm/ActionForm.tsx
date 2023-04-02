import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import ButtonGroup from '../../../../components/ui/ButtonGroup/ButtonGroup';
import SwitchWithLabel from '../../../../components/ui/SwitchWithLabel/SwitchWithLabel';
import { ActionSchema, ActionType } from '../../schemas/ActionSchema';
import ActionFromGoalIntervalUnitCustomDialog from './ActionFormGoalIntervalUnitCustomDialog';

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
      reminderEnabled: false,
      reminderIntervalType: data?.reminderIntervalType ?? 'only_once',
    },
  });
  const goalType = useWatch({ control, name: 'goalType' });
  const reminderEnabled = useWatch({ control, name: 'reminderEnabled' });
  const [goalUnitVisible, setGoalUnitVisible] = useState(false);
  const [goalUnitCustom, setGoalUnitCustom] = useState('');

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
          render={({ field: { onChange, value } }) => (
            <ButtonGroup
              value={value}
              onChange={onChange}
              options={[
                { key: 'binary', label: 'Yes/No' },
                { key: 'measurable', label: 'Measurable' },
              ]}
            />
          )}
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
                  <TextInput
                    value={value?.toString() ?? '0'}
                    onChangeText={(newValue) => onChange(parseInt(newValue, 10) || 0)}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                )}
              />
              <Controller
                name="goalUnit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Picker
                    selectedValue={value}
                    onValueChange={(newValue) => {
                      onChange(newValue);

                      if (newValue === CUSTOM_KEY) {
                        setGoalUnitVisible(true);
                      }
                    }}
                    style={styles.picker}
                  >
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
            </>
          )}
          <Text style={styles.perText}>per</Text>
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
      <Text style={styles.heading}>Reminder</Text>
      <View style={styles.inputGroup}>
        <Controller
          name="reminderEnabled"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SwitchWithLabel label="Enabled" value={!!value} onValueChange={onChange} />
          )}
        />
      </View>
      {reminderEnabled && (
        <>
          <View style={styles.inputGroup}>
            <Controller
              name="reminderIntervalType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ButtonGroup
                  value={value}
                  onChange={onChange}
                  options={[
                    { key: 'only_once', label: 'Only once' },
                    { key: 'recurring_every_x_y', label: 'Recurring every X Y' },
                    { key: 'recurring_x_times_per_y', label: 'Recurring X times per Y' },
                  ]}
                />
              )}
            />
            {errors.reminderIntervalType && <Text style={styles.errorText}>{errors.reminderIntervalType.message}</Text>}
          </View>
        </>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit((formData) => {
          const finalFormData = {
            ...formData,
            goalUnit: formData.goalUnit === CUSTOM_KEY && goalUnitCustom ? goalUnitCustom : formData.goalUnit,
          };
          console.log(finalFormData);
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
    flexWrap: 'wrap',
  },
});

export default ActionForm;
