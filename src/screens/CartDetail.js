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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  arrow,
  photo1,
  roundticIcon,
  locatIcon,
  offerIcon,
  cartIcon,
} from '../assets/img/Images';
import { api } from '../services/index';
import Loader from './Loader';
const CartDetail = ({ navigation }) => {
  const [checkDeliver, setCheckDeliver] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [modal, setModal] = useState(true);
  const checkDeliverHandler = () => {
    setCheckDeliver(!checkDeliver);
  };
  const getCartItems = async () => {
    setModal(true); console.log('response');
    let response = await api.show_cart();
    console.log('response11111', response);
    if (response.status == 'success') {
      setCardDetails(response);
    }
    setModal(false);
  }
  useEffect(() => {
    getCartItems();
  }, [])
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ borderColor: '#d5e7dd', borderBottomWidth: 4 }}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('FoodDetail')}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginBottom: 25,
            }}>
            <View style={{ flex: 2, paddingLeft: 14 }}>
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderColor: '#bbb',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  marginBottom: 8,
                }}>
                <View
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 59,
                    backgroundColor: '#09b44d',
                  }}></View>
              </View>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }}>
                Panner Cukka
              </Text>
              <Text
                style={{ fontSize: 15, fontFamily: 'Poppins-Bold', marginTop: 5 }}>
                {' '}
                ₹300
              </Text>
              <TouchableOpacity style={{ marginTop: 15 }}>
                <Text
                  style={{
                    color: '#fff',
                    backgroundColor: '#09b44d',
                    width: 100,
                    borderRadius: 28,
                    padding: 10,
                    fontFamily: 'Poppins-Bold',
                    textAlign: 'center',
                    fontSize: 15,
                  }}>
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2 }}>
              <View style={{ width: '100%', borderRadius: 5 }}>
                <Image
                  source={photo1}
                  style={{ width: '100%', height: 150, borderRadius: 5 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#09b44d',
          marginBottom: 20,
          height: 60,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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

      <ScrollView style={{ marginBottom: 70 }}>
        {cardDetails && cardDetails?.cart.length > 0 &&
          cardDetails.cart.map((list, index) => {
            return (
              <>
                <View key={index} style={{ borderColor: '#d5e7dd', borderBottomWidth: 4 }}>
                  <View style={{ padding: 10 }}>
                    <TouchableOpacity
                      // onPress={() => navigation.navigate('FoodDetail')}
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        marginBottom: 25,
                      }}>
                      <View style={{ flex: 2, paddingLeft: 14 }}>
                        <View
                          style={{
                            width: 26,
                            height: 26,
                            borderColor: '#bbb',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 2,
                            marginBottom: 8,
                          }}>
                          <View
                            style={{
                              width: 13,
                              height: 13,
                              borderRadius: 59,
                              backgroundColor: '#09b44d',
                            }}></View>
                        </View>
                        <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold' }}>
                          {list?.menuitem?.userlanguage?.name}
                        </Text>
                        <Text
                          style={{ fontSize: 15, fontFamily: 'Poppins-Bold', marginTop: 5 }}>
                          {' '}
                          ₹ {list?.menuitem?.final_price}
                        </Text>
                        <View style={{ marginTop: 15, flexDirection: "row" }}>
                          <TouchableOpacity style={{
                            color: '#fff',
                            backgroundColor: '#09b44d',
                            width: 50,
                            borderRadius: 10,
                            padding: 10,
                            fontFamily: 'Poppins-Bold',
                            textAlign: 'center',
                            fontSize: 15,
                          }}>
                            <Text style={{
                              color: '#fff',
                              fontFamily: 'Poppins-Bold',
                              textAlign: 'center',
                              fontSize: 15,
                            }}>
                              -
                            </Text>
                          </TouchableOpacity>
                          <Text style={{
                            color: '#000',
                            width: 50,
                            borderRadius: 10,
                            padding: 10,
                            fontFamily: 'Poppins-Bold',
                            textAlign: 'center',
                            fontSize: 15,
                          }}>{list.quantity}</Text>
                          <TouchableOpacity style={{
                            fontFamily: 'Poppins-Bold',
                            textAlign: 'center',
                            fontSize: 15,
                          }}>
                            <Text style={{
                              color: '#fff',
                              backgroundColor: '#09b44d',
                              width: 50,
                              borderRadius: 10,
                              padding: 10,
                              fontFamily: 'Poppins-Bold',
                              textAlign: 'center',
                              fontSize: 15,
                            }}>
                              +
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={{ flex: 2 }}>
                        <View style={{ width: '100%', borderRadius: 5 }}>
                          <Image
                            source={{ uri: list?.menuitem?.image }}
                            style={{ width: '100%', height: 150, borderRadius: 5 }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )
          })

        }

        <>
          <View
            style={{
              flexDirection: 'row',
              padding: 15,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: '#d5e7dd',
              borderBottomWidth: 4,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={offerIcon} style={{ width: 28, height: 28 }} />
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 13,
                  marginTop: 4,
                  marginLeft: 8,
                }}>
                APPLY COUPON
              </Text>
            </View>
            <TouchableOpacity style={{ padding: 8 }}>
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
                PRICE DETAILS
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
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                  }}>
                  Price (1 item)
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 5,
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                  }}>
                  ₹ 500
                </Text>
              </View>
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
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                  }}>
                  Discount
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 5,
                    fontFamily: 'Poppins-Regular',
                    color: '#09b44d',
                  }}>
                  - ₹ 100
                </Text>
              </View>
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
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                  }}>
                  Delivery Charge
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 5,
                    fontFamily: 'Poppins-Regular',
                    color: '#09b44d',
                  }}>
                  Free
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
                TOTAL AMOUNTS
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 5,
                  fontFamily: 'Poppins-Bold',
                  color: '#000',
                }}>
                ₹ 500
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
                  <Image source={roundticIcon} style={{ width: 20, height: 20 }} />
                </View>
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14 }}>
                  Deliver to Other
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    paddingVertical: 4,
                  }}>
                  Monisan Colony
                </Text>
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14 }}>
                  30 Mins
                </Text>
              </View>
            </View>
            <Text
              style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#09b44d' }}>
              ADD ADDRESS
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('cartPage')}
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
            <Text style={{ color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 16 }}>
              ₹ 500
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  marginRight: 10,
                }}>
                Check Out
              </Text>
              <Image source={cartIcon} style={{ width: 23, height: 20 }} />
            </View>
          </TouchableOpacity>
        </>
      </ScrollView>
      <View>
        {modal &&
          <Modal transparent={true} visible={modal}>
            <Loader />
          </Modal>
        }
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

export default CartDetail;
