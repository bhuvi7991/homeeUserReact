import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import { wcBg, nav, switchTgl, notif } from '../assets/img/Images';

const Welcome = () => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <ImageBackground
        source={wcBg}
        style={{
          width: '100%',
          height: 200,
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
          overflow: 'hidden',
        }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              padding: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',

              height: 40,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}>
                <Image style={{ width: 28, height: 20 }} source={nav} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={[styles.pageTitle, { alignItems: 'center' }]}>
                  Homely Food
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                <Image source={switchTgl} style={{ width: 38, height: 22 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingRight: 20, paddingLeft: 10 }}>
                <Image source={notif} style={{ width: 22, height: 26 }} />
                <Text style={styles.notifCnt}>25</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.wcTxt}>Welcome Back</Text>
            <Text style={styles.nameTxt}>Rubesh John Raj</Text>
            <TouchableOpacity>
              <Text style={styles.profTxt}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

    </View>
  );
};

const styles = StyleSheet.create({
  wcTxt: {
    color: '#fff',
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  nameTxt: {
    color: '#fff',
    fontSize: 25,
    color: '#fff',
    marginVertical: 2,
    fontFamily: 'Poppins-Bold',
  },
  profTxt: {
    color: '#fff',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    paddingVertical: 3,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Poppins-Bold',
    marginTop: 12,
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

export default Welcome;
