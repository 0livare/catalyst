import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'


export default {
  devtool: 'eval-source-map',
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: false,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    maxModules: 0,
    modules: false,
    performance: false,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: false,
    usedExports: false,
    version: false,
    warnings: false
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src/index'),
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true, // Automatically inject any necessary script tags
    }),
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, use: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader']}
    ]
  }
}