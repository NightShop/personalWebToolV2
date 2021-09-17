const pluginsAr = ["@babel/plugin-transform-runtime"];

if (process.env.NODE_ENV !== "production") {
    pluginsAr.push("react-refresh/babel");
}

module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react",
            { runtime: "automatic" }],
    ],
    plugins: pluginsAr,
};
