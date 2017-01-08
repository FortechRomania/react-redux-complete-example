import promise from "es6-promise";

import React from "react";

import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider as ReduxProvider } from "react-redux";

import routes from "../app/views/routes";
import configureStore from "../app/redux/store";

promise.polyfill( );

const reduxStore = configureStore( window.REDUX_INITIAL_DATA );
const rootHtml = (
    <ReduxProvider store={ reduxStore }>
        <Router history={ browserHistory }>
            { routes }
        </Router>
    </ReduxProvider>
);

render( rootHtml, document.getElementById( "react-root" ) );
