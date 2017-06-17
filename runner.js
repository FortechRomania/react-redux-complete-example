require( "babel-register" )( {
    presets: [ "es2015" ],
} );

const hook = require( "css-modules-require-hook" );

hook( {
    generateScopedName: "[name]__[local]___[hash:base64:5]",
    extensions: [ ".scss" ],
} );

const path = process.argv[ 2 ];

require( path ); // eslint-disable-line import/no-dynamic-require
