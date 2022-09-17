import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  SafeAreaView,
  Modal,
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
import { useTranslation } from 'react-i18next';
import { EMAIL } from '../constants';
import { api, storage } from '../services';
import { useDispatch } from 'react-redux';
import { set_Profile } from '../redux/actions/authAction';
import Loader from './Loader';

const ProfileEdit = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [nameProfileInput, setnameProfileInput] = useState(route?.params?.first_name);
  const [MobileProfileInput, setMobileProfileInput] = useState(route?.params?.mobile);
  const [emailProfileInput, setEmailProfileInput] = useState(route?.params?.email);
  const [nameProfileInputErr, setnameProfileInputErr] = useState(false);
  const [emailProfileInputErr, setEmailProfileInputErr] = useState(false);
  const [modal, setModal] = useState(false);
  const nameChange = e => {
    setnameProfileInput(e);
    if (e == null || e == "") {
      setnameProfileInputErr(true);
    } else {
      setnameProfileInputErr(false);
    }
  }
  const emailChange = e => {
    setEmailProfileInput(e);
    if (e == null || e == "") {
      setEmailProfileInputErr(true);
    } else {
      if (EMAIL.test(e) === true) {
        setEmailProfileInputErr(false);
      } else {
        setEmailProfileInputErr(true);
      }
    }
  }
  const updateProfile = async () => {
    if (nameProfileInputErr || emailProfileInputErr) {
      alert("Please enter name and email");
    } else {
      var payload = {
        email: emailProfileInput,
        name: nameProfileInput,
      }
      setModal(true);
      let response = await api.profileEdit(payload);
      if (response.status == 'success') {
        let response = await api.userDetail();
        console.log('response', response);
        storage.setUserData(response.user);
        dispatch(set_Profile(response.user));
        navigation.goBack();
      } else {
        alert("Unable to complete your request, try again later");
      }
      setModal(false);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          backgroundColor: '#09b44d',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          justifyContent: 'center',
          height: 45
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
            marginTop: -5

          }}>
            {t('profileEditPage.profileEdit')}</Text>
        </Pressable>
      </View>
      <ScrollView>

        {/* <View style={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 10, borderBottomColor: '#e4e3e3', borderBottomWidth: 1, }}>
                    <View style={{ justifyContent: "space-between", flexDirection: 'row' }}>
                        <Text style={{ fontSize: 21, fontFamily: 'Poppins-Bold', color: '#000', }}>Rubav Johny dfff sssd</Text>
                        <Text style={{ fontSize: 14.5, fontFamily: 'Poppins-Bold', color: '#09b44d', }}>Edit</Text>
                    </View>

                    <View style={{ justifyContent: "flex-start", flexDirection: 'row', paddingVertical: 15 }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000', }}>+91 90998 90987</Text>
                        <Text style={{ paddingHorizontal: 12, color: '#c5c5c5' }}> | </Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000', }}>+91 90998 90987</Text>
                    </View>
                </View> */}

        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: '#000' }}>
            {t('profileEditPage.editAccount')}
          </Text>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                color: '#09b44d',
                marginBottom: 0,
                marginTop: 20,
              }}>
              {t('profileEditPage.name')}
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                borderColor: '#d7ecdf',
                paddingHorizontal: 0,
                paddingVertical: 5,
                color: '#000',
              }}
              value={nameProfileInput}
              onChangeText={nameChange}
            />
            {nameProfileInputErr && (
              <Text style={{ color: 'tomato', marginLeft: 10, marginTop: 5 }}>
                Please Enter Name *
              </Text>
            )}
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                color: '#bcd8c8',
                marginBottom: 0,
                marginTop: 20,
              }}>
              {t('profileEditPage.mobileNo')}
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                borderColor: '#d7ecdf',
                paddingHorizontal: 0,
                paddingVertical: 5,
                color: '#000',
              }}
              value={MobileProfileInput}
              editable={false}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                color: '#09b44d',
                marginBottom: 0,
                marginTop: 20,
              }}>
              {t('profileEditPage.email')}
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                borderColor: '#d7ecdf',
                paddingHorizontal: 0,
                paddingVertical: 5,
                color: '#000',
              }}
              value={emailProfileInput.toLowerCase()}
              onChangeText={emailChange}
            />
          </View>
          {emailProfileInputErr && (
            <Text style={{ color: 'tomato', marginLeft: 10, marginTop: 5 }}>
              {emailProfileInput != null && emailProfileInput != ""
                ? t("signUpPage.emailIvalidErr")
                : t("signUpPage.emailErr")}
            </Text>
          )}
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={updateProfile}
          style={{
            position: 'absolute', bottom: 10, backgroundColor: '#09b44d',
            width: 160,
            borderRadius: 28,
          }}>
          <Text
            style={{
              color: '#fff',
              padding: 13,
              fontFamily: 'Poppins-Bold',
              textAlign: 'center',
              fontSize: 15,
            }}>
            {t('profileEditPage.update')}
          </Text>
        </TouchableOpacity>
      </View>
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

export default ProfileEdit;
