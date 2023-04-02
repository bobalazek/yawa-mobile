import { useState } from 'react';
import Dialog from 'react-native-dialog';

type ActionFromGoalIntervalUnitCustomDialogProps = {
  visible: boolean;
  title: string;
  inputLabel: string;
  onConfirmButton: (text: string) => void;
  onCancelButton: () => void;
};

const ActionFromGoalIntervalUnitCustomDialog = ({
  visible,
  title,
  inputLabel,
  onConfirmButton,
  onCancelButton,
}: ActionFromGoalIntervalUnitCustomDialogProps) => {
  const [text, setText] = useState('');

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>
        <Dialog.Input label={inputLabel} onChangeText={setText} />
      </Dialog.Description>
      <Dialog.Button
        onPress={() => {
          onCancelButton();
          setText('');
        }}
        label="Cancel"
      />
      <Dialog.Button
        onPress={() => {
          onConfirmButton(text);
          setText('');
        }}
        label="Confirm"
      />
    </Dialog.Container>
  );
};

export default ActionFromGoalIntervalUnitCustomDialog;
