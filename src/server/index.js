import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import React from "react";
import Helmet from "react-helmet";
import { renderToString } from "react-dom/server";
import { ServerRouter, createServerRenderContext } from "react-router";
import { Provider as ReduxProvider } from "react-redux";

import apiRoutes from "./apiRoutes";
import layouts from "../app/views/layouts";
import configureStore from "../app/redux/store";

const app = express( );

const DEFAULT_PORT = 7777;
app.use( bodyParser.json( ) );
app.use( cookieParser( ) );
app.use( express.static( path.resolve( __dirname, "../../dist" ) ) );
app.use( "/api", apiRoutes );

app.use( ( req, res ) => {
    const reduxStore = configureStore( );
    const context = createServerRenderContext( );

    const reactDom = renderToString(
        <ReduxProvider store={ reduxStore }>
            <ServerRouter location={ req.url } context={ context }>
                { layouts }
            </ServerRouter>
        </ReduxProvider>
    );

    const head = Helmet.rewind( );
    const reduxState = reduxStore.getState( );

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( templateHtml( head, reactDom, reduxState ) );
} );

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
