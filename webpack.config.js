const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        home: "./index",
        comment: "./projects/reactl/comment-practice/index.js"
    },
    output: {
        filename: "[name].bundle.js",
        publicPath: "/dist/",
        libraryTarget: "umd"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    },
    watch: true,
    devServer: {
        compress: true,
        port: 9000
    }
}