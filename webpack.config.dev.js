import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

export default {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.tsx'),
  ],
  devtool: 'eval-source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js',
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
      { test: /\.tsx?$/, exclude: /node_modules/,
        use: [
          'babel-loader',
          'awesome-typescript-loader',
          {loader: 'ifdef-loader', options: {DEBUG: true}},
        ],
      },
      // All output '.ts' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.ts$/, loader: 'source-map-loader' },

      {test: /\.scss$/, use: [ // Note that these loaders are applied in reverse order, the last one first
        'style-loader', // 5. Add CSS to DOM by injecting style tag
        // 4. Use CSS modules, generating class names in the specified format
        // 3. Load the CSS file, resolve imports and urls
        {
          // See: https://medium.com/@sapegin/css-modules-with-typescript-and-webpack-6b221ebe5f10,
          //      https://github.com/Quramy/typed-css-modules
          loader: 'typings-for-css-modules-loader',
          options: {
            modules: true,
            namedExport: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
        'postcss-loader', // 2. Perform any transformations specified in postcss.config.js
        'sass-loader',    // 1. Compile SASS into CSS
      ]},
    ],
  },
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
    warnings: false,
  },
}