import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionSchema, ActionType } from '../../schemas/ActionSchema';
import ActionFormGoalSection from './ActionFormGoalSection';
import ActionFormReminderSection from './ActionFormReminderSection';

export const CUSTOM_KEY = '__custom';

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
      goalUnit: data?.goalUnit ?? 'deciliters',
      goalIntervalUnit: data?.goalIntervalUnit ?? 'day',
      reminderEnabled: false,
      reminderIntervalType: data?.reminderIntervalType ?? 'only_once',
      reminderRecurrenceIntervalAmount: data?.reminderRecurrenceIntervalAmount ?? 0,
      reminderRecurrenceIntervalUnit: data?.reminderRecurrenceIntervalUnit ?? 'day',
      reminderStartDate: data?.reminderStartDate ?? '',
      reminderEndDate: data?.reminderEndDate ?? '',
      reminderStartTime: data?.reminderStartTime ?? '08:00',
      reminderEndTime: data?.reminderEndTime ?? '',
    },
  });
  const [goalUnitCustom, setGoalUnitCustom] = useState('');

  return (
    <SafeAreaView>
      <ScrollView>
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
        <ActionFormGoalSection
          control={control}
          errors={errors}
          setValue={setValue}
          goalUnitCustom={goalUnitCustom}
          setGoalUnitCustom={setGoalUnitCustom}
        />
        <ActionFormReminderSection control={control} errors={errors} setValue={setValue} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
  },
  errorText: {
    color: 'red',
  },
});

export default ActionForm;
