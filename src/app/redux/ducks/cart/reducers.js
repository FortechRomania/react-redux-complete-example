import types from "./types";
import utils from "./utils";

/* State shape
[
    {
        product,
        quantity,
    }
]
*/

const cartReducer = ( state = [ ], action ) => {
    switch ( action.type ) {
        case types.ADD:
            const { product, quantity } = action.payload;
            const index = utils.productPositionInCart( state, product );
            if ( index === -1 ) {
                return [ ...state, utils.newCartItem( product, quantity ) ];
            }

            const currentItem = state[ index ];
            const updatedItem = Object.assign( { }, currentItem, { quantity: currentItem.quantity + quantity } );
            return [
                ...state.slice( 0, index ),
                updatedItem,
                ...state.slice( index + 1 ),
            ];
        case types.CHANGE_QUANTITY:
            const { product, quantity } = action.payload;
            const index = utils.productPositionInCart( state, product );

            const updatedItem = Object.assign( { }, state[ index ], { quantity } );
            return [
                ...state.slice( 0, index ),
                updatedItem,
                ...state.slice( index + 1 ),
            ];
        case types.REMOVE:
            const { product } = action.payload;
            const index = utils.productPositionInCart( state, product );
            return [
                ...state.slice( 0, index ),
                ...state.slice( index + 1 ),
            ];
        case type.CLEAR:
            return [ ];
        default:
            return state;
    }
};

export default cartReducer;
