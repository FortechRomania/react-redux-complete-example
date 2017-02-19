import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

const App = ( { children } ) => ( // eslint-disable-line react/prop-types
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
        </header>

        { children }

        <footer>
            I`m here to stay
        </footer>
    </div>
);

export default connect( )( App );
