var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var config =  {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    //publicPath: 'assets/',
    filename: 'assets/js/app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist'
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        use: [
          {
            loader:'file-loader',
            options: {
              name:'[name].[ext]',
              outputPath:'assets/images/',
              //publicPath: ''
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom title',
      template: './src/index.html',
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/app.css',
      disable: false,
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {from: 'src/assets/images', to: 'assets/images'}
    ])
  ]
}

module.exports = config;