const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server/server.js',
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc. 
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /(node_modules)/,
            }
        ]
    }
};
