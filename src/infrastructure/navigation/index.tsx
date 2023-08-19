import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import theme from '../theme';
import { AuthNavigator } from './auth.navigator';
import { AppNavigator } from './app.navigator';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.GREEN_MED,
    background: theme.GREY_6,
    text: theme.DARK,
    textOpposite: theme.GREY_6,
    shadedText: theme.GREY_3,
    shadedbackground: theme.GREY_5,
    background2: theme.GREY_6,
    backgroundOpposite: theme.DARK,
    accent: theme.FLAME_MED,
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.GREEN_MED,
    background: theme.DARK,
    text: theme.GREY_6,
    textOpposite: theme.DARK,
    shadedText: theme.GREY_3,
    shadedbackground: theme.GREY_4 + 88,
    background2: theme.DARK,
    backgroundOpposite: theme.GREY_6,
    accent: theme.FLAME_MED,
  },
};

const Navigation = () => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const default_color_mode = useColorScheme();

  const isDarkMode = default_color_mode === 'dark';

  console.log(isAuthenticated);

  return (
    <NavigationContainer theme={isDarkMode ? MyDarkTheme : LightTheme}>
      {isAuthenticated ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
