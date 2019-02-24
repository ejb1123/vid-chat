var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: "false",
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  entry: './src/frontend.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      __HOST__: JSON.stringify('chat.chrobi.me')
    })
  ]

};