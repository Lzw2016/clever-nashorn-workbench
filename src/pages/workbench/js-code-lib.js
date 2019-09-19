const jsCodeLib = [];

// Java
jsCodeLib.push(
  `
  var Java = {};
  Java.type = function () {
    return {};
  };
  `
);

// console
jsCodeLib.push(
  `
  var console = {};
  console.debug = function () { };
  console.info = function () { };
  console.log = function () { };
  console.warn = function () { };
  console.error = function () { };
  `
);

// 代码模板
jsCodeLib.push(
  `
  /**
   * 导出对象
   */
  var exports = {
    /**
     * 初始化函数
     */
    init: function() {},
  };
  // 导入其他依赖
  var require = function() {
    return {};
  };
  /**
   * 当前模块
   */
  var module = {
    /**
     * 导出对象
     */
    exports: exports,
  };
  /**
   * 当前文件名
   */
  var __filename = "";
  /**
   * 当前目录名
   */
  var __dirname = "";
  /**
   * 当前目录名
   */
  var filepath = "";
  /**
   * 当前目录名
   */
  var filepath = "";
  /**
   * 当前模块ID全局唯一
   */
  var id = "";
  /**
   * 当前模块加载完成标识
   */
  var loaded = true;
  `
);

// 代码模板
jsCodeLib.push(
  `

  `
);

export default jsCodeLib.join("\n\n");
