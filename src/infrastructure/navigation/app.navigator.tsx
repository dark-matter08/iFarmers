import React from 'react';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import theme from '../theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreen } from '../../features/home/screens/home.screen';
import { ParamListBase, RouteProp } from '@react-navigation/native';
const Tab = AnimatedTabBarNavigator();

export interface TabIconParams {
  size: number;
  color: string;
  isFocused: boolean;
}

interface ScreenOptionsProps {
  route: RouteProp<ParamListBase>;
  navigation?: any;
}

type TabIcon = {
  [key: string]: 'md-home' | 'map' | 'man-outline';
};

const screenOptions = (props: ScreenOptionsProps) => {
  const TAB_ICON: TabIcon = {
    Home: 'md-home',
    Map: 'map',
    Profile: 'man-outline',
  };
  const name = TAB_ICON[props.route.name];

  return {
    tabBarIcon: (params: TabIconParams) => {
      return <Ionicons name={name} size={params.size} color={params.color} />;
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
        activeTintColor: theme.DARK,
        inactiveTintColor: theme.GREY_2,
        tabStyle: {
          backgroundColor: theme.GREY_6,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          width: '100%',
        },
      }}
      appearance={{ floating: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
};
