import * as types from "./types";
import * as utils from "./utils";
import { createReducer } from "../../utils";

/* State shape
[
    {
        product,
        quantity,
    }
]
*/

const initialState = [ ];

const cartReducer = createReducer( initialState )( {
    [ types.ADD ]: ( state, action ) => {
        const { product, quantity } = action.payload;
        const index = utils.productPositionInCart( state, product );
        if ( index === -1 ) {
            return [ utils.newCartItem( product, quantity ), ...state ];
        }

        const currentItem = state[ index ];
        const updatedItem = Object.assign( { }, currentItem, { quantity: currentItem.quantity + quantity } );
        return [
            ...state.slice( 0, index ),
            updatedItem,
            ...state.slice( index + 1 ),
        ];
    },
    [ types.CHANGE_QUANTITY ]: ( state, action ) => {
        const { product, quantity } = action.payload;
        const index = utils.productPositionInCart( state, product );

        const updatedItem = Object.assign( { }, state[ index ], { quantity } );
        return [
            ...state.slice( 0, index ),
            updatedItem,
            ...state.slice( index + 1 ),
        ];
    },
    [ types.REMOVE ]: ( state, action ) => {
        const { product } = action.payload;
        const index = utils.productPositionInCart( state, product );
        return [
            ...state.slice( 0, index ),
            ...state.slice( index + 1 ),
        ];
    },
    [ types.CLEAR ]: ( ) => [ ],
} );

export default cartReducer;
