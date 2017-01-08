import React from "react";
import { Link } from "react-router";

const App = ( { children } ) => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
        </header>

        { children }

        <footer>
            I`m here to stay
        </footer>
    </div>
);

App.propTypes = {
    children: React.PropTypes.any,
};

export default App;
