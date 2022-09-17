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
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { arrow, photo1, emptyCartIcon } from '../assets/img/Images';
import { useTranslation } from 'react-i18next';
import Loader from './Loader';
import { api } from '../services';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { offlineRefund, walletRefund } from '../services/api';
const OrderedFoodz = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    getOrderDetails();
  }, []);
  const getOrderDetails = async () => {
    setModal(true);
    let response = await api.order_details(route.params.id);
    if (response.status == 'success') {
      setOrderDetails(response.order);
    }
    setModal(false)
  }
  const ratingChange = e => {
    setRating(e);
  }
  const submitRating = async () => {
    setModal(true);
    let response = await api.rating({
      order_id: route.params.id,
      rating: rating,
    });
    if (response.status == 'success') {
      alert(response.message);
      getOrderDetails();
      setReviewModal(!reviewModal);
      setRating(0);
    }
    setModal(false);
  }
  const offlineRefund = async () => {
    setModal(true);
    let response = await api.offlineRefund(route.params.id);
    setModal(false);
    if (response.status == 'success') {
      Alert.alert('Information', 'Your amount will be transfer to your account', [
        {
          text: 'OK',
          onPress: () => {
            getOrderDetails();
          },
        },
      ],
        { cancelable: false },
      );
    }
  }
  const walletRefund = async () => {
    setModal(true);
    let response = await api.walletRefund(route.params.id);
    setModal(false);
    if (response.status == 'success') {
      Alert.alert('Information', 'Your amount will be transfer to your wallet', [
        {
          text: 'OK',
          onPress: () => {
            getOrderDetails();
          },
        },
      ],
        { cancelable: false },
      );
    }
  }
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
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <Image style={{ width: 10, height: 18 }} source={arrow} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Order Details</Text>
      </View>
      {modal != true && orderDetails ?
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              justifyContent: 'space-around',
              alignItems: 'center',
              borderColor: '#e5e5e5',
              borderBottomWidth: 1,
              opacity: 0.5,
            }}>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>
              {t("orderedFoodzPage.orderId")} {orderDetails?.order_no}
            </Text>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }}>
              {t("orderedFoodzPage.date")}  {orderDetails?.date}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 15,
              borderColor: '#e5e5e5',
              borderWidth: 1,
            }}>
            {orderDetails && orderDetails?.orderdetails.length > 0 &&
              orderDetails?.orderdetails.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      borderColor: '#e5e5e5',
                      borderBottomWidth: 1,
                    }}>
                    {/* <View style={{ width: 80, borderRadius: 5 }}>
                      <Image
                        source={{ uri: item?.menuitem?.image }}
                        style={{ width: '100%', height: 80, borderRadius: 5 }}
                      />
                    </View> */}
                    <View style={{ flex: 4, paddingLeft: 8, justifyContent: 'center' }}>
                      <Text
                        style={{ fontSize: 15, fontFamily: 'Poppins-Bold', marginBottom: 4 }}>
                        {item?.menuitem?.userlanguage?.name ? item.menuitem.userlanguage.name : null}
                      </Text>
                      {/* <Text
                        style={{ fontSize: 14, fontFamily: 'Poppins-Regular', marginBottom: 4 }}>
                        Adolf Hitler
                      </Text> */}
                      <Text
                        style={{ fontSize: 14, fontFamily: 'Poppins-Regular', marginBottom: 4 }}>
                        {t("orderedFoodzPage.quantity")}
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Poppins-Bold',
                            color: '#09b44d',
                          }}>
                          {item?.quantity ? item.quantity : null}
                        </Text>
                      </Text>
                    </View>
                    <View style={{ flex: 2, paddingLeft: 8, justifyContent: 'center' }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Poppins-Bold',
                          marginBottom: 4,
                          color: '#09b44d',
                          textAlign: 'right',
                        }}>
                        {item?.net_amount ? "₹ " + item.net_amount : null}
                      </Text>
                    </View>
                  </View>
                )
              })
            }
            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                  {t("orderedFoodzPage.deliveryStatus")}
                </Text>
                <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold', fontSize: 14,
                    color: orderDetails?.delivery_status == 2 ? '#cc0600' : '#09b44d',
                  }}>
                  {orderDetails?.delivery_status == 2 ? 'Cancelled' : null}
                  {orderDetails?.delivery_status == 6 ? ' Delivered' : null}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                  {t("orderedFoodzPage.transactionStatus")}
                </Text>
                <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold', fontSize: 14,
                    color: orderDetails?.transaction?.status == 3 ? '#f28100' :
                      orderDetails?.transaction?.status == 0 ? '#cc0600' : '#09b44d'
                  }}>
                  {orderDetails?.transaction?.status == 3 ? "Refund" : null}
                  {orderDetails?.transaction?.status == 1 ? "Paid" : null}
                  {orderDetails?.transaction?.status == 0 ? "Failed" : null}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                  {t("orderedFoodzPage.transactionType")}
                </Text>
                <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                <Text
                  style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#09b44d' }}>
                  {orderDetails?.transaction?.transaction_amount == 0 ? "Wallet" : "Online"}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                  Item total
                </Text>
                <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                <Text
                  style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#09b44d' }}>
                  {orderDetails?.total_amount ? orderDetails?.total_amount : 0}
                </Text>
              </View>
              {orderDetails?.transaction?.order_info?.discount ?
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                    Discount
                  </Text>
                  <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                  <Text
                    style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#09b44d' }}>
                    {orderDetails?.transaction?.order_info?.discount ? orderDetails?.transaction?.order_info?.discount : 0}
                  </Text>
                </View> : null
              }
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                  Delivery Charge
                </Text>
                <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                <Text
                  style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#09b44d' }}>
                  {orderDetails?.shipping_charge ? orderDetails?.shipping_charge : 0}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                  Tax
                </Text>
                <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                <Text
                  style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#09b44d' }}>
                  {orderDetails?.transaction?.order_info?.tax ? orderDetails?.transaction?.order_info?.tax : 0}
                </Text>
              </View>
              {orderDetails?.transaction?.wallet_amount ?
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                    Wallet Amount
                  </Text>
                  <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                  <Text
                    style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#09b44d' }}>
                    {orderDetails?.transaction?.wallet_amount ? orderDetails?.transaction?.wallet_amount : 0}
                  </Text>
                </View> : null
              }
              {orderDetails?.transaction?.transaction_amount ?
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                    Transaction Amount
                  </Text>
                  <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                  <Text
                    style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#09b44d' }}>
                    {orderDetails?.transaction?.transaction_amount ? orderDetails?.transaction?.transaction_amount : 0}
                  </Text>
                </View> : null}

              {orderDetails?.review_status == 1 && orderDetails?.delivery_status == 6 &&
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: 130, fontFamily: 'Poppins-Regular', fontSize: 14 }}>
                    Your Rating
                  </Text>
                  <Text style={{ marginTop: 3, marginRight: 6 }}>:</Text>
                  <Text
                    style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#09b44d' }}>
                    {orderDetails?.review?.rating ? orderDetails.review.rating + " / 5" : null}
                  </Text>
                </View>
              }
            </View>
          </View>

          {orderDetails?.refund_status > 0 && orderDetails?.delivery_status == 2 &&
            <View style={{
              paddingTop: 20,
              alignItems: 'center',
            }}>
              {orderDetails.refund_status == 1 &&
                <Text style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 18,
                  color: '#f28100'
                }}>
                  Payment initiated
                </Text>
              }
              {orderDetails.refund_status == 2 &&
                <Text style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 18,
                  color: '#09b44d'
                }}>
                  Payment completed
                </Text>
              }
              {orderDetails.refund_status == 3 &&
                <Text style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 18,
                  color: '#09b44d'
                }}>
                  Refunded to wallet
                </Text>
              }
            </View>
          }
          {orderDetails?.refund_status == 0 && orderDetails?.delivery_status == 2 &&
            <View style={{ padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity
                onPress={walletRefund}
                style={{
                  backgroundColor: '#09b44d',
                  padding: 10,
                  borderRadius: 20,
                  width: 150,
                  alignItems: 'center'
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 14,
                    color: '#fff'
                  }}>
                  Refund to wallet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={offlineRefund}
                style={{
                  backgroundColor: '#09b44d',
                  padding: 10,
                  borderRadius: 20,
                  width: 150,
                  alignItems: 'center'
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 14,
                    color: '#fff'
                  }}>
                  Refund to account
                </Text>
              </TouchableOpacity>
            </View>
          }

          {orderDetails?.review_status == 0 && orderDetails?.delivery_status == 6 &&
            <View style={{ padding: 10, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => setReviewModal(!reviewModal)}
                style={{
                  backgroundColor: '#09b44d',
                  padding: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderRadius: 20,
                  width: 'auto',
                  alignItems: 'center'
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                    color: '#fff'
                  }}>
                  Rate the Order
                </Text>
              </TouchableOpacity>
            </View>
          }
        </ScrollView>
        : modal != true &&
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
      {modal && (
        <Modal transparent={true} visible={modal}>
          <Loader />
        </Modal>
      )}
      {
        reviewModal &&
        <Modal transparent={false} visible={reviewModal}>
          <View style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "column",
            padding: 10,
            paddingVertical: '95 %',
          }}>
            <Text style={{
              textAlign: 'center',
              paddingTop: 20,
              fontFamily: 'Poppins-Bold',
              color: '#000',
              fontSize: 18,
            }}>Rate Your Order</Text>
            <Rating
              type='star'
              ratingTextColor='#000'
              showRating
              count={5}
              startingValue={0}
              onFinishRating={ratingChange}
              style={{ paddingVertical: 10 }}
            />
            {rating != null && rating > 0 &&
              <TouchableOpacity
                onPress={submitRating}
                style={{
                  backgroundColor: '#09b44d',
                  borderRadius: 20,
                  width: 150,
                  marginTop: 30,
                  height: 40,
                  padding: 10,
                  alignSelf: 'center'
                }}>
                <Text style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-Bold',
                  color: '#fff',
                  fontSize: 18,
                }}>
                  Submit
                </Text>
              </TouchableOpacity>
            }
            <TouchableOpacity
              onPress={() => { setReviewModal(!reviewModal); setRating(0); }}
              style={{
                backgroundColor: '#000',
                borderRadius: 20,
                width: 150,
                marginTop: 30,
                height: 40,
                padding: 10,
                alignSelf: 'center'
              }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Bold',
                color: '#fff',
                fontSize: 18,
              }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>

        </Modal>
      }
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

export default OrderedFoodz;
