import penthouse from "penthouse";
import path from "path";
import fs from "fs";
import routes from "../app/routes";

const baseUrl = "http://localhost:7777";

const getAllStyles = routes.map( route => {
    const url = route.example || route.path; // in case of dynamic route we rely on example
    return new Promise( ( resolve ) => getCriticalCss( url ).then(
        ( style ) => resolve( { path: route.path, style } ),
        ( err ) => console.error( err ),
    ) );
} );

Promise.all( getAllStyles ).then( ( criticalCss ) => {
    const styleMap = { };
    criticalCss.forEach( ccss => { styleMap[ ccss.path ] = ccss.style; } );
    fs.writeFileSync( "./src/server/criticalCss.json", JSON.stringify( styleMap ), "utf8" );
} )
.catch( err => {
    console.error( err );
} );

function getCriticalCss( routePath ) {
    return penthouse( {
        url: path.join( baseUrl, routePath ),
        css: path.join( "./dist/app.bundle.css" ),
        width: 1300,                    // viewport width
        height: 900,                    // viewport height
        timeout: 30000,                 // ms; abort critical CSS generation after this timeout
        maxEmbeddedBase64Length: 1000,  // characters; strip out inline base64 encoded resources larger than this
        renderWaitTime: 100,            // ms; render wait timeout before CSS processing starts (default: 100)
    } );
}
