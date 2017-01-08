import types from "./types";

/* State shape
{
    isAuthenticated: bool,
    redirectAfterLogin: string
}
*/

const initialState = {
    isAuthenticated: false,
    redirectAfterLogin: null,
};

const sessionReducer = ( state = initialState, action ) => {
    return state;
};

export default sessionReducer;
