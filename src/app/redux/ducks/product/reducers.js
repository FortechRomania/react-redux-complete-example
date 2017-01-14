import types from "./types";

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

const productReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.FETCH_DETAILS_COMPLETED:
        case types.FETCH_LIST_COMPLETED:
            return action.payload;
        default:
            return state;
    }
};

export default productReducer;
