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
        filename: 'bundle.js'
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
                use: ['file-loader']
            }
        ]
    },

    // File extensions to support resolving
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};
