import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  focus,
  blur,
  ImageBackground,
  TouchableOpacity,
  Button,
  StatusBar,
  Modal,
  Dimensions,
} from 'react-native';

// import * as api from '../components/api';
import { backImg, mobileIcon, inputBorder } from '../assets/img/Images';
import { api, storage } from '../services/index';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import messaging from '@react-native-firebase/messaging';
import { checkLocationPermission, LocationRequest } from '../helper/location-permission';
import { requestLocationPermission } from './TrackMap';
var { width, height } = Dimensions.get('window');
const LogIn = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(false);
  const [MobileNo, setMobileNo] = useState('');
  const [fcm_token, setFcm_token] = useState(null);
  const MobileNoLegnth = 10;
  const get_Token = async () => {
    // setModal(true);
    var fcm_token = await messaging().getToken();
    //  console.log('token*****',fcm_token);
    setFcm_token(fcm_token);
    var id = await storage.getToken();
    if (id != null) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + id;
      navigation.navigate('Home');
    }
    // setModal(false);
  };
  const locationPermissionCheck = () => {

  }
  useEffect(() => {
    // LocationRequest();
    get_Token();
  }, []);
  const onProceed = async () => {
    setModal(true);
    var payload = {};
    if (fcm_token === null) {
      payload = { mobile: MobileNo, user_language_id: route.params };
    } else {
      payload = {
        mobile: MobileNo,
        user_language_id: route.params,
        fcm_id: fcm_token,
      };
    }

    let res = await api.login(payload);
    if (res?.user) {
      console.log(res.user.otp);
      navigation.navigate('Otp', { user: res.user });
      if (res?.user?.otp) {
        alert(
          `Your OTP is : ${res.user.otp}.\n App in Debug Mode.\nNeed to remove otp key in production mode and this alert will also disabled`,
        );
      }
    }
    setModal(false);
  };

  const mobileNoChange = e => {
    setMobileNo(e);
  };

  return (
    <>
      {modal != true ? (
        <View style={styles.container}>
          {/* Translations snmple <Text style={{ marginLeft: 30 }}>{t("welcome")}</Text> */}
          <StatusBar backgroundColor="#114527" />
          <ImageBackground source={backImg} style={styles.backgroundImg}>
            <View
              style={{
                flex: 2,
                color: '#fff',
                justifyContent: 'center',
                alignContent: 'center',
                padding: 20,
              }}>
              <Text style={styles.font1}>{t('logInPage.welcomeBack')} </Text>
              <Text style={styles.font4}>
                {t('logInPage.signIntoContinue')}
              </Text>
            </View>
            <View style={{ flex: 3, alignItems: 'center' }}>
              <View
                style={{
                  width: '100%',
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={inputBorder}
                  style={styles.inputBorder}>
                  <Text style={styles.labelInput}>
                    {t('logInPage.mobileNo')}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={mobileIcon} style={styles.mobileIcon} />
                    <TextInput
                      value={MobileNo}
                      keyboardType="numeric"
                      maxLength={MobileNoLegnth}
                      onChangeText={mobileNoChange}
                      style={styles.input}
                      selectionColor={'#fff'}
                    />
                  </View>
                </ImageBackground>
              </View>
              <Pressable
                onPress={onProceed}
                style={{
                  alignItems: 'center',
                  marginTop: 40,
                  backgroundColor: '#fff',
                  width: 170,
                  height: 40,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.buttonStyle}>{t('logInPage.proceed')}</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View></View>
      )}
      <View>
        {modal && (
          <Modal transparent={true} visible={modal}>
            <Loader />
          </Modal>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  backgroundImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  font1: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: height * 0.037,
    opacity: 0.8,
  },
  font3: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 15.5,
    opacity: 1,
  },
  font4: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    opacity: 0.7,
  },
  inputBorder: {
    width: width / 1.13,
    justifyContent: 'center',
    height: height / 13,
  },
  inputGroup: {
    flexDirection: 'row',
    width: width / 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 13.1,
  },
  labelInput: {
    color: '#fff',
    fontSize: width * 0.036,
    fontFamily: 'Poppins-Regular',
    position: 'absolute',
    marginLeft: width * 0.1,
    top: width * 0,
  },
  mobileIcon: {
    width: 15,
    height: 24,
    marginLeft: 18,
  },
  input: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    width: width,
    marginLeft: 10,
  },
  buttonBack: {
    height: 46,
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    fontSize: width * 0.04,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
});

export default LogIn;
