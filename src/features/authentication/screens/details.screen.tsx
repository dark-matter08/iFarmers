import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../../infrastructure/theme';
import auth from '@react-native-firebase/auth';
import { storage } from '../../../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../redux/actions/auth.action';
import { useTheme } from '@react-navigation/native';
import { Button } from '../../../components/botton.component';
import * as ImagePicker from 'expo-image-picker';

export const DetailsScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [isLoading, setisLoading] = useState<boolean>(false);

  const onAuthStateChanged = (user: any) => {
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
      setSelectedImage(user.photoURL);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const triggerUpdate = () => {
    setisLoading(true);
    const subscriber = auth().onAuthStateChanged(handleUpdateDetails);
    return subscriber; //
  };

  const handleUpdateDetails = async (user: any) => {
    // Update the display name
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log('Display name updated successfully!');
      })
      .catch((error: any) => {
        console.error('Error updating display name:', error);
      });

    // Update the email
    user
      .updateEmail(email)
      .then(() => {
        console.log('Email updated successfully!');
      })
      .catch((error: any) => {
        console.error('Error updating email:', error);
      });

    if (selectedImage) {
      // Create a reference to the storage location where you want to store the image
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      const filename = selectedImage.substring(
        selectedImage.lastIndexOf('/') + 1
      );
      const fileRef = ref(storage, 'profile_images/' + user.uid + filename);

      if (user.photoURL === selectedImage) {
        dispatch(setCurrentUser(user));
        setisLoading(false);
        return;
      }

      // Upload the image file to the storage location
      uploadBytes(fileRef, blob)
        .then(() => {
          console.log('File uploaded successfully!');

          // Get the download URL of the uploaded file
          return getDownloadURL(fileRef);
        })
        .then((downloadURL) => {
          // Update the user's photoURL with the download URL of the image
          user.updateProfile({
            photoURL: downloadURL,
          });
          dispatch(setCurrentUser(user));
          setisLoading(false);
        })
        .then(() => {
          console.log('Image URL updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating image:', error);
          setisLoading(false);
        });
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 30,
      }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: theme.GOLD,
          paddingHorizontal: 20,
          paddingBottom: 40,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'ios' ? 60 : 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 35,
            textAlign: 'center',
            alignSelf: 'center',
            color: theme.GREY_1,
          }}>
          Complete your profile
        </Text>

        <TouchableOpacity
          onPress={pickImage}
          style={{
            height: 170,
            width: 170,
            borderRadius: 100,
            borderWidth: 5,
            borderColor: theme.VIOLET,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 100,
              }}
            />
          ) : (
            <Ionicons name={'md-image'} size={120} color={theme.VIOLET} />
          )}
        </TouchableOpacity>
        {/* detailes */}
        <View
          style={{
            flexDirection: 'row',
            height: 55,
            width: '90%',
            backgroundColor: colors.background,
            borderRadius: 10,
            paddingHorizontal: 20,
            marginVertical: 10,
          }}>
          <TextInput
            placeholder="Enter full names"
            placeholderTextColor={colors.text}
            onChangeText={setName}
            value={name}
            style={{
              flex: 1,
              height: '100%',
              fontSize: theme.FONT_SIZE_NORMAL + 2,
              paddingVertical: 0,
              paddingHorizontal: 8,
              color: colors.text,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 55,
            width: '90%',
            backgroundColor: colors.background,
            borderRadius: 10,
            paddingHorizontal: 20,
            marginTop: 5,
          }}>
          <TextInput
            placeholder="Enter email"
            placeholderTextColor={colors.text}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            value={email}
            style={{
              flex: 1,
              height: '100%',
              fontSize: theme.FONT_SIZE_NORMAL + 2,
              paddingVertical: 0,
              paddingHorizontal: 8,
              color: colors.text,
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <View
        style={{
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Button
          title="Proceed"
          height={65}
          isLoading={isLoading}
          onPress={triggerUpdate}
        />
      </View>
    </View>
  );
};
