var path = require('path');
var webpack = require('webpack');

module.exports = {
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
        publicPath: '/'
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            __HOST__: process.env.authorizationURL,
            __DEBUG__: false,
            __authorizationURL__: process.env.authorizationURL,
            __tokenURL__: process.env.tokenURL,
            __clientID__: process.env.clientID,
            __clientSecret__: process.env.clientSecret,
            __callbackURL__: process.env.callbackURL
        })
    ]
};