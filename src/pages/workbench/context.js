import layer from "layer";
import lodash from "lodash";
import fileTabArt from "./template/file-tab.art.html";
import openedFileArt from "./template/opened-file.art.html";
import fileFullPathArt from "./template/file-full-path.art.html";
import { update } from "@/api/js-code-file-controller";

// 整个App的上下文管理
const AppContext = {
  // ------------------------------------------------------------------------------------------------------------------------------------------ 全局数据

  // 当前的工作空间位置
  bizType: "default",
  groupName: "default",

  // ------------------------------------------------------------------------------------------------------------------------------------------ 全局状态

  // 布局 - 容器左右
  leftCenterLayout: undefined,
  // 布局 - 编辑器和控制台
  editorConsoleLayout: undefined,
  // vConsole实例
  vConsole: undefined,
  // 工作空间树实例
  workspaceTree: undefined,
  // monaco 全局变量
  monaco: undefined,
  // 编辑器实例
  editorInstance: undefined,
  // 编辑器ViewState状态缓存 id -> ViewState(编辑器状态)
  editorViewStateMap: {},
  // 初始化的编辑器状态
  initEditorViewState: undefined,
  // 已经打开的文件页签对象 jsCodeFile(数据库数据)
  openFileArray: [],
  // 当前打开的文件ID
  currentOpenFileId: undefined,

  // ------------------------------------------------------------------------------------------------------------------------------------------ UI按钮组件

  // 显示资源管理器
  showContainerLeft: $(".show-container-left"),

  // workbench顶部工具栏
  workbenchHeaderTools: {
    openFileFullPath: {
      workspaceTitle: $(".open-file-full-path .workspace-title"),
      fullPathTitle: $(".open-file-full-path .file-full-path-title"),
    },
    debugMethods: $("#debug-method-name"),
    debug: $(".workbench-header-tools .fa-button.fa.debug"),
    runLogs: $(".workbench-header-tools .fa-button.fa.fa-file-text-o"),
    history: $(".workbench-header-tools .fa-button.fa.fa-history"),
    console: $(".workbench-header-tools .console"),
    keyboard: $(".workbench-header-tools .fa-button.fa.fa-keyboard-o"),
  },

  // workbench左边
  workbenchContainerLeft: {
    titleActions: {
      close: $(".workbench-container .container-left .left-title .actions .close"),
    }
  },

  // 已打开的文件
  openedFile: {
    tools: {
      title: $(".opened-file .panel-tools .title"),
      actions: {
        saveAll: $(".opened-file .panel-tools .actions .save-all"),
        closeAll: $(".opened-file .panel-tools .actions .close-all"),
      },
    },
    panelTools: $(".opened-file .panel-tools"),
    content: $(".opened-file .panel-content"),
    openedFileContent: $("#opened-file-content"),
  },

  // workspace面板
  workspacePanel: {
    tools: {
      title: $(".workspace .panel-tools .title"),
      actions: {
        positionFile: $(".workspace .panel-tools .actions .position-file"),
        createFile: $(".workspace .panel-tools .actions .create-file"),
        createFolder: $(".workspace .panel-tools .actions .create-folder"),
        refresh: $(".workspace .panel-tools .actions .refresh"),
        collapseAll: $(".workspace .panel-tools .actions .collapse-all"),
      },
    },
    root: $(".workbench-container .container-left .workspace"),
    panelTools: $(".workspace .panel-tools"),
    content: $(".workspace .workspace-content"),
  },

  // 选择工作空间
  switchWorkspace: {
    tools: {
      title: $(".switch-workspace .panel-tools .title"),
      actions: {
        refresh: $(".switch-workspace .panel-tools .actions .refresh"),
      },
    },
    panelTools: $(".switch-workspace .panel-tools"),
    panelContent: $(".switch-workspace .panel-content"),
    content: $("#switch-workspace-content"),
  },

  // 编辑器容器
  editorContainer: {
    centerPage: $("#container-center-page"),
    editorTools: $(".editor-container .editor-tools"),
    editorInstance: $(".editor-container .editor-instance"),
  },

  // 编辑器工具栏
  editorTools: {
    fileTabs: $(".editor-tools .open-file-tabs"),
    buttons: {
      saveFile: $(".editor-tools .editor-tools-buttons .save-file"),
      lockFile: $(".editor-tools .editor-tools-buttons .lock-file"),
      deleteFile: $(".editor-tools .editor-tools-buttons .delete-file"),
    },
  },

  // 控制台顶部工具栏
  consoleTopTools: {
    tabs: {
      tabTitle: $(".console-top-tools .console-top-tabs .tab-title"),
    },
    buttons: {
      close: $(".console-top-tools .console-top-buttons .console-top-close"),
      expandedFolded: $(".console-top-tools .console-top-buttons .console-top-expanded-folded"),
      logFilter: $(".console-top-tools .console-top-buttons .log-filter"),
    },
  },

  // debug日志工具栏
  vConsoleTools: {
    clearLog: $(".v-console-tools .clear-log"),
    followLog: $(".v-console-tools .follow-log"),
  },
};

// ------------------------------------------------------------------------------------------------------------------------------------------ 根据状态刷新页面
// 已打开的文件刷新
// 1.编辑器
//   保存当前编辑还未保存的文件
//   编辑器内容、状态
// 2.文件指示UI
//   文件树节点定位
//   文件页签定位
//   已打开的文件列表（切换，新增，...）
//   顶部文件路径
AppContext.renderOpenFile = (
  newOpenFileId,
  {
    treePosition = true,       // 文件树节点定位
    fileTabsPosition = true,   // 文件页签定位
    openedFilePosition = true, // 已打开的文件列表定位
  }
) => {
  const { openFileArray, currentOpenFileId, editorInstance, workspaceTree, editorViewStateMap, initEditorViewState } = AppContext;
  // 新打开的与当前打开的文件相同
  if ((!newOpenFileId && !currentOpenFileId) || newOpenFileId === currentOpenFileId) {
    return;
  }
  let fileData;
  // 保存当前编辑还未保存的文件
  if (currentOpenFileId) {
    fileData = openFileArray.find(file => file.id === currentOpenFileId);
    const newJsCode = editorInstance.getValue();
    if (fileData && fileData.jsCode !== newJsCode && !(newJsCode === "" && !fileData.jsCode)) {
      fileData.jsCode = newJsCode;
      fileData.needSave = true;
    }
    // 保存上一次的编辑器状态
    editorViewStateMap[currentOpenFileId] = editorInstance.saveViewState();
  }
  fileData = undefined;
  if (newOpenFileId) {
    // 查找指定打开的文件ID
    fileData = openFileArray.find(file => file.id === newOpenFileId);
  }
  // 未找到 或者 不指定打开的文件ID - 就从 openFileArray 中选择最后一次打开的文件
  if (!fileData) {
    lodash.forEach(openFileArray, file => {
      if (!fileData) {
        fileData = file;
        return;
      }
      if (fileData.lastOpenTime <= file.lastOpenTime) {
        fileData = file;
      }
    });
  }
  if (!fileData) {
    AppContext.showContainerCenter(false);
    // 未找到文件 - 打开默认空白页
    AppContext.currentOpenFileId = undefined;
    editorInstance.setValue("");
    // 适配fileData熟悉
    fileData = { id: undefined, filePath: "", name: "" };
  } else {
    AppContext.showContainerCenter(true);
    // 找到了文件 - 打开文件 - 编辑器内容、状态
    AppContext.currentOpenFileId = fileData.id;
    fileData.lastOpenTime = new Date().getTime();
    // 编辑器内容
    editorInstance.setValue(fileData.jsCode || "");
    // 还原编辑器状态
    const editorViewState = editorViewStateMap[fileData.id] || initEditorViewState;
    if (editorViewState) {
      editorInstance.restoreViewState(editorViewState);
    }
  }
  // 文件树节点定位
  if (treePosition && fileData.id) {
    workspaceTree.activateKey(fileData.id, { noEvents: true, noFocus: true });
  }
  // 文件页签定位
  const dataTmp1 = { openFileArray: openFileArray, currentOpenFileId: fileData.id };
  if (fileTabsPosition) {
    AppContext.editorTools.fileTabs.html(fileTabArt(dataTmp1));
  }
  // 已打开的文件列表
  const dataTmp2 = dataTmp1;
  if (openedFilePosition) {
    AppContext.openedFile.openedFileContent.html(openedFileArt(dataTmp2));
  }
  // 顶部文件路径
  const fullPath = fileData.filePath + fileData.name;
  const paths = fullPath.split("/").filter(path => path && path.length > 0);
  AppContext.workbenchHeaderTools.openFileFullPath.fullPathTitle.html(fileFullPathArt({ paths }));
  // 清除已经关闭了的编辑器状态
  // lodash.forEach(editorViewStateMap, (_, id) => {
  //   if (openFileArray.findIndex(file => file.id === id) < 0) {
  //     editorViewStateMap[id] = undefined;
  //   }
  // });
};

// 文件内容变化
// 1.需要保存UI状态指示
// 2.调试方法下拉框
AppContext.fileContentChange = () => {
  // console.log("fileContentChange");
  const { openFileArray, currentOpenFileId } = AppContext;
  const fileData = openFileArray.find(file => file.id === currentOpenFileId);
  if (!fileData) {
    AppContext.parseDebugMethods();
    return;
  }
  const newJsCode = AppContext.editorInstance.getValue();
  // 调试方法下拉框
  AppContext.parseDebugMethods(newJsCode);
  if (fileData.needSave) {
    fileData.jsCode = newJsCode;
    return;
  }
  if (fileData.jsCode !== newJsCode && !(newJsCode === "" && !fileData.jsCode)) {
    fileData.jsCode = newJsCode;
    fileData.needSave = true;
  }
  // 文件页签定位
  const dataTmp1 = { openFileArray: openFileArray, currentOpenFileId: fileData.id };
  AppContext.editorTools.fileTabs.html(fileTabArt(dataTmp1));
  // 已打开的文件列表
  const dataTmp2 = dataTmp1;
  AppContext.openedFile.openedFileContent.html(openedFileArt(dataTmp2));
};

// 显示(隐藏)中间编辑器
AppContext.showContainerCenter = (editor = true) => {
  const { editorContainer: { centerPage, editorTools, editorInstance } } = AppContext;
  if (editor) {
    if (editorTools.css("display") !== "none") {
      return;
    }
    centerPage.hide();
    editorTools.show();
    editorInstance.show();
    AppContext.editorInstance.layout();
    return;
  }
  if (centerPage.css("display") !== "none") {
    return;
  }
  editorTools.hide();
  editorInstance.hide();
  centerPage.show();
};

// 解析显示新的调试方法名
const refreshDebugMethods = (methods = []) => {
  if (!methods) methods = [];
  const { workbenchHeaderTools: { debugMethods } } = AppContext;
  const html = [];
  html.push('<option value="">请选择方法名</option>');
  const tmpArray = [];
  methods.forEach(method => {
    if (tmpArray.indexOf(method) >= 0) {
      return;
    }
    tmpArray.push(method);
    html.push(`<option value="${method}">${method}</option>`);
  });
  const debugMethod = debugMethods.val();
  debugMethods.html(html.join("\n"));
  if (tmpArray.indexOf(debugMethod) < 0) {
    debugMethods.val("");
  } else {
    debugMethods.val(debugMethod);
  }
};
const esprima = require('esprima');
const estraverse = require('estraverse');
// const espree = require('espree');
const eslintScope = require('eslint-scope');
const isFunctionForIdentifier = (variables = [], name = "") => {
  if (!variables) variables = [];
  const variable = variables.find(item => item && item.name === name);
  if (!variable || !variable.defs || !variable.defs.length || variable.defs.length <= 0) {
    return false;
  }
  const def = variable.defs.find(tmp => tmp && tmp.node && tmp.node.init && tmp.node.init.type === "FunctionExpression");
  if (def) return true;
  let result = false;
  variable.defs.forEach(tmp => {
    if (result) {
      return;
    }
    if (tmp && tmp.node && tmp.node.init && tmp.node.init.type === "Identifier") {
      result = isFunctionForIdentifier(variables, tmp.node.init.name);
    }
  });
  return result;
};
let lastParseScript = "";
AppContext.parseDebugMethods = (jsCode) => {
  if (!jsCode || lodash.trim(jsCode).length <= 0) {
    lastParseScript = "";
    refreshDebugMethods();
    return;
  }
  if (lodash.trim(jsCode || "") === lodash.trim(lastParseScript || "")) {
    return;
  }
  lastParseScript = jsCode;
  let ast;
  try {
    ast = esprima.parseScript(jsCode, {
      jsx: false,
      range: true,       // true
      loc: true,         // true
      tolerant: false,
      tokens: false,
      comment: true,     // true
    });
  } catch (error) {
    refreshDebugMethods();
    return;
  }
  // 获取全局范围的变量
  // const astTmp = espree.parse(jsCode, { sourceType: "module", ecmaVersion: 6 });
  let currentScope;
  try {
    // http://estools.github.io/escope/global.html#analyze
    const scopeManager = eslintScope.analyze(ast, {
      optimistic: false,
      directive: false,
      nodejsScope: false,
      impliedStrict: false,
      // one of ['script', 'module']
      sourceType: 'script',
      ecmaVersion: 5,
      childVisitorKeys: null,
      fallback: 'iteration'
    });
    currentScope = scopeManager.acquire(ast);
  } catch (error) {
    console.warn("脚本语法解析异常", error);
    currentScope = {};
  }
  // 开始解析 Function 名称
  const methods = [];
  estraverse.traverse(ast, {
    enter: function (node) {
      // console.log("node--->", node);
      // exports.test1 = function() {};
      // var test2 = function() {};
      // exports.test2 = test2;
      // function test3() {};
      // exports.test3 = test3;
      if (
        node.type === "AssignmentExpression" &&
        node.operator === "=" &&
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "exports" &&
        node.left.property.type === "Identifier" &&
        ["FunctionExpression", "Identifier"].indexOf(node.right.type) >= 0
      ) {
        if (node.right.type === "Identifier") {
          if (isFunctionForIdentifier(currentScope.variables, node.right.name)) {
            methods.push(node.left.property.name);
          }
          return;
        }
        methods.push(node.left.property.name);
        return;
      }
      // module.exports.test4 = function() {};
      // var test5 = function() {};
      // module.exports.test5 = test5;
      // function test6() {};
      // module.exports.test6 = test6;
      if (
        node.type === "AssignmentExpression" &&
        node.operator === "=" &&
        node.left.type === "MemberExpression" &&
        node.left.object.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        node.left.object.object.type === "Identifier" &&
        node.left.object.object.name === "module" &&
        node.left.object.property.type === "Identifier" &&
        node.left.object.property.name === "exports" &&
        ["FunctionExpression", "Identifier"].indexOf(node.right.type) >= 0
      ) {
        if (node.right.type === "Identifier") {
          if (isFunctionForIdentifier(currentScope.variables, node.right.name)) {
            methods.push(node.left.property.name);
          }
          return;
        }
        methods.push(node.left.property.name);
        return;
      }
      // exports = {
      //   test7: function() {},
      // }
      if (
        node.type === "AssignmentExpression" &&
        node.operator === "=" &&
        node.left.type === "Identifier" &&
        node.left.name === "exports" &&
        ["ObjectExpression"].indexOf(node.right.type) >= 0
      ) {
        methods.length = 0;
        node.right.properties.forEach(property => {
          if (property.type === "Property" && property.key.type === "Identifier" && property.value.type === "FunctionExpression") {
            methods.push(property.key.name);
          }
        });
        return;
      }
      // module.exports = {
      //   test8: function() {},
      // }
      if (
        node.type === "AssignmentExpression" &&
        node.operator === "=" &&
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "module" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "exports" &&
        ["ObjectExpression"].indexOf(node.right.type) >= 0
      ) {
        methods.length = 0;
        node.right.properties.forEach(property => {
          if (property.type === "Property" && property.key.type === "Identifier" && property.value.type === "FunctionExpression") {
            methods.push(property.key.name);
          }
        });
      }
    }
  });
  refreshDebugMethods(methods);
};
AppContext.parseDebugMethods = lodash.debounce(AppContext.parseDebugMethods, 600, { maxWait: 1000 });

// 保存脚本文件
AppContext.saveJsCodeFile = async (id) => {
  const saveId = id || AppContext.currentOpenFileId;
  const fileData = AppContext.openFileArray.find(file => file.id === saveId);
  if (!fileData.needSave) {
    return;
  }
  const closeIndex = layer.load(1);
  const { name, jsCode, filePath, description } = fileData;
  const newFileData = await update(fileData.id, { name, jsCode, filePath, description });
  fileData.needSave = false;
  fileData.id = newFileData.id;
  fileData.bizType = newFileData.bizType;
  fileData.groupName = newFileData.groupName;
  fileData.nodeType = newFileData.nodeType;
  fileData.filePath = newFileData.filePath;
  fileData.name = newFileData.name;
  fileData.jsCode = newFileData.jsCode;
  fileData.description = newFileData.description;
  fileData.createAt = newFileData.createAt;
  fileData.updateAt = newFileData.updateAt;
  // 文件页签定位
  const dataTmp1 = { openFileArray: AppContext.openFileArray, currentOpenFileId: fileData.id };
  AppContext.editorTools.fileTabs.html(fileTabArt(dataTmp1));
  // 已打开的文件列表
  const dataTmp2 = dataTmp1;
  AppContext.openedFile.openedFileContent.html(openedFileArt(dataTmp2));
  // 顶部文件路径
  const fullPath = fileData.filePath + fileData.name;
  const paths = fullPath.split("/").filter(path => path && path.length > 0);
  AppContext.workbenchHeaderTools.openFileFullPath.fullPathTitle.html(fileFullPathArt({ paths }));
  layer.close(closeIndex);
  return fileData;
};

window.AppContext = AppContext;
export default AppContext;
