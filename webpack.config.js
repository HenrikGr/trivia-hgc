/*
 * Description:
 *
 * Author:  Henrik
 * File:
 * Version: 0.0.1
 *
 * Created on 2016-07-07
 */
module.exports = {
  entry: ['whatwg-fetch', __dirname + '/client/src/main.js'],
  output: {
    path: __dirname + '/client/dist/js',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
