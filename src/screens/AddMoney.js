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
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { arrow, photo1 } from '../assets/img/Images';
import { useTranslation } from 'react-i18next';
import { api, storage } from '../services';
import RazorpayCheckout from 'react-native-razorpay';

const OrderedList = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const { width, height } = Dimensions.get('window');
  const [amount, setAmount] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    userData();
  }, [])
  const userData = async () => {
    var user = await storage.getUserData();
    setUserDetails(user);
  }
  const walletStatus = async (data) => {
    let response = await api.walletStatus(data);
    if (data.status == 1 && response.status == 'success') {
      alert("Money added successfully ");
      navigation.goBack();
    } else if (data.status == 0 && response.status == 'success') {
      alert('Your transaction is failed.');
    }
  }
  const proceed = async () => {
    if (amount != null) {
      let response = await api.add_wallet_money({ wallet_amount: amount });
      console.log("resfcnevsivdmsvdsvmdsvdvdvdv,ds vidmv djvds v", response);
      if (response.status == 'success') {
        var options = {
          description: 'Add wallet money',
          // image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          // key: 'rzp_test_4QVOnZNpzWBFBM',
          key: 'rzp_live_OIO5EHULxS65B4',
          amount: amount,
          name: 'Homee Foodz',
          order_id: response.transaction_no,//Replace this with an order_id created using Orders API.
          prefill: {
            email: userDetails.email,
            contact: userDetails.mobile,
            name: userDetails.first_name
          },
          theme: { color: '#09b44d' }
        }
        RazorpayCheckout.open(options).then((data) => {
          var payload = {
            status: 1,
            razor_pay_order_id: data.razorpay_order_id,
            razor_pay_payment_id: data.razorpay_payment_id,
            razor_pay_signature: data.razorpay_signature,
          };
          walletStatus(payload);
        }).catch((error) => {
          var payload = {
            status: 0,
            razor_pay_order_id: response.transaction_no,
          };
          walletStatus(payload);
        });
      }
    } else {
      alert("Please enter amount");
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
            paddingLeft: 10

          }}>{t('addMoneyPage.addMoney')}</Text>
        </Pressable>
      </View>
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 15,
          borderColor: '#e5e5e5',
          borderWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
          }}>
          {/* <View style={{ borderRadius: 5 }}>
            <Image
              source={photo1}
              style={{ width: 60, height: 60, borderRadius: 5 }}
            />
          </View> */}
          <View
            style={{
              flex: 4,
              paddingLeft: 8,
              justifyContent: 'center',
            }}>
            {/* <Text
              style={{
                fontSize: 12,
                fontFamily: 'Poppins-Bold',
                marginBottom: 4,
                opacity: 0.5,
              }}>
              Vadpalani, Chennai
            </Text> */}
            <Text
              style={{ fontSize: 13, fontFamily: 'Poppins-Bold', marginBottom: 4 }}>
              {t('addMoneyPage.yourWalletBalance')} {route?.params?.balence ? "₹ " + route.params.balence : null}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
                marginBottom: 4,
              }}>
              {t('addMoneyPage.youCanAddUpto')}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 15 }}>
        <Text
          style={{
            color: '#000',
            opacity: 0.5,
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
          }}>
          {t('addMoneyPage.enterAmount')}
        </Text>
        <TextInput
          style={{
            borderBottomColor: '#c5c5c5',
            borderBottomWidth: 1,
            borderStyle: 'dashed',
            paddingBottom: 3,
            color: '#000',
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
          }}
          keyboardType='numeric'
          keyboardAppearance="default"
          onChangeText={(e) => setAmount(e)}
          value={amount}
          placeholder="Please enter amount *"
        />
      </View>
      <View style={{ position: 'absolute', bottom: 25, marginHorizontal: 25 }}>
        <TouchableOpacity
          onPress={proceed}
          style={{
            width: 210,
            height: 43,
            alignSelf: 'center',
            backgroundColor: '#09b44d',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            padding: 10,
            marginBottom: 25,
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Bold',
              fontSize: 15,
            }}>
            {t('addMoneyPage.proceedToAdd')}
          </Text>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 15,
              color: '#000',
              marginBottom: 8,
            }}>
            {t('addMoneyPage.note')}
          </Text>
          <Text
            style={{
              color: '#000',
              lineHeight: 18,
              opacity: 0.5,
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
            }}>
            {t('addMoneyPage.rbi')}
          </Text>
        </View>
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

export default OrderedList;
