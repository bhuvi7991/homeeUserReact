import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  StatusBar,
  Pressable,
  ImageBackground,
} from 'react-native';
import { ticIcon1, arrow, splashNew, splash, Oboard1 } from '../assets/img/Images';
import { api, storage } from '../services';
import Loader from './Loader';
import messaging from '@react-native-firebase/messaging';
import { useFocusEffect } from '@react-navigation/core';
import { set_Profile } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { checkLocationPermission, LocationRequest } from '../helper/location-permission';
import { PrimaryGreen } from '../helper/styles.helper';
import LottieView from 'lottie-react-native';
// import SplashScreen from '../assets/img/home_cook-new.json';
import SplashJson from '../assets/img/userApp_Splash.json'

const { width, height } = Dimensions.get('window');

const Languages = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(2);
  const [language, setLanguage] = useState('english');
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  // const [showSlider, setShowSlider] = useState(true);

  const get_UserData = async () => {
    // setLoader(true);
    var user = await storage.getUserData();
    setUser(user);
    setChecked(user?.selected_language_id);
    if (user?.selected_language_id == 1) {
      setLanguage('tamil');
      i18n.changeLanguage('tamil');
    } else if (user?.selected_language_id == 2) {
      setLanguage('english');
      i18n.changeLanguage('english');
    } else if (user?.selected_language_id == 3) {
      setLanguage('hindi');
      i18n.changeLanguage('hindi');
    } else if (user?.selected_language_id == 4) {
      setLanguage('malayalam');
      i18n.changeLanguage('malayalam');
    } else if (user?.selected_language_id == 5) {
      setLanguage('telugu');
      i18n.changeLanguage('telugu');
    } else if (user?.selected_language_id == 6) {
      setLanguage('kannada');
      i18n.changeLanguage('kannada');
    }
    // setLoader(false);
  };
  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  const get_Token = async () => {
    const isOldUser = await storage.getIsOldUser();
    console.log("isneeeeewuser", isOldUser);
    if (route?.params?.type == 'Change') {
    } else {
      await timeout(2000);
      var id = await storage.getToken();
      if (id != null) {
        get_UserData();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + id;
        navigation.navigate('Home');
      }
      else if (id == null && !isOldUser) {
        navigation.navigate('AppIntro')
      }
      setModal(true);
    }
  };
  useEffect(() => {

    // checkLocationPermission({ navigation });
    // requestLocationPermission({ navigation });
    get_Token();
  }, []);
  // useEffect(() => {
  //   get_Token();
  // }, [route?.params?.type == "Change"]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     get_UserData();
  //   }, [route?.params?.type]),
  // );

  var gender = [
    { name: 'தமிழ்', backName: 'தமிழ்', id: 1, value: 'tamil' },
    { name: 'ENGLISH', backName: 'ENG', id: 2, value: 'english' },
    { name: 'हिंदी', backName: 'हिंदी', id: 3, value: 'hindi' },
    { name: 'తెలుగు', backName: 'తెలుగు', id: 5, value: 'malayalam' },
    { name: 'മലയാളം', backName: 'മലയാ', id: 4, value: 'telugu' },
    { name: 'ಕನ್ನಡ', backName: 'ಕನ್ನಡ', id: 6, value: 'kannada' },
  ];
  const changeLanguage = async () => {
    setLoader(true);
    if (route?.params?.type == 'Change') {
      let response = await api.user_language(checked);
      if (response.status == 'success') {
        let res = await api.userDetail();
        storage.setUserData(res.user);
        dispatch(set_Profile(res.user));
        i18n.changeLanguage(language);
        navigation.navigate('Home');
      }
    } else {
      i18n.changeLanguage(language);
      navigation.navigate('LocationPermission', checked);
    }
    setLoader(false);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      {modal == true ? (
        loader != true && (
          <>
            <View
              style={{
                flexDirection: 'column',
                backgroundColor: '#09b44d',
                height: 60,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                justifyContent: 'center'
              }}>
              {route?.params?.type == 'Change' && (

                <TouchableOpacity
                  onPress={() => navigation.navigate('Home', { type: 'Profile' })}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                  }}>
                  <Image style={{ width: 9, height: 16 }} source={arrow} />
                  <Text style={{
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'Poppins-Bold',
                    paddingLeft: 10

                  }}>Languages</Text>
                </TouchableOpacity>
              )}
            </View>

            <View>
              <View style={{ margin: 30, alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 24,
                  }}>
                  {t('languagesPage.selectYourLanguage')}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 5,
                }}>
                {gender.map((item, key) => {
                  return (
                    <View style={styles.btnLang} key={key}>
                      <TouchableOpacity
                        onPress={() => {
                          setLanguage(item.value);
                          setChecked(item.id);
                        }}
                        style={styles.btninLang}>
                        <View
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor:
                              checked == item.id ? '#09b44d' : '#b6f0c6',
                          }}>
                          <Text
                            style={[
                              styles.lantext,
                              { color: checked == item.id ? '#fff' : PrimaryGreen },
                            ]}>
                            {item.name}
                          </Text>
                          <Text style={[styles.backText]}>{item.backName}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
            <TouchableOpacity
              onPress={changeLanguage}
              style={{
                // width: 160,
                width: '85%',
                height: 42,
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: PrimaryGreen,
                position: 'absolute',
                bottom: 20,
              }}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                {' '}
                {t('languagesPage.submit')}{' '}
              </Text>
            </TouchableOpacity>
          </>
        )
      ) : (
        <View style={{ width, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={splashNew} style={{ width: 240, height: 830, resizeMode: 'center' }} />
          {/* <LottieView source={require('../assets/img/HomeeSplash2.json')} autoPlay style={{ width: '100%', height: '100%' }} /> */}
        </View>
      )}
      <View>
        {loader && (
          <Modal transparent={false} visible={loader}>
            <Loader />
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  btnLang: {
    width: '50%',
    height: 120,
    padding: 10,
  },
  btninLang: {
    backgroundColor: '#09b44d',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 7,
  },
  lantext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#000',
    fontWeight: '900',
  },
  backText: {
    position: 'absolute',
    fontFamily: 'Poppins-Bold',
    fontSize: 50,
    opacity: 0.08,
    color: '#000',
    alignSelf: 'center',
  },
});
export default Languages;
