import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

/* State shape
{
    details: product,
    list: [ product ],
}
*/

const detailsReducer = createReducer( null )( {
    [ types.FETCH_DETAILS_COMPLETED ]: ( state, action ) => action.payload.product,
} );

const listReducer = createReducer( [ ] )( {
    [ types.FETCH_LIST_COMPLETED ]: ( state, action ) => action.payload.products,
} );

export default combineReducers( {
    details: detailsReducer,
    list: listReducer,
} );
