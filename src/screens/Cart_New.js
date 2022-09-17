/* eslint-disable react-native/no-inline-styles */
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
    Alert,
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
import { HomeBgColor, PrimaryGreen, TextColor2 } from '../helper/styles.helper';
import backButton from "../assets/img/back_button.png";
import avoidCalling from '../assets/img/cart/avoidcall.png';
import directionToReach from '../assets/img/cart/directionToReach.png';
import handoverToSecurity from '../assets/img/cart/handoverToSecurity.png';
import leaveAtDoor from '../assets/img/cart/leaveAtDoor.png';

const Cart = ({ navigation, route }) => {
    const { t, i18 } = useTranslation();
    const [checkDeliver, setCheckDeliver] = useState(false);
    const [cardDetails, setCardDetails] = useState(null);
    const [modal, setModal] = useState(true);
    const [useWallet, setUseWallet] = useState(false);
    const [cuponApplied, setCuponApplied] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [showCheckout, setShowCheckout] = useState(true);
    const [instructions, setInstructions] = useState({ ac: false, ld: false, hs: false, dr: false });
    const checkDeliverHandler = () => {
        setCheckDeliver(!checkDeliver);
    };

    useEffect(() => {
        setShowCheckout(true);
    }, [modal, alert]);

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
        setShowCheckout(false);
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
        console.log("transaction response", response);
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
                        console.log("razorpay data", data);
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
                console.log("wallet res", res);
                if (res.status == 'success') {
                    emptyCart();
                    // alert('Ordered successfully ');
                    navigation.navigate('SuccessScreen', res.order);
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
        console.log("transactionStatus", response);
        if (data.status == 1 && response.status == 'success') {
            emptyCart();
            // alert('Ordered successfully');
            navigation.navigate('SuccessScreen', data);
        } else if (data.status == 0 && response.status == 'success') {
            Alert.alert('Transaction Failed', 'Your transaction is failed',
                [{
                    text: 'Ok',
                    onPress: () => setShowCheckout(true)
                }]);
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
                        console.log("card details1111111", response);
                        setCardDetails(response);
                        storage.setCartStatus(1);
                    } else if (response.status == 'empty') {
                        storage.setCartStatus(0);
                        setCardDetails(null);
                    }
                } else {
                    let response = await api.show_wallet();
                    console.log("card details222222", response);
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
                console.log("card details33333333", response);
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
                        console.log("card details11111", response);
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
                    console.log("ranjith rrr", response);
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
    // console.log(cardDetails);
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

    // console.log("params from cart page", route.params);
    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: HomeBgColor }}>
            {/* {route?.params?.type ?
                <View
                    style={{
                        // flexDirection: 'row',
                        // alignItems: 'center',
                        // backgroundColor: '#09b44d',
                        // height: 60,
                        // borderBottomLeftRadius: 25,
                        // borderBottomRightRadius: 25,
                        // alignItems: 'center',
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
                        // backgroundColor: '#09b44d',
                        // borderBottomLeftRadius: 25,
                        // borderBottomRightRadius: 25,
                        // justifyContent: 'center',
                        // height: 60
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
            } */}
            {cardDetails ?
                (
                    <SafeAreaView style={{ flex: 1, position: 'relative', }}>
                        <StatusBar backgroundColor={HomeBgColor} barStyle="dark-content" />
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, paddingTop: 5 }} onPress={() => navigation.goBack()} >
                            <Image source={backButton} style={{ width: 24, aspectRatio: 1, marginLeft: 15, tintColor: PrimaryGreen }} />
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, marginLeft: 5 }}>{cardDetails?.cook?.first_name}</Text>
                        </TouchableOpacity>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }} >
                            {cardDetails.cart &&
                                cardDetails.cart.map((list, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{
                                                flex: 4,
                                                marginHorizontal: 10,
                                                borderRadius: 15,
                                                elevation: 3,
                                                backgroundColor: 'white',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                paddingHorizontal: 15,
                                                paddingVertical: 7,
                                                marginTop: 10
                                            }}>
                                            <View style={{ flex: 3 }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
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
                                                                fontSize: 16,
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
                                                            marginTop: 5,
                                                            backgroundColor: '#09b44d',
                                                            width: 75,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
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
                                                                paddingVertical: 1,
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
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, marginTop: 10, marginLeft: 10 }}>{t('cartPage.offers&Benefits')}</Text>
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    marginHorizontal: 10,
                                    backgroundColor: '#fff',
                                    borderRadius: 15,
                                    elevation: 3,
                                    // borderColor: '#d5e7dd',
                                    // borderBottomWidth: 3,
                                    // borderTopWidth: 3,
                                    marginBottom: 10,
                                }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('CouponDetails')}
                                    style={{
                                        padding: 8,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={offerIcon} style={{ width: 28, height: 28 }} />
                                        <View>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Bold',
                                                    fontSize: 13,
                                                    marginLeft: 8,
                                                }}>
                                                {t('cartPage.applyCoupon')}
                                            </Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontWeight: '400', marginTop: -5, marginLeft: 8, fontSize: 11, color: TextColor2 }}>Tap to check the exciting offers</Text>
                                        </View>
                                    </View>
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
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, marginTop: 10, marginLeft: 10 }}>{t('cartPage.deliveryInstructions')}</Text>
                            <ScrollView style={{ paddingHorizontal: 10, marginVertical: 10, marginRight: 20, paddingBottom: 5 }} horizontal showsHorizontalScrollIndicator={false} >
                                <TouchableOpacity onPress={() => setInstructions({ ac: true, ld: false, hs: false, dr: false })} style={{ backgroundColor: instructions.ac ? PrimaryGreen : '#fff', flexDirection: 'row', elevation: 3, borderWidth: 1, borderColor: '#989898', borderRadius: 20, marginRight: 15, paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={avoidCalling} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5, tintColor: instructions.ac ? '#fff' : PrimaryGreen }} />
                                    <Text style={{ color: instructions.ac ? '#fff' : '#000' }}>Avoid Calling</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setInstructions({ ac: false, ld: true, hs: false, dr: false })} style={{ backgroundColor: instructions.ld ? PrimaryGreen : '#fff', flexDirection: 'row', elevation: 3, borderWidth: 1, borderColor: '#989898', borderRadius: 20, marginRight: 15, paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={leaveAtDoor} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5, tintColor: instructions.ld ? '#fff' : PrimaryGreen }} />
                                    <Text style={{ color: instructions.ld ? '#fff' : '#000' }}>leave at the Door</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setInstructions({ ac: false, ld: false, hs: true, dr: false })} style={{ backgroundColor: instructions.hs ? PrimaryGreen : '#fff', flexDirection: 'row', elevation: 3, borderWidth: 1, borderColor: '#989898', borderRadius: 20, marginRight: 15, paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={handoverToSecurity} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5, tintColor: instructions.hs ? '#fff' : PrimaryGreen }} />
                                    <Text style={{ color: instructions.hs ? '#fff' : '#000' }}>Handover to Security</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setInstructions({ ac: false, ld: false, hs: false, dr: true })} style={{ backgroundColor: instructions.dr ? PrimaryGreen : '#fff', flexDirection: 'row', elevation: 3, borderWidth: 1, borderColor: '#989898', borderRadius: 20, marginRight: 15, paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={directionToReach} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5, tintColor: instructions.dr ? '#fff' : PrimaryGreen }} />
                                    <Text style={{ color: instructions.dr ? '#fff' : '#000' }}>Directions to Reach</Text>
                                </TouchableOpacity>

                            </ScrollView>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginHorizontal: 15,
                                    // marginTop: 5,
                                }}>
                                <View style={{
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
                                            fontSize: 14
                                        }}>
                                        {t('cartPage.useWallet')}
                                    </Text>

                                </View>
                                <CheckBox
                                    value={useWallet}
                                    onValueChange={changeWallet}
                                />
                            </View>
                            {useWallet &&
                                <View style={{ flexDirection: 'row' }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Regular',
                                            fontSize: 12,
                                            marginLeft: 5,
                                        }}>{`  (Balance:   ₹ ${cardDetails?.wallet_bal
                                            ? cardDetails.wallet_bal.toString()
                                            : 0})   `}
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
                                        <Text style={{
                                            fontFamily: 'Poppins-Regular',
                                            fontSize: 12,
                                            marginLeft: 5,
                                            color: PrimaryGreen
                                        }}>+ add amount</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View
                                style={{
                                    paddingHorizontal: 20,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'Poppins-Bold',
                                        color: '#000',
                                        paddingTop: 18,
                                    }}>
                                    {t('cartPage.billDetails')}
                                </Text>
                            </View>
                            <View style={{ marginHorizontal: 10, borderRadius: 7, backgroundColor: '#fff', elevation: 3, paddingTop: 20, }}>
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
                                        <View style={{ flexDirection: 'row' }}>
                                            {cardDetails?.discountAmount &&
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        marginBottom: 5,
                                                        fontFamily: 'Poppins-Medium',
                                                        color: '#ff4b4b',
                                                        textDecorationLine: 'line-through',
                                                        textDecorationStyle: 'solid'
                                                    }}>
                                                    ₹ {cardDetails?.discountAmount}
                                                </Text>
                                            }
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    marginBottom: 5,
                                                    fontFamily: 'Poppins-Medium',
                                                    color: '#000',
                                                }}>
                                                {`   ₹ ${cardDetails.amount}`}
                                            </Text>
                                        </View>
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
                                    {/* {useWallet && (
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
                                    )} */}
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
                                    paddingHorizontal: 20,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Poppins-Bold',
                                        color: '#000',
                                        paddingTop: 18,
                                    }}>
                                    {t('cartPage.deliveryAddress')}
                                </Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    padding: 15,
                                    marginHorizontal: 10,
                                    backgroundColor: '#fff',
                                    elevation: 3,
                                    borderRadius: 15,
                                    marginBottom: 15
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: "60%" }}>
                                    {/* <View
                                        style={{
                                            borderWidth: 1,
                                            justifyContent: 'center',
                                            position: 'relative',
                                            alignItems: 'center',
                                            borderColor: '#a6a6a6',
                                            width: 35,
                                            height: 35,
                                            marginTop: 15
                                        }}>
                                        <Image source={locatIcon} style={{ width: 15, height: 22.5 }} />
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
                                    </View> */}
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14 }}>
                                            {t('cartPage.deliverTo')}{' '}
                                            {userDetails?.defaultaddress?.type}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins-Medium',
                                                fontSize: 14,
                                                paddingVertical: 4,
                                                // width: "100%",
                                            }}
                                            numberOfLines={3}>
                                            {userDetails?.defaultaddress?.street}
                                        </Text>
                                        {cardDetails?.delivery_time && <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14 }}>
                                            {cardDetails?.delivery_time} {t('cartPage.mins')}
                                        </Text>}
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('AddressChoose', {
                                            getCartItem: getCartItems, profile: userData,
                                            useWallet: setUseWallet, type: 'Cart'
                                        });
                                    }}
                                    style={{ borderWidth: 2, borderColor: PrimaryGreen, borderRadius: 30 }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Bold',
                                            fontSize: 12,
                                            color: '#09b44d',
                                            padding: 7
                                        }}>
                                        {t('cartPage.changeAddress')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        {cardDetails?.cook?.status == 1 && cardDetails?.cook?.current_status == 1 && cardDetails.remove_status == 1 && cardDetails.delivery_boy_status != 0 ?
                            <View >
                                {showCheckout && <TouchableOpacity
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
                                        <Image source={cartIcon} style={{ width: 23, height: 20, tintColor: '#fff' }} />
                                    </View>
                                </TouchableOpacity>}
                            </View>
                            :
                            <View>
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
                    <>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: 30, paddingTop: 5 }} onPress={() => navigation.goBack()} >
                            <Image source={backButton} style={{ width: 24, aspectRatio: 1, marginLeft: 15, tintColor: PrimaryGreen }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, paddingVertical: 300, alignItems: 'center' }}>
                            <Image style={{ height: 100, width: 100, alignItems: 'center' }} source={emptyCartIcon} />
                            <Text style={{
                                textAlign: 'center', fontFamily: 'Poppins-Bold',
                                fontSize: 14, opacity: 0.25
                            }}>No data available...</Text>
                        </View>
                    </>
                )
            }

            <View>
                {modal && (
                    <Modal transparent={true} visible={modal}>
                        <Loader />
                    </Modal>
                )}
            </View>
        </SafeAreaView >
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
