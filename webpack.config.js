const path = require('path');
require('ts-node').register;
const StylablePlugin = require('stylable-integration/webpack-plugin');
const stylableOptions = { injectBundleCss: true, nsDelimiter:'--' };

module.exports = {
    devtool: 'source-map',
    entry: {
        demo: './site/index.tsx', 
        tests: 'mocha-loader!./test/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        "declaration": false
                    }
                }
            },
            {
                test: /\.st.css$/,
                loader: 'stylable-integration/webpack-loader',
                options: stylableOptions
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: '[name].js',
        pathinfo: true
    },
    devServer: {
        disableHostCheck: true
    },
    plugins: [
        new StylablePlugin(stylableOptions)
    ]
}