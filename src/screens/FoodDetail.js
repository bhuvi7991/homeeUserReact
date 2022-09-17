/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  StatusBar,
  Pressable,
  FlatList,
  Dimensions
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  arrow,
  searchIcon,
  wishListIcon,
  wishListFillIcon,
  vegIcon,
  costIcon,
  deliverycon,
  photo1,
  forkIcon,
  cartIcon,
} from '../assets/img/Images';
import { api, storage } from '../services/index';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { PrimaryGreen } from '../helper/styles.helper';
import StarSelectIcon from "../assets/img/star_select.png";
import Fssai from "../assets/img/fssai.png";
import vegNonveg from '../assets/img/veg-nonveg.png';
import wishListFill from "../assets/img/favr_icon.png";
import { Portal, Modal as PaperModal } from 'react-native-paper';
import TasteIcon from '../assets/img/taste.png';
import QualityIcon from '../assets/img/quality.png';
import DeliveryIcon from '../assets/img/delivery.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COUPON_CODE } from '../redux/actions/actionTypes';

const { width, height } = Dimensions.get('screen');

const FoodDetail = ({ navigation, route }) => {
  console.log("navigation in food details page", route.params);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);
  const [cook_details, setCook_details] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [special_menus, setSpecial_menus] = useState(null);
  const [cuisines, setCuisines] = useState(null);
  const [vegCheckBox, setVegCheckBox] = useState(false);
  const [nonVegCheckBox, setNonVegCheckBox] = useState(false);
  const [wishList, setWishList] = useState(false);
  const [arrowrot, setArrowrot] = useState(true);
  const [sarrowrot, setSarrowrot] = useState(true);
  const [specFood, setSpecFood] = useState(true);
  const [condiArrowrot, setCondiArrowrot] = useState(true);
  const [recomFood, setRecomFood] = useState(true);
  const [condiFood, setCondiRecomFood] = useState(true);
  const [cartShow, setCartShow] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // console.log('cook_details', recommended[0]?.timingstatus);

  const get_Cook_Profile = async () => {
    setModal(true);
    let payload = { cook_id: route.params.id };
    let response = await api.profile(payload);
    console.log("response from food details screen", response);
    setCook_details(response);
    setRecommended(response.recommended);
    setSpecial_menus(response.special_menus);
    setCuisines(response.cuisines);
    setWishList(response.favourite_status);
    setModal(false);
  }
  const get_Cart = async () => {
    let response = await api.cart_item();
    if (response.status == 'success') {
      if (response.items != null && response.items > 0) {
        storage.setCartStatus(1);
        setCartShow(true);
        setCartDetails(response);
      } else if (response.items == 0 || response.items == "null") {
        setCartShow(false);
        setCartDetails(null);
        storage.setCartStatus(0);
      }
      getCartItems();
    }
  }
  const getCartItems = async () => {
    let response = await api.show_wallet();
    if (response.status == 'success') {
      storage.setCartStatus(1);
    } else if (response.status == 'empty') {
      storage.setCartStatus(0);
    }
  }
  useEffect(() => {
    get_Cart();
    get_Cook_Profile();
  }, [])
  const wishListHandle = async () => {
    let response = await api.add_favourite({ cook_id: cook_details.cook.id });
    if (response.status == 'success') {
      setWishList(!wishList);
    }
  };
  const emptyCart = async (id, index, type, key) => {
    let response = await api.empty_cart();
    if (response.status == 'success') {
      setCartShow(false);
      setCartDetails(null);
      add_to_cart(id, index, type, key);
    }
  }
  const remove_cart_item = async (id, index, type, key) => {
    let response = await api.minus_quantity(id);
    if (response.status == 'success') {
      if (type == "recommended") {
        let newArr = [...recommended];
        newArr[index] = response.menu_item;
        setRecommended(newArr);
      } else if (type == 'cuisines') {
        let data = [...cuisines];
        data[index]["menuitems"][key] = response.menu_item;
        setCuisines(data);
      } else if (type == 'special_menus') {
        let data = [...special_menus];
        data[index]["specialmenus"][key]["menuitem"] = response.menu_item;
        setSpecial_menus(data);
      }
      get_Cart();
    }
  }
  const add_to_cart = async (id, index, type, key) => {
    let response = await api.add_cart({ menu_item_id: id, cook_id: cook_details.cook.id });
    if (response.status == 'success') {
      if (type == "recommended") {
        let newArr = [...recommended];
        newArr[index] = response.menu_item;
        setRecommended(newArr);
      } else if (type == 'cuisines') {
        let data = [...cuisines];
        data[index]["menuitems"][key] = response.menu_item;
        setCuisines(data);
      } else if (type == 'special_menus') {
        let data = [...special_menus];
        data[index]["specialmenus"][key]["menuitem"] = response.menu_item;
        setSpecial_menus(data);
      }
      get_Cart();
    } else if (response.status == 'failure') {
      Alert.alert('Replace cart item ?', 'Your Cart contains dishes from other cook. Do you want to discard add dishes from this cook ?', [
        {
          text: 'Yes', onPress: () => {
            AsyncStorage.removeItem(COUPON_CODE);
            emptyCart(id, index, type, key)
          }
        },
        { text: 'No', },
      ]);
      get_Cart();
    }

  }
  const arwhandle = () => {
    setArrowrot(!arrowrot);
    setRecomFood(!recomFood);
  };
  const spearwhandle = () => {
    setSarrowrot(!sarrowrot);
    setSpecFood(!specFood);
  };
  const condihandle = () => {
    setCondiArrowrot(!condiArrowrot);
    setCondiRecomFood(!condiFood);
  };
  // console.log("ranranran", cook_details);

  const renderItem = (item) => {
    return (
      <View key={item?.index} style={{
        width: width / 2.3,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginHorizontal: 5,
        marginTop: 15,
        marginBottom: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        elevation: 3,
        opacity: item?.item?.timingstatus == 0 ? 0.6 : null,
      }} >
        <View style={{ width: width / 2.3, borderRadius: 15, marginTop: -15 }}>
          <Image
            source={{ uri: item?.item?.image }}
            style={{ width: "100%", height: 130, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
          />
        </View>
        <View style={{ flex: 5, paddingLeft: '5%' }}>
          <Text style={{ flex: 3, width: 150, fontSize: 14, fontFamily: 'Poppins-Medium', paddingTop: 10 }}>
            {item?.item?.userlanguage?.name}
          </Text>

        </View>
        <View style={{ flexDirection: 'row', width: 140, justifyContent: 'space-between', alignItems: 'center', marginTop: -10, marginBottom: 3 }}>

          <Text
            style={{
              // flex: 1,
              fontSize: 16,
              fontFamily: 'Poppins-Bold',
              marginTop: 10,
            }}>
            ₹ {item?.item?.final_price}
          </Text>
          {cook_details?.cook?.deliverytime == "unserviceable" || cook_details?.cook?.current_status == 0 || item?.item?.timingstatus == 0 || item?.item?.status == 0 ?
            null
            :
            item?.item?.cartquantity?.quantity ?
              <View
                style={{ backgroundColor: '#09b44d', height: 30, width: 80, borderRadius: 30, flexDirection: 'row' }}
              >
                <TouchableOpacity onPress={() => remove_cart_item(item?.item?.cartquantity.id, item?.index, 'recommended')}
                  style={{ paddingTop: 5, paddingLeft: 13, paddingRight: 10 }}
                >
                  <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ paddingTop: 5, paddingLeft: 7, paddingRight: 8, fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>{item?.item?.cartquantity?.quantity}</Text>
                <TouchableOpacity onPress={() => add_to_cart(item?.item.id, item?.index, 'recommended')}
                  style={{ paddingTop: 5, paddingLeft: 7, }}
                >
                  <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              :
              <TouchableOpacity onPress={() => add_to_cart(item?.item.id, item?.index, 'recommended')} style={{
                marginTop: 15, backgroundColor: '#09b44d',
                width: 70,
                borderRadius: 28,
                padding: 5,
              }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Bold',
                    textAlign: 'center',
                    fontSize: 14,
                  }}>
                  {t("foodDetailPage.add")}
                </Text>
              </TouchableOpacity>
          }
        </View>
      </View >)
  }
  const renderItem2 = (item) => {
    return (
      <View key={item?.index} style={{
        backgroundColor: '#fff',
        marginHorizontal: 7,
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        opacity: item?.item?.menuitem?.timingstatus == 0 ? 0.6 : null,
      }} >
        <View style={{ width: '100%', borderRadius: 5 }}>
          <Image
            source={{ uri: item?.item?.menuitem?.image }}
            style={{ width: 150, height: 130, borderRadius: 5 }}
          />
        </View>
        <View style={{ flex: 5, paddingLeft: 14 }}>
          <Text style={{ flex: 3, width: 150, fontSize: 16, fontFamily: 'Poppins-Bold', paddingTop: 10 }}>
            {item?.item?.menuitem?.userlanguage?.name}
          </Text>

        </View>
        <View style={{ flexDirection: 'row', width: 140, justifyContent: 'space-between', alignItems: 'center', marginTop: -10 }}>

          <Text
            style={{
              // flex: 1,
              fontSize: 16,
              fontFamily: 'Poppins-Bold',
              marginTop: 10,
            }}>
            ₹ {item?.item?.menuitem?.final_price}
          </Text>
          {cook_details?.cook?.deliverytime == "unserviceable" || cook_details?.cook?.current_status == 0 || item?.item?.menuitem?.timingstatus == 0 || item?.item?.menuitem?.status == 0 ?
            null
            :
            item?.item?.menuitem?.cartquantity?.quantity ?
              <View
                style={{ backgroundColor: '#09b44d', height: 30, width: 80, borderRadius: 30, flexDirection: 'row' }}
              >
                <TouchableOpacity onPress={() => remove_cart_item(item?.item?.menuitem.cartquantity.id, item?.index, 'special_menus')}
                  style={{ paddingTop: 7, paddingLeft: 13, paddingRight: 10 }}
                >
                  <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ paddingLeft: 7, paddingRight: 8, fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>{item?.item?.menuitem.cartquantity?.quantity}</Text>
                <TouchableOpacity onPress={() => add_to_cart(item?.item?.menuitem.id, item?.index, 'special_menus')}
                  style={{ paddingTop: 7, paddingLeft: 7, }}
                >
                  <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              :
              <TouchableOpacity onPress={() => add_to_cart(item?.item?.menuitem.id, item?.index, 'special_menus')} style={{
                marginTop: 15, backgroundColor: '#09b44d',
                width: 80,
                borderRadius: 28,
                padding: 10,
              }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Bold',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  {t("foodDetailPage.add")}
                </Text>
              </TouchableOpacity>
          }
        </View>
      </View>)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {modal == false && cook_details ?
        <>
          {console.log("cooooook detailssss", cook_details)}
          {/* <TouchableOpacity style={{ width: '100%', top: "90%", alignItems: 'center', position: 'absolute', zIndex: 3 }} onPress={() => {
            null
          }}>
            <View style={{ width: "50%", backgroundColor: PrimaryGreen, alignItems: 'center', borderRadius: 15, height: 40, justifyContent: 'center' }}>
              <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16, color: "white" }}>Browse Menu</Text>
            </View>
          </TouchableOpacity> */}
          <View style={{ position: 'absolute', zIndex: 5, width: '100%', backgroundColor: '#fff', paddingBottom: 10 }} >
            <TouchableOpacity
              style={{ width: 50, height: "100%", marginTop: 10 }}
              onPress={() => navigation.goBack()}>
              <Image
                style={{ width: 14, height: 22, tintColor: '#000', marginLeft: 20 }}
                source={arrow}
              />

            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f4fbf8', paddingBottom: 30, }}>
            <View>
              <Image source={{ uri: recommended?.[0]?.image }} style={{ width: '100%', height: 250, borderBottomLeftRadius: 70, borderBottomRightRadius: 70 }} />
              <View style={{ width: '100%', height: 250, marginTop: -250, backgroundColor: '#000', opacity: 0.5, borderBottomLeftRadius: 70, borderBottomRightRadius: 70 }} />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', width: '90%', backgroundColor: '#fff', marginTop: -75, borderRadius: 15, elevation: 3 }}>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <View>

                      <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, paddingHorizontal: 10 }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: 'Poppins-Bold',
                            color: '#000',
                            marginTop: 10,
                            marginLeft: 3,
                            width: '80%'
                          }}>
                          {cook_details?.cook?.first_name}
                        </Text>
                      </View>
                      <Text
                        style={{
                          width: 100,
                          fontSize: 13,
                          fontFamily: 'Poppins-Regular',
                          fontWeight: 'normal',
                          alignItems: 'flex-start',
                          // lineHeight: 23,
                          justifyContent: 'center',
                          color: '#989898',
                          backgroundColor: '#f4fbf8',
                          paddingRight: 10,
                          marginLeft: 13,
                        }}>
                        {cook_details?.cuisine_list?.[0]?.userlanguage?.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: 'Poppins-Regular',
                          fontWeight: '300',
                          color: '#000',
                          marginTop: 5,
                          marginLeft: 13
                        }}>
                        {cook_details?.cook?.address?.area}
                      </Text>
                    </View>
                    <View>
                      <Image source={vegNonveg} style={{ width: 60, height: 25, resizeMode: 'contain', marginTop: 10, marginLeft: -5 }} />
                      <TouchableOpacity
                        onPress={wishListHandle}
                        style={{ marginTop: 15, justifyContent: 'flex-end', alignItems: 'center' }}>
                        {wishList ? (
                          <Image
                            source={wishListFill}
                            style={{ width: 23.5, height: 20, }}
                          />
                        ) : (
                          <Image
                            source={wishListIcon}
                            style={{ width: 23.5, height: 20, }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ marginLeft: 13, flexDirection: 'row', alignItems: 'center', marginTop: -5 }}>
                    {/* <Image source={StarSelectIcon} style={{ width: 20, height: 20 }} />
                    <TouchableOpacity onPress={() => setShowFeedback(true)}>
                      <Text style={{ fontFamily: 'Poppins-Medium', color: '#b3b3b3', fontWeight: '500', fontSize: 16, marginTop: 5, paddingRight: 10 }}> 4 Rating</Text>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: 15, backgroundColor: '#b3b3b3' }} /> */}
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'poppins-Medium',
                        color: '#b3b3b3',
                        fontWeight: '500',
                        // marginTop: 5,
                        // marginLeft: 10,
                        marginBottom: 5
                      }}>
                      {cook_details?.cook?.dtime} {t("foodDetailPage.mins")}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'poppins-Medium',
                        color: '#b3b3b3',
                        fontWeight: '500',
                        // marginTop: 5,
                        marginLeft: 7,
                      }}>
                      ({t("foodDetailPage.deliveryTime")})
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 25,
                justifyContent: 'space-around',
                flexDirection: 'row',
                borderBottomColor: '#e4e3e3',
                borderBottomWidth: 1,
              }}>
              <View style={{ width: 150, borderWidth: 1.5, borderColor: PrimaryGreen, borderRadius: 10, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                {/* <Text style={{ fontFamily: 'Poppins-Bold', color: '#484545' }}>FLAT 75% OFF</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginRight: 2 }} />
                  <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginRight: 2 }} />
                  <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginRight: 2 }} />
                  <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginRight: 2 }} />
                  <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginRight: 2, tintColor: '#989898' }} />
                </View>
                <Text style={{ fontFamily: 'Poppins-Medium', color: '#949494', marginTop: 5, fontSize: 16 }}>4 Star Rating</Text>
              </View>
              {/* <View style={{ width: 150, borderWidth: 1.5, borderColor: PrimaryGreen, borderRadius: 10, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: '#484545' }}>₹ {cook_details?.cook?.cost_for_two}</Text>
                <Text style={{ fontFamily: 'Poppins-Bold', color: PrimaryGreen }}>COST FOR 2</Text>
              </View> */}
              <TouchableOpacity style={{ width: 150, borderWidth: 1.5, borderColor: PrimaryGreen, borderRadius: 10, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
                {/* <Text style={{ fontFamily: 'Poppins-Bold', color: '#484545' }}>DELIVERY IN</Text>
                <Text style={{ fontFamily: 'Poppins-Bold', color: PrimaryGreen }}>{cook_details?.cook?.dtime} {t("foodDetailPage.mins")}</Text> */}
                <Image source={Fssai} style={{ width: 125, height: 70, borderRadius: 15 }} />
              </TouchableOpacity>
            </View>
            {cook_details?.cook?.current_status == 0 &&
              <View style={{ alignItems: 'center', padding: 10 }} >
                <Text style={{ color: 'tomato', fontFamily: 'Poppins-Bold', fontSize: 20 }}>{t('foodDetailPage.unserviceable')}</Text>
              </View>
            }
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                justifyContent: 'space-between',
              }}>
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18 }}>
                {t("foodDetailPage.recommended")}
              </Text>
              <TouchableOpacity onPress={arwhandle} style={{ padding: 8, marginRight: 15 }}>
                {arrowrot ? (
                  <Image
                    source={arrow}
                    style={{
                      width: 10,
                      height: 17,
                      tintColor: '#000',
                      transform: [{ rotate: '90deg' }],
                    }}
                  />
                ) : (
                  <Image
                    source={arrow}
                    style={{
                      width: 10,
                      height: 17,
                      tintColor: '#000',
                      transform: [{ rotate: '-90deg' }],
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ borderColor: '#d5e7dd', borderBottomWidth: 4 }}>
              {!recomFood ? null : (
                <View>
                  {recommended && recommended.length > 0 &&
                    <View style={{ width: width * 0.98, alignItems: recommended.length == 1 ? 'flex-start' : 'center', marginLeft: recommended.length == 1 ? 10 : 5 }}>
                      <FlatList
                        data={recommended}
                        numColumns={2}
                        style={{}}
                        contentContainerStyle={{ justifyContent: 'space-between', }}
                        renderItem={(item) => renderItem(item)} />
                    </View>}
                </View>
              )}
            </View>

            {special_menus && special_menus.length > 0 ?
              <View
                style={{
                  flexDirection: 'row',
                  padding: 15,
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18 }}>
                  {t("foodDetailPage.specializedFood")}
                </Text>
                <TouchableOpacity onPress={spearwhandle} style={{ padding: 8, marginRight: 15 }}>
                  {sarrowrot ? (
                    <Image
                      source={arrow}
                      style={{
                        width: 10,
                        height: 17,
                        tintColor: '#000',
                        transform: [{ rotate: '90deg' }],
                      }}
                    />
                  ) : (
                    <Image
                      source={arrow}
                      style={{
                        width: 10,
                        height: 17,
                        tintColor: '#000',
                        transform: [{ rotate: '-90deg' }],
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              : null}
            <View style={{ borderColor: '#d5e7dd', borderBottomWidth: 4 }}>
              {!specFood ? null :
                (
                  <View>
                    {special_menus && special_menus.length > 0 ?
                      special_menus.map((item, index) => {
                        return (
                          <View key={index}>
                            <Text style={{ paddingLeft: 15, paddingBottom: 15, fontFamily: 'Poppins-Bold', fontSize: 14 }}>
                              {item?.userlanguage?.name + " (" + item?.specialmenus.length + ")"}
                            </Text>
                            <FlatList
                              data={item.specialmenus}
                              numColumns={2}
                              contentContainerStyle={{ width: "100%", alignItems: 'flex-start', justifyContent: 'space-around' }}
                              renderItem={(item) => renderItem2(item)} />
                            {/* {item.specialmenus.map((list, key) => {
                              return (
                                <View key={key} style={{
                                  flexDirection: 'row',
                                  paddingHorizontal: 10,
                                  marginBottom: 25,
                                  opacity: list.menuitem.timingstatus == 0 ? 0.5 : null,
                                }} >
                                  <View style={{ flex: 3 }}>
                                    <View style={{ width: '100%', borderRadius: 5 }}>
                                      <Image
                                        source={{ uri: list.menuitem?.image }}
                                        style={{ width: 120, height: 120, borderRadius: 5 }}
                                      />
                                    </View>
                                  </View>
                                  <View style={{ flex: 5, paddingLeft: 14 }}>
                                    <Image source={{ uri: list?.menuitem?.foodtype?.icon }}
                                      style={{ width: 15, height: 15, }} />
                                    <View style={{ flexDirection: 'row', flex: 4 }}>
                                      <Text style={{ flex: 3, fontSize: 16, fontFamily: 'Poppins-Bold', paddingTop: 10 }}>
                                        {list.menuitem?.userlanguage?.name}
                                      </Text>
                                      <Text
                                        style={{
                                          flex: 1,
                                          fontSize: 16,
                                          fontFamily: 'Poppins-Bold',
                                          marginTop: 10,
                                        }}>
                                        ₹ {list.menuitem?.final_price}
                                      </Text>
                                    </View>
                                    {cook_details?.cook?.deliverytime == "unserviceable" || cook_details?.cook?.current_status == 0 || list.menuitem.timingstatus == 0 || list.menuitem.status == 0 ?
                                      null
                                      :
                                      list?.menuitem?.cartquantity?.quantity ?
                                        <View style={{ flexDirection: 'row', backgroundColor: '#09b44d', height: 30, width: 80, borderRadius: 30 }}>
                                          <TouchableOpacity style={{ paddingTop: 7, paddingLeft: 13, paddingRight: 10 }} onPress={() => remove_cart_item(list.menuitem.cartquantity.id, index, 'special_menus', key)}>
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>
                                              -
                                            </Text>
                                          </TouchableOpacity>
                                          <Text style={{ paddingTop: 7, paddingLeft: 7, paddingRight: 8, fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>{list?.menuitem?.cartquantity?.quantity}</Text>
                                          <TouchableOpacity style={{ paddingTop: 7, paddingLeft: 7, }} onPress={() => add_to_cart(list.menu_item_id, index, 'special_menus', key)}>
                                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>
                                              +
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                        :
                                        <TouchableOpacity onPress={() => add_to_cart(list.menu_item_id, index, 'special_menus', key)} style={{
                                          marginTop: 15, backgroundColor: '#09b44d', padding: 10,
                                          width: 100,
                                          borderRadius: 28,
                                        }}>
                                          <Text
                                            style={{
                                              color: '#fff',
                                              fontFamily: 'Poppins-Bold',
                                              textAlign: 'center',
                                              fontSize: 16,
                                            }}>
                                            {t("foodDetailPage.add")}
                                          </Text>
                                        </TouchableOpacity>
                                    }
                                  </View>
                                </View>
                              )
                            })} */}
                          </View>
                        )
                      })
                      : null}

                  </View>
                )}
            </View>

            <View style={{ marginBottom: 70 }}>
              {cuisines && cuisines.length > 0 &&
                cuisines.map((item, index) => {
                  return (
                    <View key={index} style={{ borderColor: '#d5e7dd', borderBottomWidth: 4 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 15,
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18 }}>
                          {item?.eng_name}
                        </Text>
                        <TouchableOpacity onPress={condihandle} style={{ padding: 8, marginRight: 15 }}>
                          {condiArrowrot ? (
                            <Image
                              source={arrow}
                              style={{
                                width: 10,
                                height: 17,
                                tintColor: '#000',
                                transform: [{ rotate: '90deg' }],
                              }}
                            />
                          ) : (
                            <Image
                              source={arrow}
                              style={{
                                width: 10,
                                height: 17,
                                tintColor: '#000',
                                transform: [{ rotate: '-90deg' }],
                              }}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginLeft: 15 }}>
                        {!condiFood ? null : (
                          <View style={{ marginLeft: -3 }}>
                            {item?.menuitems && item?.menuitems.length > 0 &&
                              <FlatList
                                data={item?.menuitems}
                                numColumns={2}
                                contentContainerStyle={{ width: "100%", alignItems: 'flex-start', justifyContent: 'space-between' }}
                                renderItem={(item) => renderItem(item)} />
                              // item.menuitems.map((list, key) => {
                              //   return (
                              //     <View key={key} style={{
                              //       flexDirection: 'row',
                              //       // paddingHorizontal: 10,
                              //       marginBottom: 25,
                              //       opacity: list.timingstatus == 0 ? 0.5 : null,
                              //     }} >
                              //       <View style={{ flex: 3 }}>
                              //         <View style={{ width: '100%', borderRadius: 5 }}>
                              //           <Image
                              //             source={{ uri: list?.image }}
                              //             style={{ width: 120, height: 120, borderRadius: 5 }}
                              //           />
                              //         </View>
                              //       </View>
                              //       <View style={{ flex: 5, paddingLeft: 14 }}>
                              //         <Image source={{ uri: list?.foodtype?.icon }}
                              //           style={{ width: 15, height: 15, }} />
                              //         <View style={{ flexDirection: 'row', flex: 4 }}>
                              //           <Text style={{ flex: 3, fontSize: 16, fontFamily: 'Poppins-Bold', paddingTop: 10 }}>
                              //             {list?.userlanguage?.name}
                              //           </Text>
                              //           <Text
                              //             style={{
                              //               flex: 1,
                              //               fontSize: 16,
                              //               fontFamily: 'Poppins-Bold',
                              //               marginTop: 10,
                              //             }}>
                              //             ₹ {list?.final_price}
                              //           </Text>
                              //         </View>
                              //         {cook_details?.cook?.deliverytime == "unserviceable" || cook_details?.cook?.current_status == 0 || list.timingstatus == 0 || list.status == 0 ?
                              //           null
                              //           :
                              //           list.cartquantity?.quantity ?
                              //             <View style={{ flexDirection: 'row', backgroundColor: '#09b44d', height: 30, width: 80, borderRadius: 30 }}>
                              //               <TouchableOpacity style={{ paddingTop: 7, paddingLeft: 13, paddingRight: 10 }} onPress={() => remove_cart_item(list.cartquantity.id, index, 'cuisines', key)}>
                              //                 <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>
                              //                   -
                              //                 </Text>
                              //               </TouchableOpacity>
                              //               <Text style={{ paddingTop: 7, paddingLeft: 7, paddingRight: 8, fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>{list.cartquantity?.quantity}</Text>
                              //               <TouchableOpacity style={{ paddingTop: 7, paddingLeft: 7, }} onPress={() => add_to_cart(list.id, index, 'cuisines', key)}>
                              //                 <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#fff' }}>
                              //                   +
                              //                 </Text>
                              //               </TouchableOpacity>
                              //             </View>
                              //             :
                              //             <TouchableOpacity onPress={() => add_to_cart(list.id, index, 'cuisines', key)} style={{
                              //               marginTop: 15, backgroundColor: '#09b44d',
                              //               width: 100,
                              //               borderRadius: 28,
                              //               padding: 10,
                              //             }}>
                              //               <Text
                              //                 style={{
                              //                   color: '#fff',
                              //                   fontFamily: 'Poppins-Bold',
                              //                   textAlign: 'center',
                              //                   fontSize: 16,
                              //                 }}>
                              //                 {t("foodDetailPage.add")}
                              //               </Text>
                              //             </TouchableOpacity>
                              //         }
                              //       </View>
                              //     </View>
                              //   )
                              // })
                            }
                          </View>
                        )}
                      </View>
                    </View>
                  )
                })
              }
            </View>
            {/* {cook_details?.cook?.fssai_certificate &&
              <Image source={{ uri: cook_details?.cook?.fssai_certificate }} style={{ width: "100%", aspectRatio: 1 }} />
            } */}

          </ScrollView>
        </>
        : null}
      <View>
        {modal &&
          <Modal transparent={true} visible={modal}>
            <Loader />
          </Modal>
        }
      </View>
      {
        modal == false && cook_details && cartShow &&
        <View style={{ justifyContent: 'flex-end', marginBottom: '15%' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CartPage', { type: 'food_detail_page', callBackFun: get_Cart, profile: get_Cook_Profile })}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: '93%',
              width: '100%',
              backgroundColor: '#09b44d',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              height: 60,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular', fontWeight: '400', fontSize: 16 }}>
                {cartDetails?.items}  {t("foodDetailPage.items")}
              </Text>
              <View
                style={{
                  width: 2,
                  height: 22,
                  backgroundColor: '#d5e7dd',
                  marginHorizontal: 10,
                }}></View>
              <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 16 }}>
                ₹  {cartDetails?.amount}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  marginRight: 10,
                }}>
                {t("foodDetailPage.viewCart")}
              </Text>
              <Image source={cartIcon} style={{ width: 23, height: 20, tintColor: '#fff' }} />
            </View>
          </TouchableOpacity>
        </View>
      }
      {showMenu && <Portal>
        <PaperModal visible={showMenu} onDismiss={() => setShowMenu(false)} contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 5 }}>
          <View style={{ width: '70%', alignItems: 'flex-start', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Bold', }}>Tiffen</Text>
              <Text></Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Bold', }}>Lunch</Text>
              <Text></Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Bold', }}>Dinner</Text>
              <Text></Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Bold', }}>Beverages</Text>
              <Text></Text>
            </View>
          </View>
        </PaperModal>
      </Portal>}
      {showFeedback && <Portal>
        <PaperModal visible={showFeedback} onDismiss={() => setShowFeedback(false)} contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 5 }}>
          <View style={{ width: '85%', height: 40, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingTop: 15, paddingLeft: 25 }}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20 }}>4.5</Text>
            <Text style={{ paddingHorizontal: 5 }}>|</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginLeft: 3 }} />
              <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginLeft: 3 }} />
              <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginLeft: 3 }} />
              <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginLeft: 3 }} />
              <Image source={StarSelectIcon} style={{ width: 20, height: 20, marginLeft: 3 }} />
            </View>
          </View>
          <View style={{ width: '85%', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-evenly' }}>
            <View style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Poppins-Bold', }}>Quality</Text>
              <Image source={QualityIcon} style={{ width: 75, height: 75, marginLeft: 10, }} />
            </View>
            <View style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Poppins-Bold', }}>Taste</Text>
              <Image source={TasteIcon} style={{ width: 75, height: 75 }} />
            </View>
            <View style={{ width: 75, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Poppins-Bold', }}>Delivery</Text>
              <Image source={DeliveryIcon} style={{ width: 75, height: 75 }} />
            </View>
          </View>
        </PaperModal>
      </Portal>}
    </SafeAreaView >
  );
};
const styles = StyleSheet.create({
  pageTitle: {
    color: '#fff',
    fontSize: 21,
    fontFamily: 'Poppins-Bold',
    marginTop: 12,
  },
});

export default FoodDetail;
