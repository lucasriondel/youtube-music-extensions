const CopyPlugin = require('copy-webpack-plugin');
const WebpackChromeExtensionBundle = require('webpack-chrome-extension-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  plugins: [
    new Dotenv(),
    new CopyPlugin([
      { from: 'extension/manifest.json', to: '' },
      { from: 'src/style.css', to: '' },
    ]),
    new WebpackChromeExtensionBundle({ extractPackageJsonVersion: true }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
};
