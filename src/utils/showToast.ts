import Toast from 'react-native-toast-message';

interface ToastProps {
  title?: string;
  message?: string;
  type?: string;
}
export const showToast = ({ title, message, type }: ToastProps) => {
  Toast.show({
    topOffset: 0,
    type: type,
    text1: title,
    text2: message,
  });
};
