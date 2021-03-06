import layer from "layer";
import lodash from "lodash";
import AppContext from "./context";

// 调试代码
const renderDebugButton = (isDebug) => {
  if (isDebug) {
    AppContext.workbenchHeaderTools.debug.removeClass("fa-bug");
    AppContext.workbenchHeaderTools.debug.addClass("fa-stop");
    AppContext.workbenchHeaderTools.debug.attr("title", "停止调试");
  } else {
    AppContext.workbenchHeaderTools.debug.removeClass("fa-stop");
    AppContext.workbenchHeaderTools.debug.addClass("fa-bug");
    AppContext.workbenchHeaderTools.debug.attr("title", "开始调试");
  }
};
let isDebug = false;
let webSocket;
const debug = (fileFullPath, fucName) => {
  isDebug = true;
  renderDebugButton(isDebug);
  const startTime = new Date().getTime();
  const debugFlagText = `[${AppContext.bizType}.${AppContext.groupName}#${fileFullPath}] - [${fucName}]`;
  if (adapterWebsocketUrl) {
    webSocket = new WebSocket(`ws://nashorn.msvc.top:18081/ws/debug`);
  } else {
    webSocket = new WebSocket(`ws://${window.location.host}/ws/debug`);
  }
  webSocket.onopen = function () {
    console.info(`${debugFlagText} 已连接服务器...`);
    webSocket.send(JSON.stringify({ bizType: AppContext.bizType, groupName: AppContext.groupName, type: 'normal', fileFullPath, fucName }));
  };
  webSocket.onclose = function (evt) {
    isDebug = false;
    const endTime = new Date().getTime();
    renderDebugButton(isDebug);
    console.warn(`${debugFlagText} 关闭与服务器的连接！ --> [耗时：${(endTime - startTime) / 1000.0}s]`);
  };
  webSocket.onerror = function (evt) {
    console.error(`${debugFlagText} 连接服务器错误`, evt);
  };
  // 打印调试日志
  webSocket.onmessage = function (evt) {
    const data = JSON.parse(evt.data);
    if (data.type === "log") {
      // 日志前缀 [2019-08-28  11:52:17.208] [INFO] index.js -
      const logs = [
        `[${data.logTime}] `,
        `[${data.level.toUpperCase()}] `,
        data.fileName ? `${data.bizType}.${data.groupName}#${data.filePath}${data.fileName}` : "",
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
// 调试代码
AppContext.workbenchHeaderTools.debug.on("click", () => {
  if (isListenerLogs && !isDebug) {
    layer.msg("当前正在监听脚本运行日志", { time: 1500 });
    return;
  }
  if (isDebug) {
    webSocket.close();
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
  debug(fileData.filePath + fileData.name, fucName);
});

const renderListenerLogsButton = (isListenerLogs) => {
  if (isListenerLogs) {
    AppContext.workbenchHeaderTools.listenerLogs.addClass("stop");
    AppContext.workbenchHeaderTools.listenerLogs.attr("title", "停止监听");
  } else {
    AppContext.workbenchHeaderTools.listenerLogs.removeClass("stop");
    AppContext.workbenchHeaderTools.listenerLogs.attr("title", "监听当前脚本日志");
  }
};
let isListenerLogs = false;
let webSocket2;
const listenerLogs = (fileData) => {
  const fileFullPath = `${fileData.filePath}${fileData.name}`;
  isListenerLogs = true;
  renderListenerLogsButton(isListenerLogs);
  const startTime = new Date().getTime();
  const listenerLogsFlagText = `开始监听文件： [${AppContext.bizType}.${AppContext.groupName}#${fileFullPath}]`;
  if (adapterWebsocketUrl) {
    webSocket2 = new WebSocket(`ws://nashorn.msvc.top:18081/ws/listener_logs`);
  } else {
    webSocket2 = new WebSocket(`ws://${window.location.host}/ws/listener_logs`);
  }
  webSocket2.onopen = function () {
    console.info(`${listenerLogsFlagText} | 已连接服务器...`);
    webSocket2.send(JSON.stringify({ bizType: AppContext.bizType, groupName: AppContext.groupName, type: 'normal', fileFullPath }));
  };
  webSocket2.onclose = function (evt) {
    isListenerLogs = false;
    const endTime = new Date().getTime();
    renderListenerLogsButton(isListenerLogs);
    console.warn(`${listenerLogsFlagText} 关闭与服务器的连接！ --> [耗时：${(endTime - startTime) / 1000.0}s]`);
  };
  webSocket2.onerror = function (evt) {
    console.error(`${listenerLogsFlagText} 连接服务器错误`, evt);
  };
  // 打印调试日志
  webSocket2.onmessage = function (evt) {
    const data = JSON.parse(evt.data);
    if (data.type === "log") {
      // 日志前缀 [2019-08-28  11:52:17.208] [INFO] index.js -
      const logs = [
        `[${data.logTime}] `,
        `[${data.level.toUpperCase()}] `,
        data.fileName ? `${data.bizType}.${data.groupName}#${data.filePath}${data.fileName}` : "",
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
// 监听当前脚本日志
AppContext.workbenchHeaderTools.listenerLogs.on("click", () => {
  if (!isListenerLogs && isDebug) {
    layer.msg("当前正在调试", { time: 1500 });
  }
  if (isListenerLogs) {
    webSocket2.close();
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
  listenerLogs(fileData);
});
