const path = require( "path" );
const webpack = require( "webpack" );
const packageFile = require( "./package.json" );

module.exports = {
    context: __dirname + "/src",

    entry: {
        app: "./client/index.js",
        lib: Object.keys( packageFile.dependencies )
    },

    output: {
        path: path.resolve( __dirname + "/dist" ),
        filename: "[name].js"
    },

    resolve: {
        modules: [
            path.resolve( "./src" ), 
            "node_modules"
        ]
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    }
}
