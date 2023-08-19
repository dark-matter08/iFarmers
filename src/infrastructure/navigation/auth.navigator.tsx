import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../features/authentication/screens/login.screen';
import { DetailsScreen } from '../../features/authentication/screens/details.screen';

const Stack = createNativeStackNavigator();
export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="details"
        options={{ headerShown: false }}
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
};
