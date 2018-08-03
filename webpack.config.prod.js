var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './app/devpanel/index_production.js',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader'
      ],
      exclude: /node_modules/,
    }, 
      {test: /\.less$/, use:['style-loader', 'css-loader', 'less-loader']},
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }
      ]
    }, {
      test: /\.(jpg|jpeg|png|mp4)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            limit: 16192,
          }
        },
      ],
    },
    ]
  }
};

