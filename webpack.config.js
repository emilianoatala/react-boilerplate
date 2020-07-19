var path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // APP ENTRY POINT
  entry: path.join(__dirname, 'src', 'Index.jsx'),

  // EVIROMENT MODE
  mode: process.env.NODE_ENV || 'development',

  // LOADERS
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      { 
        test: /\.css$/, use: ['style-loader', 'css-loader'], 
        include: /flexboxgrid/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ],
  },

  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|jsx|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    new BrotliPlugin({ //brotli plugin
      asset: '[path].br[query]',
      test: /\.(js|jsx||css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ],

  // PATH RESOLVE
  resolve: {
    extensions: ['.js', '.json', '.jsx'],

    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  // OUTPUT DIRECTORY
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },

  // DEV SERVER ENTRY POINT
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    port: 3000,
    watchContentBase: true,
    open: true,
    compress:true,
  }
}