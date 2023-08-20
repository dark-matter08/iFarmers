import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Button } from '../../../components/botton.component';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '../../../infrastructure/theme';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { showToast } from '../../../utils/showToast';
import { useSelector } from 'react-redux';
import { PlaceSelector } from './place-selector.component';

interface EditModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const EditModal = ({ visible, setVisible }: EditModalProps) => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [type, setType] = useState('urban farms');
  const [description, setDescription] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [placeVisible, setPlaceVisible] = useState(false);
  const [selected, setSelected] = useState<any>();

  const pickerRef = useRef<Picker<string>>(null);

  useEffect(() => {
    console.log(selected);

    if (selected) {
      setLatitude(selected?.coordinate?.latitude);
      setLongitude(selected?.coordinate?.longitude);
      setPlaceName(selected?.address.name);
      setCity(selected?.address?.city);
    }
  }, [selected]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    if (!selectedImage) {
      showToast({
        type: 'error',
        title: 'Image not selected',
        message: 'An image must be selected to proceeed',
      });
      return;
    }

    setTimeout(async () => {
      try {
        // const response = await fetch(selectedImage);

        const filename = selectedImage.substring(
          selectedImage.lastIndexOf('/') + 1
        );
        // const fileRef = ref(storage, 'profile_images/' + user.uid + filename);
        const reference = storage().ref('point_images/' + user.uid + filename);
        const task = reference.putFile(selectedImage);
        task.then(async () => {
          console.log('Image uploaded successfully!');
          const url = await storage()
            .ref('point_images/' + user.uid + filename)
            .getDownloadURL();
          const data = {
            name,
            type,
            description,
            longitude,
            latitude,
            placeName,
            city,
            user,
            uid: user.uid,
            url: url,
          };
          const res = await firestore().collection('points').add(data);

          setTimeout(() => {
            setType('urban farms');
            setName('');
            setDescription('');
            setLongitude('');
            setLatitude('');
            setPlaceName('');
            setSelectedImage('');
            showToast({
              type: 'success',
              title: 'Point Added',
              message: 'You have successfully added a point to our system',
            });
            setVisible(false);
            setIsLoading(false);
          }, 200);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setVisible(false);
        setTimeout(() => {
          showToast({
            type: 'error',
            title: 'Error adding info',
            message: 'An error occured while trying to submit data to database',
          });
        }, 200);
      }
    }, 300);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <View
          style={{
            height: '90%',
            top: '10%',
            position: 'absolute',
            width: '100%',
            backgroundColor: colors.background,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingHorizontal: 23,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              onPress={pickImage}
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
                alignSelf: 'center',
              }}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 90,
                  }}
                />
              ) : (
                <Ionicons name={'md-image'} size={120} color={theme.VIOLET} />
              )}
            </TouchableOpacity>
            <Text
              style={{
                color: colors.text,
                textAlign: 'left',
                fontWeight: '500',
                fontSize: 20,
              }}>
              Name:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                height: 55,
                width: '100%',
                backgroundColor: theme.GREY_5,
                borderRadius: 10,
                paddingHorizontal: 20,
                marginVertical: 10,
                alignSelf: 'center',
              }}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter point name"
                placeholderTextColor={theme.DARK}
                style={{
                  flex: 1,
                  height: '100%',
                  fontSize: theme.FONT_SIZE_NORMAL + 2,
                  paddingVertical: 0,
                  paddingHorizontal: 8,
                  color: theme.DARK,
                }}
              />
            </View>

            <Text
              style={{
                color: colors.text,
                textAlign: 'left',
                fontWeight: '500',
                fontSize: 20,
              }}>
              Type:
            </Text>

            <Picker<string>
              style={{
                flexDirection: 'row',
                height: 55,
                width: '100%',
                backgroundColor: theme.GREY_5,
                borderRadius: 10,
                paddingHorizontal: 20,
                marginVertical: 10,
                alignSelf: 'center',
              }}
              ref={pickerRef}
              selectedValue={type}
              onValueChange={(itemValue: any) => setType(itemValue)}>
              <Picker.Item label="Urban Farms" value="urban farms" />
              <Picker.Item label="Food Markets" value="food markets" />
              <Picker.Item label="Restaurants" value="restaurants" />
            </Picker>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => setPlaceVisible(true)}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: theme.GREY_5,
                  marginRight: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name={'location'} size={30} color={theme.VIOLET} />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 45,
                    width: '100%',
                    backgroundColor: theme.GREY_5,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    marginVertical: 10,
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    value={placeName}
                    onChangeText={setPlaceName}
                    placeholder="Edit place name"
                    placeholderTextColor={theme.DARK}
                    style={{
                      flex: 1,
                      height: '100%',
                      fontSize: theme.FONT_SIZE_NORMAL + 2,
                      paddingVertical: 0,
                      paddingHorizontal: 8,
                      color: theme.DARK,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: theme.VIOLET,
                    textAlign: 'right',
                    fontWeight: '600',
                  }}>
                  Coordinates:{' '}
                  {latitude
                    ? `${latitude}, ${longitude}`
                    : 'Select Coordinates'}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: colors.text,
                textAlign: 'left',
                fontWeight: '500',
                fontSize: 20,
              }}>
              Description:
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              style={{
                height: 80,
                width: '100%',
                backgroundColor: theme.GREY_5,
                borderRadius: 10,
                paddingHorizontal: 20,
                marginVertical: 10,
                alignSelf: 'center',
                fontSize: 17,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 0,
                marginTop: 20,
              }}>
              <Button
                width={55}
                title="X"
                onPress={() => {
                  setIsLoading(false);
                  setVisible(false);
                }}
              />
              <Button
                width={'76%'}
                title="Save"
                onPress={handleSave}
                isLoading={isLoading}
              />
            </View>
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </Modal>
      <PlaceSelector
        visible={placeVisible}
        setVisible={setPlaceVisible}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};
