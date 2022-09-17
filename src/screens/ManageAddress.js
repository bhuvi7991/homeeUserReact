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
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { arrow, manageAddr, editIcon, deleteIcon } from '../assets/img/Images';
import { api, storage } from '../services';
import { useFocusEffect } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { set_Profile } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';
const ManageAddress = ({ navigation }) => {
  const { t, i18 } = useTranslation();
  const [modal, setModal] = useState(true);
  const [listItems, setListItems] = useState([]);
  const dispatch = useDispatch();
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
  const deleteAddress = async (id) => {
    setModal(true);
    let response = await api.deleteAddress(id);
    setModal(false);
    if (response.status == 'success') {
      let response = await api.userDetail();
      storage.setUserData(response.user);
      dispatch(set_Profile(response.user));
      addressList();
    } else if (response.status == 'error') {
      alert(response.message);
    } else {
      alert("Unable to complete your request, try again later");
    }
  }
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 15,
              lineHeight: 22,
              marginTop: 0,
              marginBottom: 4,
              color: '#09b44d',
            }}>
            {item?.type ? item.type : null}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditAddress', item)}
              style={{ paddingHorizontal: 5 }}>
              <Image source={editIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteAddress(item.id)}
              style={{ paddingHorizontal: 5 }}>
              <Image source={deleteIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontWeight: '400',
            fontSize: 14,
            lineHeight: 22,
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}>
          {item?.door_no ? item.door_no + ", " : null}
          {item?.block ? item.block + ", " : null}
          {item?.street ? item.street + ", " : null}
          {item?.area ? item.area + ", " : null}
          {item?.city ? item.city + ", " : null}
          {item?.state ? item.state + ", " : null}
          {item?.pin_code ? item.pin_code + ". " : null}
        </Text>
      </View>
    )
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
            paddingLeft: 10,
            marginTop: -5
          }}>{t('manageAddressPage.manageAddress')}</Text>
        </Pressable>
      </View>

      <View style={{ margin: 10, marginBottom: '26%' }}>
        {modal != true && listItems.length > 0 &&
          < FlatList
            data={listItems}
            renderItem={_renderItem}
          />
        }
      </View>
      <View style={{}}></View>

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
            color: '#fff',
            backgroundColor: '#09b44d',
            width: 160,
            borderRadius: 28,
            padding: 13,
            fontFamily: 'Poppins-Bold',
            textAlign: 'center',
            fontSize: 16,
          }} onPress={() => navigation.navigate('Address', { type: "Add" })}>
          <Text
            style={{
              color: '#fff',
              backgroundColor: '#09b44d',
              fontFamily: 'Poppins-Bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Add Address
          </Text>
        </TouchableOpacity>
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
    marginVertical: 2,
    fontFamily: 'Poppins-Bold',
  },
  profTxt: {
    color: '#fff',
    fontSize: 18,
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

export default ManageAddress;
