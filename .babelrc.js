module.exports = api => {
    // Determine if we are in a development/testing environment
    const isDev = api.env(["development", "dev", "test", "testing", "staging"]);

    // Define presets
    const presets = [
        // Environment
        [
            "@babel/preset-env",
            {
                // Use builtins based on usage
                useBuiltIns: "usage",

                // Use core-js 3
                corejs: 3,
            },
        ],

        ["@babel/preset-react", { development: isDev }],

        // TypeScript
        "@babel/preset-typescript",
    ];

    // Define plugins
    const plugins = [
        // Class properties
        "@babel/plugin-proposal-class-properties",

        // TypeScript 3.7 features
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
    ];

    // If not in production, transform babel runtime
    if (isDev) plugins.push("@babel/plugin-transform-runtime");

    // Return configuration object
    return {
        presets,
        plugins,
    };
};
