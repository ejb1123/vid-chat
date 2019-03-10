var common = require('./webpack.common.js');
const merge = require('webpack-merge');
var path = require('path');
module.exports = merge(common,{
    mode: 'development',
    devtool: "inline-source-map",
    devServer:{
        contentBase: './public/dist'
    }
});