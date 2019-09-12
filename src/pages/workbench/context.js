import $ from 'jquery';

// 整个App的上下文管理
const AppContext = {
  // 当前的工作空间位置
  bizType: "default",
  groupName: "default",
  // vConsole实例
  vConsole: undefined,
  // 工作空间树实例
  workspaceTree: undefined,
  // monaco 全局变量
  monaco: undefined,
  // 编辑器实例
  editorInstance: undefined,

  // 显示资源管理器
  showContainerLeft: $(".show-container-left"),

  // workbench顶部工具栏
  workbenchHeaderTools: {
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
    content: $(".opened-file .panel-content"),
  },

  // workspace面板
  workspacePanel: {
    tools: {
      title: $(".workspace .panel-tools .title"),
      actions: {
        createFile: $(".workspace .panel-tools .actions .create-file"),
        createFolder: $(".workspace .panel-tools .actions .create-folder"),
        refresh: $(".workspace .panel-tools .actions .refresh"),
        collapseAll: $(".workspace .panel-tools .actions .collapse-all"),
      },
    },
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
    panelContent: $(".switch-workspace .panel-content"),
    content: $("#switch-workspace-content"),
  },

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

window.AppContext = AppContext;
export default AppContext;
