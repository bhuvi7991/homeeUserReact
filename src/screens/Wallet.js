import { useFocusEffect } from '@react-navigation/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  StatusBar,
  Pressable,
} from 'react-native';
import { arrow } from '../assets/img/Images';
import { api } from '../services';
import Loader from './Loader';

const Wallet = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(true);
  const [walletDetails, setWalletDetails] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      getWallet();
    }, [])
  );
  const getWallet = async () => {
    setModal(true);
    let response = await api.wallet();
    if (response.status == 'success') {
      setWalletDetails(response.wallet_balence);
    }
    setModal(false);
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
          }}>{t('walletPage.wallet')}</Text>
        </Pressable>
      </View>
      <View style={{ padding: 15 }}>
        {modal != null && walletDetails &&
          <View
            style={{
              padding: 15,
              backgroundColor: '#c7f8dc',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 6,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#09b44d',
                fontFamily: 'Poppins-Bold',
              }}>
              {t('walletPage.homlyFoodsMoney')}
            </Text>
            <View style={{ paddingVertical: 25 }}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#000',
                  opacity: 0.3,
                  fontFamily: 'Poppins-Bold',
                  marginTop: -10
                }}>
                {t('walletPage.totalBalance')}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  fontFamily: 'Poppins-Bold',
                  marginTop: 6,
                }}>
                {walletDetails?.balence ? '₹ ' + walletDetails.balence : '₹ ' + 0}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: '#818181',
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                lineHeight: 21,
                zIndex: 1,
                marginTop: -10
              }}>
              {t('walletPage.homlyFoodsText')}
            </Text>
            <View
              style={{
                width: 200,
                height: 200,
                position: 'absolute',
                bottom: -100,
                right: -100,
                borderRadius: 200,
                backgroundColor: '#09b44d',
                zIndex: 0,
                opacity: 0.3,
              }}></View>
            <View
              style={{
                width: 200,
                height: 200,
                position: 'absolute',
                top: -20,
                right: -150,
                borderRadius: 1000,
                backgroundColor: '#09b44d',
                zIndex: 0,
                opacity: 0.3,
              }}></View>
          </View>
        }
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddMoney', { balence: walletDetails?.balence })}
          style={{
            backgroundColor: '#09b44d',
            height: 42,
            width: 180,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Bold',
              fontSize: 18,
            }}>
            {t('walletPage.addMoney')}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {modal && (
          <Modal transparent={true} visible={modal}>
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

  inputBorder: {
    width: '99%',
    height: 59,
    marginBottom: 30,
  },
});

export default Wallet;
