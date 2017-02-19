import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import React from "react";
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import { RouterContext, match } from "react-router";
import { Provider as ReduxProvider } from "react-redux";

import apiRoutes from "./apiRoutes";
import configureStore from "../app/state/store";
import routes from "../app/routes";

const app = express( );

const DEFAULT_PORT = 7777;
app.use( bodyParser.json( ) );
app.use( cookieParser( ) );
app.use( express.static( path.resolve( __dirname, "../../dist" ) ) );
app.use( "/api", apiRoutes );

app.use( ( req, res ) => {
    const reduxStore = configureStore( );
    reduxStore.dispatch( { type: "SERVER_READY" } ); // will be replaced later with a init session

    match( { routes, location: req.url }, ( error, redirectLocation, renderProps ) => {
        prefetchDataForComponents( renderProps, reduxStore.dispatch ).then( ( ) => {
            const head = Helmet.rewind( );
            const reduxState = reduxStore.getState( );
            const reactDom = renderToString(
                <ReduxProvider store={ reduxStore }>
                    <RouterContext { ...renderProps } />
                </ReduxProvider>,
            );

            res.writeHead( 200, { "Content-Type": "text/html" } );
            res.end( templateHtml( head, reactDom, reduxState ) );
        } );
    } );
} );

function prefetchDataForComponents( renderProps, dispatch ) {
    const promises = renderProps.components
                                .filter( comp => comp.prefetch )
                                .map( comp => dispatch( comp.prefetch( renderProps ) ) );
    return Promise.all( promises );
}

function templateHtml( head, reactDom, reduxState ) {
    return `
        <!doctype html>
        <html>
            <head>
                ${ head.title.toString( ) }
                ${ head.meta.toString( ) }
                ${ head.link.toString( ) }
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1"/>
                <meta charset="UTF-8">
            </head>
            <body>
                <div id="react-root">${ reactDom }</div>

                <script type="text/javascript">
                    window.REDUX_INITIAL_DATA=${ JSON.stringify( reduxState ) };
                </script>

                <script defer src="/lib.bundle.js"></script>
                <script defer src="/app.bundle.js"></script>
            </body>
        </html>
    `;
}

app.listen( process.env.NODE_PORT || DEFAULT_PORT );
