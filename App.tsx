import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';
import Navigation from './src/infrastructure/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <Toast config={toastConfig} />
      </PersistGate>
      <StatusBar style="auto" />
    </Provider>
  );
}
