import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '../../../infrastructure/theme';

const dummyLocations = [
  { latitude: 4.155, longitude: 9.2312 },
  { latitude: 4.16, longitude: 9.23 },
  { latitude: 4.17, longitude: 9.24 },
  // Add more dummy locations as needed
];

export const HomeScreen = () => {
  const { colors } = useTheme();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [status, requestPermission] = Location.useForegroundPermissions();
  const mapRef = useRef<MapView>(null);

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
            console.log(location);

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
        <TouchableOpacity
          onPress={handleCenterOnLocation}
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
          <Ionicons name={'ios-location'} size={35} color={theme.GREEN_MED} />
        </TouchableOpacity>
        <TouchableOpacity
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
          <Ionicons name={'add'} size={35} color={theme.GREEN_MED} />
        </TouchableOpacity>
      </View>
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
