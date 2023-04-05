import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

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
            <Text style={styles.helpText}>
              Select "Only once" to set a single reminder. Select "Recurring every X Y" to set a reminder that recurs
              every X Y. Select "Recurring X times per Y" to set a reminder that recurs X times per Y.
            </Text>
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
                  style={styles.button}
                >
                  {reminderStartDate || '(none)'}
                </Button>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>{reminderIntervalType === 'only_once' ? 'Time' : 'Start time'}</Text>
                <Button
                  icon="clock"
                  mode="outlined"
                  onPress={() => {
                    setReminderStartTimeDialogVisible(true);
                  }}
                  style={styles.button}
                >
                  {reminderStartTime || '(none)'}
                </Button>
              </View>
              {reminderIntervalType !== 'only_once' && (
                <>
                  <View style={styles.rowItem}>
                    <Text style={styles.label}>End date</Text>
                    <Button
                      icon="calendar"
                      mode="outlined"
                      onPress={() => {
                        setReminderEndDateDialogVisible(true);
                      }}
                      style={styles.button}
                    >
                      {reminderEndDate || '(none)'}
                    </Button>
                  </View>
                  <View style={styles.rowItem}>
                    <Text style={styles.label}>End time</Text>
                    <Button
                      icon="clock"
                      mode="outlined"
                      onPress={() => {
                        setReminderEndTimeDialogVisible(true);
                      }}
                      style={styles.button}
                    >
                      {reminderEndTime || '(none)'}
                    </Button>
                  </View>
                </>
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
      {reminderStartTimeDialogVisible && (
        <DateTimePicker
          mode="time"
          is24Hour={true}
          value={reminderStartTime ? new Date(reminderStartTime) : new Date()}
          onChange={(_, selectedDate) => {
            setValue(
              'reminderStartTime',
              selectedDate
                ? `${padLeft(selectedDate.getHours(), 2)}:${padLeft(selectedDate.getMinutes(), 2)}`
                : undefined,
              {
                shouldDirty: true,
              }
            );
            setReminderStartTimeDialogVisible(false);
          }}
        />
      )}
      {reminderEndTimeDialogVisible && (
        <DateTimePicker
          mode="time"
          is24Hour={true}
          value={reminderEndTime ? new Date(reminderEndTime) : new Date()}
          onChange={(_, selectedDate) => {
            setValue(
              'reminderEndTime',
              selectedDate
                ? `${padLeft(selectedDate.getHours(), 2)}:${padLeft(selectedDate.getMinutes(), 2)}`
                : undefined,
              {
                shouldDirty: true,
              }
            );
            setReminderEndTimeDialogVisible(false);
          }}
        />
      )}
      {reminderStartDateDialogVisible && (
        <DateTimePicker
          mode="date"
          is24Hour={true}
          value={reminderStartDate ? new Date(reminderStartDate) : new Date()}
          onChange={(_, selectedDate) => {
            setValue(
              'reminderStartDate',
              selectedDate ? DateTime.fromJSDate(selectedDate).toFormat('yyyy-MM-dd') : undefined,
              {
                shouldDirty: true,
              }
            );
            setReminderStartDateDialogVisible(false);
          }}
        />
      )}
      {reminderEndDateDialogVisible && (
        <DateTimePicker
          mode="date"
          is24Hour={true}
          value={reminderEndDate ? new Date(reminderEndDate) : new Date()}
          onChange={(_, selectedDate) => {
            setValue(
              'reminderEndDate',
              selectedDate ? DateTime.fromJSDate(selectedDate).toFormat('yyyy-MM-dd') : undefined,
              {
                shouldDirty: true,
              }
            );
            setReminderEndDateDialogVisible(false);
          }}
        />
      )}
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
  helpText: {
    fontSize: 10,
    color: 'gray',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
  },
  picker: {
    minWidth: 140,
    flexGrow: 1,
  },
  button: {
    width: '100%',
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
    paddingHorizontal: 10,
    paddingBottom: 10,
    width: '50%',
  },
  timeRangeNoticeText: {
    fontSize: 10,
  },
});

export default ActionFormReminderSection;
