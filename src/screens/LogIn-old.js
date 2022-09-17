import React, { useState } from 'react';
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
} from 'react-native';
import * as api from '../components/api';
import { backImg, mobileIcon, inputBorder } from '../assets/img/Images';

const LogIn = ({ navigation }) => {
  const [MobileNo, setMobileNo] = useState('');
  const MobileNoLegnth = 10;
  const onProceed = async () => {
    let data = await api.login({
      mobile: MobileNo,
    });
    if (data?.user) {
      console.log(data.user.otp);
      navigation.navigate('Otp', { user: data.user });
      if (data?.user?.otp) {
        alert(
          `Your OTP is : ${data.user.otp}.\n App in Debug Mode.\nNeed to remove otp key in production mode and this alert will also disabled`,
        );
      }
    }
  };

  const mobileNoChange = e => {
    setMobileNo(e);
    console.log(e);
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.font1}> Welcome Back</Text>
          <Text style={styles.font4}>Sign into continue</Text>
        </View>
        <View style={{ flex: 3, paddingHorizontal: 25 }}>
          <ImageBackground source={inputBorder} style={styles.inputBorder}>
            <Text style={styles.labelInput}>Mobile No</Text>
            <View>
              <Image source={mobileIcon} style={styles.mobileIcon} />
              <TextInput
                value={MobileNo}
                keyboardType="numeric"
                maxLength={MobileNoLegnth}
                onChangeText={mobileNoChange}
                style={styles.input}
              />
            </View>
          </ImageBackground>

          <Pressable onPress={onProceed} style={{ alignItems: 'center' }}>
            <Text style={styles.buttonStyle}>Proceed</Text>
          </Pressable>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: 25,
            }}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.font3}>
              Don't have an account?
              <Text style={{ color: '#000', fontFamily: 'Poppins-Bold' }}>
                {' '}
                SignUp Now!
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    opacity: 0.7,
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
    width: '100%',
    height: 58,
  },
  labelInput: {
    color: '#fff',
    marginTop: -8,
    marginLeft: 45,
    fontSize: 12,
  },
  mobileIcon: {
    width: 15,
    height: 27,
    marginTop: 6,
    marginLeft: 18,
  },
  input: {
    paddingLeft: 45,
    paddingTop: 5,
    fontSize: 18,
    marginTop: -33,
    fontFamily: 'Poppins-Bold',
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
});

export default LogIn;
