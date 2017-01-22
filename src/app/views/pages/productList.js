import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { productOperations } from "../../redux/ducks/product";
import { productShape } from "../propTypes";

const ProductList = ( { products } ) => {
    const productList = products.map( p =>
        ( <Link key={ p.id } to={ `/products/${ p.permalink }` }>{ p.name }</Link> )
    );

    return (
        <div>
            { productList }
        </div>
    );
};

const { arrayOf } = React.PropTypes;

ProductList.propTypes = {
    products: arrayOf( productShape ),
};

ProductList.prefetch = productOperations.fetchList;

const mapStateToProps = ( state ) => ( {
    products: state.product.list,
} );

export default connect( mapStateToProps )( ProductList );
