import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonGroup from '../../../../components/ui/ButtonGroup/ButtonGroup';
import SwitchWithLabel from '../../../../components/ui/SwitchWithLabel/SwitchWithLabel';
import { padLeft } from '../../../../utils/helpers';
import { ActionSchema, ActionType } from '../../schemas/ActionSchema';
import ActionFromGoalIntervalUnitCustomDialog from './ActionFormGoalIntervalUnitCustomDialog';

const CUSTOM_KEY = '__custom';
const GOAL_TYPES_OPTIONS = [
  { key: 'binary', label: 'Yes/No' },
  { key: 'measurable', label: 'Measurable' },
];
const GOAL_UNIT_OPTIONS = [
  { key: 'minutes', label: 'minutes' },
  { key: 'deciliters', label: 'deciliters' },
  { key: 'pages', label: 'pages read' },
];
const GOAL_INTERVAL_UNIT_OPTIONS = [
  { key: 'day', label: 'day' },
  { key: 'week', label: 'week' },
  { key: 'month', label: 'month' },
  { key: 'year', label: 'year' },
];
const REMINDER_INTERVAL_TYPE_OPTIONS = [
  { key: 'only_once', label: 'Only once' },
  { key: 'recurring_every_x_y', label: 'Recurring every X Y' },
  { key: 'recurring_x_times_per_y', label: 'Recurring X times per Y' },
];
const REMINDER_RECURRENCE_INTERVAL_UNIT_OPTIONS = [
  { key: 'minute', label: 'minute' },
  { key: 'hour', label: 'hour' },
  ...GOAL_INTERVAL_UNIT_OPTIONS,
];

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
  const goalType = useWatch({ control, name: 'goalType' });
  const reminderEnabled = useWatch({ control, name: 'reminderEnabled' });
  const reminderIntervalType = useWatch({ control, name: 'reminderIntervalType' });
  const reminderOnlyOnceDate = useWatch({ control, name: 'reminderOnlyOnceDate' });
  const reminderStartTime = useWatch({ control, name: 'reminderStartTime' });
  const reminderEndTime = useWatch({ control, name: 'reminderEndTime' });
  const [goalUnitCustom, setGoalUnitCustom] = useState('');
  const [goalUnitDialogVisible, setGoalUnitDialogVisible] = useState(false);
  const [reminderOnlyOnceDateDialogVisible, setReminderOnlyOnceDateDialogVisible] = useState(false);
  const [reminderStartTimeDialogVisible, setReminderStartTimeDialogVisible] = useState(false);
  const [reminderEndTimeDialogVisible, setReminderEndTimeDialogVisible] = useState(false);

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
        <Text style={styles.heading}>Goal</Text>
        <Text style={styles.inputGroup}>TODO: add goal selector modal</Text>
        <View style={styles.inputGroup}>
          <Controller
            name="goalType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ButtonGroup label="Goal type" value={value} onChange={onChange} options={GOAL_TYPES_OPTIONS} />
            )}
          />
          {errors.goalType && <Text style={styles.errorText}>{errors.goalType.message}</Text>}
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.rowContainer}>
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
                          setGoalUnitDialogVisible(true);
                        }
                      }}
                      style={styles.picker}
                    >
                      {GOAL_UNIT_OPTIONS.map(({ key, label }) => (
                        <Picker.Item key={key} label={label} value={key} />
                      ))}
                      <Picker.Item
                        label={goalUnitCustom ? `${goalUnitCustom} (edit custom)` : 'custom'}
                        value={CUSTOM_KEY}
                      />
                    </Picker>
                  )}
                />
              </>
            )}
            <Text style={styles.perText}>{goalType === 'binary' ? 'Once per' : 'per'}</Text>
            <Controller
              name="goalIntervalUnit"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
                  {GOAL_INTERVAL_UNIT_OPTIONS.map(({ key, label }) => (
                    <Picker.Item key={key} label={label} value={key} />
                  ))}
                </Picker>
              )}
            />
          </View>
          {errors.goalAmount && <Text style={styles.errorText}>{errors.goalAmount.message}</Text>}
          {errors.goalUnit && <Text style={styles.errorText}>{errors.goalUnit.message}</Text>}
          {errors.goalIntervalUnit && <Text style={styles.errorText}>{errors.goalIntervalUnit.message}</Text>}
        </View>
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
                    label="Interval type"
                    value={value}
                    onChange={onChange}
                    options={REMINDER_INTERVAL_TYPE_OPTIONS}
                  />
                )}
              />
              {errors.reminderIntervalType && (
                <Text style={styles.errorText}>{errors.reminderIntervalType.message}</Text>
              )}
            </View>
            <View style={[styles.inputGroup, styles.rowContainer]}>
              {reminderIntervalType === 'only_once' && (
                <View style={styles.leftAligned}>
                  <Text style={styles.label}>Date</Text>
                  <Button
                    icon="calendar"
                    mode="outlined"
                    onPress={() => {
                      setReminderOnlyOnceDateDialogVisible(true);
                    }}
                  >
                    {reminderOnlyOnceDate || '(edit)'}
                  </Button>
                </View>
              )}
              <View style={styles.leftAligned}>
                <Text style={styles.label}>{reminderIntervalType === 'only_once' ? 'Time' : 'Start time'}</Text>
                <Button
                  icon="clock"
                  mode="outlined"
                  onPress={() => {
                    setReminderStartTimeDialogVisible(true);
                  }}
                >
                  {reminderStartTime || '(edit)'}
                </Button>
              </View>
              {reminderIntervalType !== 'only_once' && (
                <View style={styles.leftAligned}>
                  <Text style={styles.label}>End time</Text>
                  <Button
                    icon="clock"
                    mode="outlined"
                    onPress={() => {
                      setReminderEndTimeDialogVisible(true);
                    }}
                  >
                    {reminderEndTime || '(edit)'}
                  </Button>
                </View>
              )}
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
          visible={goalUnitDialogVisible}
          title="Custom name"
          inputLabel="What unit do you want to choose?"
          onConfirmButton={(text) => {
            if (text) {
              setGoalUnitCustom(text);
            } else {
              setValue('goalUnit', 'minutes', { shouldDirty: true });
            }

            setGoalUnitDialogVisible(false);
          }}
          onCancelButton={() => {
            setValue('goalUnit', 'minutes', { shouldDirty: true });
            setGoalUnitDialogVisible(false);
          }}
        />
        <DatePickerModal
          locale="en"
          mode="single"
          visible={reminderOnlyOnceDateDialogVisible}
          date={reminderOnlyOnceDate ? new Date(reminderOnlyOnceDate) : undefined}
          onDismiss={() => {
            setReminderOnlyOnceDateDialogVisible(false);
          }}
          onConfirm={(value) => {
            setValue(
              'reminderOnlyOnceDate',
              value.date ? DateTime.fromJSDate(value.date).toFormat('yyyy-MM-dd') : undefined,
              {
                shouldDirty: true,
              }
            );
            setReminderOnlyOnceDateDialogVisible(false);
          }}
        />
        <TimePickerModal
          locale="en"
          use24HourClock={true}
          visible={reminderStartTimeDialogVisible}
          onDismiss={() => {
            setReminderStartTimeDialogVisible(false);
          }}
          onConfirm={(hoursAndMinutes) => {
            setValue(
              'reminderStartTime',
              hoursAndMinutes
                ? `${padLeft(hoursAndMinutes.hours, 2)}:${padLeft(hoursAndMinutes.minutes, 2)}`
                : undefined,
              {
                shouldDirty: true,
              }
            );
            setReminderStartTimeDialogVisible(false);
          }}
        />
        <TimePickerModal
          locale="en"
          use24HourClock={true}
          visible={reminderEndTimeDialogVisible}
          onDismiss={() => {
            setReminderEndTimeDialogVisible(false);
          }}
          onConfirm={(hoursAndMinutes) => {
            setValue(
              'reminderEndTime',
              hoursAndMinutes
                ? `${padLeft(hoursAndMinutes.hours, 2)}:${padLeft(hoursAndMinutes.minutes, 2)}`
                : undefined,
              {
                shouldDirty: true,
              }
            );
            setReminderEndTimeDialogVisible(false);
          }}
        />
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
