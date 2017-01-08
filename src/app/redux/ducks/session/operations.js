import actions from "./actions";

const login = actions.login;
const logout = actions.logout;
const initializeSession = actions.initializeSession;
const setRedirectAfterLogin = actions.setRedirectAfterLogin;

export default {
    initializeSession,
    login,
    logout,
    setRedirectAfterLogin,
};
