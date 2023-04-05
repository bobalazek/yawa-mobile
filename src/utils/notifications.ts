import Toast from 'react-native-toast-message';

export const showNotification = ({
  type,
  title,
  description,
}: {
  type: string;
  title: string;
  description: string;
}) => {
  Toast.show({
    type,
    text1: title,
    text2: description,
    visibilityTime: 5000,
  });
};
