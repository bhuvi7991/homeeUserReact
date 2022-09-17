import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { arrow } from '../assets/img/Images';
import { set_CouponCode } from '../redux/actions/apiActions';
import { api, storage } from '../services';
import Loader from './Loader';

var { width, height } = Dimensions.get('window');

// const categoriesImage = [
//   {
//     backgroundImg: require('../assets/img/coupon/1.png'),
//     icon: require('../assets/img/coupon/icon.png'),
//     package: 'Rs. 500',
//     offer: 'Get 25% Discount',
//   },
//   {
//     backgroundImg: require('../assets/img/coupon/2.png'),
//     icon: require('../assets/img/coupon/icon.png'),
//     package: '-Super Exclusive-',
//     offer: 'Buy 1 Get 1 Free',
//   },
//   {
//     backgroundImg: require('../assets/img/coupon/3.png'),
//     icon: require('../assets/img/coupon/icon.png'),
//     package: '-Super Exclusive-',
//     offer: 'Buy 1 Get 1 Free',
//   },
// ];

const CouponDetails = ({ navigation, route }) => {
  const { t, i18 } = useTranslation();
  const dispatch = useDispatch();
  const [listItems, setListItems] = useState([]);
  const [modal, setModal] = useState(true);
  useEffect(() => {
    getCoupons();
  }, []);
  const getCoupons = async () => {
    setModal(true);
    let response = await api.couponList();
    if (response.status == 'success') {
      setListItems(response.coupons);
    }
    setModal(false);
  }
  const applyCoupon = async (value) => {
    setModal(true);
    let response = await api.apply_coupon({ coupon_code: value });
    setModal(false);
    if (response.status == 'success') {
      storage.setCouponCode(value);
      navigation.goBack();
    } else if (response.status == 'error') {
      storage.setCouponCode(null);
      alert(response?.message);
    }
  }
  const _renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          padding: 15,
          borderBottomColor: '#e5e5e5',
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row' }}>
            {/* <View style={styles.iconBack}> */}
            <Image source={{ uri: item?.image }} style={styles.carouselImg} />
            {/* </View> */}
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.package}>{item?.code}</Text>
              <Text style={styles.offer}> Discount - {item?.value} %</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => applyCoupon(item?.code)}
            style={{
              backgroundColor: '#09b44d',
              width: 70,
              height: 35,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff', textAlignVertical: 'center' }}>
              APPLY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#09b44d',
          height: 60,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <Image style={{ width: 13, height: 22 }} source={arrow} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{t('couponDetailsPage.couponDetails')}</Text>
      </View>
      {modal != true && listItems.length > 0 &&
        <FlatList
          loop={true}
          data={listItems}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item.backgroundImg}
        />
      }
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
  couponBack: {
    width: width * 1,
  },
  iconBack: {
    width: 50,
    height: 50,
    backgroundColor: '#09b44d',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImg: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },

  h2: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 19,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
  },
  package: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    lineHeight: 25,
    textTransform: 'uppercase',
  },
  offer: {
    color: '#262626',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginTop: 1,
    lineHeight: 31,
    textTransform: 'uppercase',
  },
});

export default CouponDetails;
