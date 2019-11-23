// Imports
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Environment calculation
const env = (() => {
    const nodeEnv = process.env.NODE_ENV || "development";

    if (nodeEnv.startsWith("prod")) return "production";
    else return "development";
})();

// Plugins
const plugins = [
    new HtmlWebpackPlugin({
        xhtml: true,
        inject: true,
        title: "Flickr Image Gallery",
        template: path.resolve("src", "template.pug"),
    }),
];

const filenameTriplet = env === "production" ? "[contenthash]" : "bundle";

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

    // Devtool
    devtool: env === "production" ? "source-map" : "cheap-module-source-map",

    // Module setup
    module: {
        // Rules
        rules: [
            {
                test: /\.tsx?$/,
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
