const path = require( "path" );
const webpack = require( "webpack" );
const packageFile = require( "./package.json" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const BundleAnalyzerPlugin = require( "webpack-bundle-analyzer" ).BundleAnalyzerPlugin;

const productionEnv = process.env.NODE_ENV === "production";

const plugins = [
    new webpack.optimize.CommonsChunkPlugin( {
        name: "lib",
        minChunks: Infinity,
        filename: "lib.bundle.js",
    } ),
    new ExtractTextPlugin( {
        filename: "[name].bundle.css",
        allChunks: true,
    } ),
    // new BundleAnalyzerPlugin( ),
];

if ( productionEnv ) {
    plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin( { minimize: true, debug: false } ),
        new webpack.optimize.UglifyJsPlugin( { sourcemap: true } ) );
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
        alias: {
            react: "preact-compat",
            "react-dom": "preact-compat",
        },
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "eslint-loader",
                        options: {
                            failOnWarning: false,
                            failOnError: true,
                            quiet: true,
                        },
                    },
                ],
            },
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /(\.css|\.scss)$/,
                use: ExtractTextPlugin.extract( {
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                        },
                        "sass-loader",
                    ],

                } ),
            },
        ],
    },

    plugins,
};
