import { Picker } from '@react-native-picker/picker';
import { DateTime } from 'luxon';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { DatePickerModal, en, registerTranslation } from 'react-native-paper-dates';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { refreshUser, userSelector } from '../../auth/state/authReducer';
import { cancelNewEmail, resendNewEmailConfirmationEmail, updateProfile } from '../state/profileSettingsReducer';

registerTranslation('en', en);

const timezones = moment.tz.names().filter((timezone) => {
  return !timezone.startsWith('Etc') && (timezone === 'UTC' || timezone.includes('/'));
});

const ProfileSettingsScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [email, setEmail] = useState(user?.email ?? '');
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [timezone, setTimezone] = useState(user?.timezone ?? 'UTC');
  const [birthday, setBirthday] = useState(user?.birthday ?? null);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);

  useEffect(() => {
    // We do want to refresh the user, especially in the case the email was confirmed/changed
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <TextInput label="First name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Timezone</Text>
        <Picker selectedValue={timezone} onValueChange={setTimezone}>
          {timezones.map((singleTimezone) => (
            <Picker.Item key={singleTimezone} label={singleTimezone} value={singleTimezone} />
          ))}
        </Picker>
      </View>
      <View style={styles.group}>
        <Text style={styles.groupLabel}>Birthday</Text>
        <Text
          onPress={() => {
            setShowBirthdayPicker(true);
          }}
          style={styles.groupInput}
        >
          {birthday ? DateTime.fromISO(birthday).toFormat('yyyy-MM-dd') : 'not set'} (click to update)
        </Text>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={showBirthdayPicker}
          onDismiss={() => {
            setShowBirthdayPicker(false);
          }}
          date={birthday ? new Date(birthday) : undefined}
          onConfirm={(params) => {
            setBirthday(params.date ? DateTime.fromJSDate(params.date).toFormat('yyyy-MM-dd') : null);
            setShowBirthdayPicker(false);
          }}
        />
      </View>
      {user?.newEmail && (
        <Text style={styles.textLeft}>
          Your new email is set to <Text style={styles.textBold}>{user.newEmail}</Text>. Please confirm it with the
          email we sent to you. Didn't receive an email?{' '}
          <Text
            style={styles.linkText}
            onPress={() => {
              dispatch(resendNewEmailConfirmationEmail());
            }}
          >
            Resend now
          </Text>{' '}
          or{' '}
          <Text
            style={styles.linkText}
            onPress={() => {
              dispatch(cancelNewEmail());
            }}
          >
            cancel
          </Text>
        </Text>
      )}
      <Button
        onPress={() => {
          dispatch(updateProfile({ firstName, email, timezone, birthday }));
        }}
        mode="contained"
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 16,
  },
  group: {
    marginBottom: 16,
  },
  groupLabel: {
    padding: 16,
    fontSize: 14,
    backgroundColor: '#ddd',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  groupInput: {
    padding: 16,
  },
  linkText: {
    color: 'blue',
  },
  textLeft: {
    textAlign: 'left',
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default ProfileSettingsScreen;
