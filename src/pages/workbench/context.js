import lodash from "lodash";
import fileTabArt from "./template/file-tab.art.html";
import openedFileArt from "./template/opened-file.art.html";
import fileFullPathArt from "./template/file-full-path.art.html";

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
    console: $(".workbench-header-tools .console"),
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
// 3.工具栏
//   调试方法下拉框
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
  // 调试方法下拉框
  // 清除已经关闭了的编辑器状态
  lodash.forEach(editorViewStateMap, (_, id) => {
    if (openFileArray.findIndex(file => file.id === id) < 0) {
      editorViewStateMap[id] = undefined;
    }
  });
};

// 文件内容变化
// 1.需要保存UI状态指示
// 2.调试方法下拉框
AppContext.fileContentChange = () => {
  // console.log("fileContentChange");
  const { openFileArray, currentOpenFileId } = AppContext;
  const fileData = openFileArray.find(file => file.id === currentOpenFileId);
  if (!fileData) {
    return;
  }
  const newJsCode = AppContext.editorInstance.getValue();
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

// 显示中间编辑器
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

window.AppContext = AppContext;
export default AppContext;
