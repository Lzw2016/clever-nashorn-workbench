const path = require("path");
// 打开浏览器
const open = require('opn');
// 改变命令行中输出日志颜色插件
const chalk = require('chalk');
const ip = require('ip').address();
const webpack = require("webpack");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const config = require("./config");
const webpackBaseConf = require("./webpack.base.conf");
const postcss = require('../postcss.config');

module.exports = {
  entry: webpackBaseConf.entries(),
  output: {
    path: config.distPath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: "/"
  },
  mode: "development",
  // 开发工具
  devtool: 'eval-source-map',
  // 加载器 loader 配置项
  module: {
    rules: [
      ...webpackBaseConf.baseModuleRules,
      {
        test: /\.js$/,
        use: [{
          loader: 'eslint-loader',
          // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          options: {
            // 指定错误报告的格式规范
            formatter: require('eslint-friendly-formatter')
          }
        }],
        // 编译前检查
        enforce: "pre",
        // 不检测的文件
        exclude: [
          /node_modules/,
          /public\/js\//,
          // path.resolve(config.publicPath, 'js/'),
        ],
        // 指定检查的目录
        include: [
          config.srcPath
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          // options、query不能和loader数组一起使用
          options: {
            // 利用缓存，提高性能，babel is slow
            cacheDirectory: true
          },
        }],
        include: [
          config.srcPath
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss.plugins,
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss.plugins,
              parser: 'postcss-scss',
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
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
      // 编译less
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcss.plugins,
              parser: 'postcss-less',
              sourceMap: true,
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      // art-template 模版配置 https://aui.github.io/art-template/zh-cn/docs/options.html
      {
        test: /\.art\.html$/,
        loader: "art-template-loader",
        options: {
          // 是否开启对模板输出语句自动编码功能。为 false 则关闭编码输出功能。escape 可以防范 XSS 攻击
          escape: true,
          // 默认后缀名。如果没有后缀名，则会自动添加 extname
          extname: '.art.html',
          // bail 如果为 true，编译错误与运行时错误都会抛出异常
          bail: true,
          // 是否开启缓存
          cache: true,
          // 启动模板引擎调试模式。如果为 true: {cache:false, minimize:false, compileDebug:true}
          debug: true,
          // 是否编译调试版
          compileDebug: true,
        }
      }
      // {
      //     test: /\.html$/,
      //     use: [{
      //         loader: 'html-loader',
      //         options: {
      //             attrs: ['img:src', 'img:data-src'],
      //             minimize: false
      //         }
      //     }]
      // },
    ]
  },
  // 插件配置项
  plugins: [
    ...webpackBaseConf.basePlugins,
    new webpack.HotModuleReplacementPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoEmitOnErrorsPlugin(),
    // 友好的终端错误显示方式
    new FriendlyErrorsPlugin({
      // 编译成功提示
      compilationSuccessInfo: {
        messages: [
          "  App running at:",
          `  - Local:   ${chalk.cyan(`http://127.0.0.1:${config.port}/`)}`,
          `  - Network: ${chalk.cyan(`http://${ip}:${config.port}/`)}`
        ],
      },
      // 编译错误提示
      onErrors: function (severity, errors) {
        // 可以收听插件转换和优先级的错误
        // 严重性可以是'错误'或'警告'
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: "Webpack error",
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          // icon: ICON
        });
      },
      // 是否每次编译之间清除控制台 默认为true
      clearConsole: true,
    })
  ],
  // 开发服务配置项
  devServer: {
    port: config.port,
    host: "0.0.0.0",
    contentBase: path.resolve(config.rootPath, "index.html"),
    // publicPath: '/',
    historyApiFallback: true,
    overlay: true,
    hot: true,
    inline: true,
    noInfo: true,
    // 跳过域名检查
    disableHostCheck: false,
    // 服务端代理配置
    proxy: config.proxy,
    after() {
      if (config.needOpenApp) {
        open(`http://${ip}:${config.port}`).catch(err => console.error(chalk.red(err)));
      }
    }
  },
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
  },
};
