const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
    entry: {
        // I specify main entry in case a project grows in the future
        main: './src/anim.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        compress: true, // gzip
        stats: 'minimal',
        open: true,
        // hot: true,
        overlay: true
    },
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
});