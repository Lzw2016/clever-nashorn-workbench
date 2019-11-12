const ignore = require("./git-ignore");
const aliOssConf = {
  region: 'oss-cn-hangzhou',
  accessKeyId: ignore.accessKeyId,
  accessKeySecret: ignore.accessKeySecret,
  bucket: 'clever-nashorn',
  ossUrl: 'https://clever-nashorn.oss-cn-hangzhou.aliyuncs.com',
  // oss 使用域名绑定之后变成CND
  cdnUrl: 'http://cdn.nashorn.msvc.top',
};

module.exports = {
  ...aliOssConf,
};
