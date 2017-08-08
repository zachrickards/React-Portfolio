const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        bundle: "./src/index.jsx"
    },
    output: {
        path: __dirname + "/../build",
        filename: "static/js/[name].[hash:8].js"
    },
    module: {
        rules: [
            {
            enforce: "pre",
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            options: {
                configFile: "./eslintrc.json"
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.jsx$?/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader"}
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["build"], {
            root: __dirname + "/../",
            verbose: true
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],
    stats: {
        modules: true,
        reasons: true
    },
    resolve: {
        extensions: [".jsx", ".js"]
    },
    devtool: "source-map"
}