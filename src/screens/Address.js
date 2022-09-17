import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  PermissionsAndroid,
  Modal,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapPin, locationImage } from '../assets/img/Images';
import Geocoder from 'react-native-geocoding';
import Loader from './Loader';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { api, storage } from '../services';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { set_Profile } from '../redux/actions/authAction';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
const Address = ({ props, navigation, route }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  Geocoder.init('AIzaSyBCg78mJnB6gwR6Sg00nVquvwYWHaHiAcg');
  const mapRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [street, setStreet] = useState(null);
  const [street_err, setStreet_err] = useState(null);

  const [addressLocation, setAddressLocation] = useState(null);
  const [EditLocation, setEditLocation] = useState(null);
  const [addressComponent, setAddressComponent] = useState(null);

  const onChangeRegion = location => {
    updateAddress(location.latitude, location.longitude);
    setEditLocation(location);
  };

  const updateAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressDetail = json.results[0].formatted_address;
        setAddressLocation(addressDetail);
        setAddressComponent(json.results[0].address_components);
      })
      .catch(error => console.warn(error));
  };

  const updateLocation = (data, address = null) => {
    Geocoder.from(address.formatted_address)
      .then(json => {
        var location = json.results[0].geometry.location;
        changeRegion(location.lat, location.lng);
      })
      .catch(error => console.warn(error));
  };
  console.log("ran", route.params);

  const addrConfirm = async () => {
    var address_type = null;
    radioButtons.map((item, index) => {
      if (item.selected == true) {
        address_type = item.value;
      }
    }); if (street_err) {
      Alert.alert("Enter your street");
    } else {

      if (route.params?.type) {
        var parload = {
          street: street,
          address_type: address_type,
          address: JSON.stringify(addressComponent),
          longitude: EditLocation.longitude,
          latitude: EditLocation.latitude,
        }
        let response = await api.address(parload);
        if (response.status = 'success') {
          navigation.goBack();
        } else {
          Alert.alert('Unable to complete your request, try again later');
        }
      } else {
        let payload = {
          name: route.params.name,
          mobile: route.params.mobile,
          email: route.params.email,
          street: street,
          address_type: address_type,
          address: JSON.stringify(addressComponent),
          longitude: EditLocation.longitude,
          latitude: EditLocation.latitude,
          terms_conditions: route.params.terms_conditions,
        };
        setModal(true);
        let response = await api.register(payload);
        if (response.status == 'success') {
          storage.setToken(response.token);
          storage.setUserData(response.user);
          dispatch(set_Profile(response.user));
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.token;
          navigation.navigate('Home');
        } else {
          Alert.alert('Unable to complete your request');
        }
        setModal(false);
      }
    }
  };

  async function requestLocationPermission() {
    try {
      if (Platform.OS === "ios") {
        // your code using Geolocation and asking for authorisation with
        getCurrentLocation();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });
        Geolocation.requestAuthorization()
      } else {
        // ask for PermissionAndroid as written in your code
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Example App',
            message: 'Example App access to your location ',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setTimeout(() => {
            getCurrentLocation();
          }, 1000);
        } else {
          Alert.alert('Location permission denied');
        }
      }
    } catch (err) {
    }
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(location => {
      changeRegion(location.coords.latitude, location.coords.longitude);
    });
  };

  const changeRegion = (latitude, longitude) => {
    if (mapRef != null) {
      mapRef.current.animateToRegion(
        {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
        1000,
      );
    }
  };

  const onMapReady = () => {
    requestLocationPermission();
  };
  const StreetChange = e => {
    setStreet(e);
    if (e == null || e == "") {
      setStreet_err(true);
    } else {
      setStreet_err(false);
    }
  };
  const radioButtonsData = [
    {
      id: '1',
      label: 'Home',
      value: 'Home',
      selected: true,
    },
    {
      id: '2',
      label: 'Work',
      value: 'Work',
    },
    {
      id: '3',
      label: 'Other',
      value: 'Other',
    },
  ];
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const onPressRadioButton = radioButtonsArray => {
    setRadioButtons(radioButtonsArray);
  };
  return (
    <SafeAreaView style={{
      flex: 1, flexDirection: 'column'
    }}>
      <View style={{ flex: 7, width: '100%' }}>
        <View
          style={{
            position: 'absolute', top: 0, left: 0, zIndex: 111, width: '100%', backgroundColor: '#fff',
          }}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed="auto"
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={updateLocation}
            getDefaultValue={() => ''}
            currentLocation={false}
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch"
            GoogleReverseGeocodingQuery={{}}
            enablePoweredByContainer={false}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
              type: 'cafe',
            }}
            GooglePlacesDetailsQuery={{ fields: 'formatted_address' }}
            filterReverseGeocodingByTypes={[
              'locality',
              'administrative_area_level_3',
            ]}
            debounce={200}
            query={{
              key: 'AIzaSyBCg78mJnB6gwR6Sg00nVquvwYWHaHiAcg',
              language: 'en',
              type: 'establishment',
            }}
            styles={{
              textInputContainer: {
                backgroundColor: 'grey',
              },
              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
        </View>
        <MapView
          initialRegion={{
            latitude: 13.082503632626072,
            longitude: 80.27548090005553,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 38,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          // showsUserLocation={true}
          showsUserLocationButton={true}
          zoomEnabled={true}
          onRegionChangeComplete={onChangeRegion}
          onMapReady={onMapReady}
        />
        <Image
          source={mapPin}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 2,
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -35,
          }}
          title={'title'}
          description={'description'}
        />

        {/* <TouchableOpacity
        style={{
          position: 'absolute',
          top: 50,
          right: 10,
          width: 40,
          height: 40,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}
        onPress={getCurrentLocation}
        accessibilityLabel="Learn more about this purple button">
        <Image
          source={locationImage}
          style={{ width: 25, height: 25, tintColor: '#000' }}
        />
      </TouchableOpacity> */}
      </View>
      <View
        style={{
          // flex:3.5,
          height: 'auto',
          width: '100%',
          backgroundColor: '#fff',
          zIndex: 11,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderColor: '#e5e5e5',
          borderWidth: 2,
          paddingHorizontal: 25,
          paddingBottom: 20,
        }}>
        <Text
          style={{
            width: '100%',
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            textAlign: 'justify',
            marginTop: 15,
          }}>
          {t('addressPage.deliveryLocation')}
        </Text>
        <Text
          style={{
            width: '100%',
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
            lineHeight: 21,
            textAlign: 'justify',
            paddingBottom: 0,
            paddingTop: 5,
            height: 80,
          }}>
          {addressLocation}
        </Text>
        <View>
          <TextInput
            value={street}
            onChangeText={StreetChange}
            placeholder="Enter your street *"
            style={{
              borderColor: '#09b44d',
              borderStyle: 'solid',
              borderWidth: 1,
              paddingVertical: 5,
              paddingHorizontal: 15,
              marginBottom: 5,
              width: 250,
              borderRadius: 20,
              color: '#000',
            }}
          />
        </View>
        {street_err && (
          <Text style={{ color: 'tomato', marginLeft: 10 }}>
            {t('addressPage.streetErr')}
          </Text>
        )}
        <View style={{ margin: 10 }}>
          <RadioGroup
            layout="row"
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
        </View>
        <TouchableOpacity
          disabled={street == null ? true : false}
          style={{
            backgroundColor: street == null ? '#D1F0DD' : '#09b44d',
            borderRadius: 40,
            padding: 10,
            margin: 10,
          }}
          onPress={addrConfirm}>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#fff' }}>
            {t('addressPage.confirmAddress')}
          </Text>
        </TouchableOpacity>
        {modal && (
          <Modal animationType="fade" transparent={true} visible={modal}>
            <Loader></Loader>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Address;
