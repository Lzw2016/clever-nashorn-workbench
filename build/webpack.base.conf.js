const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require("./config");

// entry - jsPath 名称处理去掉.js 后缀
const entryKeyHandle = (jsPath) => {
  if (!jsPath) {
    return jsPath;
  }
  if (jsPath.endsWith(".js")) {
    return jsPath.substring(0, jsPath.length - 3);
  }
  return jsPath;
};

// 多入口配置 (JS文件)
const entries = () => {
  const pagesConfig = config.pagesConfig || [];
  if (!pagesConfig || pagesConfig.length <= 0) {
    console.error("请先配置pagesConfig");
    return {};
  }
  let count = 0;
  const entry = {};
  pagesConfig.forEach(itemConfig => {
    if (!itemConfig || !itemConfig.jsPathArray || itemConfig.jsPathArray.length <= 0) {
      return;
    }
    itemConfig.jsPathArray.forEach(jsPath => {
      const absolutePath = path.resolve(config.pagesPath, jsPath);
      entry[entryKeyHandle(jsPath)] = absolutePath;
      count++;
    });
  });
  if (count <= 0) {
    console.error("请先配置pagesConfig");
  }
  // console.log("entry", entry);
  return entry;
};

// 多页面页面配置 (HTML文件)
const getHtmlPlugin = () => {
  let baseConfig = {
    favicon: config.favicon,
    appVersion: config.appVersion
  };
  if (config.runMode === config.runModeEnum.dev) {
    // dev Html 文件处理
    baseConfig = webpackMerge(baseConfig, {
      minify: false,
    });
  } else {
    // prod Html 文件处理
    baseConfig = webpackMerge(baseConfig, {
      // 压缩 html 文件
      minify: {
        // 删除多余的属性
        removeRedundantAttributes: true,
        // 折叠空白区域
        collapseWhitespace: true,
        // 移除属性的引号
        removeAttributeQuotes: true,
        // 移除注释
        removeComments: true,
        // 省略只有 boolean 值的属性值 例如：readonly checked
        collapseBooleanAttributes: true,
        // 压缩内联css
        minifyCSS: true
      },
    });
  }
  const htmlPluginArray = [];
  config.pagesConfig.forEach(itemConfig => {
    if (!itemConfig.htmlPath) {
      return;
    }
    const jsPathArray = [];
    if (itemConfig.jsPathArray && itemConfig.jsPathArray.length > 0) {
      itemConfig.jsPathArray.forEach(jsPath => jsPathArray.push(entryKeyHandle(jsPath)));
    }
    // console.log("jsPathArray", jsPathArray);
    const htmlWebpackConfig = webpackMerge(baseConfig, {
      // 输出文件的名称
      filename: itemConfig.htmlOutPath || itemConfig.htmlPath,
      // 模板文件的路径
      template: path.resolve(config.pagesPath, itemConfig.htmlPath),
      // 此处chunks名字与webpack.prod.config.js配置一致
      chunks: [...Object.keys(config.extCacheGroups), 'manifest', 'vendor', 'commons', ...jsPathArray],
      // HTML页面标题
      title: itemConfig.title,
    });
    // console.log("template", htmlWebpackConfig.template);
    htmlPluginArray.push(new HtmlWebpackPlugin(htmlWebpackConfig));
  });
  return htmlPluginArray;
};

// 公用的rules
const baseModuleRules = [
  {
    test: require.resolve('jquery'),
    use: [
      { loader: 'expose-loader', options: 'jQuery' },
      { loader: 'expose-loader', options: '$' }
    ]
  },
  {
    test: /\.json$/,
    use: 'json-loader',
    type: 'javascript/auto',
    exclude: /node_modules/
  },
  {
    test: /\.(png|jp?g|gif|svg|ico)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          // 小于8192字节的图片打包成base 64图片
          limit: 8192,
          name: 'images/[name].[hash:8].[ext]',
          publicPath: ''
        }
      },
    ]
  },
  // 文件依赖配置项——字体图标
  {
    test: /\.(woff|woff2|svg|eot|ttf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'fonts/[name].[ext]?[hash:8]',
          publicPath: ''
        },
      }
    ]
  },
  // 文件依赖配置项——音频
  {
    test: /\.(wav|mp3|ogg)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'audios/[name].[ext]?[hash:8]',
          publicPath: ''
        },
      }
    ],
  },
  // 文件依赖配置项——视频
  {
    test: /\.(ogg|mpeg4|webm)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        limit: 8192,
        name: 'videos/[name].[ext]?[hash:8]',
        publicPath: ''
      },
    }],
  }
];

// 公用插件
const basePlugins = [
  // new HtmlWebpackPlugin({
  //   filename: 'index.html',
  //   template: path.resolve(__dirname, '../src/index.html'),
  //   title: 'webpack4.x',
  //   minify: {
  //     removeRedundantAttributes: true,
  //     collapseWhitespace: true,
  //     removeAttributeQuotes: true,
  //     removeComments: true,
  //     collapseBooleanAttributes: true
  //   },
  //   favicon: config.favicon,
  //   appVersion: config.appVersion
  // }),
  ...getHtmlPlugin(),
  new CopyWebpackPlugin([
    {
      // 打包的静态资源目录地址
      from: config.publicPath,
      // 打包到dist下面的public
      to: './public'
    },
  ]),
];

if (config.needAnalyzer && config.runMode !== config.runModeEnum.dev) {
  basePlugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      //  是否在默认浏览器中自动打开报告
      openAnalyzer: true,
      //  将在"服务器"模式下使用的端口启动HTTP服务器。
      analyzerPort: 9528,
      reportFilename: path.resolve(config.rootPath, "report.html")
    })
  );
}

// resolve.extensions
const baseResolveExtensions = [' ', '.js', '.json', '.jsx'];
// resolve.modules
const baseResolveModules = [
  config.srcPath,
  config.nodeModulesPath
];
// resolve.alias
const baseResolveAlias = {
  '@': config.srcPath
};

module.exports = {
  entries,
  getHtmlPlugin,
  baseModuleRules,
  basePlugins,
  baseResolveExtensions,
  baseResolveModules,
  baseResolveAlias,
};
