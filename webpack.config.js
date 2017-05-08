const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;

module.exports = {
    entry: './src/index.js',
    output: {
        path:  __dirname + '/build',      //webpack-server requires this path to be absolute
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract([
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => ([
                                require('autoprefixer')
                            ])
                        }
                    },
                    'less-loader'
                ]),
            },
            {
                test: /\.html$/,
                loader: 'underscore-template-loader'
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url-loader?limit=10000&mimetype=application/font-woff" 
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader" 
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './src/index.html', to: 'index.html'}
        ]),
        new ExtractTextPlugin('styles.css'),
        // new CriticalPlugin({
        //     src: './build/index.html',
        //     base: __dirname,
        //     inline: true,
        //     minify: true,
        //     dest: './build/index.html'
        // })
    ],
    devServer: {
        port: 3000,
        contentBase: './build',
        inline: true
    }
}