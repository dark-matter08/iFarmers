import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { showToast } from '../../../utils/showToast';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../infrastructure/theme';
import { useTheme } from '@react-navigation/native';
// import { db } from '../../../../firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '../../../components/botton.component';
import { logoutUser } from '../../../redux/actions/auth.action';

export const ProfileScreen = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colors } = useTheme();
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={theme.GREEN_MED} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          // Shadow and elevation styles
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingTop: Platform.OS === 'ios' ? 60 : 50,
          height: Platform.OS === 'ios' ? 115 : 105,
          backgroundColor: colors.background,
        }}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: '600',
            color: colors.text,
            opacity: 0.8,
          }}>
          My Profile
        </Text>
        <TouchableOpacity>
          <Ionicons name={'filter'} size={25} color={theme.GOLD} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 23,
        }}>
        <View
          style={{
            height: 140,
            width: 140,
            borderRadius: 100,
            borderWidth: 5,
            borderColor: theme.VIOLET,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}>
          {user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 100,
              }}
            />
          ) : (
            <Ionicons name={'md-image'} size={100} color={theme.VIOLET} />
          )}
        </View>
        <View style={{ marginLeft: 20, flex: 1, paddingVertical: 30 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '800',
              color: colors.text,
              marginTop: 3,
            }}>
            {user.displayName}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: colors.text,
              marginTop: 3,
            }}>
            {user.email}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.text,
              marginTop: 3,
            }}>
            {user.phoneNumber}
          </Text>
          <View
            style={{
              width: '100%',
              backgroundColor: colors.background,
              borderRadius: 10,
              height: 40,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '800',
                fontSize: 15,
                color: theme.VIOLET,
              }}>
              Account Type: Farmer
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ width: '80%', alignSelf: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => dispatch(logoutUser())}
          style={{
            height: 60,
            width: '100%',
            backgroundColor: theme.GREEN_MED,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: theme.WHITE_COLOR,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
