import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '../../../infrastructure/theme';
import axios from 'axios';
import { showToast } from '../../../utils/showToast';

function getRandomInRange(min: number, max: number, decimalPlaces: number) {
  const random = Math.random() * (max - min) + min;
  return Number(random.toFixed(decimalPlaces));
}

const dummyLocations = Array.from({ length: 8 }, () => ({
  latitude: getRandomInRange(4.61, 4.65, 6),
  longitude: getRandomInRange(9.4, 9.55, 6),
}));

interface Icon {
  name: 'ios-location' | 'add';
  fxn: (() => void) | (() => null);
}

const API_KEY = 'AIzaSyB1-zWe-Xc_GKGtkqSa48POSP0TxJaRK30';

export const HomeScreen = () => {
  const { colors } = useTheme();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [searchQ, setSearchQ] = useState('');
  const mapRef = useRef<MapView>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    } catch (error) {
      console.log('Error getting current location:', error);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQ}&key=${API_KEY}`
      );

      console.log(response.data);

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCurrentLocation({ latitude: lat, longitude: lng });
      } else {
        showToast({
          title: 'Location not found',
          message: 'Please try a different search term.',
          type: 'error',
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error searching for location:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleCenterOnLocation = () => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      mapRef?.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const icons: Icon[] = [
    {
      name: 'ios-location',
      fxn: handleCenterOnLocation,
    },
    {
      name: 'add',
      fxn: () => null,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {currentLocation ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            pinColor={'blue'}
            title="My Location"
          />

          {dummyLocations.map((location, index) => {
            return (
              <Marker
                key={index}
                coordinate={location}
                pinColor={'red'}
                title={`Location ${index + 1}`}
                description={`Dummy Location ${index + 1}`}
                // image={{ uri: 'custom_pin' }}
              />
            );
          })}
        </MapView>
      ) : (
        <ActivityIndicator size={'large'} />
      )}

      <View
        style={{
          position: 'absolute',
          width: 60,
          minHeight: 150,
          right: 20,
          bottom: 20,
          borderRadius: 40,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {icons.map((x, i) => {
          return (
            <TouchableOpacity
              onPress={() => x.fxn()}
              key={i}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background,
                // Shadow and elevation styles
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Ionicons name={x.name} size={35} color={theme.FACEBOOK} />
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          position: 'absolute',
          height: 55,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: colors.background,
          // Shadow and elevation styles
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 30,
          top: Platform.OS === 'ios' ? 60 : 50,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Search our system"
          placeholderTextColor={colors.text}
          onChangeText={setSearchQ}
          value={searchQ}
          style={{
            flex: 1,
            height: '100%',
            fontSize: theme.FONT_SIZE_NORMAL + 2,
            paddingVertical: 0,
            paddingHorizontal: 8,
            color: colors.text,
          }}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            height: 45,
            width: 45,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
            // Shadow and elevation styles
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Ionicons name={'search'} size={26} color={theme.FACEBOOK} />
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            backgroundColor: theme.DARK,
            opacity: 0.8,
            height: '100%',
            width: '100%',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
