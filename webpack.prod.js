const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  mode: 'production',
  entry: {
    'main': ['./src/main.ts'],
    'myplace': ['./src/myplace.ts'],
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin(), new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
    chunks: ["main"]
  }),
  new HtmlWebPackPlugin({
    template: "./src/myplace/index.html",
    filename: "./myplace/index.html",
    chunks: ["myplace"]
  }),
  new CopyPlugin({
    patterns: [
      { from: "src/styles", to: "styles" },
      { from: "src/assets", to: "assets" },
      { from: "src/public", to: "./" },
    ]
  }),
  ]
};