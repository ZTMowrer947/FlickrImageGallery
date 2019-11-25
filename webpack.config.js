// Imports
const path = require("path");
const Dotenv = require("dotenv-webpack");
const ExtractCssChunksWebpackPlugin = require("extract-css-chunks-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Environment calculation
const env = (() => {
    const nodeEnv = process.env.NODE_ENV || "development";

    if (nodeEnv.startsWith("prod")) return "production";
    else return "development";
})();

const filenameTriplet = env === "production" ? "[contenthash]" : "bundle";

// Plugins
const plugins = [
    new Dotenv(),

    new HtmlWebpackPlugin({
        xhtml: true,
        inject: true,
        title: "Flickr Image Gallery",
        template: path.resolve("src", "template.pug"),
    }),

    new ExtractCssChunksWebpackPlugin({
        filename: path.join("styles", `[name].${filenameTriplet}.css`),
    }),
];

if (env === "development")
    plugins.push(
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
            reportFiles: ["src/**/*.{ts, tsx}"],
        })
    );

// Configuration
/**
 * @type {import("webpack").Configuration}
 */
const config = {
    // Mode
    mode: env,

    // Entry points
    entry: {
        app: path.resolve("src", "index.tsx"),
    },

    // Output
    output: {
        // File names
        filename: path.join("scripts", `[name].${filenameTriplet}.js`),

        // Output directories
        path: path.resolve("public"),
        publicPath: "/",
    },

    // Extension resolution
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
    },

    // Devtool
    devtool: env === "production" ? "source-map" : "cheap-module-source-map",

    // Module setup
    module: {
        // Rules
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /\/__tests__\//,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                },
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.pug$/,
                loader: "pug-loader",
            },
            {
                test: /\.module\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: ExtractCssChunksWebpackPlugin.loader,
                        options: {
                            hot: env === "development",
                        },
                    },
                    {
                        loader: "css-loader",
                        options: { modules: true, sourceMap: true },
                    },
                    { loader: "postcss-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: ExtractCssChunksWebpackPlugin.loader,
                        options: {
                            hot: env === "development",
                        },
                    },
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "postcss-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ],
            },
        ],
    },

    // Plugins
    plugins,

    // Optimizations
    optimization: {
        // Module IDs
        moduleIds: env === "production" ? "hashed" : "named",

        // Chunk splitting
        splitChunks: {
            chunks: "all",

            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                },
            },
        },

        runtimeChunk: "single",
    },

    // Dev server
    devServer: {
        port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
        contentBase: path.resolve("public"),
        historyApiFallback: true,
        hot: true,
    },
};

// Export
module.exports = config;
