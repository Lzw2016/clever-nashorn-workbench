const ignore = require("./git-ignore");
const aliOssConf = {
  region: 'oss-cn-hangzhou',
  accessKeyId: ignore.accessKeyId,
  accessKeySecret: ignore.accessKeySecret,
  bucket: 'clever-nashorn',
  ossUrl: 'https://clever-nashorn.oss-cn-hangzhou.aliyuncs.com',
};

module.exports = {
  ...aliOssConf,
};
