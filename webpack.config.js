// 对象合并
const { merge } = require("webpack-merge");
//引入模块
const config = require("./config/config");
const serve = require("./config/serve");
const build = require("./config/build");

//导出webpack
module.exports = function ({ development }) {
  return merge(config, development ? serve :  build);
};
