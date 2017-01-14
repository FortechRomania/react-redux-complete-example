import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { productOperations } from "../../redux/ducks/product";
import { productShape } from "../propTypes";

class ProductList extends Component {
    componentDidMount( ) {
        this.props.fetchList( );
    }

    render( ) {
        const { products } = this.props;
        const productList = products.map( p =>
            ( <Link key={ p.id } to={ `/products/${ p.permalink }` }>{ p.name }</Link> )
        );

        return (
            <div>
                { productList }
            </div>
        );
    }
}

const { arrayOf, func } = React.PropTypes;

ProductList.propTypes = {
    products: arrayOf( productShape ),
    fetchList: func.isRequired,
};

const mapStateToProps = ( state ) => ( {
    products: state.product.list,
} );

const mapDispatchToProps = {
    fetchList: productOperations.fetchList,
};

export default connect( mapStateToProps, mapDispatchToProps )( ProductList );
