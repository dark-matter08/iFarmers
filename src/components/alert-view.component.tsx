import { Dimensions, Platform, View, ViewProps } from 'react-native';
import React from 'react';
import { Text } from 'react-native';
import theme from '../infrastructure/theme';

const { width } = Dimensions.get('window');

interface AlertViewProps extends ViewProps {
  title?: string;
  message?: string;
  type?: string;
}

export const AlertView: React.FC<AlertViewProps> = ({
  title,
  message,
  type,
}) => {
  // Your component implementation
  return (
    <View
      style={{
        backgroundColor:
          type === 'error'
            ? theme.FLAME
            : type === 'success'
            ? theme.GREEN_MED
            : type === 'warning'
            ? theme.GOLD
            : theme.FACEBOOK,
        paddingTop: Platform.OS === 'ios' ? 50 : 0,
        width: '100%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 3,
      }}>
      <View
        style={{
          height: 55,
          width: 3,
          borderRadius: 10,
          backgroundColor: theme.WHITE_COLOR,
          marginLeft: 15,
        }}
      />

      <View
        style={{
          justifyContent: 'center',
          paddingVertical: 10,
          marginHorizontal: Platform.OS === 'ios' ? 0 : 10,
          width: width - 60,
        }}>
        <Text
          style={{
            color: theme.WHITE_COLOR,
            fontSize: Platform.OS === 'ios' ? 15 : 17,
            fontWeight: '700',
          }}>
          {title}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: theme.WHITE_COLOR,
            fontSize: Platform.OS === 'ios' ? 14 : 16,
            fontWeight: '600',
            marginTop: 3,
          }}>
          {message}
        </Text>
      </View>

      <View
        style={{
          height: 55,
          width: 3,
          borderRadius: 10,
          backgroundColor: theme.WHITE_COLOR,
          marginRight: 15,
        }}
      />
    </View>
  );
};
