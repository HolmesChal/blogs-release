const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    // 路径别名
    alias: {
      '@': path.join(__dirname, '../src'),
      $: '@/components',
    },
    // 模块扩展名
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    // 作用：将style标签中的css代码单独抽离到一个文件里再通过link进行导入
    new MiniCssExtractPlugin({
      filename: 'style/[contenthash].css',
    }),
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      // {
      //   test: /\.png$/,
      //   type: 'asset/resource',
      // },
      // {
      //   test: /\.svg$/,
      //   type: 'asset/inline',
      // },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      // {
      //   test: /\.jpg$/,
      //   type: 'asset',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 4 * 1024 * 1024, // 4M
      //     },
      //   },
      // },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ],
         parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024, // 4M
          },
        },
      },
      {
        test: /\.(less|css)$/i,
        // MiniCssExtractPlugin作用：将style标签中的css代码单独抽离到一个文件里再通过link进行导入
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        // use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.js|x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true,
                },
              ],
              ['@babel/plugin-proposal-class-properties'],
              ['@babel/plugin-transform-runtime'],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      // 第三方库缓存
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
