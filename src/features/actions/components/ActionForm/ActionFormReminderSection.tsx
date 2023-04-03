import { Picker } from '@react-native-picker/picker';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

import ButtonGroup from '../../../../components/ui/ButtonGroup/ButtonGroup';
import SwitchWithLabel from '../../../../components/ui/SwitchWithLabel/SwitchWithLabel';
import { padLeft } from '../../../../utils/helpers';
import { ActionType } from '../../schemas/ActionSchema';
import { GOAL_INTERVAL_UNIT_OPTIONS } from './ActionFormGoalSection';

export const REMINDER_INTERVAL_TYPE_OPTIONS = [
  { key: 'only_once', label: 'Only once' },
  { key: 'recurring_every_x_y', label: 'Recurring every X Y' },
  { key: 'recurring_x_times_per_y', label: 'Recurring X times per Y' },
];
export const REMINDER_RECURRENCE_INTERVAL_UNIT_OPTIONS = [
  { key: 'minute', label: 'minute' },
  { key: 'hour', label: 'hour' },
  ...GOAL_INTERVAL_UNIT_OPTIONS,
];

const ActionFormReminderSection = ({
  control,
  errors,
  setValue,
}: {
  control: Control<ActionType>;
  errors: FieldErrors<ActionType>;
  setValue: UseFormSetValue<ActionType>;
}) => {
  const reminderEnabled = useWatch({ control, name: 'reminderEnabled' });
  const reminderIntervalType = useWatch({ control, name: 'reminderIntervalType' });
  const reminderStartDate = useWatch({ control, name: 'reminderStartDate' });
  const reminderEndDate = useWatch({ control, name: 'reminderEndDate' });
  const reminderStartTime = useWatch({ control, name: 'reminderStartTime' });
  const reminderEndTime = useWatch({ control, name: 'reminderEndTime' });
  const [reminderStartDateDialogVisible, setReminderStartDateDialogVisible] = useState(false);
  const [reminderEndDateDialogVisible, setReminderEndDateDialogVisible] = useState(false);
  const [reminderStartTimeDialogVisible, setReminderStartTimeDialogVisible] = useState(false);
  const [reminderEndTimeDialogVisible, setReminderEndTimeDialogVisible] = useState(false);

  return (
    <>
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
            {errors.reminderIntervalType && <Text style={styles.errorText}>{errors.reminderIntervalType.message}</Text>}
          </View>
          {reminderIntervalType !== 'only_once' && (
            <View style={styles.inputGroup}>
              <View style={styles.rowContainer}>
                <View style={styles.fillerViewStart}>
                  <Text style={styles.fillerText}>
                    {reminderIntervalType === 'recurring_every_x_y' ? 'Recurring every' : 'Recurring'}
                  </Text>
                </View>
                <Controller
                  name="reminderRecurrenceIntervalAmount"
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
                {reminderIntervalType === 'recurring_x_times_per_y' && (
                  <View style={styles.fillerViewMiddle}>
                    <Text style={styles.fillerText}>times per</Text>
                  </View>
                )}
                <Controller
                  name="reminderRecurrenceIntervalUnit"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
                      {REMINDER_RECURRENCE_INTERVAL_UNIT_OPTIONS.map(({ key, label }) => (
                        <Picker.Item
                          key={key}
                          label={reminderIntervalType === 'recurring_every_x_y' ? `${label}s` : label}
                          value={key}
                        />
                      ))}
                    </Picker>
                  )}
                />
              </View>
            </View>
          )}
          <View style={styles.inputGroup}>
            <View style={styles.rowContainer}>
              <View style={styles.rowItem}>
                <Text style={styles.label}>{reminderIntervalType === 'only_once' ? 'Date' : 'Start date'}</Text>
                <Button
                  icon="calendar"
                  mode="outlined"
                  onPress={() => {
                    setReminderStartDateDialogVisible(true);
                  }}
                >
                  {reminderStartDate || '(none)'}
                </Button>
              </View>
              {reminderIntervalType !== 'only_once' && (
                <View style={styles.rowItem}>
                  <Text style={styles.label}>End date</Text>
                  <Button
                    icon="calendar"
                    mode="outlined"
                    onPress={() => {
                      setReminderEndDateDialogVisible(true);
                    }}
                  >
                    {reminderEndDate || '(none)'}
                  </Button>
                </View>
              )}
              <View style={styles.rowItem}>
                <Text style={styles.label}>{reminderIntervalType === 'only_once' ? 'Time' : 'Start time'}</Text>
                <Button
                  icon="clock"
                  mode="outlined"
                  onPress={() => {
                    setReminderStartTimeDialogVisible(true);
                  }}
                >
                  {reminderStartTime || '(none)'}
                </Button>
              </View>
              {reminderIntervalType !== 'only_once' && (
                <View style={styles.rowItem}>
                  <Text style={styles.label}>End time</Text>
                  <Button
                    icon="clock"
                    mode="outlined"
                    onPress={() => {
                      setReminderEndTimeDialogVisible(true);
                    }}
                  >
                    {reminderEndTime || '(none)'}
                  </Button>
                </View>
              )}
            </View>
            {reminderIntervalType !== 'only_once' && (
              <Text style={styles.timeRangeNoticeText}>
                Between what time range do you want the reminders to be run, on a daily basis?
              </Text>
            )}
          </View>
        </>
      )}
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
            hoursAndMinutes ? `${padLeft(hoursAndMinutes.hours, 2)}:${padLeft(hoursAndMinutes.minutes, 2)}` : undefined,
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
            hoursAndMinutes ? `${padLeft(hoursAndMinutes.hours, 2)}:${padLeft(hoursAndMinutes.minutes, 2)}` : undefined,
            {
              shouldDirty: true,
            }
          );
          setReminderEndTimeDialogVisible(false);
        }}
      />
      <DatePickerModal
        locale="en"
        mode="single"
        visible={reminderStartDateDialogVisible}
        date={reminderStartDate ? new Date(reminderStartDate) : undefined}
        onDismiss={() => {
          setReminderStartDateDialogVisible(false);
        }}
        onConfirm={(value) => {
          setValue(
            'reminderStartDate',
            value.date ? DateTime.fromJSDate(value.date).toFormat('yyyy-MM-dd') : undefined,
            {
              shouldDirty: true,
            }
          );
          setReminderStartDateDialogVisible(false);
        }}
      />
      <DatePickerModal
        locale="en"
        mode="single"
        visible={reminderEndDateDialogVisible}
        date={reminderEndDate ? new Date(reminderEndDate) : undefined}
        onDismiss={() => {
          setReminderEndDateDialogVisible(false);
        }}
        onConfirm={(value) => {
          setValue('reminderEndDate', value.date ? DateTime.fromJSDate(value.date).toFormat('yyyy-MM-dd') : undefined, {
            shouldDirty: true,
          });
          setReminderEndDateDialogVisible(false);
        }}
      />
    </>
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
  fillerViewStart: {
    paddingRight: 10,
    justifyContent: 'center',
  },
  fillerViewMiddle: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  fillerText: {
    verticalAlign: 'middle',
    paddingVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowItem: {
    alignItems: 'flex-start',
    paddingHorizontal: 2,
    paddingBottom: 5,
    width: '50%',
  },
  timeRangeNoticeText: {
    fontSize: 10,
  },
});

export default ActionFormReminderSection;
