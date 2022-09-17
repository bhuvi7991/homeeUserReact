import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import { ticIcon1, arrow } from '../assets/img/Images';
import { useFocusEffect } from '@react-navigation/core';
import { api } from '../services';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
var { width, height } = Dimensions.get('window');
const OrderSteps = ({ navigation, route }) => {
  const { t, i18 } = useTranslation();
  const [modal, setModal] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const getOrderDetail = async () => {
    setModal(true);
    let response = await api.order_details(route?.params?.id);
    setOrderDetails(response?.order);
    console.log(response);
    setModal(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      getOrderDetail();
    }, [])
  );
  const onProceed = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => Linking.openURL(url))
      .catch(() => Alert.alert("Error", "There was an error attempting to opening the location."));
    // Linking.canOpenURL(url).then(supported => {
    //   console.log(supported);
    //   if (supported) {
    //     Linking.openURL(url);
    //   } else {
    //     alert("Unable to track your order");
    //   }
    // });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {modal != true &&
        <>
          <View
            style={{
              height: 55,
              backgroundColor: '#09b44d',
            }}>
            <View
              style={{
                padding: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                  }}>
                  <Image style={{ width: 11, height: 18 }} source={arrow} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={[styles.pageTitle, { alignItems: 'center' }]}>
                    {t('orderStepsPage.orderReport')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#09b44d',
              height: 120,
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.estimatedTime}>{t('orderStepsPage.orderId')}</Text>
              <Text style={styles.orderId}>{orderDetails?.order_no ? orderDetails.order_no : null}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.estimatedTime}>{t('orderStepsPage.estimatedTime')}</Text>
              <Text style={styles.orderId}>{orderDetails?.delivery?.total_time ? orderDetails.delivery.total_time + t('orderStepsPage.mins') : "N/A"}</Text>
            </View>
          </View>
          <ScrollView>
            <View style={{ padding: 10, marginTop: 25 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 70, justifyContent: 'flex-start' }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', textAlign: 'right' }}>
                    {/* 08:50 AM */}
                  </Text>
                </View>
                <View style={[styles.oredrTick, { backgroundColor: 'green' }]}>
                  <Image source={ticIcon1} style={styles.oredrTickIcon} />
                  {/* <Text
                style={
                  ([{fontFamily: 'Poppins-Regular', textAlign: 'right'}],
                  styles.oredrTictext)
                }></Text> */}
                  <View
                    style={{
                      width: 2,
                      height: 80,
                      backgroundColor: 'green',
                      position: 'absolute',
                      top: 2,
                      zIndex: 1,
                    }}></View>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      textAlign: 'left',
                      fontSize: 15,
                    }}>
                    {t('orderStepsPage.orderPlaces')}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: 12,
                      color: '#686868',
                    }}>
                    {t('orderStepsPage.weHaveReceivedyourOrder')}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 70, justifyContent: 'flex-start' }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', textAlign: 'right' }}>
                    {/* 08:50 AM */}
                  </Text>
                </View>
                <View style={[styles.oredrTick, { backgroundColor: orderDetails?.delivery_status >= 3 ? 'green' : 'darkblue' }]}>
                  {orderDetails?.delivery_status >= 3 ? <Image source={ticIcon1} style={styles.oredrTickIcon} /> : null}
                  {/* <Text
                style={
                  ([{fontFamily: 'Poppins-Regular', textAlign: 'right'}],
                  styles.oredrTictext)
                }></Text> */}
                  <View
                    style={{
                      width: 2,
                      height: 80,
                      backgroundColor: orderDetails?.delivery_status >= 3 ? 'green' : 'darkblue',
                      position: 'absolute',
                      top: 2,
                      zIndex: 1,
                    }}></View>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      textAlign: 'left',
                      fontSize: 15,
                    }}>
                    {t('orderStepsPage.orderConfirmed')}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: 12,
                      color: '#686868',
                    }}>
                    {t('orderStepsPage.cookAcceptedYourOrder')}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 70, justifyContent: 'flex-start' }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', textAlign: 'right' }}>
                    {/* 08:50 AM */}
                  </Text>
                </View>
                <View style={[styles.oredrTick, { backgroundColor: orderDetails?.delivery_status >= 5 ? 'green' : 'darkblue' }]}>
                  {orderDetails?.delivery_status >= 5 ? <Image source={ticIcon1} style={styles.oredrTickIcon} /> : null}
                  {/* <Text
                style={
                  ([{fontFamily: 'Poppins-Regular', textAlign: 'right'}],
                  styles.oredrTictext)
                }></Text> */}
                  <View
                    style={{
                      width: 2,
                      height: 80,
                      backgroundColor: orderDetails?.delivery_status >= 5 ? 'green' : 'darkblue',
                      position: 'absolute',
                      top: 2,
                      zIndex: 1,
                    }}></View>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      textAlign: 'left',
                      fontSize: 15,
                    }}>
                    {t('orderStepsPage.pickedUp')}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: 12,
                      color: '#686868',
                    }}>
                    {t('orderStepsPage.dunzoPickedYourOrder')}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 70, justifyContent: 'flex-start' }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', textAlign: 'right' }}>
                    {/* 08:50 AM */}
                  </Text>
                </View>
                <View style={[styles.oredrTick, { backgroundColor: orderDetails?.delivery_status == 6 ? 'green' : 'darkblue' }]}>
                  {orderDetails?.delivery_status == 6 ? <Image source={ticIcon1} style={styles.oredrTickIcon} /> : null}
                  {/* <Text
                style={
                  ([{fontFamily: 'Poppins-Regular', textAlign: 'right'}],
                  styles.oredrTictext)
                }></Text> */}
                  <View
                    style={{
                      width: 2,
                      position: 'absolute',
                      top: 2,
                      zIndex: 1,
                    }}></View>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      textAlign: 'left',
                      fontSize: 15,
                    }}>
                    {t('orderStepsPage.orderDelivered')}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'left',
                      fontSize: 12,
                      color: '#686868',
                    }}>
                    {t('orderStepsPage.yourOrderHasBeenDelivered')}
                  </Text>
                </View>
              </View>
            </View>
            {orderDetails?.delivery?.runner_details ? (
              <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                <Text style={{ alignItems: 'center', maxWidth: '95%', fontFamily: 'Poppins-Bold', fontSize: 16, color: '#09b44d' }}>{orderDetails?.delivery?.runner_details ? "Your Order Is Scheduled For Delivery, " + orderDetails.delivery.runner_details.name + ", will contact you shortly. " : null}
                </Text>
                {/* <Text style={{ alignItems: 'center', maxWidth: '95%', fontFamily: 'Poppins-Bold', fontSize: 16, color: '#09b44d' }}>
                  {orderDetails.delivery.runner_details.phone_number ? " You will recevice call from this number  " + orderDetails.delivery.runner_details.phone_number + "." : null}</Text> */}
              </View>
            ) : null
            }
          </ScrollView>

          {/* <View
            style={{
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
            }}>
             <TouchableOpacity
          onPress={onProceed}
          style={[{alignItems: 'center'}, styles.buttonBack]}>
          <Text style={styles.buttonStyle}>Order Cancel</Text>
        </TouchableOpacity> 

            {orderDetails?.delivery_status == 5 && orderDetails?.delivery?.tracking_url != null &&
              <TouchableOpacity
                onPress={() => onProceed(orderDetails?.delivery?.tracking_url)}
                style={[{ alignItems: 'center' }, styles.buttonBack]}>
                <Text style={styles.buttonStyle}>{t('orderStepsPage.trackYourOrder')}</Text>
              </TouchableOpacity>
            }
          </View>*/}
        </>
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
  orderId: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  estimatedTime: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  oredrTick: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 3,
    position: 'relative',
    marginBottom: 50,
  },
  oredrTickIcon: {
    width: 14,
    height: 14,
    tintColor: '#fff',
    zIndex: 2,
  },
  oredrTictext: {
    color: '#fff',
    width: 18,
    height: 18,
    backgroundColor: '#fff',
    borderRadius: 50,
    fontFamily: 'Poppins-Bold',
    zIndex: 2,
  },
  buttonBack: {
    height: 46,
    marginVertical: 40,
    borderRadius: 50,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09b44d',
  },
  buttonStyle: {
    fontSize: width * 0.04,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
});

export default OrderSteps;
