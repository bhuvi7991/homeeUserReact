import { Alert } from 'react-native';
import axios from 'axios';

export const login = async (data = {}, config = {}) =>
  await post('login', data, config);
export const register = async (data = {}, config = {}) =>
  await post('register', data, config);
export const verifyOtp = async (data = {}, config = {}) =>
  await post('verify-otp', data, config);

export const createFood = async (config = {}) =>
  await get('menu-item/create', config);

const post = async (url, data, config) => {
  try {
    let postMeth = await axios.post(url, data, config);
    return prepareResponse(postMeth);
  } catch (err) {
    return handleException(err);
  }
};
const get = async (url, config) => {
  try {
    let postMeth = await axios.get(url, config);
    return prepareResponse(postMeth);
  } catch (err) {
    return handleException(err);
  }
};

const prepareResponse = res => {
  let { data, status, statusText, headers, config, request } = res;
  if (status <= 299 && status >= 200) {
    if (data.status == 'error') {
      Alert.alert('Sorry for your inconvenient', data.message);
      return { ...res.data, api_valid_flag: false };
    } else {
      return res.data;
    }
  } else {
    Alert.alert('Status Failed', `server returns ${status} `);
  }
  return {};
};

const handleException = err => {
  let { data, status, statusText, headers, config, request } = err.response;
  if (status == 400) {
    Alert.alert(
      'Validation Faild',
      data?.message || 'Unhandle validation occured',
    );
  } else if (status == 401) {
    Alert.alert('UnAuthenticated Access', 'Session Closed');
  } else if (status == 404) {
    Alert.alert('Page Not Found', 'This Api could not be find it');
  } else {
    // Alert.alert('Status Failed', `server returns ${status} `);
  }
  return {};
};
