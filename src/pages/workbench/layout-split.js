import Split from "split.js";
import lodash from 'lodash';
import AppContext from './context';

// 编辑器自适应大小
const layout = () => {
  if (AppContext.editorInstance) {
    AppContext.editorInstance.layout();
  }
};

// 编辑器自适应大小 - 延时处理
const layoutDebounce = lodash.debounce(() => layout(), 80, { maxWait: 130 });

// 布局处理 - 容器左右
AppContext.leftCenterLayout = Split(['.container-left', '.container-center'], {
  direction: 'horizontal',
  sizes: [5, 95],
  // sizes: ['296px', 'calc(100% - 300px)'],
  // sizes: ['296px'],
  minSize: [280, 800],
  gutterSize: 6,
  cursor: 'ew-resize',
  onDrag: () => layoutDebounce(),
  onDragEnd: () => layout(),
});

// 布局处理 - 编辑器和控制台
AppContext.editorConsoleLayout = Split(['.editor-container', '.console-container'], {
  direction: 'vertical',
  sizes: [57, 43],
  // sizes: ['calc(100% - 360px)', '356px'],
  minSize: [160, 48],
  gutterSize: 5,
  cursor: 'ns-resize',
  onDrag: () => layoutDebounce(),
  onDragEnd: () => layout(),
});

// 隐藏资源管理器
let containerCenterStyleRaw = null;
const horizontalGutterSelector = ".workbench-container .gutter.gutter-horizontal";
const leftSelector = ".container-left";
const centerSelector = ".container-center";
const hiddenWorkbenchLeft = () => {
  containerCenterStyleRaw = $(centerSelector).attr("style");
  const width = $(horizontalGutterSelector).width();
  $(leftSelector).hide();
  $(centerSelector).css({ width: `calc(100% - ${width}px)` });
  AppContext.editorInstance.layout();
  AppContext.showContainerLeft.show();
};
// 显示资源管理器
const showWorkbenchLeft = () => {
  if (containerCenterStyleRaw == null) {
    return;
  }
  $(centerSelector).attr("style", containerCenterStyleRaw);
  containerCenterStyleRaw = null;
  $(leftSelector).show();
  AppContext.editorInstance.layout();
  AppContext.showContainerLeft.hide();
};
// workbench左边标题区按钮 - 隐藏资源管理器
AppContext.workbenchContainerLeft.titleActions.close.on("click", hiddenWorkbenchLeft);
AppContext.showContainerLeft.on("click", showWorkbenchLeft);

// 隐藏控制台
let editorContainerStyleRaw = null;
const verticalGutterSelector = ".container-center .gutter.gutter-vertical";
const consoleSelector = ".console-container";
const editorSelector = ".editor-container";
const hiddenConsoleContainer = () => {
  editorContainerStyleRaw = $(editorSelector).attr("style");
  $(verticalGutterSelector).hide();
  $(consoleSelector).hide();
  $(editorSelector).css({ height: "100%" });
  AppContext.editorInstance.layout();
  AppContext.workbenchHeaderTools.console.attr("title", "显示控制台");
};
// 显示控制台
const showConsoleContainer = () => {
  if (editorContainerStyleRaw == null) {
    return;
  }
  $(editorSelector).attr("style", editorContainerStyleRaw);
  editorContainerStyleRaw = null;
  $(verticalGutterSelector).show();
  $(consoleSelector).show();
  AppContext.editorInstance.layout();
  AppContext.workbenchHeaderTools.console.attr("title", "隐藏控制台");
};
// 显示或者隐藏控制台
const toggleConsoleContainer = () => {
  if (editorContainerStyleRaw == null) {
    hiddenConsoleContainer();
  } else {
    showConsoleContainer();
  }
};
// 控制台顶部工具栏 - 隐藏控制台
AppContext.consoleTopTools.buttons.close.on("click", hiddenConsoleContainer);
// workbench顶部工具栏 - 显示/隐藏控制台
AppContext.workbenchHeaderTools.console.on("click", toggleConsoleContainer);
// 编辑器快捷键
const intervalTmp = window.setInterval(() => {
  if (!AppContext.editorInstance || !AppContext.monaco) {
    return;
  }
  AppContext.editorInstance.addCommand(
    AppContext.monaco.KeyMod.CtrlCmd | AppContext.monaco.KeyCode.KEY_J,
    toggleConsoleContainer,
  );
  window.clearInterval(intervalTmp);
}, 300);

// 展开控制台
let editorContainerStyleRawTmp = null;
let consoleContainerStyleRawTmp = null;
const expandConsoleContainer = () => {
  editorContainerStyleRawTmp = $(editorSelector).attr("style");
  consoleContainerStyleRawTmp = $(consoleSelector).attr("style");
  const height = $(verticalGutterSelector).height();
  $(editorSelector).css({ height: "128px" });
  $(consoleSelector).css({ height: `calc(100% - ${height + 128}px)` });
  AppContext.consoleTopTools.buttons.expandedFolded.removeClass("expanded");
  AppContext.consoleTopTools.buttons.expandedFolded.addClass("folded");
  AppContext.editorInstance.layout();
};
// 收缩控制台
const foldConsoleContainer = () => {
  if (!editorContainerStyleRawTmp || !consoleContainerStyleRawTmp) {
    return;
  }
  $(editorSelector).attr("style", editorContainerStyleRawTmp);
  $(consoleSelector).attr("style", consoleContainerStyleRawTmp);
  AppContext.consoleTopTools.buttons.expandedFolded.removeClass("folded");
  AppContext.consoleTopTools.buttons.expandedFolded.addClass("expanded");
  AppContext.editorInstance.layout();
};
AppContext.consoleTopTools.buttons.expandedFolded.on("click", () => {
  if (AppContext.consoleTopTools.buttons.expandedFolded.hasClass("expanded")) {
    expandConsoleContainer();
  } else {
    foldConsoleContainer();
  }
});
