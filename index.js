require( "babel-register" )( {
    presets: [ "es2015" ],
} );

const hook = require( "css-modules-require-hook" );

hook( {
    generateScopedName: "[name]__[local]___[hash:base64:5]",
    extensions: [ ".scss" ],
} );

require( "./src/server" );
