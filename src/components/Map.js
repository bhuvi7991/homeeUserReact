import React, { Component } from 'react';
import { View, Image, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { mapPin } from '../assets/img/Images';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginBottom: 1,
    };
  }

  componentDidMount() {
    this.handleUserLocation();
    setTimeout(() => this.setState({ marginBottom: 0 }), 100);
  }

  handleUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        alert(JSON.stringify(position));
        const { latitude, longitude } = position.coords;

        this.setState({
          position: {
            latitude,
            longitude,
          },
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.001,
          },
        });
      },
      err => {
        alert('something wrong');
      },
    );
  };

  onChangeValue = region => {
    ToastAndroid.show(JSON.stringify(region), ToastAndroid.SHORT);
    this.setState({
      region,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1, marginBottom: this.state.marginBottom }}
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={this.onChangeValue}
          zoomEnabled={true}
          ref={ref => (this.map = ref)}></MapView>

        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -48,
            marginLeft: -24,
          }}>
          <Image
            source={mapPin}
            style={{
              height: 40,
              width: 40,
            }}
          />
        </View>
      </View>
    );
  }
}
