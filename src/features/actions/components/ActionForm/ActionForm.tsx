import { zodResolver } from '@hookform/resolvers/zod';
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
      goalUnit: data?.goalUnit ?? 'minutes',
      goalIntervalUnit: data?.goalIntervalUnit ?? 'day',
      reminderEnabled: false,
      reminderIntervalType: data?.reminderIntervalType ?? 'only_once',
      reminderStartTime: data?.reminderStartTime ?? '',
      reminderEndTime: data?.reminderEndTime ?? '',
      reminderOnlyOnceDate: data?.reminderOnlyOnceDate ?? '',
    },
  });

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
        <ActionFormGoalSection control={control} errors={errors} setValue={setValue} />
        <ActionFormReminderSection control={control} errors={errors} setValue={setValue} />
        <Button
          mode="contained"
          onPress={handleSubmit((formData) => {
            // TODO: goal unit custom
            console.log(formData);
          })}
        >
          Save
        </Button>
      </ScrollView>
    </SafeAreaView>
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
  label: {
    fontSize: 12,
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
  leftAligned: {
    alignItems: 'flex-start',
    marginHorizontal: 2,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});

export default ActionForm;
