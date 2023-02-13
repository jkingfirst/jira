const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const dllDir = "public/vendor";
module.exports = {
  entry: {
    vendor: ["react", "react-router-dom", "react-router", "antd"],
  },
  output: {
    path: path.join(__dirname, dllDir),
    filename: "[name].dll.js",
    library: "[name]_[hash]",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: process.cwd(),
      path: path.join(__dirname, dllDir, "[name]-manifest.json"),
      name: "[name]_[hash]",
    }),
  ],
};
