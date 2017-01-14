export function productPositionInCart( cart, product ) {
    cart.map( item => item.product.id ).indexOf( product.id );
}

export function newCartItem( product, quantity ) {
    return {
        product,
        quantity,
    };
}

export default {
    newCartItem,
    productPositionInCart,
};
