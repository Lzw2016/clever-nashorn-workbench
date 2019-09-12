import 'simplebar/dist/simplebar.css';
import SimpleBar from 'simplebar/dist/simplebar.js';
import VConsole from 'VConsole';
import Browser from "@/utils/browser";
import AppContext from "./context";

// vconsole 初始化
const vConsole = new VConsole({
  defaultPlugins: [],
  disableLogScrolling: false,
  onReady: function () {
    vConsole.show();
    if (Browser.client.name !== "Chrome") {
      new SimpleBar(
        document.querySelector('#vConsoleByDebug .vc-content'),
        {
          autoHide: true,
          scrollbarMinSize: 35,
        }
      );
    }
  }
});
AppContext.vConsole = vConsole;

const testLog = () => {
  // 打印数据
  const fuc = function () { return 1 + 6; };
  const array = [1, 2.2, true, "nashorn", null, new Date(), fuc];
  const object = { string: "aaa", number1: 12, number2: 12.345, boolean: true, null: null, date: new Date(), fuc: fuc };
  // 打印测试
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
  console.log("打印JS变量 | test ", JSON.stringify(1), " | 行尾");
  console.log("打印JS变量 | test ", JSON.stringify(1), " | 行尾");
  console.log("打印JS变量 | test ", JSON.stringify(1), " | 行尾");
  // 不同的类型
  console.debug("[debug] -- 打印JS变量 | test ", JSON.stringify(1), " | 行尾");
  console.info("[info] -- 打印JS变量 | test ", JSON.stringify(1), " | 行尾");
  console.log("[log] -- 打印JS变量 | test ", JSON.stringify(1), " | 行尾");
  console.warn("[warn] -- 打印JS变量 | test ", JSON.stringify(1), " | 行尾");
  console.error("[error] -- 打印JS变量 | test ", JSON.stringify(1), " | 行尾");
};

testLog();

// 清除日志
AppContext.vConsoleTools.clearLog.on("click", () => {
  // vConsole.pluginList.default.console.clear();
  // console.log(vConsole);
  console.clear();
});

export {
  vConsole,
  testLog
};
