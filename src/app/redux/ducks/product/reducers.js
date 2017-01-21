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

const detailsReducer = createReducer( apple )( {
    [ types.FETCH_DETAILS_COMPLETED ]: ( state, action ) => action.payload,
} );

const listReducer = createReducer( [ apple ] )( {
    [ types.FETCH_LIST_COMPLETED ]: ( state, action ) => action.payload,
} );

export default combineReducers( {
    details: detailsReducer,
    list: listReducer,
} );
