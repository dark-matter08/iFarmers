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
import { useDispatch, useSelector } from 'react-redux';
import theme from '../infrastructure/theme';
import { addToFav, removeFav } from '../redux/actions/fav.action';

export const PointsMore = (props: any) => {
  const { colors } = useTheme();
  const { location, visible, setVisible } = props;
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const favs = useSelector((state: any) => state.fav);

  useEffect(() => {
    setIsFav(favs.filter((x: any) => x?.id === location?.id).length > 0);
  }, [favs]);

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
                  source={{ uri: location?.url }}
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
                      color: colors.text,
                    }}>
                    {location?.name}
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      marginTop: 10,
                      color: colors.text,
                    }}>
                    {location?.placeName}
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      marginTop: 10,
                      color: colors.text,
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
                    onPress={() => {
                      console.log(location.id);

                      console.log(
                        isFav ? 'removing from fav' : 'adding to fav'
                      );

                      if (isFav) {
                        dispatch(removeFav(location));
                      } else {
                        dispatch(addToFav(location));
                      }
                    }}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      borderWidth: 2,
                      borderColor: isFav ? theme.FLAME : theme.VIOLET,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name={isFav ? 'heart' : 'heart-outline'}
                      size={35}
                      color={isFav ? theme.FLAME : theme.VIOLET}
                    />
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
                    color: colors.text,
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: colors.text,
                  }}>
                  {location?.description}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 21,
                fontWeight: '600',
                marginTop: 10,
                textDecorationLine: 'underline',
                color: colors.text,
              }}>
              Contact Info
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: theme.VIOLET,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                {location?.user?.photoURL ? (
                  <Image
                    source={{ uri: location?.user?.photoURL }}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 100,
                    }}
                  />
                ) : (
                  <Ionicons name={'md-image'} size={70} color={theme.VIOLET} />
                )}
              </View>
              <View style={{ flex: 1, marginLeft: 20 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: colors.text,
                  }}>
                  {location?.user?.displayName}
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    marginTop: 10,
                    color: colors.text,
                  }}>
                  {location?.user?.phoneNumber}
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
                    height: 45,
                    width: 45,
                    borderRadius: 30,
                    borderWidth: 2,
                    borderColor: theme.VIOLET,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name={'call-outline'}
                    size={30}
                    color={theme.VIOLET}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};
