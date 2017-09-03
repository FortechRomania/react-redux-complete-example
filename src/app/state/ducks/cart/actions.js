import * as types from "./types";

export const addToCart = ( product, quantity ) => ( {
    type: types.ADD,
    payload: {
        product,
        quantity,
    },
} );

export const changeQuantity = ( product, quantity ) => ( {
    type: types.CHANGE_QUANTITY,
    payload: {
        product,
        quantity,
    },
} );

export const removeFromCart = ( index ) => ( {
    type: types.REMOVE,
    payload: {
        index,
    },
} );

export const clearCart = ( ) => ( {
    type: types.CLEAR,
} );

export const setCart = ( cart ) => ( {
    type: types.SET_CART,
    payload: {
        cart,
    },
} );
