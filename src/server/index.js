import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import React from "react";
import { renderToString } from "react-dom/server";
import { matchPath } from "react-router-dom";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";
import { Provider as ReduxProvider } from "react-redux";

import App from "../app/views/layouts/app";
import apiRoutes from "./apiRoutes";
import configureStore from "../app/state/store";
import routes from "../app/routes";
import criticalCssMap from "./criticalCss.json";

const app = express( );

const DEFAULT_PORT = 7777;
app.use( bodyParser.json( ) );
app.use( cookieParser( ) );
app.use( express.static( path.resolve( __dirname, "../../dist" ) ) );
app.use( "/api", apiRoutes );

app.use( ( req, res ) => {
    const reduxStore = configureStore( );
    reduxStore.dispatch( { type: "SERVER_READY" } ); // will be replaced later with a init session

    prefetchData( req.url, reduxStore.dispatch ).then( ( ) => {
        const head = Helmet.rewind( );
        const reduxState = reduxStore.getState( );
        const context = { };
        const reactDom = renderToString(
            <ReduxProvider store={ reduxStore }>
                <StaticRouter
                    location={ req.url }
                    context={ context }
                >
                    <App />
                </StaticRouter>
            </ReduxProvider>,
        );

        const matchedPath = routes.find( ( route ) => matchPath( req.url, route ) ).path;
        const criticalCss = criticalCssMap[ matchedPath ] || "";
        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( templateHtml( head, reactDom, reduxState, criticalCss ) );
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

function templateHtml( head, reactDom, reduxState, criticalCss ) {
    const styleInHead = criticalCss ?
        `<style>${ criticalCss }</style>` :
        "<link rel=\"stylesheet\" type=\"text/css\" href=\"/app.bundle.css\">";

    const styleInBody = criticalCss ?
        `<script type="text/javascript">
            var styleSheet = document.createElement('link');
            styleSheet.rel = 'stylesheet';
            styleSheet.href = '/app.bundle.css';
            styleSheet.type = 'text/css';
            document.head.append(styleSheet);
        </script>
        <noscript>
            <link rel="stylesheet" type="text/css" href="/app.bundle.css">
        </noscript>` : "";

    return `
        <!doctype html>
        <html>
            <head>
                ${ head.title.toString( ) }
                ${ head.meta.toString( ) }
                ${ head.link.toString( ) }
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1"/>
                <meta charset="UTF-8">
                ${ styleInHead }
            </head>
            <body>
                <div id="react-root">${ reactDom }</div>

                <script type="text/javascript">
                    window.REDUX_INITIAL_DATA=${ JSON.stringify( reduxState ) };
                </script>

                <script defer src="/lib.bundle.js"></script>
                <script defer src="/app.bundle.js"></script>

                ${ styleInBody }
            </body>
        </html>
    `;
}

app.listen( process.env.NODE_PORT || DEFAULT_PORT );
