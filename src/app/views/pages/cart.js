import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

const CartItem = styled.div`
    margin: 10px;

    &:hover {
        background-color: grey;
    }
`;

const Cart = ( { cartItems } ) => {
    if ( cartItems.length === 0 ) {
        return ( <div>You have no items in the cart </div> );
    }
    const items = cartItems.map( item => (
        <CartItem key={ item.product.id }>
            { item.product.name } - { item.quantity } { item.quantity > 1 ? "items" : "item" }
        </CartItem> ) );
    return (
        <div>
            { items }
        </div>
    );
};

const { arrayOf, object } = PropTypes;

Cart.propTypes = {
    cartItems: arrayOf( object ),
};

Cart.defaultProps = {
    cartItems: [ ],
};

const mapStateToProps = ( state ) => ( {
    cartItems: state.cart,
} );

export default connect( mapStateToProps, null )( Cart );
