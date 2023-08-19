import React, { useContext } from 'react';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';

import { View } from 'react-native';

import theme from '../theme';

import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreen } from '../../features/home/screens/home';
const Tab = AnimatedTabBarNavigator();

interface TabIcon {
  Home: string;
}

const TAB_ICON: TabIcon = {
  Home: 'md-home',
};

export interface TabIconParams {
  size: number;
  color: string;
  isFocused: boolean;
}

const screenOptions = ({ route }: any) => {
  let iconName = route.name;
  return {
    tabBarIcon: (params: TabIconParams) => {
      return (
        <Ionicons name={iconName} size={params.size} color={params.color} />
      );
    },
    tabBarHideOnKeyboard: true,
    headerShown: false,
  };
};

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: theme.GOLD,
        inactiveTintColor: theme.GREY_3,
        tabStyle: {
          backgroundColor: theme.GREEN_MED,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
      appearance={{ floating: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};
