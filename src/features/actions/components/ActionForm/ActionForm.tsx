import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { useAppDispatch } from '../../../../hooks';
import { showNotification } from '../../../../utils/notifications';
import { ActionSchema, ActionType } from '../../schemas/ActionSchema';
import actionsService from '../../services/actionsService';
import { fetchEntries } from '../../state/actionsSlice';
import ActionFormGoalSection from './ActionFormGoalSection';
import ActionFormReminderSection from './ActionFormReminderSection';

const ActionForm = ({ data }: { data?: ActionType }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
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
      reminderStartDate: data?.reminderStartDate ?? DateTime.now().toFormat('yyyy-MM-dd'),
      reminderEndDate: data?.reminderEndDate ?? '',
      reminderStartTime: data?.reminderStartTime ?? '08:00',
      reminderEndTime: data?.reminderEndTime ?? '',
    },
  });
  const mutation = useMutation({
    mutationFn: async (mutationData: ActionType) => {
      try {
        await actionsService.create(mutationData);

        showNotification({
          type: 'success',
          title: 'Success',
          description: 'Action created successfully',
        });

        dispatch(fetchEntries());

        navigation.goBack();
      } catch (err: unknown) {
        const description = err instanceof Error ? err.message : 'Something went wrong';

        showNotification({
          type: 'error',
          title: 'Error',
          description,
        });
      }
    },
  });

  return (
    <ScrollView>
      <View style={styles.containerInner}>
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
            mutation.mutate(formData);
          })}
          loading={mutation.isLoading}
          disabled={mutation.isLoading}
        >
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerInner: {
    padding: 10,
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
});

export default ActionForm;
