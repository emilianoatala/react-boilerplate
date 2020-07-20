var path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // APP ENTRY POINT
  entry: path.join(__dirname, "src", "Index.jsx"),

  // EVIROMENT MODE
  mode: process.env.NODE_ENV || "development",

  // LOADERS
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: /flexboxgrid/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: "~",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|jsx|css|html|svg)$/,
      threshold: 0,
      minRatio: 0.8,
    }),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|jsx||css|html|svg)$/,
      threshold: 0,
      minRatio: 0.8,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "/static/index.html"),
    }),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap("DonePlugin", () => {
          console.log("Compile is done !");
          setTimeout(() => {
            process.exit(0);
          });
        });
      },
    },
  ],

  // PATH RESOLVE
  resolve: {
    extensions: [".js", ".json", ".jsx"],

    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },

  // OUTPUT DIRECTORY
  output: {
    publicPath: "/",
    path: path.join(__dirname, "public"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },
};
