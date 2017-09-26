const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
const path = require('path');


module.exports = {
    output: {
        // this as where assets will be outputed
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/dist/'
    },
    module: {
        // loaders are loaded backwards, so the last one in the array will be loaded as the first
        // {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')(),
                                ],
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: '/',
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                optimizationLevel: 3
                            },
                            pngquant: {
                                quality: '65-70'
                            },
                            mozjpeg: {
                                quality: 65
                            },
                            svgo: {
                                plugins: [{
                                        convertStyleToAttrs: true
                                    },
                                    {
                                        removeDimensions: true
                                    },
                                    {
                                        removeTitle: true
                                    },

                                ]
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'font/'
                    }
                }]
            },
            {
                test: /\.ejs$/,
                use: [{
                    loader: 'html-loader',
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project title',
            minify: {
                collapseWhitespace: true,
                minifyJS: true,
                removeComments: true
            },
            hash: true,
            template: './src/index.ejs',
        }),
        new webpack.ProvidePlugin({
            // $: "jquery",
            // jQuery: "jquery",
            // "window.jQuery": "jquery",
            // Tether: "tether",
            // "window.Tether": "tether",
            // Popper: ['popper.js', 'default'],
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
    ]
};

// optimize and subset fonts

// prevent critical from deleting extracted css (except single page sites), because that prevents css caching, as new css is created for every page

// add async or defer to scripts

// inject other neccessary meta tags, like meta description, apple and android icons etc

// create favicon

// integrate handlebars or ejs