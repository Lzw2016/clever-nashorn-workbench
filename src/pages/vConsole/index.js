// const VConsole = require("VConsole");
import VConsole from "VConsole";
// 初始化
const vConsole = new VConsole({
  defaultPlugins: [],
  disableLogScrolling: false,
  onReady: function () {
    vConsole.show();
  }
});
console.log('Hello world');

// 打印数据
const fuc = function () { return 1 + 6; };
const array = [1, 2.2, true, "nashorn", null, new Date(), fuc];
const object = { string: "aaa", number1: 12, number2: 12.345, boolean: true, null: null, date: new Date(), fuc: fuc };
// // 打印测试
console.log("打印JS变量 | null ", null, " | 行尾");
console.log("打印JS变量 | undefined ", undefined, " | 行尾");
console.log("打印JS变量 | int ", 1, " | 行尾");
console.log("打印JS变量 | float ", 2.2, " | 行尾");
console.log("打印JS变量 | boolean ", true, " | 行尾");
console.log("打印JS变量 | string ", "nashorn", " | 行尾");
console.log("打印JS变量 | date ", new Date(), " | 行尾");
console.log("打印JS变量 | array ", array, " | 行尾");
console.log("打印JS变量 | object ", object, " | 行尾");
console.log("打印JS变量 | function ", fuc, " | 行尾");
console.log("打印JS变量 | JSON.stringify ", JSON.stringify({ date: new Date() }), " | 行尾");

// tmp
console.log("打印JS变量 | error ", new Error("123-error"), " | 行尾");
console.log("打印JS变量 | object ", {}, " | 行尾");
console.log("打印JS变量 | test ", Object.prototype.toString.call(new Date()), " | 行尾");
console.log("打印JS变量 | test ", JSON.stringify(new Date()), " | 行尾");
console.log("打印JS变量 | test ", new Date().toString(), " | 行尾");
console.log("打印JS变量 | test ", Object.prototype.toString.call(new Date()) === '[object Date]', " | 行尾");
console.log("打印JS变量 | test ", JSON.stringify(1), " | 行尾");

setTimeout(function () {
  for (let i = 0; i < 10; i++) {
    object.i = i;
    console.log("打印JS变量 | object ", object, " | 行尾");
  }
  let count = 0;
  setInterval(function () {
    count++;
    console.log("打印JS变量 | ", count, " | 行尾");
  }, 3000);
}, 5000);
