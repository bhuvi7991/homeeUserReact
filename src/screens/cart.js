import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  FlatList,
  StatusBar,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  arrow,
  photo1,
  roundticIcon,
  locatIcon,
  offerIcon,
  cartIcon,
  backgroundImg,
  rating,
  walletIcon,
  cook_dp,
  emptyCartIcon,
  deleteIcon
} from '../assets/img/Images';
import { api, storage } from '../services/index';
import Loader from './Loader';
import RazorpayCheckout from 'react-native-razorpay';
import { useFocusEffect } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';


const Cart = ({ navigation, route }) => {
  const { t, i18 } = useTranslation();
  const [checkDeliver, setCheckDeliver] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [modal, setModal] = useState(true);
  const [useWallet, setUseWallet] = useState(true);
  const [cuponApplied, setCuponApplied] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const checkDeliverHandler = () => {
    setCheckDeliver(!checkDeliver);
  };
  useFocusEffect(
    React.useCallback(() => {
      getCartItems();
      userData();
    }, []),
  );

  const userData = async () => {
    var user = await storage.getUserData();
    setUserDetails(user);
  };
  const checkOut = async () => {
    var data = {};
    if (useWallet) {
      data = {
        total_amount: cardDetails.amount,
        net_amount: cardDetails.total,
        items: cardDetails.items,
        type: 'wallet',
        tax: cardDetails.gst_amount,
        wallet_amount: cardDetails.wallet_deduct_amount,
        transaction_amount: cardDetails.transaction_amount,
        shipping_charge: cardDetails.shipping_charge,
      };
    } else {
      data = {
        total_amount: cardDetails.amount,
        net_amount: cardDetails.total,
        items: cardDetails.items,
        type: 'normal',
        tax: cardDetails.gst_amount,
        transaction_amount: cardDetails.transaction_amount,
        shipping_charge: cardDetails.shipping_charge,
      };
    }
    let response = await api.transaction(data);
    if (response.status == 'success') {
      console.log('orderWallet', response);
      if (response.wallet_status == 0) {
        var options = {
          description: 'Order payment',
          // image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          // key: 'rzp_test_4QVOnZNpzWBFBM',
          key: 'rzp_live_OIO5EHULxS65B4',
          amount: cardDetails.transaction_amount,
          name: 'Homee Foodz',
          order_id: response.transaction_id, //Replace this with an order_id created using Orders API.
          prefill: {
            email: userDetails.email,
            contact: userDetails.mobile,
            name: userDetails.first_name,
          },
          theme: { color: '#09b44d' },
        };
        RazorpayCheckout.open(options)
          .then(data => {
            var payload = {
              status: 1,
              razor_pay_order_id: data.razorpay_order_id,
              razor_pay_payment_id: data.razorpay_payment_id,
              razor_pay_signature: data.razorpay_signature,
            };
            transactionStatus(payload);
          })
          .catch(error => {
            var payload = {
              status: 0,
              razor_pay_order_id: response.transaction_id,
            };
            transactionStatus(payload);
          });
      } else {
        let res = await api.wallet_full_amount({
          transaction_no: response.transaction_id,
        });
        if (res.status == 'success') {
          alert('Ordered successfully ');
          emptyCart();
          navigation.navigate('Home', res.order);
        }
      }
    } else {
      alert('Unable to complete your process');
    }
  };
  const emptyCart = async () => {
    let response = await api.empty_cart();
    if (response.status == 'success') {
      setCardDetails(null);
    }
  };
  const transactionStatus = async data => {
    let response = await api.transactionStatus(data);
    if (data.status == 1 && response.status == 'success') {
      alert('Ordered successfully');
      emptyCart();
      navigation.navigate('Home', data);
    } else if (data.status == 0 && response.status == 'success') {
      alert('Your transaction is failed');
    }
  };
  const getCartItems = async () => {
    setModal(true);
    let code = await storage.getCouponCode();
    if (useWallet) {
      if (code) {
        let res = await api.apply_coupon({ coupon_code: code });
        if (res.status == 'success') {
          let response = await api.show_wallet({ applied_coupon: code });
          if (response.status == 'success') {
            setCardDetails(response);
            storage.setCartStatus(1);
          } else if (response.status == 'empty') {
            storage.setCartStatus(0);
            setCardDetails(null);
          }
        } else {
          let response = await api.show_wallet();
          if (response.status == 'success') {
            setCardDetails(response);
            storage.setCartStatus(1);
          } else if (response.status == 'empty') {
            storage.setCartStatus(0);
            setCardDetails(null);
          }
        }
      } else {
        let response = await api.show_wallet();
        if (response.status == 'success') {
          setCardDetails(response);
          storage.setCartStatus(1);
        } else if (response.status == 'empty') {
          storage.setCartStatus(0);
          setCardDetails(null);
        }
      }
    } else {
      if (code) {
        let res = await api.apply_coupon({ coupon_code: code });
        if (res.status == 'success') {
          let response = await api.show_cart({ applied_coupon: code });
          if (response.status == 'success') {
            storage.setCartStatus(1);
            setCardDetails(response);
          } else if (response.status == 'empty') {
            storage.setCartStatus(0);
            setCardDetails(null);
          }
        } else {
          let response = await api.show_cart();
          if (response.status == 'success') {
            storage.setCartStatus(1);
            setCardDetails(response);
          } else if (response.status == 'empty') {
            storage.setCartStatus(0);
            setCardDetails(null);
          }
        }
      } else {
        let response = await api.show_cart();
        if (response.status == 'success') {
          storage.setCartStatus(1);
          setCardDetails(response);
        } else if (response.status == 'empty') {
          storage.setCartStatus(0);
          setCardDetails(null);
        }
      }
    }
    setModal(false);
  };
  const getCartItem = async (value) => {
    setModal(true);
    let code = await storage.getCouponCode();
    if (value) {
      if (code) {
        let res = await api.apply_coupon({ coupon_code: code });
        if (res.status == 'success') {
          let response = await api.show_wallet({ applied_coupon: code });
          if (response.status == 'success') {
            setCardDetails(response);
            storage.setCartStatus(1);
          } else if (response.status == 'empty') {
            storage.setCartStatus(0);
            setCardDetails(null);
          }
        } else {
          let response = await api.show_wallet();
          if (response.status == 'success') {
            setCardDetails(response);
            storage.setCartStatus(1);
          } else if (response.status == 'empty') {
            storage.setCartStatus(0);
            setCardDetails(null);
          }
        }
      } else {
        let response = await api.show_wallet();
        if (response.status == 'success') {
          setCardDetails(response);
          storage.setCartStatus(1);
        } else if (response.status == 'empty') {
          storage.setCartStatus(0);
          setCardDetails(null);
        }
      }
    } else {
      if (code) {
        let res = await api.apply_coupon({ coupon_code: code });
        if (res.status == 'success') {
          let response = await api.show_cart({ applied_coupon: code });
          if (response.status == 'success') {
            storage.setCartStatus(1);
            setCardDetails(response);
          } else if (response.status == 'empty') {
            storage.setCartStatus(0);
            setCardDetails(null);
          }
        } else {
          let response = await api.show_cart();
          if (response.status == 'success') {
            storage.setCartStatus(1);
            setCardDetails(response);
          } else if (response.status == 'empty') {
            storage.setCartStatus(0);
            setCardDetails(null);
          }
        }
      } else {
        let response = await api.show_cart();
        if (response.status == 'success') {
          storage.setCartStatus(1);
          setCardDetails(response);
        } else if (response.status == 'empty') {
          storage.setCartStatus(0);
          setCardDetails(null);
        }
      }
    }
    setModal(false);
  };
  console.log(cardDetails);
  useEffect(() => {
    userData();
  }, []);
  useEffect(() => {
    getCartItems();
  }, [useWallet]);
  // useEffect(() => {
  //   getCartItems();
  // }, [cuponApplied]);
  const changeWallet = () => {
    if (useWallet) {
      setUseWallet(false);
      getCartItem(false);
    } else {
      setUseWallet(true);
      getCartItem(true);
    }

  }
  const removeCartMenuIetm = async id => {
    let response = await api.remove_cart_item(id);
    if (response.status == 'success') {
      getCartItems();
    }
  };
  const add_to_cart = async id => {
    let response = await api.add_cart({
      menu_item_id: id,
      cook_id: cardDetails.cook.id,
    });
    if (response.status == 'success') {
      getCartItems();
    }
  };
  const remove_cart_item = async id => {
    let response = await api.minus_quantity(id);
    if (response.status == 'success') {
      getCartItems();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>

      {route?.params?.type ?
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#09b44d',
            height: 60,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            alignItems: 'center',
          }}>

          <TouchableOpacity
            onPress={() => {
              if (route.params) {
                route?.params?.callBackFun();
                route?.params?.profile();
                navigation.goBack();
              } else {
                navigation.goBack();
              }
            }}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}>
            <Image style={{ width: 9, height: 16 }} source={arrow} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.pageTitle, { alignItems: 'center' }]}>Cart</Text>
          </TouchableOpacity>
        </View>
        :
        <View
          style={{
            backgroundColor: '#09b44d',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            justifyContent: 'center',
            height: 60
          }}>
          <View
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}>
            <Text style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Poppins-Bold',
              paddingLeft: 10

            }}>Cart</Text>
          </View>
        </View>
      }
      {cardDetails ?
        (
          <SafeAreaView style={{ flex: 1, position: 'relative', }}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} >
              <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                {/* <Image source={deliveryBoy} style={{ width: 200, height: 200, marginBottom: -100, marginRight: 15, transform:[{}] }} /> */}
                {/* <LottieView source={deliveryBoyJson} autoPlay loop style={{ width: 175, height: 175, marginBottom: -170, paddingLeft: 5 }} /> */}
              </View>
              <View>
                {/* <Text style={{ width: 150, fontFamily: 'Poppins-Bold', fontSize: 18, marginLeft: 10, marginTop: 10 }}> Your Order is Prepared by</Text> */}
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#d9d9d9',
                    borderBottomWidth: 1,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                  }}>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      backgroundColor: '#fff',
                      borderRadius: 50,
                    }}
                    source={cook_dp}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          paddingTop: 15,
                          fontFamily: 'Poppins-Bold',
                          fontSize: 20,
                        }}>
                        {cardDetails?.cook?.first_name}
                      </Text>
                      {/* <Text
                  style={{
                    paddingTop: 15,
                    fontFamily: 'Poppins-Bold',
                    fontSize: 20,
                  }}>
                  4.5
                </Text> 
                <Image
                  style={{
                    width: 13,
                    height: 13,
                    marginTop: 18,
                    marginLeft: 5,
                  }}
                  source={rating}
                />*/}
                    </View>
                    <Text
                      style={{
                        paddingTop: 10,
                        fontFamily: 'Poppins-Bold',
                        fontSize: 14,
                      }}>
                      {cardDetails?.cook?.address?.area}
                    </Text>
                  </View>
                </View>
              </View>
              {cardDetails.cart &&
                cardDetails.cart.map((list, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 4,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      }}>
                      <View style={{ flex: 3 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <Image
                            style={{
                              width: 15,
                              height: 15,
                              backgroundColor: 'red',
                              marginRight: 5,
                            }}
                            source={{ uri: list?.menuitem?.foodtype?.icon }}
                          />
                          <Text style={{ fontFamily: 'Poppins-Bold', width: '80%' }}>
                            {list?.menuitem?.userlanguage?.name}
                          </Text>
                          <View style={{ style: 1 }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: 'Poppins-Bold',
                                color: '#000',
                              }}>
                              ₹ {list?.quantity_amount}
                            </Text>
                          </View>
                        </View>
                        {list.reorder_menu_status == 1 ?
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 10,
                              backgroundColor: '#09b44d',
                              width: 75,
                              alignItems: 'flex-start',
                              borderRadius: 50,
                            }}>
                            <TouchableOpacity
                              style={{
                                width: 25,
                              }}
                              onPress={() => remove_cart_item(list.id)}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontFamily: 'Poppins-Bold',
                                  textAlign: 'center',
                                  fontSize: 14,
                                }}>
                                -
                              </Text>
                            </TouchableOpacity>
                            <Text
                              style={{
                                color: '#fff',
                                paddingBottom: 3,
                                paddingTop: 3,
                                paddingLeft: 7,
                                paddingRight: 7,
                                fontFamily: 'Poppins-Bold',
                                textAlign: 'center',
                                fontSize: 14,
                              }}>
                              {list?.quantity}
                            </Text>
                            <TouchableOpacity
                              style={{
                                width: 25,
                              }}
                              onPress={() => add_to_cart(list.menu_item_id)}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontFamily: 'Poppins-Bold',
                                  textAlign: 'center',
                                  fontSize: 14,
                                }}>
                                +
                              </Text>
                            </TouchableOpacity>
                          </View>
                          :
                          <TouchableOpacity
                            onPress={() => removeCartMenuIetm(list.id)}
                            style={{
                              paddingTop: -10,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                            <Image source={deleteIcon} style={{ height: 25, width: 25 }} />
                            <Text style={{
                              fontFamily: 'Poppins-Bold',
                              textAlign: 'center',
                              fontSize: 14,
                            }}>
                              Remove
                            </Text>

                          </TouchableOpacity>
                        }
                      </View>
                    </View>
                  );
                })}
              <View
                style={{
                  flexDirection: 'row',
                  padding: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderColor: '#d5e7dd',
                  borderBottomWidth: 3,
                  borderTopWidth: 3,
                  marginBottom: 10,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={offerIcon} style={{ width: 28, height: 28 }} />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 13,
                      marginLeft: 8,
                    }}>
                    {t('cartPage.applyCoupon')}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CouponDetails')}
                  style={{ padding: 8 }}>
                  <Image
                    source={arrow}
                    style={{
                      width: 8,
                      height: 13,
                      tintColor: '#000',
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginLeft: 15,
                  marginRight: 15,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Wallet')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={walletIcon}
                    style={{
                      width: 18,
                      height: 13,
                      resizeMode: 'stretch',
                      tintColor: '#000',
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                    }}>
                    {t('cartPage.useWallet')}
                  </Text>
                </TouchableOpacity>
                <CheckBox
                  value={useWallet}
                  onValueChange={changeWallet}
                />
              </View>

              <View style={{ borderColor: '#d5e7dd', borderBottomWidth: 1 }}>
                <View
                  style={{
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderColor: '#d5e7dd',
                    borderBottomWidth: 1,
                    marginBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Poppins-Bold',
                      color: '#000',
                      paddingVertical: 18,
                    }}>
                    {t('cartPage.priceDetails')}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    borderBottomColor: '#d5e7dd',
                    borderBottomWidth: 1,
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginBottom: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginBottom: 5,
                        fontFamily: 'Poppins-Medium',
                        color: '#000',
                      }}>
                      {t('cartPage.itemTotal')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        marginBottom: 5,
                        fontFamily: 'Poppins-Medium',
                        color: '#000',
                      }}>
                      ₹ {cardDetails.amount}
                    </Text>
                  </View>
                  {cardDetails?.discount && (
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          marginBottom: 5,
                          fontFamily: 'Poppins-Medium',
                          color: '#000',
                        }}>
                        {t('cartPage.discount')}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginBottom: 5,
                          fontFamily: 'Poppins-Medium',
                          color: '#09b44d',
                        }}>
                        - ₹ {cardDetails?.discount}
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginBottom: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginBottom: 5,
                        fontFamily: 'Poppins-Medium',
                        color: '#000',
                      }}>
                      {t('cartPage.deliveryCharge')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        marginBottom: 5,
                        fontFamily: 'Poppins-Medium',
                        color: '#000',
                      }}>
                      + ₹ {cardDetails?.shipping_charge}
                    </Text>
                  </View>
                  {useWallet && (
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          marginBottom: 5,
                          fontFamily: 'Poppins-Medium',
                          color: '#000',
                        }}>
                        {t('cartPage.walletAmount')}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginBottom: 5,
                          fontFamily: 'Poppins-Medium',
                          color: '#09b44d',
                        }}>
                        - ₹{' '}
                        {cardDetails?.wallet_deduct_amount
                          ? cardDetails.wallet_deduct_amount
                          : 0}
                      </Text>
                    </View>
                  )}
                  {useWallet && (
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          marginBottom: 5,
                          fontFamily: 'Poppins-Medium',
                          color: '#000',
                        }}>
                        {t('cartPage.walletBalance')}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginBottom: 5,
                          fontFamily: 'Poppins-Medium',
                          color: '#09b44d',
                        }}>
                        ₹ {cardDetails?.wallet_bal ? cardDetails.wallet_bal : 0}
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginBottom: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginBottom: 5,
                        fontFamily: 'Poppins-Medium',
                        color: '#000',
                      }}>
                      {t('cartPage.tax')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        marginBottom: 5,
                        fontFamily: 'Poppins-Medium',
                        color: '#000',
                      }}>
                      + ₹ {cardDetails?.gst_amount}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 15,
                    borderColor: '#d5e7dd',
                    padding: 15,
                    paddingBottom: 0,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 5,
                      fontFamily: 'Poppins-Bold',
                      color: '#000',
                    }}>
                    {t('cartPage.totalAmount')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 5,
                      fontFamily: 'Poppins-Bold',
                      color: '#000',
                    }}>
                    ₹ {cardDetails.transaction_amount}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: 15,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      borderWidth: 1,
                      justifyContent: 'center',
                      position: 'relative',
                      alignItems: 'center',
                      borderColor: '#a6a6a6',
                      width: 45,
                      height: 45,
                    }}>
                    <Image source={locatIcon} style={{ width: 20, height: 30 }} />
                    <View
                      style={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                      }}>
                      <Image
                        source={roundticIcon}
                        style={{ width: 20, height: 20 }}
                      />
                    </View>
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14 }}>
                      {t('cartPage.deliverTo')}{' '}
                      {userDetails?.defaultaddress?.type}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize: 14,
                        paddingVertical: 4,
                      }}>
                      {userDetails?.defaultaddress?.street}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14 }}>
                      {cardDetails?.delivery_time} {t('cartPage.mins')}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddressChoose', {
                      getCartItem: getCartItems, profile: userData,
                      useWallet: setUseWallet, type: 'Cart'
                    });
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 14,
                      color: '#09b44d',
                    }}>
                    {t('cartPage.changeAddress')}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            {cardDetails?.cook?.status == 1 && cardDetails?.cook?.current_status == 1 && cardDetails.remove_status == 1 && cardDetails.delivery_boy_status != 0 ?
              <View style={{ marginBottom: route?.params ? 0 : 70 }}>
                <TouchableOpacity
                  onPress={checkOut}
                  style={{
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
                  <Text
                    style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 16 }}>
                    ₹{cardDetails.transaction_amount}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Poppins-Bold',
                        fontSize: 16,
                        marginRight: 10,
                      }}>
                      {t('cartPage.checkOut')}
                    </Text>
                    <Image source={cartIcon} style={{ width: 23, height: 20 }} />
                  </View>
                </TouchableOpacity>
              </View>
              :
              <View style={{ marginBottom: route?.params ? 0 : '15%' }}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    backgroundColor: '#09b44d',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: 60,
                    alignItems: 'center',
                    paddingHorizontal: 25,
                    justifyContent: 'center'
                  }}>
                  <Text
                    style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 20 }}>
                    {cardDetails.remove_status == 0 ? "Remove unavailable items" : null}
                    {cardDetails?.cook?.status != 1 || cardDetails?.cook?.current_status != 1 ? "Cook isn't available !" : null}
                    {cardDetails.delivery_boy_status == 0 ? "Delivery service unavailable" : null}
                  </Text>

                </TouchableOpacity>

              </View>
            }
          </SafeAreaView>
        ) : modal != true &&
        (
          <View style={{ flex: 1, paddingVertical: 300, alignItems: 'center' }}>
            <Image style={{ height: 100, width: 100, alignItems: 'center' }} source={emptyCartIcon} />
            <Text style={{
              textAlign: 'center', fontFamily: 'Poppins-Bold',
              fontSize: 14, opacity: 0.25
            }}>No data available...</Text>
          </View>
        )
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
});

export default Cart;
