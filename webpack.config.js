const path = require('path');
require('babel-polyfill');

module.exports = {
    target: "node",
    mode: "production",
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
            }
        ]
    }
};