export function productPositionInCart( cart, product ) {
    return cart.map( item => item.product.id ).indexOf( product.id );
}

export function newCartItem( product, quantity ) {
    return {
        product,
        quantity,
    };
}
