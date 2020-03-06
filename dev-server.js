const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('./webpack.config.js')
const options = {
  // contentBase: path.resolve(__dirname, 'dist'),
  hot: true,
  host: 'localhost'
}

WebpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

server.listen(8000, 'localhost', () => {
  console.log('dev server listening on port 5000')
})
