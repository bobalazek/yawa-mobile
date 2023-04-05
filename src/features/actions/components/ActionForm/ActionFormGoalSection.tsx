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
  { key: 'deciliters', label: 'deciliters' },
  { key: 'minutes', label: 'minutes' },
  { key: 'pages read', label: 'pages read' },
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
      <View style={styles.inputGroup}>
        <Text>TODO: add goals selector modal</Text>
        <Text style={styles.helpText}>
          Select which goal would relate to this action. You can add more goals later.
        </Text>
      </View>
      <View style={styles.inputGroup}>
        <Controller
          name="goalType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ButtonGroup label="Goal type" value={value} onChange={onChange} options={GOAL_TYPES_OPTIONS} />
          )}
        />
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
          <Text style={styles.fillerText}>{goalType === 'binary' ? 'Once per' : 'per'}</Text>
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
        <Text style={styles.helpText}>
          Select "Yes/No", if you expect this action to only confirm once per day/week/month (like Eat healthy, Don't
          smoke, ...) or "Measurable", if you expect this action to be measured in a unit (like Hydrate, Read a Book,
          ...).
        </Text>
        {errors.goalAmount && <Text style={styles.errorText}>{errors.goalAmount.message}</Text>}
        {errors.goalUnit && <Text style={styles.errorText}>{errors.goalUnit.message}</Text>}
        {errors.goalIntervalUnit && <Text style={styles.errorText}>{errors.goalIntervalUnit.message}</Text>}
        {errors.goalType && <Text style={styles.errorText}>{errors.goalType.message}</Text>}
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
  fillerText: {
    verticalAlign: 'middle',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
});

export default ActionFormGoalSection;
