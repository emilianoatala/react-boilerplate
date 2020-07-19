var path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
          loader: "babel-loader",
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
    minimize:true
  },

  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|jsx|css|html|svg)$/,
      threshold: 0,
      minRatio: 0.8
    }),
    new BrotliPlugin({ //brotli plugin
      asset: '[path].br[query]',
      test: /\.(js|jsx||css|html|svg)$/,
      threshold: 0,
      minRatio: 0.8
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname,  '/static/index.html'),
      title:"react App"
    }),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('DonePlugin', (stats) => {
            console.log('Compile is done !')
            setTimeout(() => {
                process.exit(0)
            })
        });
      }
    }
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
    publicPath: '/',
    path: path.join(__dirname, 'public'),
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