import actions from "./actions";

export const addToCart = actions.addToCart;
export const changeQuantity = actions.changeQuantity;
export const removeFromCart = actions.removeFromCart;
export const clearCart = actions.clearCart;
export const setCart = actions.setCart;

export default {
    addToCart,
    changeQuantity,
    clearCart,
    removeFromCart,
    setCart,
};
