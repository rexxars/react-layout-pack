'use strict';

var webpack = require('webpack');

module.exports = {
    output: {
        library: 'reactLayoutPack',
        libraryTarget: 'umd'
    },
    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};
