const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'main': ['./src/main.ts'],
    'myPlace': ['./src/myplace/myPlace.ts'],
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
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
    chunks: ["myPlace"]
  })]
};