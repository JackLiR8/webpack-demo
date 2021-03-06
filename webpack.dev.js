const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')

let devConfig = {
    mode:'development', // 模式
    output:{                // 出口
        filename:'main.js',
        path:path.resolve(__dirname,'dist')
    },
    devtool:'eval-source-map',
    devServer:{
        clientLogLevel:'warning',
        hot:true,
        contentBase:path.resolve(__dirname,'dist'),
        compress:true,
        host:'localhost',
        port:'8094',
        open:true,
        overlay:{
            warning:true,
            errors:true
        },
        publicPath:'/',
        proxy:{     // 服务器代理
            "/api":{
                target:"https://www.zhihu.com",
                changeOrigin:true,
                secure:false,
                pathRewrite:{
                    // "^/api" :""
                }
            }
        },
        quiet:true,
        watchOptions:{
            poll:true,      // 轮询
            aggregateTimeout: 600,      // 延迟
            ignored:/node_modules/
        }
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()   
    ],
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            sourceMap:true,
                            plugins: () => [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{
                            sourceMap:true
                        }
                    }]
            },
        ]
    }
}

module.exports = merge(common,devConfig)