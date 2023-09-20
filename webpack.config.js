const path = require("path");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path: path.join(__dirname, "/client/dist/path"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devtool: "source-map",
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        issuer: /\.jsx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        issuer: /\.(css|scss)$/,
        use: ['file-loader'],
      },
    ],
  },
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ],
};
