const path = require("path");
const webpack = require("webpack");
// 分离 css 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 清除生成文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩 JS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 压缩 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require("./config");
const webpackBaseConf = require("./webpack.base.conf");
const postcss = require('../postcss.config');

module.exports = {
  entry: webpackBaseConf.entries(),
  output: {
    path: config.distPath,
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: "/"
  },
  mode: "production",
  // 加载器 loader 配置项
  module: {
    rules: [
      ...webpackBaseConf.baseModuleRules,
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: [
          config.srcPath,
          path.resolve(config.nodeModulesPath, 'webpack-dev-server/client')
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss.plugins
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss.plugins,
              parser: 'postcss-scss'
            }
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                path.resolve(config.srcPath, 'assets/scss/**/*.scss'),
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      // 编译 less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss.plugins,
              parser: 'postcss-less'
            }
          },
          {
            loader: 'less-loader',
          }
        ]
      },
      // art-template 模版配置 https://aui.github.io/art-template/zh-cn/docs/options.html
      {
        test: /\.art$/,
        loader: "art-template-loader",
        options: {
          // 是否开启对模板输出语句自动编码功能。为 false 则关闭编码输出功能。escape 可以防范 XSS 攻击
          escape: true,
          // 默认后缀名。如果没有后缀名，则会自动添加 extname
          extname: '.art',
          // bail 如果为 true，编译错误与运行时错误都会抛出异常
          bail: true,
          // 是否开启缓存
          cache: true,
          // 启动模板引擎调试模式。如果为 true: {cache:false, minimize:false, compileDebug:true}
          debug: false,
          // 是否编译调试版
          compileDebug: false,
        }
      }
    ]
  },
  optimization: {
    namedChunks: true,
    moduleIds: 'hashed',
    /**
     * manifest js have already inline to every html file, please run build and see it in html.
     * Maybe we don't need manifest file, because we are a multi-page application. each html page's js maybe not complex.
     * So it depending on how you understand your js file complex or simple.
     * --------------------------------------------------------------------------------------------------------------------------- 译文
     * 清单js已经内联到每个html文件，请运行构建并查看它的html。
     * 也许我们不需要清单文件，因为我们是一个多页面的应用程序。每个html页面的js可能并不复杂。
     * 所以这取决于你如何理解你的js文件复杂或简单。
     */
    runtimeChunk: {
      name: 'manifest',
    },
    // 用于配置 minimizers 和选项
    minimizer: [
      // webpack 不支持es6语法的压缩，这里要使用需要babel配合
      // 压缩 js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        // set to true if you want JS source maps
        sourceMap: true
      }),
      // 压缩 css
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      // maxInitialRequests: 6,
      cacheGroups: {
        ...config.extCacheGroups,
        // 提取 node_modules 中代码
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
        },
        // 复用的文件，单独抽离 后续再优化此配置
        commons: {
          name: 'commons',
          chunks: 'all',
          // 表示被引用次数，默认为1。Math.ceil(pages.length / 3), 当你有多个页面时，获取pages.length，至少被1/3页面的引入才打入common包
          minChunks: Math.ceil(config.pagesConfig.length / 3),
          // 表示抽取出来的文件在压缩前的最小大小，默认为 30000
          minSize: 30000,
          // 来设置优先级
          priority: 0,
        },
        // dll: {
        //   chunks: 'all',
        //   test: /[\\/]node_modules[\\/](jquery|core-js|vue|vue-router)[\\/]/,
        //   name: 'dll',
        //   priority: 2,
        //   enforce: true,
        //   reuseExistingChunk: true
        // },
        // superSlide: {
        //   chunks: 'all',
        //   test: /[\\/]src[\\/]assets[\\/]js[\\/]/,
        //   name: 'superSlide',
        //   priority: 1,
        //   enforce: true,
        //   reuseExistingChunk: true
        // },
      }
    },
  },
  // 插件配置项
  plugins: [
    ...webpackBaseConf.basePlugins,
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
    // 删除 dist 文件夹
    new CleanWebpackPlugin(),
  ],
  resolve: {
    // 设置可省略文件后缀名
    extensions: [
      ...webpackBaseConf.baseResolveExtensions,
    ],
    // 查找 module 的话从这里开始查找; // 绝对路径;
    modules: [
      ...webpackBaseConf.baseResolveModules,
    ],
    // 配置路径映射（别名）
    alias: {
      ...webpackBaseConf.baseResolveAlias
    }
  }
};
