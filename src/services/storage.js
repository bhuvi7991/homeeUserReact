import AsyncStorage from '@react-native-async-storage/async-storage'
import { CART_STATUS, COUPON_CODE, PROFILE, TOKEN, OLD_USER } from '../redux/actions/actionTypes';
let user_data = {};
export const setToken = async (data = user_data) => {
    try {
        const res = await AsyncStorage.setItem(TOKEN, data);
        return res;
    } catch (err) {
    }
}
export const getToken = async state => {
    try {
        let res = await AsyncStorage.getItem(TOKEN);
        return res;
    } catch (err) {
        return state;
    }
}
export const setUserData = async (data = user_data) => {
    try {
        const res = await AsyncStorage.setItem(PROFILE, JSON.stringify(data));
        return JSON.parse(res);
    } catch (err) {
    }
}
export const getUserData = async () => {
    try {
        const res = await AsyncStorage.getItem(PROFILE);
        return JSON.parse(res);
    } catch (err) {
    }
}
export const setCartStatus = async (data = user_data) => {
    try {
        const res = await AsyncStorage.setItem(CART_STATUS, JSON.stringify(data));
        return res;
    } catch (err) {
    }
}
export const getCartStatus = async () => {
    try {
        const res = await AsyncStorage.getItem(CART_STATUS);
        return JSON.parse(res);
    } catch (err) {
    }
}
export const setCouponCode = async (data = user_data) => {
    try {
        const res = await AsyncStorage.setItem(COUPON_CODE, JSON.stringify(data));
        return res;
    } catch (err) {
    }
}
export const getCouponCode = async () => {
    try {
        const res = await AsyncStorage.getItem(COUPON_CODE);
        return JSON.parse(res);
    } catch (err) {
    }
}
export const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
}
export const setIsOldUser = async (data) => {
    try {
        const res = await AsyncStorage.setItem(OLD_USER, data);
        return res;
    } catch (err) {
    }
}

export const getIsOldUser = async () => {
    try {
        const res = await AsyncStorage.getItem(OLD_USER);
        return res;
    } catch (err) {
    }
}