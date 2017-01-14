import React from "react";
import { Link, Match } from "react-router";
import { Home, Login, ProductDetails, ProductList, Cart } from "../pages";
import { withAuthentication } from "../enhancers";

const App = ( { pathname } ) => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
        </header>

        <Match exactly pattern={ pathname } component={ Home } />
        <Match exactly pattern="/products" component={ ProductList } />
        <Match exactly pattern="/products/:permalink" component={ ProductDetails } />
        <Match exactly pattern="/cart" component={ withAuthentication( Cart ) } />
        <Match exactly pattern="/login" component={ Login } />

        <footer>
            I`m here to stay
        </footer>
    </div>
);

App.propTypes = {
    pathname: React.PropTypes.string.isRequired,
};

export default App;
