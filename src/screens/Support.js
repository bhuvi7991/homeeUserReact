import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Modal,
  Alert,
  Linking,
  Pressable,
  StatusBar,
} from 'react-native';
import {
  arrow,
  inputBorder,
  userIcon,
  emailIcon,
  mobileIcon,
  inputBorderBlack,
  callUsIcon
} from '../assets/img/Images';
import { api, storage } from '../services';
import Loader from './Loader';
const dialCall = () => {

  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = 'tel:+91 9150839997';
  }
  else {
    phoneNumber = 'telprompt:+91 9150839997';
  }

  Linking.openURL(phoneNumber);
};
const Support = ({ navigation }) => {
  const [modal, setModal] = useState(true);
  const [userData, setUserData] = useState(null);
  const { width, height } = Dimensions.get('window');
  const { t, i18n } = useTranslation();
  const [userName, setUserName] = useState('uththaman');
  const [mailSupport, setEmailSupport] = useState('uththa@gmail.com');
  const [mobileSupport, setMobileSupport] = useState('9876604465');

  const [messageSupport, setMessageSupport] = useState(null);
  // const getUserData = async () => {
  //   setModal(true);
  //   let data = await storage.getUserData();
  //   setUserData(data);
  //   setModal(false);
  // }
  // useEffect(() => {
  //   getUserData();
  // }, [])
  const messageChange = e => {
    setMessageSupport(e);
  };
  const proceed = async () => {
    if (messageSupport != null) {
      let response = await api.user_support({
        email: userData.email,
        mobile: userData.mobile,
        message: messageSupport,
      })
      if (response.status == 'success') {
        Alert.alert('Success', response?.message,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          { cancelable: false },
        );
      }
    } else {
      alert("Please enter your complaint");
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          backgroundColor: '#09b44d',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          justifyContent: 'center',
          height: 60
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
          }}>
          <Image style={{ width: 9, height: 16 }} source={arrow} />
          <Text style={{
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Poppins-Bold',
            paddingLeft: 10,
            marginTop: -5,
          }}>Support</Text>
        </Pressable>
      </View>
      {/* <View
            style={{
              marginHorizontal: 15,
              marginTop: 20,
            }}>
            <View style={{ position: 'relative', marginBottom: 30 }}>
              <Text
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  position: 'absolute',
                  top: -8,
                  left: 25,
                  zIndex: 2,
                  paddingHorizontal: 12,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                }}>
                {' '}
                {t('supportPage.name')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#bcbcbc',
                  height: 50,
                  borderRadius: 25,
                }}>
                <Image source={userIcon} style={styles.mobileIcon} />
                <TextInput
                  value={userData?.first_name}
                  style={{
                    fontSize: 17,
                    fontFamily: 'Poppins-Regular',
                  }}
                />
              </View>
            </View>
            <View style={{ position: 'relative', marginBottom: 30 }}>
              <Text
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  position: 'absolute',
                  top: -8,
                  left: 25,
                  zIndex: 2,
                  paddingHorizontal: 12,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                }}>
                {' '}
                {t('supportPage.emailId')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#bcbcbc',
                  height: 50,
                  borderRadius: 25,
                }}>
                <Image
                  source={emailIcon}
                  style={[
                    styles.mobileIcon,
                    {
                      width: 23,
                      height: 23,
                    },
                  ]}
                />
                <TextInput
                  value={userData?.email}
                  style={{
                    fontSize: 17,
                    fontFamily: 'Poppins-Regular',
                  }}
                />
              </View>
            </View>
            <View style={{ position: 'relative', marginBottom: 30 }}>
              <Text
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  position: 'absolute',
                  top: -8,
                  left: 25,
                  zIndex: 2,
                  paddingHorizontal: 12,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                }}>
                {' '}
                {t('supportPage.mobileNo')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#bcbcbc',
                  height: 50,
                  borderRadius: 25,
                }}>
                <Image
                  source={mobileIcon}
                  style={[
                    styles.mobileIcon,
                    {
                      width: 20,
                      height: 25,
                    },
                  ]}
                />
                <TextInput
                  value={userData?.mobile}
                  style={{
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}
                />
              </View>
            </View>
            <View style={{ position: 'relative', marginBottom: 30 }}>
              <Text
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  position: 'absolute',
                  top: -8,
                  left: 25,
                  zIndex: 2,
                  paddingHorizontal: 12,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 15,
                }}>
                {' '}
                {t('supportPage.message')}
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#bcbcbc',
                  borderRadius: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  value={messageSupport}
                  multiline={true}
                  numberOfLines={6}
                  placeholder="Enter your message"
                  onChangeText={(e) => messageChange(e)}
                  textAlignVertical="top"
                  style={{
                    fontSize: 15,
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 23,
                  }}
                />
              </View>
            </View>
          </View> */}

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          marginTop: '-10%',
          marginBottom: 10
        }}>
          <Text style={{
            color: '#000',
            fontFamily: 'Poppins-Regular',
            fontWeight: '400',
            fontSize: 18,
            lineHeight: 20,
            marginBottom: 10,
          }}>Feel free to get in touch with us</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 43,
            borderRadius: 30,
            backgroundColor: '#09b44d',
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
          onPress={dialCall} >
          <Image
            tintColor='#fff'
            source={callUsIcon}
            style={[
              styles.mobileIcon,
              {
                width: 18,
                height: 18,
              },
            ]}
          />
          <Text style={{
            color: '#fff',
            fontFamily: 'Poppins-Bold',
            fontSize: 18,
          }}>Call Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 43,
            borderRadius: 30,
            backgroundColor: '#09b44d',
            marginBottom: 10,
            paddingHorizontal: 10,
          }}

          onPress={() => Linking.openURL('mailto:thalabady@homeeplatform.com')} >
          <Image
            tintColor='#fff'
            source={emailIcon}
            style={[
              styles.mobileIcon,
              {
                width: 18,
                height: 18,
              },
            ]}
          />
          <Text style={{
            color: '#fff',
            fontFamily: 'Poppins-Bold',
            fontSize: 18,
          }}>Mail Support</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
            onPress={() => proceed()}
            style={{
              alignItems: 'center',
              position: 'absolute',
              bottom: 20,
              width: '100%',
            }}>
            <Text
              style={{
                backgroundColor: '#09b44d',
                color: '#fff',
                paddingHorizontal: 55,
                paddingVertical: 10,
                fontFamily: 'Poppins-Bold',
                fontSize: 18,
                borderRadius: 30,
              }}>
              {' '}
              {t('supportPage.proceed')}
            </Text>
          </TouchableOpacity> */}
      {/* </>
      } */}
      {/* <View>
        {modal && (
          <Modal transparent={false} visible={modal}>
            <Loader />
          </Modal>
        )}
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },

  inputBorder: {
    width: '99%',
    height: 59,
    marginBottom: 30,
  },
  labelInput: {
    color: '#000',
    marginTop: -5,
    marginLeft: 45,
    fontSize: 12,
  },
  mobileIcon: {
    width: 18,
    height: 20,
    // marginLeft: 18,
    marginRight: 8,
    tintColor: '#fff',
    marginTop: 0,
    resizeMode: 'stretch',
  },
});
export default Support;
