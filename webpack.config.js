var webpack = require('webpack');
var path = require('path');

var config = {
  entry: ['./index'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: './aem-6-developer-certification-reviewer/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        loader: 'babel'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=./fonts/[hash].[ext]" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000&name=./fonts/[hash].[ext]" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=./fonts/[hash].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=./[hash].[ext]" }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};

module.exports = config;
