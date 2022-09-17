import React from 'react';
import {View, ActivityIndicator, Image, Text, ToastAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {mapPin} from '../assets/img/Images';

const Map2 = props => {
  return props?.region?.latitude ? (
    <>
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
        {...props}></MapView>
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
    </>
  ) : (
    <Text>'ds'</Text>
  );
};

export default Map2;
