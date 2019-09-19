import layer from "layer";
import lodash from "lodash";
import AppContext from "./context";

// 调试代码
let isDebug = false;
const debug = (fileFullPath, fucName) => {
  isDebug = true;
  const ws = new WebSocket(`ws://${window.location.host}/ws/debug`);
  ws.onopen = function () {
    console.log("已连接服务器...");
    ws.send(JSON.stringify({ type: 'normal', fileFullPath, fucName }));
  };
  ws.onclose = function (evt) {
    isDebug = false;
    console.warn("关闭与服务器的连接！");
  };
  ws.onerror = function (evt) {
    console.error("连接服务器错误", evt);
  };
  // 打印调试日志
  ws.onmessage = function (evt) {
    const data = JSON.parse(evt.data);
    if (data.type === "log") {
      // 日志前缀 [2019-08-28  11:52:17.208] [INFO] index.js -
      const logs = [
        `[${data.logTime}] `,
        `[${data.level.toUpperCase()}] `,
        data.fileName ? (data.filePath + data.fileName) : "",
        " - ",
        ...data.logs,
      ];
      if (data.level === "log") {
        console.log(...logs);
      } else if (data.level === "trace") {
        console.trace(...logs);
      } else if (data.level === "debug") {
        console.debug(...logs);
      } else if (data.level === "info") {
        console.info(...logs);
      } else if (data.level === "warn") {
        console.warn(...logs);
      } else if (data.level === "error") {
        console.error(...logs);
      } else {
        console.log(...logs);
      }
    }
  };
};
AppContext.workbenchHeaderTools.debug.on("click", () => {
  if (isDebug) {
    layer.msg("当前正在调试", { time: 1500 });
    return;
  }
  if (!AppContext.currentOpenFileId) {
    layer.msg("未打开文件，请先打开文件", { time: 1500 });
    return;
  }
  const fileData = AppContext.openFileArray.find(file => file.id === AppContext.currentOpenFileId);
  if (!fileData) {
    layer.msg("请选择文件", { time: 1500 });
    return;
  }
  const fucName = AppContext.workbenchHeaderTools.debugMethods.val();
  if (!fucName || lodash.trim(fucName).length <= 0) {
    layer.msg("请选择需要调试的方法名", { time: 1500 });
    return;
  }
  if (fileData.needSave) {
    layer.confirm(
      `当前文件需要保存！<br />${fileData.name}`,
      { btn: ["保存并调试", '取消'] },
      function (index) {
        layer.close(index);
        AppContext.saveJsCodeFile(fileData.id).then((newFileData) => {
          const tmp = newFileData || fileData;
          debug(tmp.filePath + tmp.name, fucName);
        });
      },
    );
    return;
  }
  // 按钮状态
  debug(fileData.filePath + fileData.name, fucName);
  // 按钮状态
});
