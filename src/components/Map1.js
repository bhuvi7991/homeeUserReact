import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

import {mapPin} from '../assets/img/Images';

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(initialState);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          ...currentLocation,
          latitude,
          longitude,
        });
      },
      error => alert(console.error.message),
    );
  }, []);

  return currentLocation.latitude ? (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        showsUserLocation={true}
        showsUserLocationButton={true}
        zoomEnabled={true}
        initialRegion={currentLocation}>
        {/* <Marker coordinate={currentLocation} image={{uri: 'custom_pin'}} /> */}
      </MapView>
      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -48,
          marginLeft: -24,
        }}>
        <Image source={mapPin} style={{height: 40, width: 40}} />
      </View>
    </View>
  ) : (
    <ActivityIndicator style={{flex: 1}} animating size="large" />
  );
};

export default Map;
