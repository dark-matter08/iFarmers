/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@react-navigation/native';
import React, { RefObject, useEffect, useRef } from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Ionicons from '@expo/vector-icons/Ionicons';
import { showToast } from '../../../utils/showToast';
import theme from '../../../infrastructure/theme';

navigator.geolocation = require('@react-native-community/geolocation');

interface PlaceSelectorProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selected: any;
  setSelected: (selected: any) => void;
  title?: string;
}

export const PlaceSelector: React.FC<PlaceSelectorProps> = (props) => {
  const { colors } = useTheme();

  const {
    visible,
    setVisible,
    selected,
    setSelected,
    title = 'Search Location',
  } = props;

  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    ref?.current?.getCurrentLocation();
    if (selected?.name) {
      ref?.current?.setAddressText(selected?.name ? selected?.name : '');
    }
  }, [selected]);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="pageSheet"
      onRequestClose={() => {
        setVisible(!visible);
      }}
      style={{
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 10,
          backgroundColor: colors.background,
          flex: 1,
        }}>
        {/* Navigation */}
        <View
          style={{
            width: '100%',
            marginBottom: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingTop: 10,
            }}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                backgroundColor: colors.background,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={() => setVisible(false)}>
              <Ionicons size={25} name="chevron-down" />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 22,
                fontWeight: '800',
                color: colors.text,
              }}>
              {title}
            </Text>
          </View>
        </View>

        <View style={{ width: '100%', flex: 1, marginBottom: 20 }}>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Search"
            onPress={(data, details = null) => {
              const new_location = {
                address: {
                  city: details?.address_components[0].long_name,
                  country: details?.address_components[3].long_name,
                  name: details?.name,
                  state: details?.address_components[2].long_name,
                  streetName: details?.vicinity,
                  zipCode: '',
                },
                coordinate: {
                  latitude: details?.geometry.location.lat,
                  longitude: details?.geometry.location.lng,
                  didCancle: false,
                },
                formatted_address: details?.formatted_address,
              };
              console.log(details);
              setSelected(new_location);
              setVisible(false);
            }}
            autoFillOnNotFound={true}
            fetchDetails={true}
            nearbyPlacesAPI="GooglePlacesSearch"
            GooglePlacesDetailsQuery={{
              fields:
                'formatted_address,name,geometry,vicinity,address_components,adr_address,type',
            }}
            query={{
              key: 'AIzaSyB1-zWe-Xc_GKGtkqSa48POSP0TxJaRK30',
              language: 'en',
              components: 'country:cm',
            }}
            currentLocation={true}
            currentLocationLabel="Around Me"
            onTimeout={() => {
              setVisible(false);
              showToast({
                type: 'warning',
                title: 'Network Error',
                message:
                  'we are facing a little network issue. please try again later',
              });
            }}
            styles={{
              container: {
                flex: 1,
              },
              textInputContainer: {
                flexDirection: 'row',
                marginHorizontal: 15,
              },
              textInput: {
                backgroundColor: theme.GREY_5,
                height: 44,
                borderRadius: 8,
                paddingVertical: 5,
                paddingHorizontal: 15,
                fontSize: 15,
                flex: 1,
                color: theme.DARK,
              },
              powered: {
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderColor: '#c8c7cc',
                borderTopWidth: 0.2,
                backgroundColor: colors.background,
              },
              listView: {
                // backgroundColor: colors.background,
                marginTop: 5,
                paddingTop: 5,
                borderTopWidth: 0.5,
                color: colors.text,
              },
              row: {
                backgroundColor: colors.background,
                padding: 13,
                height: 48,
                flexDirection: 'row',
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 4,
                marginBottom: 10,
                marginHorizontal: 15,
                borderRadius: 5,
              },
              separator: {
                height: 0,
                backgroundColor: colors.text,
                opacity: 0.5,
              },
              description: {
                height: 20,
              },
              loader: {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: 20,
                marginRight: 10,
              },
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
