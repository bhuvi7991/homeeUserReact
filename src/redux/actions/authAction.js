import { GET_PROFILE, SIGN_IN, SIGN_OUT } from '../actions/actionTypes';

export const get_Profile = (data) => ({
    type: GET_PROFILE,
    data: data
});
export const set_Profile = (data) => ({
    type: SIGN_IN,
    data: data
});
export const clearProfile = () => ({
    type: SIGN_OUT,
});