const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        home: "./index",
        reactl: "./projects/reactl/index.js"
    },
    output: {
        filename: "[name].bundle.js",
        publicPath: "/dist/",
        libraryTarget: "umd"
    },
    watch: true,
    devServer: {
        compress: true,
        port: 9000
    }
}