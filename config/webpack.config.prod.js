// webpack.config.prod.js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    output: {
        filename: 'scripts/[name].[contenthash].js',
        // publicPath:'http://localhost:8080/',
        clean: true
    },
    mode: 'production',
    optimization: {
        minimizer: [
            // 作用：将输出css文件进行代码压缩
            new CssMinimizerPlugin(),
            // 作用：将输出js文件进行代码压缩
            new TerserPlugin()
        ]
    },
    performance: {
        hints: false
    }
}