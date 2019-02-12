const path = require('path');

module.exports = {
    mode: 'development',
    devtool: "true",
    module:{
        rules:[
            {test: /\.ts$/, use: 'ts-loader'}
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    entry: './src/frontend.ts',
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'public/dist'),
    }
    
}