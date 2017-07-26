var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: __dirname + "/src/main.jsx",
  output: {
    filename: "bundle.js",
    path: __dirname + '/src'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    inline: true,
    contentBase: __dirname + '/src',
    hot: true,
  }
};