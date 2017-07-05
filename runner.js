require( "babel-register" )( {
    presets: [ "es2015" ],
    plugins: [ "dynamic-import-node" ],
} );

const path = process.argv[ 2 ];

require( path ); // eslint-disable-line import/no-dynamic-require
