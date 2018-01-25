const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const cfgDebug = {
  entry: './index.js',
  output: {
    filename: 'tempo.js',
    path: path.resolve(__dirname, 'dist')
  }
};

const cfgMin = {
  entry: './index.js',
  output: {
    filename: 'tempo.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};

module.exports = [cfgDebug, cfgMin];
