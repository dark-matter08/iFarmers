import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
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
import { EditModal } from '../components/edit-modal.component';

export const ListScreen = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [userPoints, setUserPoints] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { colors } = useTheme();

  useEffect(() => {
    console.log(user);
    setIsLoading(true);
    fetchUserPoints(user.uid);
  });

  const fetchUserPoints = async (uid: string) => {
    try {
      const querySnapshot = await firestore().collection('points').get();

      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        // Retrieve the data from each document
        const docData = doc.data();
        data.push(docData);
      });

      setUserPoints(data);

      console.log('Fetched data:', data);
      setIsLoading(false);
      // You can perform any additional actions with the fetched data
    } catch (error) {
      console.log(error);

      //   showToast({
      //     type: 'error',
      //     title: 'Error fetching data',
      //     message: 'Encountered an error tryiing to fetch your points',
      //   });
      setIsLoading(false);
    }
  };

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
          My Points
        </Text>
        <Ionicons name={'filter'} size={30} color={theme.FACEBOOK} />
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          height: 70,
          width: 70,
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 20,
          bottom: 20,
          backgroundColor: colors.background,
          // Shadow and elevation styles
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Ionicons name={'add-outline'} size={50} color={theme.FACEBOOK} />
      </TouchableOpacity>
      <EditModal visible={modalVisible} setVisible={setModalVisible} />
    </View>
  );
};
