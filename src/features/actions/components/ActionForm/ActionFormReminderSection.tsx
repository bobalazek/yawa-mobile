import { DateTime } from 'luxon';
import { useState } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
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
  const reminderOnlyOnceDate = useWatch({ control, name: 'reminderOnlyOnceDate' });
  const reminderStartTime = useWatch({ control, name: 'reminderStartTime' });
  const reminderEndTime = useWatch({ control, name: 'reminderEndTime' });
  const [reminderOnlyOnceDateDialogVisible, setReminderOnlyOnceDateDialogVisible] = useState(false);
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
  leftAligned: {
    alignItems: 'flex-start',
    marginHorizontal: 2,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});

export default ActionFormReminderSection;
