const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let mode = "development";
const pluginsArr = [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, "src/assets/favicon_io"),
                to: path.resolve(__dirname, "dist"),
            },
        ],
    }),
];

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

if (process.env.SERVE) {
    pluginsArr.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode,

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]",
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/i,
                type: "asset",
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },

    plugins: pluginsArr,

    devServer: {
        static: path.resolve(__dirname, "dist"),
        hot: true,
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
};
