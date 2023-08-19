import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import theme from '../infrastructure/theme';
import { useTheme } from '@react-navigation/native';

interface ButtonProps {
  title?: string;
  isLoading?: boolean;
  isActive?: boolean;
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
  onPress?: () => void;
}

export const Button = (props: ButtonProps) => {
  const {
    title,
    isLoading,
    width,
    height,
    backgroundColor,
    borderRadius,
    isActive,
    onPress,
  } = props;
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width || '100%',
        height: height || 55,
        backgroundColor:
          !isLoading || !isActive
            ? backgroundColor || colors.primary
            : theme.GREY_4,
        borderRadius: borderRadius || 100,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
            color: theme.WHITE_COLOR,
          }}>
          {title?.toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  );
};
