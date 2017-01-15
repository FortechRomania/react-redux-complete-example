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

const productReducer = createReducer( initialState )( {
    [ types.FETCH_DETAILS_COMPLETED ]: ( state, action ) => action.payload,
    [ types.FETCH_LIST_COMPLETED ]: ( state, action ) => action.payload,
} );

export default productReducer;
