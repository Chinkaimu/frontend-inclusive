const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    home: './src/index',
    practiceContext: './code-projects/react/practice-context/index.js',
    practiceContext1: './code-projects/react/practice-context/index1.js',
    practiceReact: './code-projects/react/practice-react/index.js',
    practiceRedux: './code-projects/react/practice-redux/index.js',
    practiceRedux1: './code-projects/react/practice-redux1/index.js',
    practiceRedux2: './code-projects/react/practice-redux2/index.js',
    practiceRedux3: './code-projects/react/practice-redux3/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  // loaders: allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to dependency graph.
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  // plugin:
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出'
    // filename: './index.html'
    }),
    new ManifestPlugin()
    // new webpack.HotModuleReplacementPlugin()
  ],
  // webpack 可以监听文件变化，当它们修改后会重新编译。
  watch: true,
  // devServer: {
  //   compress: true,
  //   port: 9000
  // },
  devtool: 'cheap-module-eval-source-map'
}
