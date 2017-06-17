import React from "react";

import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "../app/views/layouts/app";
import configureStore from "../app/state/store";

const reduxStore = configureStore( window.REDUX_INITIAL_DATA );

const RootHtml = ( ) => (
    <ReduxProvider store={ reduxStore }>
        <Router>
            <App />
        </Router>
    </ReduxProvider>
);

render( <RootHtml />, document.getElementById( "react-root" ) );
