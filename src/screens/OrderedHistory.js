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
  FlatList,
  Modal,
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { arrow, photo1 } from '../assets/img/Images';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/core';
import { api } from '../services';
import Loader from './Loader';

const OrderedHistory = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(true);
  const [listItems, setListItems] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loader, setLoader] = useState(false);
  const getList = async () => {
    if (paginate > 1) {
      setLoader(true);
      let response = await api.orders(paginate);
      setLoader(false);
      if (response.status == 'success') {
        setListItems(listItems.concat(response.orders));
        setPagination(response.pagination);
      }
    } else {
      setModal(true);
      let response = await api.orders(paginate);
      setModal(false)
      if (response.status == 'success') {
        setListItems(response.orders);
        setPagination(response.pagination);
      }
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getList();
    }, []),
  );
  useEffect(() => {
    getList();
  }, [paginate])
  var onReached = e => {
    if (pagination?.current_page < pagination?.last_page) {
      setPaginate(paginate + 1);
    }
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 15,
          borderColor: '#e5e5e5',
          borderWidth: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderedFoodz', { id: item.id })}
          style={{
            flexDirection: 'row',
            padding: 10,
            borderColor: '#e5e5e5',
            borderBottomWidth: 1,
          }}>
          {/* <View style={{ borderRadius: 5 }}>
            <Image
              source={photo1}
              style={{ width: 50, height: 50, borderRadius: 5 }}
            />
          </View> */}
          <View
            style={{
              flex: 4,
              paddingLeft: 8,
              justifyContent: 'center',
            }}>
            <Text
              style={{ fontSize: 13, fontFamily: 'Poppins-Bold', marginBottom: 4 }}>
              {item?.order_no ? "ORDER ID : " + item.order_no : null}
            </Text>
            <Text
              style={{ fontSize: 13, fontFamily: 'Poppins-Bold', marginBottom: 4 }}>
              {item?.cook?.first_name ? item.cook.first_name : null}
            </Text>
            <Text
              style={{ fontSize: 12, fontFamily: 'Poppins-Regular', marginBottom: 4 }}>
              {item?.address_info?.area ? item?.address_info?.area + ', ' : null}
              {item?.address_info?.city ? item?.address_info?.city + '. ' : null}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14.5,
                color: item?.delivery_status == 2 ? '#cc0600' : '#09b44d',
              }}>
              {item?.delivery_status == 2 ? 'Cancelled' : null}
              {item?.delivery_status == 6 ? ' Delivered' : null}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#000',
              }}>
              {item?.total_amount ? "₹ " + item?.total_amount : null}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 13,
                color: '#000',
              }}>
              {item?.date ? item?.date : null}
            </Text>
          </View>
        </View>
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
            alignItems: 'center'
          }}>
          <Image style={{ width: 9, height: 16 }} source={arrow} />
          <Text style={{
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Poppins-Bold',
            paddingLeft: 10,
            marginTop: 5

          }}>Ordered List</Text>
        </Pressable>
      </View>

      {modal != true && listItems.length > 0 &&
        < FlatList
          data={listItems}
          renderItem={_renderItem}
          onEndReachedThreshold={0}
          onEndReached={onReached}
          showsVerticalScrollIndicator={false}
        />
      }
      {loader &&
        <View style={{ padding: 10 }}>
          <Loader />
        </View>
      }
      {modal && (
        <Modal transparent={true} visible={modal}>
          <Loader />
        </Modal>
      )}
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

export default OrderedHistory;
