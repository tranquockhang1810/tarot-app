import Toast from 'react-native-toast-message';

export const showToast = ({
  type,
  title,
  content,
  time
}: {
  type?: 'success' | 'error' | 'info',
  title?: string,
  content?: string,
  time?: number
}) => {
  Toast.show({
    type: type,
    text1: title,
    text2: content,
    visibilityTime: time
  });
}