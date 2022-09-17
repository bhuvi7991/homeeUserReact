import { SIGN_IN, SIGN_OUT } from "../actions/actionTypes";
const intialState = {
    userData: {},
}
const authReducer = (state = intialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                userData: action.data || state.userData,

            };
        case SIGN_OUT:
            return {
                ...state,
                ...intialState
            };
        default:
            return state;
    }
    return state;
}

export default authReducer