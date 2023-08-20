import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

export const Point = (props: any) => {
  const { colors } = useTheme();
  const { location, setShowMore, setActive } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        setActive(location);
        setShowMore(true);
      }}
      style={{
        height: 100,
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: colors.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Image
        source={{ uri: location.url }}
        style={{
          height: 100,
          width: 100,
          borderRadius: 10,
        }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
          }}>
          {location.name}
        </Text>
        <Text
          numberOfLines={3}
          style={{
            fontSize: 16,
            fontWeight: '400',
          }}>
          {location.description}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '400',
            marginTop: 10,
          }}>
          {location?.city}
        </Text>
      </View>
      <View
        style={{ width: 60, justifyContent: 'center', alignItems: 'center' }}>
        {location.type === 'urban farms' ? (
          <FontAwesome name="road" size={24} color="black" />
        ) : location.type === 'restaurants' ? (
          <Ionicons name="restaurant" size={24} color="black" />
        ) : (
          <Entypo name="shop" size={24} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
};
