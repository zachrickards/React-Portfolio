const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        bundle: "./src/index.js"
    },
    output: {
        path: path.join(__dirname, "/../build"),
        publicPath: "/",
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
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.jsx?$/,
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
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: [".jsx", ".js"]
    },
    devtool: "source-map",
    devServer: {
        port: 3000,
        compress: true,
        contentBase: path.join(__dirname, "../build"),
        watchContentBase: true,
        hot: true,
        historyApiFallback: true
    }
}