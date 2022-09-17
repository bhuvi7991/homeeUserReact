import axios from 'axios';
import React, { useRef } from "react";
import { URL } from './constants'
import { Alert, BackHandler, Platform } from 'react-native';
import { clearAsyncStorage } from './storage';
export const minus_quantity = async (id, config = {}) => await get(URL.MINUS_QUANTITY + id, config);
export const cart_item = async (config = {}) => await get(URL.CART_ITEM, config);
export const remove_cart_item = async (id, config = {}) => await get(URL.REMOVE_CART_ITEM + id, config);
export const empty_cart = async (config = {}) => await get(URL.EMPTY_CART, config);
export const favourite_list = async (page, config = {}) => await get(URL.FAVOURITE_LIST + '?page=' + page, config);
export const languages = async (config = {}) => await get(URL.LANGUAGES, config);
export const user_language = async (id, config = {}) => await get(URL.USER_LANGUAGE + id, config);
export const order_details = async (id, config = {}) => await get(URL.ORDER_DETAILS + id, config);
export const order_status = async (id, config = {}) => await get(URL.ORDER_STATUS + id, config);
export const orders = async (page, config = {}) => await get(URL.ORDERS + '?page=' + page, config);
export const reorder = async (config = {}) => await get(URL.REORDER, config);
export const wallet = async (config = {}) => await get(URL.WALLET, config);
export const wallet_user_transactions = async (config = {}) => await get(URL.WALLET_USER_TRANSACTIONS, config);
export const logout = async (config = {}) => await get(URL.USER_LOGOUT, config);
export const quickFilterMenuItem = async (id, page, config = {}) => await get(URL.QUICK_FILTER_MENU_LIST + id + '?page=' + page, config);
export const couponList = async (config = {}) => await get(URL.COUPON_LIST, config);
export const addressList = async (config = {}) => await get(URL.ADDRESS_LIST, config);
export const changeDefaultAddress = async (id, config = {}) => await get(URL.CHANGE_DEFAULT_ADDRESS + id, config);
export const userDetail = async (config = {}) => await get(URL.USER_DETAIL, config);
export const deleteAddress = async (id, config = {}) => await get(URL.ADDRESS_DELETE + id, config);
export const currentOrders = async (config = {}) => await get(URL.CURRENT_ORDERS, config);
export const homeBanners = async (config = {}) => await get(URL.HOME_BANNERS, config);
export const homePopularFoods = async (config = {}) => await get(URL.HOME_POPULAR_FOODS, config);
export const homeCookNearBy = async (config = {}) => await get(URL.HOME_COOK_NEAR_BY, config);
export const homeCookTopRated = async (page, config = {}) => await get(URL.HOME_COOK_TOP_RATED + '?page=' + page, config);
export const homeCookNew = async (page, config = {}) => await get(URL.HOME_COOK_NEW + '?page=' + page, config);
export const homeCookOffer = async (config = {}) => await get(URL.HOME_COOK_OFFER, config);
export const getFoodTypes = async (config = {}) => await get(URL.GET_FOOD_TYPES, config);
export const offlineRefund = async (id, config = {}) => await get(URL.OFFLINE_REFUND + id, config);
export const walletRefund = async (id, config = {}) => await get(URL.WALLET_REFUND + id, config);



export const login = async (data = {}, config = {}) => await post(URL.LOGIN, data, config);
export const verify = async (data = {}, config = {}) => await post(URL.VERIFY_OTP, data, config);
export const register = async (data = {}, config = {}) => await post(URL.REGISTER, data, config);
export const address = async (data = {}, config = {}) => await post(URL.ADDRESS, data, config);
export const user_support = async (data = {}, config = {}) => await post(URL.USER_SUPPORT, data, config);
export const home = async (data = {}, config = {}) => await post(URL.HOME, data, config);
export const profile = async (data = {}, config = {}) => await post(URL.COOK_PROFILE, data, config);
export const show_cart = async (data = {}, config = {}) => await post(URL.SHOW_CART, data, config);
export const show_wallet = async (data = {}, config = {}) => await post(URL.SHOW_WALLET, data, config);
export const add_cart = async (data = {}, config = {}) => await post(URL.ADD_CARD, data, config);
export const apply_coupon = async (data = {}, config = {}) => await post(URL.APPLY_COUPON, data, config);
export const add_favourite = async (data = {}, config = {}) => await post(URL.ADD_FAVOURITE, data, config);
export const transaction = async (data = {}, config = {}) => await post(URL.TRANSACTION, data, config);
export const transaction_check = async (data = {}, config = {}) => await post(URL.TRANSACTION_CHECK, data, config);
export const wallet_full_amount = async (data = {}, config = {}) => await post(URL.WALLET_FULL_AMOUNT, data, config);
export const rating = async (data = {}, config = {}) => await post(URL.RATING, data, config);
export const add_wallet_money = async (data = {}, config = {}) => await post(URL.ADD_WALLET_MONEY, data, config);
export const wallet_transaction_check = async (data = {}, config = {}) => await post(URL.WALLET_TRANSACTION_CHECK, data, config);
export const search = async (data = {}, config = {}) => await post(URL.SEARCH, data, config);
export const quickFilter = async (data = {}, page, config = {}) => await post(URL.QUICK_FILTER + '?page=' + page, data, config);
export const profileEdit = async (data = {}, config = {}) => await post(URL.USER_PRFILE_EDIT, data, config);
export const addressEdit = async (data = {}, id, config = {}) => await post(URL.ADDRESS_EDIT + id, data, config);
export const walletStatus = async (data = {}, config = {}) => await post(URL.WALLET_STATUS, data, config);
export const transactionStatus = async (data = {}, config = {}) => await post(URL.TRANSACTION_STATUS, data, config);



const get = async (url, config) => {
    console.log(url);
    try {
        let res = await axios.get(url, config);
        return prepareResponse(res);
    } catch (err) {
        return handleException(err);
    }

}
const post = async (url, data, config) => {
    console.log(url);
    console.log(data);
    try {
        let res = await axios.post(url, data, config);
        // console.warn("rannn", res)
        return prepareResponse(res);
    } catch (err) {
        return handleException(err);
    }
}
const handleException = (err) => {
    try {
        if (err?.response?.data) {
            let { data, status, statusText, headers, config, request } = err.response;
            if (status == 400) {
                Alert.alert(
                    'Validation Faild',
                    data?.message || 'Unhandle validation occured',
                );
            } else if (status == 401) {
                Alert.alert('UnAuthenticated Access', 'Session Closed Close your app and Reopen', [
                    {
                        text: 'Close',
                        onPress: () => {
                            clearAsyncStorage();
                            if (Platform.OS == 'ios') {
                                //   navigationRef.navigate('Languages');
                            } else {
                                BackHandler.exitApp();
                            }
                        },
                    },
                ],
                    { cancelable: false },
                );

            } else if (status == 404) {
                Alert.alert('Page Not Found', 'This Api could not be find it');
            } else {
                Alert.alert('Status Failed', `server returns ${status} `);
            }
        } else {
            Alert.alert('Information', 'Someting went worng or Check your Internet');
        }
    } catch (error) {
        Alert.alert('Information', 'Someting went worng or Check your Internet', [
            {
                text: 'Ok',
                onPress: () => {
                    if (Platform.OS == 'ios') {
                        //   navigationRef.navigate('Languages');
                    } else {
                        BackHandler.exitApp();
                    }
                },
            },
        ],
            { cancelable: false },
        );
    }
    return {};
}
const prepareResponse = (res) => {
    if (res?.status) {
        let { status, data = {} } = res;
        if (status >= 200 && status <= 299) {
            if (data.status == 'success') {
                return data;
            } else if (data.status == 'failure') {
                return data;
            } else if (data.status == 'empty') {
                return data;
            } else if (data.status == 'error') {
                return (data,
                    Alert.alert('Sorry for the inconvenience', data.message));
            }
        } else {
            Alert.alert('Internal server error', `Status Code : ${status}\nMessage : ${data?.message}`)
        }
    } else {
        Alert.alert('Someting went worng or Check your Internet');
    }
    return {};
}