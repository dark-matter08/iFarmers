import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
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
  width?: DimensionValue;
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
    isActive = true,
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
          isLoading || !isActive
            ? theme.GREY_4
            : backgroundColor || colors.primary,
        borderRadius: borderRadius || 100,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={colors.primary} />
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
