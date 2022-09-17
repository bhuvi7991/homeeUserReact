/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Modal,
  BackHandler,
  Linking,
  StatusBar,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  locatIcon,
  arrow,
  logOutICon,
  wishListIcon,
  languageIcon,
  paymentIcon,
  walletIcon,
  orderIcon,
  supportIcon,
  privacyIcon,
  support,
  TrackOrder,
  wallet,
  manageAddress
} from '../assets/img/Images';
import { useTranslation } from 'react-i18next';
import { api, storage } from '../services/index';
import Loader from './Loader';
import { useFocusEffect } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeBgColor, PrimaryGreen } from '../helper/styles.helper';
import backButton from '../assets/img/back_button.png';
import NotificationIcon from '../assets/img/bel_icon.png';
import FavouriteIcon from '../assets/img/favr_icon.png';
import SettingsIcon from '../assets/img/setting_icon.png';
import VersionCheck from 'react-native-version-check';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PROFILE, TOKEN, COUPON_CODE } from '../redux/actions/actionTypes';

const Profile = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [vegCheckBox, setVegCheckBox] = useState(false);
  const [nonVegCheckBox, setNonVegCheckBox] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);
  const get_UserData = async () => {
    setModal(true);
    var user = await storage.getUserData();
    setUser(user);
    setModal(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      get_UserData();
    }, []),
  );

  const logout = () => {
    Alert.alert('Confirmation', 'Are you sure want to Sign Out?', [
      {
        text: 'Sign Out',
        onPress: () => {
          logoutApi();
        },
      },
      { text: 'cancel' },
    ]);
  };
  const logoutApi = async () => {
    let response = await api.logout();
    console.log("vybnbok", response);
    // storage.clearAsyncStorage();
    if (response.status == 'success') {
      AsyncStorage.removeItem(COUPON_CODE);
      AsyncStorage.removeItem(PROFILE);
      AsyncStorage.removeItem(TOKEN);
      if (Platform.OS == 'ios') {
        navigation.navigate('Languages');
      } else {
        BackHandler.exitApp();
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <StatusBar backgroundColor={HomeBgColor} barStyle="dark-content" />

      <View
        style={{
          justifyContent: 'center',
          height: 60,
          backgroundColor: HomeBgColor,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={backButton}
            style={{
              width: 24,
              aspectRatio: 1,
              marginLeft: 0,
              tintColor: PrimaryGreen,
            }}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontFamily: 'Poppins-Bold',
              paddingLeft: 10,
            }}>
            {t('profilePage.account')}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ backgroundColor: HomeBgColor }}>
        {user != null && modal != null && (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('profileEdit', user)}
              style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                backgroundColor: '#fff',
                marginHorizontal: 20,
                borderRadius: 15,
                elevation: 1,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  marginTop: 10,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14.5,
                    fontFamily: 'Poppins',
                    color: '#09b44d',
                  }}>
                  {t('profilePage.edit')}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    color: '#000',
                  }}>
                  {user?.first_name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    color: '#000',
                    marginTop: -3,
                  }}>
                  +91 {user?.mobile}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    color: '#000',
                    marginTop: -5,
                  }}>
                  {user?.email.toString().toLowerCase()}
                </Text>
                <View style={{ width: '100%', alignItems: 'flex-end', marginTop: -25 }}>
                  <Image source={backButton} style={{ tintColor: PrimaryGreen, transform: [{ rotate: '180deg' }] }} />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: '90%',
                height: 85,
                flexDirection: 'row',
                backgroundColor: '#fff',
                marginHorizontal: 20,
                borderRadius: 50,
                marginTop: 25,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                elevation: 1,
              }}>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: HomeBgColor,
                    elevation: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('Favourites')
                  }>
                  <Image source={FavouriteIcon} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text>Favourites</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: HomeBgColor,
                    elevation: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image source={NotificationIcon} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text>Notifications</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: HomeBgColor,
                    elevation: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('Languages', { type: 'Change' })
                  }>
                  <Image source={SettingsIcon} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text>Language</Text>
              </View>
            </View>
            <View
              style={{
                margin: 20,
                backgroundColor: '#fff',
                borderRadius: 20,
                elevation: 1,
                padding: 10,
              }}>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ManageAddress')}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    paddingBottom: 11,
                    paddingTop: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={manageAddress}
                      style={{ width: 35, height: 35 }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        marginTop: 4,
                        marginLeft: 8,
                      }}>
                      {t('profilePage.manageAddress')}
                    </Text>
                  </View>
                  <Image
                    source={arrow}
                    style={{
                      width: 8,
                      height: 14,
                      tintColor: '#000',
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                </TouchableOpacity>
                <View style={{ width: '100%', height: 2, alignItems: 'flex-end' }}>
                  <View style={{ width: '90%', height: 1.5, backgroundColor: '#ececec' }} />
                </View>

                {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Languages', { type: 'Change' })
                }
                style={{ paddingHorizontal: 15, paddingVertical: 11 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={languageIcon}
                      style={{ width: 21, height: 21 }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontWeight: '700',
                        fontSize: 15,
                        marginLeft: 8,
                        marginTop: 4,
                      }}>
                      {t('profilePage.language')}
                    </Text>
                  </View> */}
                {/* <Image
              source={arrow}
              style={{
                width: 8,
                height: 14,
                tintColor: '#000',
                transform: [{ rotate: '180deg' }],
              }}
            /> */}
                {/* </View>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontWeight: '700',
                    fontSize: 15,
                    marginLeft: 30,
                    color: '#09b44d',
                    marginTop: 7,
                  }}>
                  {user?.selected_language_id == 1
                    ? 'தமிழ்'
                    : user?.selected_language_id == 2
                      ? 'English'
                      : user?.selected_language_id == 3
                        ? 'हिंदी'
                        : user?.selected_language_id == 4
                          ? 'తెలుగు'
                          : user?.selected_language_id == 5
                            ? 'മലയാളം'
                            : 'ಕನ್ನಡ'}
                </Text>
              </TouchableOpacity> */}

                {/* <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingTop: 11,
            paddingBottom: 19,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={paymentIcon} style={{ width: 18, height: 18 }} />
            <Text
              style={{
                 fontFamily: 'Poppins-Regular', fontWeight: '700',
                fontSize: 15,
                marginTop: 4,
                marginLeft: 8,
              }}>
              {t('profilePage.paymentMethods')}
            </Text>
          </View>
          <Image
            source={arrow}
            style={{
              width: 8.2,
              height: 14,
              tintColor: '#000',
              transform: [{ rotate: '180deg' }],
            }}
          />
        </TouchableOpacity> */}
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Wallet');
                }}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingBottom: 11,
                  paddingTop: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={wallet}
                    style={{ width: 35, height: 35 }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 15,
                      marginLeft: 8,
                      marginTop: 4,
                    }}>
                    {t('profilePage.wallet')}
                  </Text>
                </View>
                <Image
                  source={arrow}
                  style={{
                    width: 8,
                    height: 14,
                    tintColor: '#000',
                    transform: [{ rotate: '180deg' }],
                  }}
                />
              </TouchableOpacity>
              <View style={{ width: '100%', height: 2, alignItems: 'flex-end' }}>
                <View style={{ width: '90%', height: 1.5, backgroundColor: '#ececec' }} />
              </View>
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('TrackMap');
                }}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingBottom: 11,
                  paddingTop: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={orderIcon} style={{ width: 18, height: 14.4 }} />
                  <Text
                    style={{  fontFamily: 'Poppins-Regular', fontWeight: '700', fontSize: 15, marginLeft: 8 }}>
                    {t('profilePage.trackYourOrder')}
                  </Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate('OrderedList')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingBottom: 11,
                  paddingTop: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={TrackOrder}
                    style={{ width: 35, height: 35 }} />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 15,
                      marginLeft: 8,
                      marginTop: 4,
                    }}>
                    {t('profilePage.trackYourOrder')}
                  </Text>
                </View>
                <Image
                  source={arrow}
                  style={{
                    width: 8,
                    height: 14,
                    tintColor: '#000',
                    transform: [{ rotate: '180deg' }],
                  }}
                />
              </TouchableOpacity>
              <View style={{ width: '100%', height: 2, alignItems: 'flex-end' }}>
                <View style={{ width: '90%', height: 1.5, backgroundColor: '#ececec' }} />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('OrderedHistory')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingBottom: 11,
                  paddingTop: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={TrackOrder}
                    style={{ width: 35, height: 35 }} />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 15,
                      marginLeft: 8,
                    }}>
                    {t('profilePage.orderHistory')}
                  </Text>
                </View>
                <Image
                  source={arrow}
                  style={{
                    width: 8,
                    height: 14,
                    tintColor: '#000',
                    transform: [{ rotate: '180deg' }],
                  }}
                />
              </TouchableOpacity>
              <View style={{ width: '100%', height: 2, alignItems: 'flex-end' }}>
                <View style={{ width: '90%', height: 1.5, backgroundColor: '#ececec' }} />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Support')}
                style={{ paddingHorizontal: 15, paddingVertical: 11 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={support}
                      style={{ width: 35, height: 35 }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 15,
                        marginLeft: 8,
                        marginTop: 4,
                      }}>
                      {t('profilePage.support')}
                    </Text>
                  </View>
                  <Image
                    source={arrow}
                    style={{
                      width: 8,
                      height: 14,
                      tintColor: '#000',
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: '100%', height: 2, alignItems: 'flex-end' }}>
                <View style={{ width: '90%', height: 1.5, backgroundColor: '#ececec' }} />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Help')}
                style={{ paddingHorizontal: 15, paddingVertical: 11 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={support}
                      style={{ width: 35, height: 35 }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 15,
                        marginLeft: 8,
                        marginTop: 4,
                      }}>
                      {t('profilePage.help')}
                    </Text>
                  </View>
                  <Image
                    source={arrow}
                    style={{
                      width: 8,
                      height: 14,
                      tintColor: '#000',
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={logout}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingTop: 11,
                  paddingBottom: 19,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={logOutICon} style={{ width: 18, height: 18 }} />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 15,
                      marginLeft: 8,
                    }}>
                    {t('profilePage.logout')}
                  </Text>
                </View>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <TouchableOpacity onPress={logout} >
                <Text style={{ fontFamily: 'Poppins-Medium', fontWeight: '500', fontSize: 18 }}>
                  Sign Out
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontWeight: '500',
                  fontSize: 10
                }}>Version {VersionCheck.getCurrentVersion()}</Text>
              {/* version Info Here */}
            </View>
          </View>
        )}
        <View
          style={{
            justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: '#09b44d',
            height: 70,
            margin: 10,
            borderRadius: 5,
            // opacity: 0.8,
            paddingLeft: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: 5
            }}
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.homeecook',
              )
            }>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 18,
                  color: '#fff',
                  paddingBottom: 5,
                }}>
                Do You want to sell Food ?
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontWeight: '700',
                  fontSize: 16,
                  color: '#fff',
                }}>
                Install and Register Homee Cook App , Tap Here.
              </Text>
            </View>
            <View>
              <Image
                source={arrow}
                style={{
                  height: 15,
                  width: 10,
                  paddingRight: '5%',
                  transform: [{ rotate: '180deg' }],
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View>
        {modal && (
          <Modal transparent={false} visible={modal}>
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
    paddingHorizontal: 25,
  },
  nameTxt: {
    color: '#fff',
    fontSize: 25,
    marginVertical: 2,
    fontFamily: 'Poppins-Bold',
  },
  profTxt: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    paddingVertical: 3,
  },
  notifCnt: {
    position: 'absolute',
    top: 0,
    right: 7,
    backgroundColor: '#09b44d',
    borderColor: '#fff',
    borderWidth: 1.7,
    borderRadius: 25,
    height: 20,
    width: 22,
    color: '#fff',
    textAlign: 'center',
    fontSize: 9,
    paddingTop: 4,
    fontFamily: 'Poppins-Bold',
  },
});

export default Profile;
