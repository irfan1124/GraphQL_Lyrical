const webpack = require('webpack');
const webpackConfig = require('./webpack.config.client');
const webpackConfigServer = require('./webpack.config.server');
const merge = require('webpack-merge');

module.exports = merge(webpackConfig, webpackConfigServer);
