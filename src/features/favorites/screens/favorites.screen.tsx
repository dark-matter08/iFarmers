import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { showToast } from '../../../utils/showToast';
import { useSelector } from 'react-redux';
import theme from '../../../infrastructure/theme';
import { useTheme } from '@react-navigation/native';
// import { db } from '../../../../firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Point } from '../../points/components/point.component';
import { PointsMore } from '../../../components/points-more.component';

export const FavoriteScreen = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colors } = useTheme();
  const favs = useSelector((state: any) => state.fav);

  const [active, setActive] = useState<any>();
  const [showMore, setShowMore] = useState(false);

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
          My Favorites
        </Text>
        <TouchableOpacity>
          <Ionicons name={'filter'} size={25} color={theme.GOLD} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: 23,
          alignItems: 'center',
          marginTop: 10,
          flex: 1,
        }}>
        {favs?.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: '600',
              }}>
              You have added no favorites locations
            </Text>
          </View>
        ) : (
          <ScrollView style={{ flex: 1, width: '100%' }}>
            {favs?.map((x: any, index: number) => {
              return (
                <Point
                  location={x}
                  key={index}
                  setActive={setActive}
                  setShowMore={setShowMore}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      <PointsMore
        location={active}
        visible={showMore}
        setVisible={setShowMore}
      />
    </View>
  );
};
