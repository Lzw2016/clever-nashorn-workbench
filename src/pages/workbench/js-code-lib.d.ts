// ----------------------------------------------------------------------------------------------------------------- 基础类型

interface Map<K, V> {
  [key: K]: V;
}

// ----------------------------------------------------------------------------------------------------------------- Java Nashorn 语法支持

/**
 * 获取Java对象类型工具类
 */
interface Java {
  /**
   * 获取Java对象类型
   * @param fullClassName Java类全路径
   */
  type(fullClassName: string): any;
}

/**
 * 获取Java对象类型工具
 */
declare const Java: Java;

// ----------------------------------------------------------------------------------------------------------------- 控制台日志打印工具类

/**
 * 控制台日志打印工具类
 */
interface Console {
  /**
   * debug日志
   * @param logs 输出对象
   */
  debug(...logs: any): void;

  /**
   * info日志
   * @param logs 输出对象
   */
  info(...logs: any): void;

  /**
   * log日志
   * @param logs 输出对象
   */
  log(...logs: any): void;

  /**
   * warn日志
   * @param logs 输出对象
   */
  warn(...logs: any): void;

  /**
   * error日志
   * @param logs 输出对象
   */
  error(...logs: any): void;
}

/**
 * 控制台日志打印工具
 */
declare const console: Console;

// ----------------------------------------------------------------------------------------------------------------- 代码模板

/**
 * 导出对象类
 */
interface Exports {
  /**
   * 初始化函数
   */
  init(): void;
}

/**
 * 导出对象
 */
declare const exports: Exports;

/**
 * 获取自定义模块
 * @param jsFileFullPath js文件相对路径
 */
declare function require(jsFileFullPath: string): object;

/**
 * 获取第三方模块，如：lodash、Underscore
 * @param jsFileFullPath js文件相对路径
 */
declare function requireLib(jsFileFullPath: string): object;

/**
 * 当前模块
 */
interface Module {
  /**
   * 导出对象
   */
  exports: Exports;
  /**
   * 当前文件名
   */
  __filename: string;
  /**
   * 当前目录名
   */
  __dirname: string;
  /**
   * 当前目录名
   */
  filepath: string;
  /**
   * 当前文件名
   */
  filename: string;
  /**
   * 当前模块ID全局唯一
   */
  id: string;
  /**
   * 当前模块加载完成标识
   */
  loaded: boolean;
}

/**
 * 当前模块
 */
declare const module: Module;

/**
 * 当前文件名
 */
declare const __filename: string;
/**
 * 当前目录名
 */
declare const __dirname: string;
/**
 * 当前目录名
 */
declare const filepath: string;
/**
 * 当前文件名
 */
declare const filename: string;
/**
 * 当前模块ID全局唯一
 */
declare const id: string;
/**
 * 当前模块加载完成标识
 */
declare const loaded: boolean;

// ----------------------------------------------------------------------------------------------------------------- 内部工具类 CommonUtils

/**
 * 基本工具类
 */
interface CommonUtils {
  /**
   * 休眠一段时间
   * @param millis 毫秒
   */
  sleep(millis: number): void;
  /**
   * 获取对象16进制的 hashcode
   * @param object 对象
   */
  hexHashCode(object: any): string;
  /**
   * 获取对象的 hashcode
   * @param object 对象
   */
  hashCode(object: any): number;
  /**
   * 两个Java对象 equals
   * @param a 对象
   * @param b 对象
   */
  equals(a: any, b: any): boolean;
  /**
   * 判断两个对象是不是同一个对象(内存地址相同)
   * @param a 对象
   * @param b 对象
   */
  same(a: any, b: any): boolean;
  /**
   * 把时间格式化成标准的格式(只支持格式 2019-08-26T08:35:24.566Z)
   * @param str 时间字符串
   */
  formatDate(str: string): string;
  /**
   * Java对象转换成JS对象(慎用: 性能较差)
   * @param obj Java对象
   */
  javaToJsObject(obj: any): any;
}
/**
 * 基本工具
 */
declare const CommonUtils: CommonUtils;

// ----------------------------------------------------------------------------------------------------------------- 内部工具类 HttpUtils

/**
 * Http工具类
 */
interface HttpUtils {
  /**
   * 使用HTTP GET请求获取数据，支持参数，返回字符串
   * @param url 请求url(非空)
   * @param headers 请求头(可选)
   * @param params Url Query Parameter(可选)
   */
  getStr(url: string, headers?: Map<string, string>, params?: Map<string, string>): string;
  /**
   * 使用HTTP GET请求获取数据，支持参数，返回Map
   * @param url 请求url(非空)
   * @param headers 请求头(可选)
   * @param params Url Query Parameter(可选)
   */
  getMap(url: string, headers?: Map<string, string>, params?: Map<string, string>): Map<string, any>;
  /**
   * 使用HTTP GET请求获取数据，支持参数，返回 Js Object
   * @param url 请求url(非空)
   * @param headers 请求头(可选)
   * @param params Url Query Parameter(可选)
   */
  getObject(url: string, headers?: Map<string, string>, params?: Map<string, string>): any;
  /**
   * 使用HTTP POST请求获取数据，支持参数，返回字符串
   * @param url 请求url(非空)
   * @param headers 请求头(可选)
   * @param params Url Query Parameter(可选)
   * @param jsonBody Json Body(非空)
   */
  postStr(url: string, headers?: Map<string, string>, params?: Map<string, string>, jsonBody: string): string;
  /**
   * 使用HTTP POST请求获取数据，支持参数，返回Map
   * @param url 请求url(非空)
   * @param headers 请求头(可选)
   * @param params Url Query Parameter(可选)
   * @param jsonBody Json Body(非空)
   */
  postMap(url: string, headers?: Map<string, string>, params?: Map<string, string>, jsonBody: string): Map<string, any>;
  /**
   * 使用HTTP POST请求获取数据，支持参数，返回 Js Object
   * @param url 请求url(非空)
   * @param headers 请求头(可选)
   * @param params Url Query Parameter(可选)
   * @param jsonBody Json Body(非空)
   */
  postObject(url: string, headers?: Map<string, string>, params?: Map<string, string>, jsonBody: string): any;
  /**
   * 使用HTTP PUT请求获取数据，支持参数，返回字符串
   * @param url 请求url(非空)
   * @param headers 请求头
   * @param params Url Query Parameter
   * @param jsonBody Json Body(非空)
   */
  putStr(url: string, headers: Map<string, string>, params: Map<string, string>, jsonBody: string): string;
  /**
   * 使用HTTP DELETE请求获取数据，支持参数，返回字符串
   * @param url 请求url(非空)
   * @param headers 请求头
   * @param params Url Query Parameter
   * @param jsonBody Json Body
   */
  deleteStr(url: string, headers: Map<string, string>, params: Map<string, string>, jsonBody: string): string;
  /**
   * 使用HTTP HEAD请求获取数据，支持参数，返回字符串
   * @param url 请求url(非空)
   * @param headers 请求头
   * @param params Url Query Parameter
   */
  headStr(url: string, headers: Map<string, string>, params: Map<string, string>): string;
}
/**
 * Http工具
 */
declare const HttpUtils: HttpUtils;

// ----------------------------------------------------------------------------------------------------------------- 内部工具类 JdbcUtils JdbcExecutor
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
 * Insert时，数据库自动生成的key
 */
interface KeyHolder {
  /**
   * 所有自动生成的key
   */
  keysList: Array<Map<string, any>>;
  /**
   * 当keysList只有一个元素时，才有这个值，值就是那个元素
   */
  keys?: Map<string, any>;
  /**
   * 当keys只有一个元素时，才有这个值，值就是那个元素的value
   */
  key?: any;
}

/**
 * 数据插入返回值
 */
interface InsertResult {
  /**
   * 当更新数据只有一个自动生成的key时，才会有这个字段，其值就是自动生成的key的值
   */
  keyHolderValue?: any;
  /**
   * Insert时，数据库自动生成的key
   */
  keyHolder: KeyHolder;
  /**
   * 新增数据量
   */
  insertCount: number;
}

/**
 * 分页查询参数
 */
interface PageQueryParam {
  // { orderFields: [], sorts: [], fieldsMapping: { orderField: "sqlField"}, pageSize: 10, pageNo: 1}
  /**
   * 排序字段
   */
  orderFields: Array<string>;
  /**
   * 排序类型 ASC | DESC
   */
  sorts: Array<string>;
  /**
   * 排序字段映射关系 key:orderField --> value:数据库排序sql字段
   */
  fieldsMapping: Map<string, string>;
  /**
   * 每页的数据量(1 <= pageSize <= 100)
   */
  pageSize: number;
  /**
   * 当前页面的页码数(pageNo >= 1)
   */
  pageNo: number;
  /**
   * 其他参数
   */
  [key: string]: any;
}

interface QueryOrders {

}

/**
 * 分页查询返回值
 */
interface IPage<T> {
  /**
   * 是否执行了count查询
   */
  searchCount: boolean;
  /**
   * 当前页的数据量
   */
  size: number;
  /**
   * 当前页码
   */
  current: number;
  /**
   * 总页码
   */
  pages: number;
  /**
   * 总数据量
   */
  total: number;
  /**
   * 使用的排序规则
   */
  orders: Array<QueryOrders>;
  /**
   * 当前页数据
   */
  records: Array<T>;
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
  queryForMap(sql: string, paramMap?: Map<string, any>): Map<string, any>;
  /**
   * 查询多条数据，返回一个Map数组
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap paramMap 参数(可选)，参数格式[:param]
   */
  queryForList(sql: string, paramMap?: Map<string, any>): Array<Map<string, any>>;
  /**
   * 查询返回一个 string
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数(可选)，参数格式[:param]
   */
  queryForstring(sql: string, paramMap?: Map<string, any>): string;
  /**
   * 查询返回一个 Long
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数(可选)，参数格式[:param]
   */
  queryForLong(sql: string, paramMap?: Map<string, any>): number;
  /**
   * 查询返回一个 Double
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数(可选)，参数格式[:param]
   */
  queryForDouble(sql: string, paramMap?: Map<string, any>): number;
  /**
   * 查询返回一个 BigDecimal
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数(可选)，参数格式[:param]
   */
  queryForBigDecimal(sql: string, paramMap?: Map<string, any>): number;
  /**
   * 查询返回一个 Boolean
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数(可选)，参数格式[:param]
   */
  queryForBoolean(sql: string, paramMap?: Map<string, any>): boolean;
  /**
   * 查询返回一个 Date
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数(可选)，参数格式[:param]
   */
  queryForDate(sql: string, paramMap?: Map<string, any>): Date;
  /**
   * 查询多条数据(大量数据)，使用游标读取
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数(可选)，参数格式[:param]
   * @param callback 回调函数
   */
  query(sql: string, paramMap?: Map<string, any>, callback: (rowData: Map<string, any>, metaData: MetaData) => any): void;
  /**
   * 执行更新SQL，返回更新影响数据量
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数(可选)，参数格式[:param]
   */
  update(sql: string, paramMap?: Map<string, any>): number;
  /**
   * 执行insert SQL，返回数据库自增主键值和新增数据量
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数(可选)，参数格式[:param]
   */
  insert(sql: string, paramMap?: Map<string, any>): InsertResult;
  /**
   * 批量执行更新SQL，返回更新影响数据量
   *
   * @param sql sql脚本，参数格式[:param]
   * @param arrayParamMap 参数数组，参数格式[:param]
   */
  batchUpdate(sql: string, arrayParamMap: Array<Map<string, any>>): Array<number>;
  /**
   * 分页查询(支持排序)，返回分页对象
   * @param sql sql脚本，参数格式[:param]
   * @param paramMap 参数，参数格式[:param] | { orderFields: [], sorts: [], fieldsMapping: { orderField: "sqlField"}, pageSize: 10, pageNo: 1}
   * @param countQuery 是否要执行count查询(可选)
   */
  queryByPage(sql: string, paramMap: PageQueryParam, countQuery?: boolean): IPage<Map<string, any>>;
}

/**
 * 获取JdbcExecutor工具类
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

/**
 * 获取数据库交互工具(JdbcExecutor)的实例
 */
declare const JdbcUtils: JdbcUtils;

// ----------------------------------------------------------------------------------------------------------------- 内部工具类 RedisUtils RedisExecutor

/**
 * Redis操作类
 */
interface RedisExecutor {

}

/**
 * 获取RedisExecutor工具类
 */
interface RedisUtils {

}

/**
 * 获取Redis交互工具(RedisExecutor)的实例
 */
declare const RedisUtils: RedisUtils;




