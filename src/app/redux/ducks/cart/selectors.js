export function getCartItemQuantity( cart, id ) {
    return cart.find( item => item.product.id === id ).quantity;
}

export default {
    getCartItemQuantity,
};
