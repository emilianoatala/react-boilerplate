var path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  // APP ENTRY POINT
  entry: path.join(__dirname, "src", "Index.jsx"),

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
  },

  plugins: [new BundleAnalyzerPlugin()],

  // PATH RESOLVE
  resolve: {
    extensions: [".js", ".json", ".jsx"],

    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },

  // OUTPUT DIRECTORY
  output: {
    publicPath: "/",
    path: path.join(__dirname, "public"),
    filename: "app.bundle.js",
  },

  // DEV SERVER ENTRY POINT
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    port: 3000,
    watchContentBase: true,
    open: true,
    compress: true,
  },
};
