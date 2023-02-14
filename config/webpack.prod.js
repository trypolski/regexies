const webpack = require('webpack')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.json');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      __BASE_URL__: JSON.stringify(config.production.baseUrl)
    })
  ]
});
