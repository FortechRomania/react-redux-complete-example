import express from "express";
import path from "path";
import request from "request";
import Helmet from "react-helmet";

import React from "react";
import { renderToString } from "react-dom/server";
import { RouterContext, match } from "react-router";
import { Provider as ReduxProvider } from "react-redux";

import routes from "../app/views/routes";
import configureStore from "../app/redux/store";

const app = express( );

const DEFAULT_PORT = 7777;
app.use( express.static( path.resolve( __dirname, "../../dist" ) ) );

app.use( "/api", ( req, res ) => {
    const url = process.env.BASE_API_URL + req.url;
    let proxyReq = null;
    if ( req.method === "POST" ) {
        proxyReq = request.post( { uri: url, json: req.body } );
    } else if ( req.method === "PATCH" ) {
        proxyReq = request.patch( { uri: url, json: req.body } );
    } else {
        proxyReq = request( url );
    }

    req.pipe( proxyReq ).pipe( res );
} );

app.use( ( req, res, next ) => {
    match( { routes, location: req.url }, ( error, redirectLocation, renderProps ) => {
        if ( !renderProps ) {
            return next( );
        }

        const reduxStore = configureStore( );

        return prefetchDataForComponents( renderProps, reduxStore )
            .then( ( ) => respond( res, renderProps, reduxStore ) );
    } );
} );

function prefetchDataForComponents( renderProps, reduxStore ) {
    const promises = renderProps.components
                                .filter( comp => comp.prefetch )
                                .map( comp => reduxStore.dispatch( comp.prefetch( renderProps ) ) );
    return Promise.all( promises );
}

function respond( res, renderProps, reduxStore ) {
    const reactDom = renderToString(
        <ReduxProvider store={ reduxStore }>
            <RouterContext { ...renderProps } />
        </ReduxProvider>
    );

    const head = Helmet.rewind( );
    const reduxState = reduxStore.getState( );

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( templateHtml( head, reactDom, reduxState ) );
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
