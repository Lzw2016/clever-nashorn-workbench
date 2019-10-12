const jsCodeLib = [];

// Java
jsCodeLib.push(
  `
  /**
   * 获取Java对象类型工具类
   */
  var Java = {};
  /**
   * 获取Java对象类型
   * @param {String} fullClassName Java类全路径
   */
  Java.type = function (fullClassName) {
    return {};
  };
  `
);

// console
jsCodeLib.push(
  `
  /**
   * 控制台日志打印工具类
   */
  var console = {};
  /**
   * debug日志
   * @param {Array} logs 输出对象
   */
  console.debug = function (logs) { };
  /**
   * info日志
   * @param {Array} logs 输出对象
   */
  console.info = function (logs) { };
  /**
   * log日志
   * @param {Array} logs 输出对象
   */
  console.log = function (logs) { };
  /**
   * warn日志
   * @param {Array} logs 输出对象
   */
  console.warn = function (logs) { };
  /**
   * error日志
   * @param {Array} logs 输出对象
   */
  console.error = function (logs) { };
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
  /**
   * 获取自定义模块
   * @param {String} jsFileFullPath js文件相对路径
   */
  var require = function(jsFileFullPath) {
    return {};
  };
  /**
   * 获取第三方模块，如：lodash、Underscore
   * @param {String} jsFileFullPath js文件相对路径
   */
  var requireLib = function(jsFileFullPath) {
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
   * 当前文件名
   */
  var filename = "";
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

// 内部工具类 CommonUtils
jsCodeLib.push(
  `
  /**
   * 基本工具类
   */
  var CommonUtils = {};
  /**
   * 休眠一段时间
   * @param {Number} millis 毫秒
   */
  CommonUtils.sleep = function(millis) {};
  /**
   * 获取对象16进制的 hashcode
   * @param {Object} object 对象
   */
  CommonUtils.hexHashCode = function(object) {};
  /**
   * 获取对象的 hashcode
   * @param {Object} object 对象
   */
  CommonUtils.hashCode = function(object) {};
  /**
   * 两个对象 equals
   * @param {Object} a 对象
   * @param {Object} b 对象
   */
  CommonUtils.equals = function(a, b) {};
  /**
   * 把时间格式化成标准的格式(只支持格式 2019-08-26T08:35:24.566Z)
   * @param {String} str 时间字符串
   */
  CommonUtils.formatDate = function(str) {};
  `
);

// 内部工具类 HttpUtils
jsCodeLib.push(
  `
  /**
   * Http工具类
   */
  var HttpUtils = {};
  /**
   * 使用HTTP GET请求获取数据，支持参数，返回字符串
   * @param {String} url 请求url(非空)
   * @param {Map<String, String>} headers 请求头(可选)
   * @param {Map<String, String>} params Url Query Parameter(可选)
   */
  HttpUtils.getStr = function (url, headers, params) { };
  /**
   * 使用HTTP GET请求获取数据，支持参数，返回Map
   * @param {String} url 请求url(非空)
   * @param {Map<String, String>} headers 请求头(可选)
   * @param {Map<String, String>} params Url Query Parameter(可选)
   */
  HttpUtils.getMap = function (url, headers, params) { };
  /**
   * 使用HTTP GET请求获取数据，支持参数，返回 Js Object
   * @param {String} url 请求url(非空)
   * @param {Map<String, String>} headers 请求头(可选)
   * @param {Map<String, String>} params Url Query Parameter(可选)
   */
  HttpUtils.getObject = function (url, headers, params) { };
  /**
   * 使用HTTP POST请求获取数据，支持参数，返回字符串
   * @param {String} url 请求url(非空)
   * @param {Map<String, String>} headers 请求头(可选)
   * @param {Map<String, String>} params Url Query Parameter(可选)
   * @param {String} jsonBody Json Body(非空)
   */
  HttpUtils.postStr = function (url, headers, params, jsonBody) { };
  /**
   * 使用HTTP POST请求获取数据，支持参数，返回Map
   * @param {String} url 请求url(非空)
   * @param {Map<String, String>} headers 请求头(可选)
   * @param {Map<String, String>} params Url Query Parameter(可选)
   * @param {String} jsonBody Json Body(非空)
   */
  HttpUtils.postMap = function (url, headers, params, jsonBody) { };
  /**
   * 使用HTTP POST请求获取数据，支持参数，返回 Js Object
   * @param {String} url 请求url(非空)
   * @param {Map<String, String>} headers 请求头(可选)
   * @param {Map<String, String>} params Url Query Parameter(可选)
   * @param {String} jsonBody Json Body(非空)
   */
  HttpUtils.postObject = function (url, headers, params, jsonBody) { };
  /**
   * 使用HTTP PUT请求获取数据，支持参数，返回字符串
   * @param {String} url 请求url(非空)
   * @param {Map<String, String>} headers 请求头(可选)
   * @param {Map<String, String>} params Url Query Parameter(可选)
   * @param {String} jsonBody Json Body(非空)
   */
  HttpUtils.putStr = function (url, headers, params, jsonBody) { };
  /**
   * 使用HTTP DELETE请求获取数据，支持参数，返回字符串
   * @param {String} url 请求url(非空)
   * @param {Map<String, String>} headers 请求头(可选)
   * @param {Map<String, String>} params Url Query Parameter(可选)
   * @param {String} jsonBody Json Body(非空)
   */
  HttpUtils.deleteStr = function (url, headers, params, jsonBody) { };
  /**
   * 使用HTTP HEAD请求获取数据，支持参数，返回字符串
   * @param {String} url 请求url(非空)
   * @param {Map<String, String>} headers 请求头(可选)
   * @param {Map<String, String>} params Url Query Parameter(可选)
   */
  HttpUtils.headStr = function (url, headers, params) { };
  `
);

// // 内部工具类 JdbcUtils
// jsCodeLib.push(
//   `
//   /**
//    * 获取数据库交互工具(JdbcExecutor)的实例
//    */
//   var JdbcUtils = {};
//   /**
//    * 获取默认的 JdbcExecutor
//    */
//   JdbcUtils.getDefaultJdbcExecutor = function () { };
//   /**
//    * 获取对应数据源的 JdbcExecutor
//    * @param {String} dataSourceName 数据源名称
//    */
//   JdbcUtils.getJdbcExecutor = function (dataSourceName) { };
//   `
// );

// // 内部工具类 JdbcExecutor
// jsCodeLib.push(
//   `
//   /**
//    * sql脚本执行工具
//    */
//   var JdbcExecutor = {};
//   /**
//    * 查询一条数据，返回一个Map
//    * @param {String} sql sql脚本，参数格式[:param]
//    * @param {Map<String, Object>} paramMap 参数(可选)，参数格式[:param]
//    */
//   JdbcExecutor.queryForMap = function (sql, paramMap) { };
//   /**
//    * 查询多条数据，返回一个Map数组
//    * @param {String} sql sql脚本，参数格式[:param]
//    * @param {Map<String, Object>} paramMap 参数(可选)，参数格式[:param]
//    */
//   JdbcExecutor.queryForList = function (sql, paramMap) { };
//   /**
//    * 查询多条数据，返回一个Map数组
//    * @param {String} sql sql脚本，参数格式[:param]
//    * @param {Map<String, Object>} paramMap 参数(可选)，参数格式[:param]
//    * @param {Function} scriptObjectMirror 回调函数
//    */
//   JdbcExecutor.query = function (sql, paramMap, scriptObjectMirror) { };
//   `
// );

// 代码模板
jsCodeLib.push(
  `
  /**
   * 行数据的元数据
   */
  interface MetaData {
    /**
     * 当前行
     */
    rowNum: number;
    /**
     * 当前行数据列数组
     */
    columnNames: Array<string>;
    /**
     * 当前行数据列类型
     */
    getColumnTypes: Array<number>;
    /**
     * 当前行数据列数量
     */
    columnCount: number;
  }

  /**
   * sql脚本执行器
   */
  interface JdbcExecutor {
    /**
     * 查询一条数据，返回一个Map
     * @param sql sql脚本，参数格式[:param]
     * @param paramMap paramMap 参数(可选)，参数格式[:param]
     */
    queryForMap(sql: string, paramMap: Map<string, Object>): Map<string, Object>;

    /**
     * 查询一条数据，返回一个Map
     * @param sql sql脚本，参数格式[:param]
     */
    queryForMap(sql: string): Map<string, Object>;

    /**
     * 查询多条数据，返回一个Map数组
     * @param sql sql脚本，参数格式[:param]
     * @param paramMap paramMap 参数(可选)，参数格式[:param]
     */
    queryForList(sql: string, paramMap?: Map<string, Object>): Array<Map<string, Object>>;

    /**
     * 查询返回一个 string
     * @param sql sql脚本，参数格式[:param]
     * @param paramMap 参数(可选)，参数格式[:param]
     */
    queryForstring(sql: string, paramMap: Map<string, Object>): string;

    /**
     * 查询返回一个 string
     * @param sql sql脚本，参数格式[:param]
     */
    queryForstring(sql: string): string;

    /**
     * 查询多条数据(大量数据)，使用游标读取
     * @param sql sql脚本，参数格式[:param]
     * @param paramMap 参数(可选)，参数格式[:param]
     * @param callback 回调函数
     */
    query(sql: string, paramMap: Map<string, Object>, callback: (rowData: Map<string, Object>, metaData: MetaData) => any): void;
  }

  /**
   * 获取数据库交互工具(JdbcExecutor)的实例
   */
  interface JdbcUtils {
    /**
     * 获取默认的 JdbcExecutor
     */
    getDefaultJdbcExecutor(): JdbcExecutor;

    /**
     * 获取对应数据源的 JdbcExecutor
     * @param dataSourceName 数据源名称
     */
    getJdbcExecutor(dataSourceName: string): JdbcExecutor;
  }

  declare const JdbcUtils: JdbcUtils;
  `
);

// 代码模板
jsCodeLib.push(
  `

  `
);

export default jsCodeLib.join("\n\n");
