import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { matchPath, StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import { Provider as ReduxProvider } from "react-redux";

import App from "../app/views/layouts/app";
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
    const sheet = new ServerStyleSheet();

    reduxStore.dispatch( { type: "SERVER_READY" } ); // will be replaced later with a init session

    prefetchData( req.url, reduxStore.dispatch ).then( ( ) => {
        const head = Helmet.rewind( );
        const reduxState = reduxStore.getState( );
        const context = { };
        const jsx = (
            <ReduxProvider store={ reduxStore }>
                <StaticRouter
                    location={ req.url }
                    context={ context }
                >
                    <App />
                </StaticRouter>
            </ReduxProvider>
        );
        const reactDom = renderToString( sheet.collectStyles( jsx ) );

        const styles = sheet.getStyleTags();

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( templateHtml( head, reactDom, reduxState, styles ) );
    } ).catch( err => console.log( err ) );
} );

function prefetchData( url, dispatch ) {
    const promises =
        routes
            .map( ( route ) => ( { route, match: matchPath( url, route ) } ) )
            .filter( ( { route, match } ) => match && route.component.prefetch )
            .map( ( { route, match } ) => dispatch( route.component.prefetch( match ) ) );

    return Promise.all( promises );
}

function templateHtml( head, reactDom, reduxState, styles ) {
    return `
        <!doctype html>
        <html>
            <head>
                ${ head.title.toString( ) }
                ${ head.meta.toString( ) }
                ${ head.link.toString( ) }
                ${ styles }
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
