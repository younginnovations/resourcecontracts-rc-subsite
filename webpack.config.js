var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'resources/assets/scripts');

var config = {
  entry: [
     APP_DIR + '/Popup.js',
     'whatwg-fetch'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'popup.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};

module.exports = config;