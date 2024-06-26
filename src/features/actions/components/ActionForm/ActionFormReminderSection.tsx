import { DateTime } from 'luxon';
import { useState } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

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
                <View>
                  <Text>{reminderIntervalType === 'recurring_every_x_y' ? 'Recurring every' : 'Recurring'}</Text>
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
                  <View>
                    <Text>times per</Text>
                  </View>
                )}
                <Controller
                  name="reminderRecurrenceIntervalUnit"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RNPickerSelect
                      style={pickerSelectStyles}
                      value={value}
                      onValueChange={onChange}
                      items={REMINDER_RECURRENCE_INTERVAL_UNIT_OPTIONS.map(({ key, label }) => ({
                        label: reminderIntervalType === 'recurring_every_x_y' ? `${label}s` : label,
                        value: key,
                      }))}
                      placeholder={{}}
                    />
                  )}
                />
              </View>
            </View>
          )}
          <View style={styles.inputGroup}>
            <View style={styles.rowContainer}>
              <View style={styles.rowItem}>
                <TextInput
                  label={reminderIntervalType === 'only_once' ? 'Date' : 'Start date'}
                  value={reminderStartDate}
                  onChangeText={(newValue) => setValue('reminderStartDate', newValue)}
                  onFocus={() => {
                    setReminderStartDateDialogVisible(true);
                  }}
                  style={styles.dateTimeInput}
                />
              </View>
              <View style={styles.rowItem}>
                <TextInput
                  label={reminderIntervalType === 'only_once' ? 'Time' : 'Start time'}
                  value={reminderStartTime}
                  onChangeText={(newValue) => setValue('reminderStartTime', newValue)}
                  onFocus={() => {
                    setReminderStartTimeDialogVisible(true);
                  }}
                  style={styles.dateTimeInput}
                />
              </View>
              {reminderIntervalType !== 'only_once' && (
                <>
                  <View style={styles.rowItem}>
                    <TextInput
                      label="End date"
                      value={reminderEndDate}
                      onChangeText={(newValue) => setValue('reminderEndDate', newValue)}
                      onFocus={() => {
                        setReminderEndDateDialogVisible(true);
                      }}
                      style={styles.dateTimeInput}
                    />
                  </View>
                  <View style={styles.rowItem}>
                    <TextInput
                      label="End time"
                      value={reminderEndTime}
                      onChangeText={(newValue) => setValue('reminderEndTime', newValue)}
                      onFocus={() => {
                        setReminderEndTimeDialogVisible(true);
                      }}
                      style={styles.dateTimeInput}
                    />
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
      <DateTimePickerModal
        isVisible={reminderStartDateDialogVisible}
        mode="date"
        is24Hour={true}
        date={reminderStartDate ? new Date(reminderStartDate) : new Date()}
        onConfirm={(selectedDate) => {
          setValue(
            'reminderStartDate',
            selectedDate ? DateTime.fromJSDate(selectedDate).toFormat('yyyy-MM-dd') : undefined,
            {
              shouldDirty: true,
            }
          );
          setReminderStartDateDialogVisible(false);
        }}
        onCancel={() => {
          setReminderStartDateDialogVisible(false);
        }}
      />
      <DateTimePickerModal
        isVisible={reminderEndDateDialogVisible}
        mode="date"
        is24Hour={true}
        date={reminderEndDate ? new Date(reminderEndDate) : new Date()}
        onConfirm={(selectedDate) => {
          setValue(
            'reminderEndDate',
            selectedDate ? DateTime.fromJSDate(selectedDate).toFormat('yyyy-MM-dd') : undefined,
            {
              shouldDirty: true,
            }
          );
          setReminderEndDateDialogVisible(false);
        }}
        onCancel={() => {
          setReminderEndDateDialogVisible(false);
        }}
      />
      <DateTimePickerModal
        isVisible={reminderStartTimeDialogVisible}
        mode="time"
        is24Hour={true}
        date={reminderStartTime ? new Date(`2000-01-01T${reminderStartTime}:00`) : new Date()}
        onConfirm={(selectedDate) => {
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
        onCancel={() => {
          setReminderStartTimeDialogVisible(false);
        }}
      />
      <DateTimePickerModal
        isVisible={reminderEndTimeDialogVisible}
        mode="time"
        is24Hour={true}
        date={reminderEndTime ? new Date(`2000-01-01T${reminderEndTime}:00`) : new Date()}
        onConfirm={(selectedDate) => {
          setValue(
            'reminderStartTime',
            selectedDate
              ? `${padLeft(selectedDate.getHours(), 2)}:${padLeft(selectedDate.getMinutes(), 2)}`
              : undefined,
            {
              shouldDirty: true,
            }
          );
          setReminderEndTimeDialogVisible(false);
        }}
        onCancel={() => {
          setReminderEndTimeDialogVisible(false);
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
  helpText: {
    fontSize: 10,
    color: 'gray',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
  },
  dateTimeInput: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
  rowItem: {
    alignItems: 'flex-start',
    paddingBottom: 10,
    flexGrow: 1,
    minWidth: 120,
  },
  timeRangeNoticeText: {
    fontSize: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    alignSelf: 'center',
  },
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 30,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
  },
});

export default ActionFormReminderSection;
