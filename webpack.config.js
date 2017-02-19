const path = require( "path" );
const webpack = require( "webpack" );
const packageFile = require( "./package.json" );
const BundleAnalyzerPlugin = require( "webpack-bundle-analyzer" ).BundleAnalyzerPlugin;

const productionEnv = process.env.NODE_ENV === "production";

const plugins = [
    new webpack.optimize.CommonsChunkPlugin( {
        name: "lib",
        minChunks: Infinity,
        filename: "lib.bundle.js",
    } ),
    // new BundleAnalyzerPlugin( ),
];

if ( productionEnv ) {
    plugins.push(
        new webpack.LoaderOptionsPlugin( {
            minimize: true,
            debug: false,
        } ),
        new webpack.optimize.UglifyJsPlugin( {
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        } )
    );
}

module.exports = {
    context: path.resolve( __dirname, "src" ),

    devtool: productionEnv ? "source-map" : "cheap-module-source-map",

    entry: {
        app: "./client/index.js",
        lib: Object.keys( packageFile.dependencies ),
    },

    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "[name].bundle.js",
    },

    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },

    plugins,
};
