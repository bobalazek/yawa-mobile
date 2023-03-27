import React, { useRef, useState } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

type ConfirmationDialogProps = {
  title: string;
  message: string;
};

type UseConfirmationDialogResult = [
  (onConfirm?: () => void, onCancel?: () => void) => void,
  React.FC<ConfirmationDialogProps>
];

const useConfirmationDialog: () => UseConfirmationDialogResult = () => {
  const [visible, setVisible] = useState(false);
  const onConfirmRef = useRef<(() => void) | undefined>(undefined);
  const onCancelRef = useRef<(() => void) | undefined>(undefined);

  const showDialog = (onConfirm?: () => void, onCancel?: () => void) => {
    onConfirmRef.current = onConfirm;
    onCancelRef.current = onCancel;
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    if (onConfirmRef.current) {
      onConfirmRef.current();
    }
    hideDialog();
  };

  const handleCancel = () => {
    if (onCancelRef.current) {
      onCancelRef.current();
    }
    hideDialog();
  };

  const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ title, message }) => {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Dialog.Content>
              <Text>{message}</Text>
            </Dialog.Content>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancel}>Cancel</Button>
            <Button onPress={handleConfirm}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  return [showDialog, ConfirmationDialog];
};

export default useConfirmationDialog;
