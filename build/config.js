const path = require("path");
const { pagesConfig } = require("../src/pages-config");
// 打包模式 production development 默认 production
let runMode = process.env.NODE_ENV || 'production';
if (runMode !== 'production' && runMode !== 'development') {
  runMode = 'production';
}
// 打包模式枚举
const runModeEnum = {
  dev: 'development',
  prod: 'production'
};

// 所有路径配置的前缀(路径配置是相对项目根路径为前提配置的)
const pathPrefix = '../';
// 打包版本号
const appVersion = new Date().getTime();
// 网站图标绝对路径
const favicon = path.resolve(__dirname, `${pathPrefix}public/images/favicon.png`);
// 项目根目录绝对路径
const rootPath = path.resolve(__dirname, `${pathPrefix}`);
// 打包输出目录绝对路径
const distPath = path.resolve(__dirname, `${pathPrefix}dist`);
// node_modules文件夹绝对路径
const nodeModulesPath = path.resolve(__dirname, `${pathPrefix}node_modules`);
// public文件夹绝对路径
const publicPath = path.resolve(__dirname, `${pathPrefix}public`);
// src文件夹绝对路径
const srcPath = path.resolve(__dirname, `${pathPrefix}src`);
// src文件夹绝对路径
const pagesPath = path.resolve(__dirname, `${pathPrefix}src/pages`);
// devserver 端口
const port = 8000;
// dev时是否需要自动打开浏览器
const needOpenApp = false;
// 需要 Analyzer
const needAnalyzer = false;

// 代理配置
const proxy = {
  // '/api': {
  //   target: 'http://localhost:3000',
  //   pathRewrite: {
  //     '^/api': ''
  //   }
  // }
};

// webpack.prod.conf 中的 splitChunks.cacheGroups 扩展
const extCacheGroups = {
  // commons: {
  //   name: 'commons',
  //   chunks: 'all',
  //   // 表示被引用次数，默认为1
  //   minChunks: 2,
  //   // 表示抽取出来的文件在压缩前的最小大小，默认为 30000
  //   minSize: 30000,
  //   // 来设置优先级
  //   priority: 0,
  // },
};

module.exports = {
  pagesConfig,
  runMode,
  runModeEnum,
  appVersion,
  favicon,
  rootPath,
  distPath,
  nodeModulesPath,
  publicPath,
  srcPath,
  pagesPath,
  port,
  needOpenApp,
  needAnalyzer,
  proxy,
  extCacheGroups,
};
