const CopyPlugin = require('copy-webpack-plugin');
const WebpackChromeExtensionPlugin = require('webpack-chrome-extension-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  plugins: [
    new CopyPlugin([
      { from: 'extension/manifest.json', to: '' },
      { from: 'src/style.css', to: '' },
    ]),
    new WebpackChromeExtensionPlugin({ extractPackageJsonVersion: true }),
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
