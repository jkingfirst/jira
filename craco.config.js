const CracoLessPlugin = require("craco-less");
const manifest = require("./public/vendor/vendor-manifest.json");
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')
const webpack = require("webpack");
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1e63ec" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        manifest,
        context: process.cwd(),
      }),
      // new HtmlWebpackPlugin(),
      // new AddAssetHtmlWebpackPlugin({
      //   filepath: path.resolve(__dirname, './public/vendor/*.js'), // 对应的 dll 文件路径
      // })
    ],
  },
};
