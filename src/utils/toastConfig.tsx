import React from 'react';
import { AlertView } from '../components/alert-view.component';
import { ToastConfig } from 'react-native-toast-message';

interface Params {
  title: string;
  message: string;
}

export const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => {
    return <AlertView title={text1} message={text2} type={'success'} />;
  },

  error: ({ text1, text2 }) => (
    <AlertView title={text1} message={text2} type={'error'} />
  ),

  warning: ({ text1, text2 }) => (
    <AlertView title={text1} message={text2} type={'warning'} />
  ),

  info: ({ text1, text2 }) => (
    <AlertView title={text1} message={text2} type={'info'} />
  ),
};
