const path = require('path');/*HtmlWebpackPlugin会在dist文件生成index.html文件 npm install --save-dev html-webpack-plugin */const HtmlWebpackPlugin = require('html-webpack-plugin');/*CleanWebpackPlugin  清理 /dist 文件夹 npm install clean-webpack-plugin --save-dev*/const CleanWebpackPlugin = require('clean-webpack-plugin');/** 模块热替换 const webpack = require('webpack');* 启用此功能实际上相当简单。而我们要做的，就是更新 webpack-dev-server 的配置，* 和使用 webpack 内置的 HMR 插件。我们还要删除掉 print.js 的入口起点，* 因为它现在正被 index.js 模块使用。** */const webpack = require('webpack');module.exports = {    // entry: './src/index.js',    entry: {        app: './src/index.js',        // print: './src/print.js'    },    /*    * mode: "production",    * tree shaking通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)    * 使用 ES2015 模块语法（即 import 和 export）。      在项目 package.json 文件中，添加一个 "sideEffects" 入口。      引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）    * */    mode: "production",    /*    webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)    npm install --save-dev webpack-dev-server    默认端口8080    使用 webpack-dev-middleware    npm install --save-dev express webpack-dev-middleware    output 配置 publicPath: '/'    */    devServer: {        contentBase: './dist',        // compress: true,        hot:true,        port: 9000//不配置默认为8080    },    devtool: 'inline-source-map',//判断错误信息位置    plugins: [ //先清空在生成        new CleanWebpackPlugin(),        new HtmlWebpackPlugin({            title:'Output Management'        }),        new webpack.NamedModulesPlugin(),        new webpack.HotModuleReplacementPlugin()    ],    module: {        rules: [            {/*配置css npm install --save-dev style-loader css-loader*/                test: /\.css$/,                use: [                    'style-loader',                    'css-loader'                ]            },            {/*加载图片 npm install --save-dev file-loader*/                test:/\.(png|svg|jpg|gif)$/,                use: [                    'file-loader'                ]            },            {/*加载字体 npm install --save-dev csv-loader xml-loader*/                test: /\.(woff|woff2|eot|ttf|otf)$/,                use: [                    'file-loader'                ]            },            {/*加载数据 npm install --save-dev csv-loader xml-loader*/                test: /\.(csv|tsv)$/,                use: [                    'csv-loader'                ]            },            {                test: /\.xml$/,                use: [                    'xml-loader'                ]            }        ]    }};