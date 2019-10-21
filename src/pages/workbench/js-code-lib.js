const jsCodeLib = [];

// 代码模板
jsCodeLib.push(
  `
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
    init: () => void;
    /**
     * 自定义导出属性
     */
    [propName: string]: any;
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
    /**
     * 获取当前时间搓(毫秒)
     */
    currentTimeMillis(): number;
    /**
     * 获取当前时间 Date
     */
    nowDate(): Date;
    /**
     * 根据 时间字符串或者时间搓(毫秒) 创建时间
     *
     * @param dateStr 时间字符串或者时间搓(毫秒)
     */
    createDate(dateStr: string | number): Date;
    /**
     * Map key 字符串下划线转驼峰格式
     */
    underlineToCamel(obj: any): any;
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
     * 更新数据库表数据
     * @param tableName         表名称
     * @param fields            更新字段值
     * @param whereMap          更新条件字段
     * @param camelToUnderscore 字段驼峰转下划线(可选)
     */
    updateTable(tableName: string, fields: Map<string, any>, whereMap: Map<string, any>, camelToUnderscore?: boolean): number;
    /**
     * 执行insert SQL，返回数据库自增主键值和新增数据量
     * @param sql sql脚本，参数格式[:param]
     * @param paramMap 参数(可选)，参数格式[:param]
     */
    insert(sql: string, paramMap?: Map<string, any>): InsertResult;
    /**
     * 数据插入到表
     * @param tableName         表名称
     * @param fields            字段名
     * @param camelToUnderscore 字段驼峰转下划线(可选)
     */
    insertTable(tableName: string, fields: Map<string, any>, camelToUnderscore?: boolean): InsertResult;
    /**
     * 数据插入到表
     *
     * @param tableName         表名称
     * @param fieldsArray       字段名集合
     * @param camelToUnderscore 字段驼峰转下划线(可选)
     */
    insertTables(tableName: string, fieldsArray: Array<Map<string, any>>, camelToUnderscore?: boolean): Array<InsertResult>;
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
   * Redis数据类型
   */
  interface RedisDataType {
    /**
     * Redis数据类型 none | string | list | set | zset | hash
     */
    code(): string;
  }

  /**
   * Sorted Set 元素
   */
  interface SortedSetItem {
    /**
     * value 值
     */
    value: any;
    /**
     * 排序分数
     */
    score: number;
  }

  /**
   * Redis操作类
   */
  interface RedisExecutor {
    /**
     * 删除 key
     */
    kDelete(key: string): boolean;
    /**
     * 删除 key
     */
    kDelete(...keys: string): number;
    /**
     * 删除 key
     */
    kDelete(keys: Array<string>): number;
    /**
     * 序列化给定 key ，并返回被序列化的值 byte[]
     */
    kDump(): Array<number>;
    /**
     * 检查给定 key 是否存在
     * @param key key
     */
    kHasKey(key: string): boolean;
    /**
     * 为给定 key 设置过期时间，以毫秒计
     * @param key     key
     * @param timeout timeout以毫秒计
     */
    kExpire(key: string, timeout: number): boolean;
    /**
     * 为给定 key 设置过期时间
     * @param key  key
     * @param date 过期时间
     */
    kExpireAt(key: string, date: Date | string): boolean;
    /**
     * 查找所有符合给定模式( pattern)的 key
     * @param pattern 模式( pattern)
     */
    keys(pattern: string): Array<string>;
    /**
     * 将当前数据库的 key 移动到给定的数据库 db 当中
     * @param key     key
     * @param dbIndex dbIndex
     */
    kMove(key: string, dbIndex: number): boolean;
    /**
     * 移除 key 的过期时间，key 将持久保持
     * @param key key
     */
    kPersist(key: string): boolean;
    /**
     * 以毫秒为单位返回 key 的剩余的过期时间
     * @param key key
     */
    kGetExpire(key: string): number;
    /**
     * 从当前数据库中随机返回一个 key
     */
    kRandomKey(): string;
    /**
     * 修改 key 的名称
     * @param oldKey oldKey
     * @param newKey newKey
     */
    kRename(oldKey: string, newKey: string): void;
    /**
     * 仅当 newkey 不存在时，将 key 改名为 newkey
     * @param oldKey oldKey
     * @param newKey newKey
     */
    kRenameIfAbsent(oldKey: string, newKey: string): boolean;
    /**
     * 返回 key 所储存的值的类型
     * @param key key
     */
    kType(key: string): RedisDataType;
    /**
     * 设置指定 key 的值
     * @param key   key
     * @param value value
     */
    vSet(key: string, value: any): void;
    /**
     * 只有在 key 不存在时设置 key 的值
     * @param key   key
     * @param value value
     * @param timeout 过期时间毫秒
     */
    vSetIfAbsent(key: string, value: any, timeout?: number): boolean;
    /**
     * 返回 key 中字符串值的子字符
     * @param key   key
     * @param start start
     * @param end   end
     */
    vGet(key: string, start: number, end: number): string;
    /**
     * 获取Value的值
     * @param key   key
     */
    vGet(key: string): any;
    /**
     * 将给定 key 的值设为 value ，并返回 key 的旧值(old value)
     * @param key   key
     * @param value value
     */
    vGetAndSet(key: string, value: any): any;
    /**
     * 对 key 所储存的字符串值，获取指定偏移量上的位(bit)
     * @param key    key
     * @param offset 偏移量
     */
    vGetBit(key: string, offset: number): boolean;
    /**
     * 获取所有(一个或多个)给定 key 的值
     * @param keys keys
     */
    vMultiGet(keys: Array<string>): Array<any>;
    /**
     * 获取所有(一个或多个)给定 key 的值
     * @param keys keys
     */
    vMultiGet(...keys: string): Array<any>;
    /**
     * 对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)
     *
     * @param key    key
     * @param offset 偏移量
     * @param value  值
     */
    vSetBit(key: string, offset: number, value: boolean): boolean;
    /**
     * 用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始
     * @param key    key
     * @param value  value
     * @param offset 偏移量
     */
    vSetRange(key: string, value: any, offset: number): void;
    /**
     * 返回 key 所储存的字符串值的长度
     * @param key key
     */
    vSize(key: string): number;
    /**
     * 同时设置一个或多个 key-value 对
     * @param map 多个 key-value 对
     */
    vMultiSet(map: Map<string, any>): void;
    /**
     * 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在
     * @param map 多个 key-value 对
     */
    vMultiSetIfAbsent(map: Map<string, any>): void;
    /**
     * 将 key 所储存的值加上给定的增量值（increment）
     * @param key key
     * @param delta 增量值(可选，默认1)
     */
    vIncrement(key: string, delta?: number): number;
    /**
     * key 所储存的值减去给定的减量值（decrement）
     * @param key   key
     * @param delta 减量值(可选，默认1)
     */
    vDecrement(key: string, delta?: number): number;
    /**
     * 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾
     * @param key   key
     * @param value value
     */
    vAppend(key: string, value: any): number;
    /**
     * 删除一个或多个哈希表字段
     * @param key      key
     * @param hashKeys hashKeys
     */
    hDelete(key: string, ...hashKeys: any): number;
    /**
     * 删除一个或多个哈希表字段
     * @param key      key
     * @param hashKeys hashKeys
     */
    hDelete(key: string, hashKeys: Array<any>): number;
    /**
     * 查看哈希表 key 中，指定的字段是否存在
     * @param key     key
     * @param hashKey hashKey
     */
    hHasKey(key: string, hashKey: any): boolean;
    /**
     * 获取存储在哈希表中指定字段的值
     * @param key     key
     * @param hashKey hashKey
     */
    hGet(key: string, hashKey: any): any;
    /**
     * 获取所有给定字段的值
     * @param key      key
     * @param hashKeys hashKeys
     */
    hMultiGet(key: string, ...hashKey: any): Array<any>;
    /**
     * 获取所有给定字段的值
     * @param key      key
     * @param hashKeys hashKeys
     */
    hMultiGet(key: string, hashKey: Array<any>): Array<any>;
    /**
     * 为哈希表 key 中的指定字段的整数值加上增量 increment
     * @param key     key
     * @param hashKey hashKey
     * @param delta   增量
     */
    hIncrement(key: string, hashKey: any, delta: number): number;
    /**
     * 获取所有哈希表中的字段
     * @param key key
     */
    hKeys(key: string): Array<any>;
    /**
     * 返回与hashKey关联的值的长度。如果键或hashKey不存在，则返回0
     * @param key     key
     * @param hashKey hashKey
     */
    hLengthOfValue(key: string, hashKey: any): number;
    /**
     * 获取哈希表中字段的数量
     * @param key key
     */
    hSize(key: string): number;
    /**
     * 同时将多个 field-value (域-值)对设置到哈希表 key 中
     * @param key key
     * @param m   field-value
     */
    hPutAll(key: string, m: Map<any, any>): void;
    /**
     * 将哈希表 key 中的字段 field 的值设为 value
     * @param key     key
     * @param hashKey field
     * @param value   value
     */
    hPut(key: string, hashKey: any, value: any): void;
    /**
     * 只有在字段 field 不存在时，设置哈希表字段的值
     * @param key     key
     * @param hashKey field
     * @param value   字段的值
     */
    hPutIfAbsent(key: string, hashKey: any, value: any): boolean;
    /**
     * 获取哈希表中所有值
     * @param key key
     */
    hValues(key: string): Array<any>;
    /**
     * 将整个散列存储在键上
     * @param key key
     */
    hEntries(key: string): Map<any, any>;
    /**
     * 迭代哈希表中的键值对
     * @param key                key
     * @param count              数量
     * @param pattern            字段匹配字符串
     * @param scriptObjectMirror 回调函数
     */
    hScan(key: string, count: number, pattern: string, callback: (key: any, value: any) => boolean | void): void;
    /**
     * 获取列表指定范围内的元素
     * @param key   key
     * @param start start
     * @param end   end
     */
    lRange(key: string, start: number, end: number): Array<any>;
    /**
     * 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除
     * @param key   key
     * @param start start
     * @param end   end
     */
    lTrim(key: string, start: number, end: string): void;
    /**
     * 获取列表长度
     * @param key key
     */
    lSize(key: string): number;
    /**
     * 将一个或多个值插入到列表头部
     *
     * @param key   key
     * @param value value
     */
    lLeftPush(key: string, value: any): number;
    /**
     * 将一个或多个值插入到列表头部
     * @param key    key
     * @param values values
     */
    lLeftPushAll(key: string, ...values: any): number;
    /**
     * 将一个或多个值插入到列表头部
     * @param key    key
     * @param values values
     */
    lLeftPushAll(key: string, values: Array<any>): number;
    /**
     * 将一个值插入到已存在的列表头部
     *
     * @param key   key
     * @param value value
     */
    lLeftPushIfPresent(key: string, value: any): number;
    /**
     * 将值前置到键值之前
     * @param key   key
     * @param pivot pivot
     * @param value value
     */
    lLeftPush(key: string, pivot: any, value: any): number;
    /**
     * 在列表中添加一个或多个值
     * @param key   key
     * @param value value
     */
    lRightPush(key: string, value: any): number;
    /**
     * 在列表中添加一个或多个值
     * @param key    key
     * @param values values
     */
    lRightPushAll(key: string, ...values: any): number;
    /**
     * 在列表中添加一个或多个值
     * @param key    key
     * @param values values
     */
    lRightPushAll(key: string, values: Array<any>): number;
    /**
     * 仅当列表存在时才向键追加值
     *
     * @param key   key
     * @param value value
     */
    lRightPushIfPresent(key: string, value: any): number;
    /**
     * 在键值之前追加值
     * @param key   key
     * @param pivot pivot
     * @param value value
     */
    lRightPush(key: string, pivot: any, value: any): number;
    /**
     * 通过索引设置列表元素的值
     * @param key   key
     * @param index 索引
     * @param value value
     */
    lSet(key: string, index: number, value: any): void;
    /**
     * 移除列表元素，从存储在键上的列表中删除第一次出现的值计数
     * @param key   key
     * @param count count
     * @param value value
     */
    lRemove(key: string, count: number, value: any): number;
    /**
     * 通过索引获取列表中的元素
     * @param key   key
     * @param index 索引
     */
    lIndex(key: string, index: number): any;
    /**
     * 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     * @param key     key
     * @param timeout timeout 毫秒(可选)
     */
    lLeftPop(key: string, timeout?: number): any;
    /**
     * 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     *
     * @param key     key
     * @param timeout timeout 毫秒(可选)
     */
    lRightPop(key: string, timeout?: number): any;
    /**
     * 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
     *
     * @param sourceKey      sourceKey
     * @param destinationKey destinationKey
     * @param timeout        timeout 毫秒(可选)
     */
    lRightPopAndLeftPush(sourceKey: string, destinationKey: string, timeout?: number): any;
    /**
     * 向集合添加一个或多个成员
     * @param key    key
     * @param values values
     */
    sAdd(key: string, ...values: any): number;
    /**
     * 向集合添加一个或多个成员
     * @param key    key
     * @param values values
     */
    sAdd(key: string, values: Array<any>): number;
    /**
     * 移除集合中一个或多个成员
     * @param key    key
     * @param values values
     */
    sRemove(key: string, ...values: any): number;
    /**
     * 移除集合中一个或多个成员
     * @param key    key
     * @param values values
     */
    sRemove(key: string, values: Array<any>): number;
    /**
     * 移除并返回集合中的count个随机元素
     * @param key   key
     * @param count count (可选,默认1)
   */
    sPop(key: string, count?: number): any | Array<any>;
    /**
     * 将 value 元素从 key 集合移动到 destKey 集合
     * @param key     key
     * @param value   value
     * @param destKey destKey
     */
    sMove(key: string, value: any, destKey: string): boolean;
    /**
     * 获取集合的成员数
     * @param key key
     */
    sSize(key: string): number;
    /**
     * 判断 member 元素是否是集合 key 的成员
     * @param key    key
     * @param member member 元素
     */
    sIsMember(key: string, member: any): boolean;
    /**
     * 返回给定所有集合的交集
     * @param key       key
     * @param otherKeys otherKeys
     */
    sIntersect(key: string, ...otherKeys: string): Array<any>;
    /**
     * 返回给定所有集合的交集
     * @param key       key
     * @param otherKeys otherKeys
     */
    sIntersect(key: string, otherKeys: Array<string>): Array<any>;
    /**
     * 返回给定所有集合的交集并存储在 destination 中
     *
     * @param key       key
     * @param otherKeys otherKeys
     * @param destKey   destKey
     */
    sIntersectAndStore(key: string, otherKeys: Array<string>, destKey: string): number;
    /**
     * 返回给定所有集合的交集并存储在 destination 中
     * @param key       key
     * @param otherKey otherKey
     * @param destKey   destKey
     */
    sIntersectAndStore(key: string, otherKey: string, destKey: string): number;
    /**
     * 返回所有给定集合的并集
     * @param key       key
     * @param otherKeys otherKeys
     */
    sUnion(key: string, otherKeys: Array<string>): Array<any>;
    /**
     * 所有给定集合的并集存储在 destKey 集合中
     * @param key      key
     * @param otherKey otherKey
     * @param destKey  destKey
     */
    sUnionAndStore(key: string, otherKey: string, destKey: string): number;
    /**
     * 所有给定集合的并集存储在 destKey 集合中
     * @param key      key
     * @param otherKeys otherKeys
     * @param destKey  destKey
     */
    sUnionAndStore(key: string, otherKeys: Array<string>, destKey: string): number;
    /**
     * 返回给定所有集合的差集
     * @param key      key
     * @param otherKey otherKey
     */
    sDifference(key: string, otherKeys: Array<string>): Array<any>;
    /**
     * 返回给定所有集合的差集
     * @param key      key
     * @param otherKey otherKey
     */
    sDifference(key: string, ...otherKeys: string): Array<any>;
    /**
     * 返回给定所有集合的差集并存储在 destKey 中
     * @param key       key
     * @param otherKeys otherKeys
     * @param destKey   destKey
     */
    sDifferenceAndStore(key: string, otherKeys: Array<string>, destKey: string): number;
    /**
     * 返回给定所有集合的差集并存储在 destKey 中
     * @param key       key
     * @param otherKey otherKey
     * @param destKey   destKey
     */
    sDifferenceAndStore(key: string, otherKey: string, destKey: string): number;
    /**
     * 返回集合中的所有成员
     * @param key key
     */
    sMembers(key: string): Array<any>
    /**
     * 返回集合中一个或多个随机数
     * @param key key
     */
    sRandomMember(key: string): any;
    /**
     * 从集合中获取不同的随机元素
     * @param key   key
     * @param count 数量
     */
    sDistinctRandomMembers(key: string, count: number): Array<any>;
    /**
     * 返回集合中一个或多个随机数
     * @param key   key
     * @param count 数量
     */
    sRandomMembers(key: string, count: number): Array<any>;
    /**
     * 迭代集合中的元素
     * @param key                key
     * @param count              count
     * @param pattern            pattern
     * @param scriptObjectMirror 回调函数
     */
    sScan(key: string, count: number, pattern: string, callback: (value: any) => boolean | void): void;
    /**
     * 向有序集合添加一个或多个成员，或者更新已存在成员的分数
     * @param key   key
     * @param value value
     * @param score score
     */
    zsAdd(key: string, value: any, score: number): boolean;
    /**
     * 向有序集合添加一个或多个成员，或者更新已存在成员的分数
     * @param key    key
     * @param values values
     */
    zsAdd(key: string, values: Array<SortedSetItem>): number;
    /**
     * 移除有序集合中的一个或多个成员
     * @param key    key
     * @param values values
     */
    zsRemove(key: string, ...values: any): number;
    /**
     * 移除有序集合中的一个或多个成员
     * @param key    key
     * @param values values
     */
    zsRemove(key: string, values: Array<any>): number;
    /**
     * 有序集合中对指定成员的分数加上增量 increment
     * @param key   key
     * @param value value
     * @param delta increment
     */
    zsIncrementScore(key: string, values: any, delta: number): number;
    /**
     * 返回有序集合中指定成员的索引
     * @param key key
     * @param o   o
     */
    zsRank(key: string, o: any): number;
    /**
     * 确定元素的索引值在排序集时得分从高到低
     * @param key key
     * @param o   o
     */
    zsReverseRank(key: string, o: any): number;
    /**
     * 从已排序集获取开始和结束之间的元素
     * @param key   key
     * @param start start
     * @param end   end
     */
    zsRange(key: string, start: number, end: number): Array<any>;
    /**
     * 从已排序集获取开始和结束之间的元素
     * @param key   key
     * @param start start
     * @param end   end
     */
    zsRangeWithScores(key: string, start: number, end: number): Array<SortedSetItem>
    /**
     * 从排序后的集合中获取得分介于最小值和最大值之间的元素
     * @param key key
     * @param min min
     * @param max max
     */
    zsRangeByScore(key: string, min: number, max: number): Array<any>;
    /**
     * 从排序后的集合中获取得分介于最小值和最大值之间的元素
     * @param key key
     * @param min min
     * @param max max
     */
    zsRangeByScoreWithScores(key: string, min: number, max: number): Array<SortedSetItem>;
    /**
     * 获取从开始到结束的范围内的元素，其中得分在排序集的最小值和最大值之间
     * @param key    key
     * @param min    min
     * @param max    max
     * @param offset offset
     * @param count  count
     */
    zsRangeByScore(key: string, min: number, max: number, offset: number, count: number): Array<any>;
    /**
     * 获取从开始到结束的范围内的元素，其中得分在排序集的最小值和最大值之间
     * @param key    key
     * @param min    min
     * @param max    max
     * @param offset offset
     * @param count  count
     */
    zsRangeByScoreWithScores(key: string, min: number, max: number, offset: number, count: number): Array<SortedSetItem>;
    /**
     * 获取范围从开始到结束的元素，从高到低排序的集合
     * @param key   key
     * @param start start
     * @param end   end
     */
    zsReverseRange(key: string, start: number, end: number): Array<any>;
    /**
     * 获取范围从开始到结束的元素，从高到低排序的集合
     * @param key   key
     * @param start start
     * @param end   end
     */
    zsReverseRangeWithScores(key: string, start: number, end: number): Array<SortedSetItem>;
    /**
     * 获取得分介于最小值和最大值之间的元素，从高到低排序
     * @param key key
     * @param min min
     * @param max max
     */
    zsReverseRangeByScore(key: string, min: number, max: number): Array<any>;
    /**
     * 获取得分介于最小值和最大值之间的元素，从高到低排序
     * @param key key
     * @param min min
     * @param max max
     */
    zsReverseRangeByScore(key: string, min: number, max: number): Array<SortedSetItem>;
    /**
     * 获取从开始到结束的范围内的元素，其中得分在最小和最大之间，排序集高 -> 低
     * @param key    key
     * @param min    min
     * @param max    max
     * @param offset offset
     * @param count  count
     */
    zsReverseRangeByScore(key: string, min: number, max: number, offset: number, count: number): Array<any>;
    /**
     * 获取从开始到结束的范围内的元素，其中得分在最小和最大之间，排序集高 -> 低
     * @param key    key
     * @param min    min
     * @param max    max
     * @param offset offset
     * @param count  count
     */
    zsReverseRangeByScoreWithScores(key: string, min: number, max: number, offset: number, count: number): Array<SortedSetItem>;
    /**
     * 用最小值和最大值之间的值计算排序集中的元素数
     * @param key key
     * @param min min
     * @param max max
     */
    zsCount(key: string, min: number, max: number): number;
    /**
     * 返回按给定键存储的已排序集的元素数
     * @param key key
     */
    zsSize(key: string): number;
    /**
     * 获取有序集合的成员数
     * @param key key
     */
    zsZCard(key: string): number;
    /**
     * 返回有序集中，成员的分数值
     * @param key key
     * @param o   o
     */
    zsScore(key: string, o: any): number;
    /**
     * 从按键排序的集合中删除开始和结束之间范围内的元素
     * @param key   key
     * @param start start
     * @param end   end
     */
    zsRemoveRange(key: string, start: number, end: number): number;
    /**
     * 从按键排序的集合中删除得分在min和max之间的元素
     * @param key key
     * @param min min
     * @param max max
     */
    zsRemoveRangeByScore(key: string, min: number, max: number): number;
    /**
     * 计算给定的一个或多个有序集的并集，并存储在新的 destKey 中
     * @param key      key
     * @param otherKey otherKey
     * @param destKey  destKey
     */
    zsUnionAndStore(key: string, otherKey: string, destKey: string): number;
    /**
     * 计算给定的一个或多个有序集的并集，并存储在新的 destKey 中
     * @param key       key
     * @param otherKeys otherKeys
     * @param destKey   destKey
     */
    zsUnionAndStore(key: string, otherKeys: Array<string>, destKey: string): number;
    /**
     * 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
     * @param key      key
     * @param otherKey otherKey
     * @param destKey  destKey
     */
    zsIntersectAndStore(key: string, otherKey: string, destKey: string): number;
    /**
     * 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
     * @param key       key
     * @param otherKeys otherKeys
     * @param destKey   destKey
     */
    zsIntersectAndStore(key: string, otherKeys: Array<string>, destKey: string): number;
    /**
     * 迭代有序集合中的元素（包括元素成员和元素分值）
     * @param key key
     * @param count count
     * @param pattern pattern
     * @param callback 回调函数
     */
    zsScan(key: string, count: number, pattern: string, callback: (value: any, score: number) => boolean | void): void;
    /**
     * 通过字典区间返回有序集合的成员
     * @param key       key
     * @param minValue  minValue
     * @param equalsMin equalsMin
     * @param maxValue  maxValue
     * @param equalsMax equalsMax
     */
    zsRangeByLex(key: string, minValue: any, equalsMin: boolean, maxValue: any, equalsMax: boolean): Array<any>;
    /**
     * 通过字典区间返回有序集合的成员
     * @param key       key
     * @param minValue  minValue
     * @param equalsMin equalsMin
     * @param maxValue  maxValue
     * @param equalsMax equalsMax
     * @param count     count
     * @param offset    offset
     */
    zsRangeByLex(key: string, minValue: any, equalsMin: boolean, maxValue: any, equalsMax: boolean, count: number, offset: number): Array<any>;
    /**
     * 添加指定元素到 HyperLogLog 中
     * @param key    key
     * @param values values
     */
    hyperLogLogAdd(key: string, ...values: any): number;
    /**
     * 获取键中元素的当前数目
     * @param keys keys
     */
    hyperLogLogSize(...keys: string): number;
    /**
     * 将多个 HyperLogLog 合并为一个 HyperLogLog
     * @param destination destination
     * @param sourceKeys  sourceKeys
     */
    hyperLogLogUnion(destination: string, ...sourceKeys: string): number;
    /**
     * 删除给定的密钥
     *
     * @param key key
     */
    hyperLogLogDelete(key: string): void
  }

  /**
   * 获取RedisExecutor工具类
   */
  interface RedisUtils {
    /**
     * 获取默认的 RedisExecutor
     */
    getDefaultRedisExecutor(): RedisExecutor;
    /**
     * 获取对应数据源的 RedisExecutor
     * @param redisName Redis数据源名称
     */
    getJdbcExecutor(redisName: string): RedisExecutor;
  }

  /**
   * 获取Redis交互工具(RedisExecutor)的实例
   */
  declare const RedisUtils: RedisUtils;

  `
);

export default jsCodeLib.join("\n\n");
