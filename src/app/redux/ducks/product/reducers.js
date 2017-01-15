import { combineReducers } from "redux";
import types from "./types";
import { createReducer } from "../../utils";

/* State shape
{
    details: product,
    list: [ product ],
}
*/

const apple = {
    id: 1,
    name: "Apple",
    permalink: "apple",
    price: 2.99,
    stock: 10,
};

const initialState = {
    details: apple,
    list: [
        apple,
    ],
};

const detailsReducer = createReducer( initialState )( {
    [ types.FETCH_DETAILS_COMPLETED ]: ( state, action ) => action.payload,
} );

const listReducer = createReducer( initialState )( {
    [ types.FETCH_LIST_COMPLETED ]: ( state, action ) => action.payload,
} );

export default combineReducers( {
    details: detailsReducer,
    list: listReducer,
} );
