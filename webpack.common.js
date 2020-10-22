'use strict';
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: ''
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
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            domain: path.resolve(__dirname, 'src/domain/'),
            styles: path.resolve(__dirname, 'src/styles/')
        },
        extensions: ['.ts', '.tsx', '.js', '.scss']
    }
};
