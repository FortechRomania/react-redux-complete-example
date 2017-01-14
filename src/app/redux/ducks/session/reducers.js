import { combineReducers } from "redux";
import types from "./types";

/* State shape
{
    isAuthenticated: bool,
    redirectAfterLogin: string
}
*/

const authReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case types.LOGIN:
            return true;
        case types.LOGOUT:
            return false;
        default:
            return state;
    }
};

const redirectAfterLoginReducer = ( state = null, action ) => {
    switch ( action.type ) {
        case types.SET_REDIRECT_AFTER_LOGIN:
            return action.payload.redirectUrl;
        default:
            return state;
    }
};

export default combineReducers( {
    isAuthenticated: authReducer,
    redirectAfterLogin: redirectAfterLoginReducer,
} );
