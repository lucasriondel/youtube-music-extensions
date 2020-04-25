const merge = require('webpack-merge');

module.exports = merge(require('./webpack.config.js'), {
  mode: 'production',
  watch: false,
});
