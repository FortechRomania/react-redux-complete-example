require( "babel-register" )( {
    presets: [ "env" ],
    plugins: [
        "dynamic-import-node",
        [
            "styled-components",
            {
                ssr: true,
                displayName: true,
                preprocess: false,
            },
        ],
    ],
} );

const path = process.argv[ 2 ];

require( path ); // eslint-disable-line import/no-dynamic-require
