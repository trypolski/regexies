const path = require('path');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const helpers = require('./utils');
const entries = helpers.getEntries();

module.exports = {
  entry: entries,
  plugins: [
    new MiniCssExtractPlugin({
      filename: helpers.getOutputFilenameCSS
    }),
    new HandlebarsPlugin({
      entry: path.resolve(__dirname, "../views", "pages", "**", "index.hbs"),
      output: path.resolve(__dirname, "../docs", "[path]", "[name].html"),
      
      // data passed to main hbs template: `main-template(data)`
      // data: require("./app/data/project.json"),
      // or add it as filepath to rebuild data on change using webpack-dev-server
      // data: path.join(__dirname, "app/data/project.json"),

      // globbed path to partials, where folder/filename is unique
      partials: [
        path.resolve(__dirname, "../views", "components", "*", "*.hbs"),
        path.resolve(__dirname, "../views", "decorators", "*.hbs")
      ],
      // register custom helpers. May be either a function or a glob-pattern
      helpers: {
        nameOfHbsHelper: Function.prototype,
        projectHelpers: path.resolve(__dirname, "../views", "hbs", "helpers", "*.helper.js")
      },

      // hooks
      // getTargetFilepath: function (filepath, outputTemplate) {},
      // getPartialId: function (filePath) {}
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../views/assets/'),
          to: path.resolve(__dirname, '../docs/public/assets/'),
          noErrorOnMissing: true
        }
      ]
    })
  ],
  output: {
    filename: helpers.getOutputFilenameJS,
    path: path.resolve(__dirname, "../docs"),
    assetModuleFilename: 'public/assets/[name]-[hash][ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  }
};
