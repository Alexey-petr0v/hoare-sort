const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  app: path.resolve(__dirname, "src/app"),
  dist: path.resolve(__dirname, "dist")
}

module.exports = {
  entry: {
    bundle: PATHS.app + "/index.js"
  },
  output: {
    filename: "[name].js",
    path: PATHS.dist,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          },
        ]
      }
  ]
 },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
      new HtmlWebpackPlugin({
          template: __dirname + "/src/public/index.html",
          inject: 'body'
      })
  ],
  devServer: {
      port: 7700,
  } 
};