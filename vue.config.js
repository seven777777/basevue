/*
 * @Author: wyx 
 * @Date: 2018-11-02 14:21:27 
 * @Last Modified by: wyx
 * @Last Modified time: 2018-11-02 18:20:35
 * 配置扩展
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  lintOnSave: false,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8180,
    https: false,
    hotOnly: false,
    proxy: null,
    before: app => {}
  },
  runtimeCompiler: true,
  configureWebpack: {
    //删除打包后的console文件
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ['console.log'] //移除console
            }
          }
        })
      ]
    },
    //由于使用jquery ui 中的组件， 这里注册全局jquery对象
    resolve: {
      extensions: ['.js'],
      alias: {
        'jquery': 'jquery/dist/jquery.min.js',

      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",


      })
    ]
  },

  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles//mixin.scss";
          @import "@/assets/styles//value.scss";
        `
      }
    }
  },

  // build 输出 地址
  outputDir: './dist',
};