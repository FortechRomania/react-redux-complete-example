import React from "react";

import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider as ReduxProvider } from "react-redux";

import configureStore from "../app/redux/store";
import routes from "../app/routes";

const reduxStore = configureStore( window.REDUX_INITIAL_DATA );
const rootHtml = (
    <ReduxProvider store={ reduxStore }>
        <Router history={ browserHistory }>
            { routes }
        </Router>
    </ReduxProvider>
);

render( rootHtml, document.getElementById( "react-root" ) );
