import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Linking,
} from 'react-native';
import * as api from '../components/api';
import {
  backImg,
  mobileIcon,
  inputBorder,
  arrow,
  emailIcon,
  userIcon,
} from '../assets/img/Images';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { EMAIL } from '../constants';
import { useTranslation } from 'react-i18next';
import CheckBox from '@react-native-community/checkbox';
import { AppBackground, HomeBgColor, PrimaryGreen } from '../helper/styles.helper';

var { width, height } = Dimensions.get('window');

const SignUp = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const initialState = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  const { params: { user: { id = 0, mobile = 0 } = {} } = {} } = route;
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(initialState);
  const [mobileNo, setMobileNo] = useState(mobile);
  const [area, setArea] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [termsCondi, setTermsCondi] = useState(false);


  const [firstName_err, setFirstName_err] = useState(null);
  const [lastName_err, setLastName_err] = useState(null);
  const [email_err, setEmail_err] = useState(null);
  const [terms_err, setTerms_err] = useState(null);
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       //alert(JSON.stringify(position));
  //       const { latitude, longitude } = position.coords;
  //       setCurrentLocation({
  //         ...currentLocation,
  //         latitude,
  //         longitude,
  //         marginBottom: 1,
  //       });
  //     },
  //     error => alert(console.error),
  //   );
  // }, []);
  const clickTermsCondi = e => {
    setTermsCondi(e);
    if (e == true) {
      setTerms_err(false);
    } else {
      setTerms_err(true);
    }
  }
  const onProceed = async () => {
    if (firstName == null || firstName == '') {
      setFirstName_err(true);
    }
    if (lastName == null || lastName == '') {
      setLastName_err(true);
    }
    if (email == null || email == '') {
      setEmail_err(true);
    } else if (EMAIL.test(email) === true) {
      setEmail_err(false);
    } else {
      setEmail_err(true);
    }
    if (termsCondi == false) {
      setTerms_err(true);
    }
    if (
      firstName_err === false &&
      firstName.length > 0 &&
      lastName_err === false &&
      lastName.length > 0 &&
      email.length > 0 &&
      email_err === false &&
      terms_err === false
    ) {
      let data = {
        mobile: mobile,
        name: firstName,
        email: email,
        terms_conditions: termsCondi,
      };
      navigation.navigate('Address', data);
    } else {
      alert('Enter all the details');
    }
    // navigation.navigate("Address");
    // let data = await api.register({
    //   cook_id: id,
    //   name: firstName,
    //   last_name: lastName,
    //   email: email,
    //   mobile: mobile,
    //   longitude: currentLocation.longitude,
    //   latitude: currentLocation.latitude,
    //   area: area,
    //   street: street,
    //   city: city,
    //   pin_code: pinCode,
    // });
    // if (data?.user) {
    //   axios.defaults.headers.common['Authorization'] = data.token;
    //   navigation.navigate('Home', { user: data.suer });
    // }
    //alert(`token id: ${data.token}`);
  };

  const firstNameChange = e => {
    setFirstName_err(false);
    setFirstName(e);
  };
  const lasttNameChange = e => {
    setLastName_err(false);
    setLastName(e);
  };
  const emailChange = e => {
    if (EMAIL.test(e) === true) {
      setEmail_err(false);
    } else {
      setEmail_err(true);
    }
    setEmail(e);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={HomeBgColor} />
      <View
        style={{
          color: '#fff',
          paddingHorizontal: 20,
          backgroundColor: HomeBgColor,
        }}>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LocationPermission')}
            style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
            <Image style={{ width: 11, height: 18, tintColor: 'black' }} source={arrow} />
            <Text style={styles.headerText}>
              {t('signUpPage.back')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: HomeBgColor, paddingTop: 20 }}>
        <Text style={{ width: '100%', textAlign: 'left', marginLeft: '20%', fontFamily: 'Poppins-Bold', fontSize: 24 }}>
          {t('signUpPage.registration')}
        </Text>
        <Text style={{ width: '100%', textAlign: 'left', marginLeft: '20%', fontFamily: 'Poppins-Bold', marginTop: 15 }}>First Name</Text>
        <TextInput
          placeholder='Enter Your First Name'
          value={firstName}
          onChangeText={firstNameChange}
          style={styles.input}
        />
        {firstName_err && (
          <Text style={{ width: '85%', textAlign: 'left', color: 'tomato', marginLeft: 10 }}>
            {t('signUpPage.firstNameErr')}
          </Text>
        )}
        <Text style={{ width: '100%', textAlign: 'left', marginLeft: '20%', fontFamily: 'Poppins-Bold', marginTop: 10 }}>Last Name</Text>
        <TextInput
          placeholder='Enter Your Last Name'
          value={lastName}
          style={styles.input}
          onChangeText={lasttNameChange}
        />
        {lastName_err && (
          <Text style={{ width: '85%', textAlign: 'left', color: 'tomato', marginLeft: 10 }}>
            {t('signUpPage.lastNameErr')}
          </Text>
        )}
        <Text style={{ width: '100%', textAlign: 'left', marginLeft: '20%', fontFamily: 'Poppins-Bold', marginTop: 10 }}>Email ID</Text>
        <TextInput
          placeholder='Enter Your Email ID'
          value={email}
          keyboardType="email-address"
          style={styles.input}
          onChangeText={emailChange}
        />
        {email_err && (
          <Text style={{ width: '85%', textAlign: 'left', color: 'tomato', marginLeft: 10 }}>
            {email != null
              ? t('signUpPage.emailIvalidErr')
              : t('signUpPage.emailErr')}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginLeft: 25,
            marginRight: 15
          }}>
          <CheckBox
            value={termsCondi}
            onValueChange={clickTermsCondi}
            boxStyle={{ color: PrimaryGreen }}
            tintColors={{ true: PrimaryGreen, false: PrimaryGreen }}
            style={{ width: 20, height: 20, marginRight: 10, }}
          />
          {/* <View> */}
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              lineHeight: 23,
            }}>
            Agree to Homee Platform{' '}
            <Text
              style={{
                color: '#989898',
                marginLeft: 10,
              }}
              onPress={() => navigation.navigate('TermsAndConditions')
                // Linking.openURL(
                //   'http://homeefoodz.com/terms-and-condition.html',
                // )
              }>
              {`Terms & Conditions `}
            </Text>
            and
            <Text
              style={{
                paddingLeft: 10,
                color: '#989898',
              }}
              onPress={() => navigation.navigate('PrivacyPolicy')
                // Linking.openURL('http://homeefoodz.com/privacy-policy.html')
              }>
              {` Privacy policy`}
            </Text>

          </Text>
          {/* <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',
                  lineHeight: 23,
                  marginTop: 2,
                }}
                onPress={() => Linking.openURL('http://google.com')}></Text> */}
        </View>
        {/* </View> */}
        {terms_err && (
          <Text style={{ width: '85%', textAlign: 'left', color: 'tomato', marginLeft: 10 }}>
            Please Accept Trems and Condition *
          </Text>
        )}
        <TouchableOpacity
          onPress={onProceed}
          style={{
            alignItems: 'center',
            marginTop: 40,
            backgroundColor: PrimaryGreen,
            width: "90%",
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.buttonStyle}>{t('signUpPage.singUp')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
  headerStyle: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: HomeBgColor,
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Poppins-Bold',
    // marginTop: -19,
    marginLeft: 15,
    marginTop: -5
  },
  font1: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
    fontSize: 27,
    opacity: 0.7,
  },
  font3: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 15.5,
    opacity: 1,
  },
  font4: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    opacity: 0.7,
  },
  inputBorder: {
    width: width / 1.13,
    justifyContent: 'center',
    height: height / 13,
    marginTop: 25,
  },
  inputGroup: {
    flexDirection: 'row',
    width: width / 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 13.1,
  },
  labelInput: {
    color: '#000',
    fontSize: width * 0.032,
    fontFamily: 'Poppins-Regular',
    position: 'absolute',
    marginLeft: width * 0.087,
    top: width * -0.012,
  },
  mobileIcon: {
    width: 20,
    height: 23,
    marginLeft: 18,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 25,
    backgroundColor: AppBackground,
    paddingHorizontal: 20,
    color: '#000',
    fontFamily: 'Poppins-Bold'
    // fontSize: 18,
    // fontFamily: 'Poppins-Bold',
    // color: '#000',
    // width: width,
    // marginLeft: 10,
  },
  buttonBack: {
    height: 46,
    marginVertical: 40,
    borderRadius: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonStyle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
});

export default SignUp;
