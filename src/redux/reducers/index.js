import { combineReducers } from 'redux';
import authReducer from "./authReducer";
const rootReducer = combineReducers({
    token: authReducer,
}
)
export default rootReducer;