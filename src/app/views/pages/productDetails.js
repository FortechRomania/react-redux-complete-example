import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { productOperations } from "../../state/ducks/product";
import { cartOperations } from "../../state/ducks/cart";
import { productShape } from "../propTypes";

class ProductDetails extends Component {
    componentDidMount( ) {
        const { product, match, fetchProduct } = this.props;
        const loadedProductPermalink = product ? product.permalink : "";
        if ( match.params.permalink !== loadedProductPermalink ) {
            fetchProduct( match.params.permalink );
        }
    }

    componentWillReceiveProps( nextProps ) {
        if ( this.props.match.params.permalink !== nextProps.match.params.permalink ) {
            this.props.fetchProduct( nextProps.match.params.permalink );
        }
    }

    render( ) {
        const { product } = this.props;
        if ( !product ) {
            return false;
        }

        return (
            <div>
                <div><strong>{ product.name }</strong></div>
                <div>Price: <strong>${ product.price }</strong></div>
                <div>Description: { product.description }</div>
                <div>
                    <button
                        onClick={ () => {
                            this.props.addToCart( product, 1 );
                        } }
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        );
    }
}

const { object, func } = PropTypes;

ProductDetails.propTypes = {
    addToCart: func.isRequired,
    product: productShape,
    fetchProduct: func.isRequired,
    match: object.isRequired,
};

ProductDetails.prefetch = ( { params } ) => productOperations.fetchDetails( params.permalink );

ProductDetails.defaultProps = {
    product: null,
};

const mapStateToProps = ( state ) => ( {
    product: state.product.details,
} );

const mapDispatchToProps = {
    fetchProduct: productOperations.fetchDetails,
    addToCart: cartOperations.addToCart,
};

export default connect( mapStateToProps, mapDispatchToProps )( ProductDetails );
