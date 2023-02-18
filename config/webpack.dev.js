const webpack = require('webpack')
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.json');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    watchFiles: [path.resolve(__dirname, "../views/**/**/*.hbs")],
    static: {
      directory: path.join(__dirname, '../views/assets'),
      publicPath: '/public/assets',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __BASE_URL__: JSON.stringify(config.development.baseUrl)
    })
  ]
});
