import React, { Component } from "react";
import { connect } from "react-redux";
import { productOperations } from "../../state/ducks/product";
import { productShape } from "../propTypes";

class ProductDetails extends Component {
    componentDidMount( ) {
        const { product, params, fetchProduct } = this.props;
        const loadedProductPermalink = product ? product.permalink : "";
        if ( params.permalink !== loadedProductPermalink ) {
            fetchProduct( params.permalink );
        }
    }

    componentWillReceiveProps( nextProps ) {
        if ( this.props.params.permalink !== nextProps.params.permalink ) {
            this.props.fetchProduct( nextProps.params.permalink );
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
            </div>
        );
    }
}

const { func, string, shape } = React.PropTypes;

ProductDetails.propTypes = {
    product: productShape,
    fetchProduct: func.isRequired,
    params: shape( {
        permalink: string.isRequired,
    } ).isRequired,
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
};

export default connect( mapStateToProps, mapDispatchToProps )( ProductDetails );
