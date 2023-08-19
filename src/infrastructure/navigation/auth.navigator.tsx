import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../../features/authentication/screens/login';

const Stack = createNativeStackNavigator();
export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      //   StackBar={props => <Stackbar {...props} />}
    >
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        component={Login}
      />
    </Stack.Navigator>
  );
};
