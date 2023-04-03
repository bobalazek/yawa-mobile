import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { useState } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import ButtonGroup from '../../../../components/ui/ButtonGroup/ButtonGroup';
import { ActionType } from '../../schemas/ActionSchema';
import { CUSTOM_KEY } from './ActionForm';
import ActionFromGoalIntervalUnitCustomDialog from './ActionFormGoalIntervalUnitCustomDialog';

export const GOAL_TYPES_OPTIONS = [
  { key: 'binary', label: 'Yes/No' },
  { key: 'measurable', label: 'Measurable' },
];
export const GOAL_UNIT_OPTIONS = [
  { key: 'minutes', label: 'minutes' },
  { key: 'deciliters', label: 'deciliters' },
  { key: 'pages', label: 'pages read' },
];
export const GOAL_INTERVAL_UNIT_OPTIONS = [
  { key: 'day', label: 'day' },
  { key: 'week', label: 'week' },
  { key: 'month', label: 'month' },
  { key: 'year', label: 'year' },
];

const ActionFormGoalSection = ({
  control,
  errors,
  setValue,
  goalUnitCustom,
  setGoalUnitCustom,
}: {
  control: Control<ActionType>;
  errors: FieldErrors<ActionType>;
  setValue: UseFormSetValue<ActionType>;
  goalUnitCustom: string;
  setGoalUnitCustom: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const goalType = useWatch({ control, name: 'goalType' });

  const [goalUnitDialogVisible, setGoalUnitDialogVisible] = useState(false);

  return (
    <>
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
  perText: {
    verticalAlign: 'middle',
  },
  rowContainer: {
    flexDirection: 'row',
  },
});

export default ActionFormGoalSection;
