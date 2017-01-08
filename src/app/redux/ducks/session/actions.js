import types from "./types";

const login = ( ) => ( {
    type: types.LOGIN,
} );

const logout = ( ) => ( {
    type: types.LOGOUT,
} );

const initializeSession = ( ) => ( {
    type: types.INITIALIZE_SESSION,
} );

const setRedirectAfterLogin = ( ) => ( {
    type: types.SET_REDIRECT_AFTER_LOGIN,
} );

export default {
    initializeSession,
    login,
    logout,
    setRedirectAfterLogin,
};
