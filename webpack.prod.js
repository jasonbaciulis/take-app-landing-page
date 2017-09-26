const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

module.exports = merge(common, {
    entry: {
        // I specify main entry in case a project grows in the future
        main: './src/anim.js',
    },
    plugins: [
        new UglifyJSPlugin(),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.ejs')),
            purifyOptions: {
                minify: true
            },
        }),
        new HtmlCriticalPlugin({
            base: path.join(path.resolve(__dirname), 'dist/'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 320,
            height: 568,
            penthouse: {
                blockJSRequests: false
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ]
});