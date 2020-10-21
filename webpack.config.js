'use strict';
const path = require('path');

module.exports = {
    mode: 'development',
    // Set debugging source maps to be "inline" for
    // simplicity and ease of use
    devtool: 'inline-source-map',
    devServer: {
        contentBase: 'public',
        publicPath: '/dist'
    },

    entry: './src/index.tsx',

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images'
                }
            }
        ]
    },

    // File extensions to support resolving
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};
