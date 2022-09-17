import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as api from '../components/api';

import {
  backImg,
  mobileIcon,
  inputBorder,
  arrow,
  email,
  userIcon,
} from '../assets/img/Images';
import axios from 'axios';

const Otp = ({ navigation, route }) => {
  let otpInput = useRef(null);
  const lengthOtp = 4;
  const { params: { user: { id = 0, mobile = 0 } = {} } = {} } = route;
  const defaultCountdown = 24;
  const [otpValue, setOtpValue] = useState('');
  const [countDown, setCountDown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  const otpHandler = async () => {
    let data = await api.verifyOtp({
      user_id: id,
      mobile: mobile,
      otp: parseInt(otpValue),
    });

    if (data?.user?.id) {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

      if (data?.registered_status) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('SignUp');
      }
    }
  };

  const onChangeText = val => {
    setOtpValue(val);
  };

  useEffect(() => {
    otpInput.focus();
  });

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countDown === 0) {
      setEnableResend(true);
      setCountDown(0);
      clearInterval(clockCall);
    } else {
      setCountDown(countDown - 1);
    }
  };

  const onResendOtp = () => {
    if (enableResend) {
      setEnableResend(false);
      setCountDown(defaultCountdown);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backImg} style={styles.backgroundImg}>
        <KeyboardAvoidingView style={styles.containerAvoidngView}>
          <View
            style={{
              flex: 1,
              color: '#fff',
              padding: 20,
            }}>
            <View style={styles.headerStyle}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Image style={{ width: 11, height: 18 }} source={arrow} />
                <Text style={styles.headerText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              color: '#fff',
              justifyContent: 'center',
              alignContent: 'center',
              padding: 20,
            }}>
            <Text style={styles.font1}> Verify Your Mobile No</Text>
            <Text style={styles.font4}>Enter your OTP here</Text>
          </View>

          <View style={{ flex: 3, paddingHorizontal: 2, alignContent: 'center' }}>
            <View>
              <TextInput
                ref={input => (otpInput = input)}
                value={otpValue}
                onChangeText={onChangeText}
                style={styles.textInputOtp}
                maxLength={lengthOtp}
                returnKeyType="done"
                keyboardType="numeric"
              />
              <View style={styles.containerInput}>
                {Array(lengthOtp)
                  .fill()
                  .map((data, index) => (
                    <View
                      key={index}
                      style={[
                        styles.cellView,
                        {
                          borderBottomColor:
                            index === otpValue.length ? '#78bf94' : '#c5c5c5',
                        },
                        { marginTop: index === otpValue.length ? 7 : 0 },
                      ]}>
                      <Text
                        style={styles.cellText}
                        onPress={() => otpInput.focus()}>
                        {otpValue && otpValue.length > 0 ? otpValue[index] : ''}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
            <Pressable onPress={otpHandler} style={{ alignItems: 'center' }}>
              <Text style={styles.buttonStyle}>Proceed</Text>
            </Pressable>

            <TouchableOpacity disable={!enableResend} onPress={onResendOtp}>
              <Text
                style={[
                  styles.resentOtp,
                  { color: enableResend ? '#fff' : 'gray' },
                ]}>
                Resend OTP({countDown})
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidngView: {
    flex: 1,
    padding: 10,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font6: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    opacity: 0.7,
  },
  headerStyle: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    marginTop: -21,
    marginLeft: 25,
  },
  cellView: {
    paddingVertical: 1,
    width: 50,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 21,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    width: 60,
    height: 33,
  },
  backgroundImg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  font1: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 27,
  },
  font4: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginLeft: 7,
    marginTop: 7,
  },
  resentOtp: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 17,
  },
  buttonStyle: {
    textAlign: 'center',
    height: 46,
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    fontFamily: 'Poppins-Bold',
    width: 200,
    paddingTop: 12,
    fontSize: 16,
  },
  textInputOtp: {
    width: 300,
    height: 50,
    position: 'absolute',
    opacity: 0,
    top: -3,
    left: 50,
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    zIndex: 5,
  },
});

export default Otp;
