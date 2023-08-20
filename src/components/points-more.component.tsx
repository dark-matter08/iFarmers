import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const PointsMore = (props: any) => {
  const { colors } = useTheme();
  const { location, visible, setVisible } = props;

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{
            position: 'absolute',
            backgroundColor: colors.background,
            opacity: 0.7,
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={{
            height: '50%',
            top: '50%',
            position: 'absolute',
            width: '100%',
            backgroundColor: colors.background,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingHorizontal: 23,
            paddingVertical: 20,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={{ uri: location.url }}
                  style={{
                    height: 90,
                    width: 90,
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
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      marginTop: 10,
                    }}>
                    {location?.city}
                  </Text>
                </View>
                <View
                  style={{
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                    }}>
                    <Ionicons name="heart-outline" size={30} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: '600',
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                  }}>
                  Description
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  {location.description}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};
