import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Linking,
  StatusBar,
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
} from '../assets/img/Images';
import { SafeAreaView } from 'react-native-safe-area-context';

const Help = ({ navigation }) => {
  const [vegCheckBox, setVegCheckBox] = useState(false);
  const [nonVegCheckBox, setNonVegCheckBox] = useState(false);
  return (
    <SafeAreaView>
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
          }}>Help</Text>
        </Pressable>
      </View>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('profileEdit')}
        style={{
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 10,
          borderBottomColor: '#e4e3e3',
          borderBottomWidth: 1,
        }}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{fontSize: 17, fontFamily: 'Poppins-Bold', color: '#000'}}>
            Rubav Johny dfff sssd
          </Text>
          <Text
            style={{fontSize: 14, fontFamily: 'Poppins-Regular', color: '#09b44d'}}>
            Edit
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingVertical: 12,
          }}>
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000'}}>
            +91 90998 90987
          </Text>
          <Text style={{paddingHorizontal: 12, color: '#c5c5c5'}}> | </Text>
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000'}}>
            rube@gmail.com
          </Text>
        </View>
      </TouchableOpacity> */}

      <View>
        <TouchableOpacity
          onPress={() => { navigation.navigate('TermsAndConditions', navigation) }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 17,
            borderColor: '#e4e3e3',
            borderBottomWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '400', fontSize: 15 }}>
              Terms and Conditions
            </Text>
            <Image
              source={arrow}
              style={{
                width: 8,
                height: 12,
                resizeMode: 'stretch',
                tintColor: '#000',
                transform: [{ rotate: '180deg' }],
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigation.navigate('PrivacyPolicy', navigation) }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 17,
            borderColor: '#e4e3e3',
            borderBottomWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '400', fontSize: 15 }}>
              Privacy Policy
            </Text>
            <Image
              source={arrow}
              style={{
                width: 8,
                height: 12,
                resizeMode: 'stretch',
                tintColor: '#000',
                transform: [{ rotate: '180deg' }],
              }}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderColor: '#e4e3e3',
            borderBottomWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15}}>FAQs</Text>
            <Image
              source={arrow}
              style={{
                width: 8,
                height: 12,
                resizeMode: 'stretch',
                tintColor: '#000',
                transform: [{rotate: '180deg'}],
              }}
            />
          </View>
        </TouchableOpacity> */}
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
});

export default Help;
