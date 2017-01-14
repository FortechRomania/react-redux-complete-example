import React from "react";

import { render } from "react-dom";
import { BrowserRouter } from "react-router";
import { Provider as ReduxProvider } from "react-redux";

import layouts from "../app/views/layouts";
import configureStore from "../app/redux/store";

const reduxStore = configureStore( window.REDUX_INITIAL_DATA );
const rootHtml = (
    <ReduxProvider store={ reduxStore }>
        <BrowserRouter>
            { layouts }
        </BrowserRouter>
    </ReduxProvider>
);

render( rootHtml, document.getElementById( "react-root" ) );
