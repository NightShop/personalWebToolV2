const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { loader } = require("mini-css-extract-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode: mode,
    module: {
        rules: [
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
        new MiniCssExtractPlugin()
    ],
    
    devtool: "source-map",
    devServer: {
        static: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js", ".jsx"],
    }
};