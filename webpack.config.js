const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      // {
      //   test: /\.(js)$/,
      //   exclude: /node_modules/,
      //   use: 'babel-loader',
      // },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Davlatov frontend project',
      template: path.resolve(__dirname, 'assets', './template.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
