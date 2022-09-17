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
  FlatList,
  Modal,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { arrow, manageAddress, editIcon, deleteIcon } from '../assets/img/Images';
import { api, storage } from '../services';
import Loader from './Loader';
import { useFocusEffect } from '@react-navigation/core';
import { set_Profile } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const AddressChoose = ({ navigation, route }) => {
  const { t, i18 } = useTranslation();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);
  const [listItems, setListItems] = useState([]);
  // useEffect(() => {
  //   addressList();
  // }, [])
  const addressList = async () => {
    setModal(true);
    let response = await api.addressList();
    setListItems(response.addresses.addresses);
    setModal(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      addressList();
    }, []),
  );
  const changeAddress = async (id) => {
    setModal(true);
    let res = await api.changeDefaultAddress(id);
    if (res.status == 'success') {
      let response = await api.userDetail();
      storage.setUserData(response.user);
      dispatch(set_Profile(response.user));
      if (route.params.type == 'Home') {
        route.params.profile();
      } else {
        route.params.getCartItem();
        route.params.profile();
        route.params.useWallet(true);
      }
      navigation.goBack();
    }
    setModal(false);
  }
  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => changeAddress(item?.id)}
        style={{ margin: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 15,
              lineHeight: 22,
              marginTop: 0,
              marginBottom: 4,
              color: '#09b44d',
            }}>
            {item?.type}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            lineHeight: 22,
            borderBottomColor: '#c5c5c5',
            borderBottomWidth: 1,
            paddingBottom: 5,
          }}>
          {item?.door_no ? item.door_no + ", " : null} {item?.block ? item.block + ", " : null} {item?.street ? item.street + ", " : null} {item?.area ? item.area + ", " : null} {item?.city ? item.city + ", " : null} {item?.state ? item.state + ", " : null}{item?.pin_code ? item.pin_code + ". " : null}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#09b44d',
          height: 60,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          marginBottom: 5,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingLeft: 15,
            // paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image style={{ width: 10, height: 17, marginRight: 10 }} source={arrow} />
          <Text style={styles.pageTitle}>{t('addressChoosePage.chooseAddress')}</Text>
        </TouchableOpacity>
      </View>
      {modal != true && listItems.length > 0 &&

        < FlatList
          data={listItems}
          renderItem={_renderItem}
        />

      }
      <View style={{ marginBottom: '10%' }}></View>
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#09b44d',
            width: 160,
            borderRadius: 28,
          }}
          onPress={() => navigation.navigate('Address', { type: "Add" })}>
          <Text
            style={{
              color: '#fff',
              padding: 13,
              fontFamily: 'Poppins-Bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            {t('addressChoosePage.addAddress')}
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
    marginTop: 5
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

export default AddressChoose;
