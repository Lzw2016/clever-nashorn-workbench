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







