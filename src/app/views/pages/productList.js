import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { productOperations } from "../../state/ducks/product";
import { productShape } from "../propTypes";

class ProductList extends Component {
    componentDidMount( ) {
        if ( this.props.products.length === 0 ) {
            this.props.fetchList( );
        }
    }

    render( ) {
        const productList = this.props.products
            .map( p => <Link key={ p.id } to={ `/products/${ p.permalink }` }>{ p.name }</Link> );

        return (
            <div>
                { productList }
            </div>
        );
    }
}

const { arrayOf, func } = PropTypes;

ProductList.propTypes = {
    products: arrayOf( productShape ),
    fetchList: func.isRequired,
};

ProductList.defaultProps = {
    products: [ ],
};

ProductList.prefetch = productOperations.fetchList;

const mapStateToProps = ( state ) => ( {
    products: state.product.list,
} );

const mapDispatchToProps = {
    fetchList: productOperations.fetchList,
};

export default connect( mapStateToProps, mapDispatchToProps )( ProductList );
