const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode: mode,

    output: {
        assetModuleFilename: "images/[hash][ext][query]",
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset"
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use : {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                use : [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    
    devtool: "source-map",
    devServer: {
        static: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js", ".jsx"],
    }
};