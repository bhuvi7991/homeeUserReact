import { StyleSheet, Text, View, PermissionsAndroid, ToastAndroid, AlertIOS } from 'react-native'
import React from 'react'
import Geolocation from '@react-native-community/geolocation';


export async function checkLocationPermission({ navigation }) {
    console.log("check");
    try {
        const check = await PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION');
        const check1 = await PermissionsAndroid.check('android.permission.ACCESS_COARSE_LOCATION');
        if ((check || check1) === true) {
            // await navigation.navigate('Address')
            if (Platform.OS === 'android') {
                ToastAndroid.show('Location Permission Already Active', ToastAndroid.SHORT)
            } else {
                AlertIOS.alert('Location Permission Already Active');
            }
        }
        else {
            console.log("else part for check per");
            await requestLocationPermission();
            // navigation.navigate('LocationPermission');
        }
    }
    catch (err) {
        console.log("error", err);
    }
}
export async function requestLocationPermission() {
    console.log("reqLocPermission");
    try {
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
            // navigation.navigate('LogIn');
            return true;
        } else {
            alert('Location permission denied');
        }
        return false;
    } catch (err) {
        console.warn(err);
    }
}

export async function getCurrentLocation() {
    try {
        const location = Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

            }, (error) => console.log(error.message), {
            enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
        }
        );
    }
    catch (error) {
        console.log("error in getting current location", error);
    }
}

const styles = StyleSheet.create({})