import lodash from "lodash";
// import "jquery.fancytree/dist/skin-win8-n/ui.fancytree.less";
import "./resource-manager.less";
import "./resource-manager.scss";
import { createTree } from "jquery.fancytree";
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import 'simplebar/dist/simplebar.css';
import SimpleBar from 'simplebar/dist/simplebar.js';
import AppContext from "./context";
// import Browser from "@/utils/browser";
import { tree, jsCodeFile } from "@/api/js-code-file-controller";
import fileTabArt from "./template/file-tab.art.html";

// 转换树节点
const transformTreeNode = (nodeArray = []) => {
  if (!nodeArray || nodeArray.length <= 0) {
    return;
  }
  nodeArray.forEach(node => {
    // bizType: "default"
    // build: true
    // children
    // createAt: "2019-08-28 01:46:19"
    // description: ""
    // filePath: "/"
    // fullPath: "/public"
    // groupName: "default"
    // id: "/public/"
    // jsCode: null
    // name: "public"
    // nodeType: 2 数据类型：1-文件，2-文件夹
    // parentId: "/"
    // root: null
    // updateAt: null
    const { children, fullPath, name, nodeType } = node;
    // https://wwwendt.de/tech/fancytree/doc/jsdoc/global.html#NodeData
    node.folder = nodeType === 2;
    node.title = name;
    node.iconTooltip = fullPath;
    if (children && children.length > 0) {
      transformTreeNode(children);
    }
  });
};

// 工作空间树全局配置
const treeConfig = {
  extensions: ['edit', 'filter'],
  treeId: "id",
  activeVisible: true, // 确保活动节点是可见的(展开)
  aria: true, // 启用WAI-ARIA支持
  autoActivate: true, // 当节点使用键盘聚焦时自动激活该节点
  autoCollapse: false, // 在展开节点时自动折叠所有兄弟节点
  autoScroll: false, // 自动将节点滚动到可见区域
  clickFolderMode: 4, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expand)
  checkbox: false, // Show复选框
  checkboxAutoHide: undefined, // 只在悬停时显示复选框
  debugLevel: 0, // 0:安静，1:错误，2:警告，3:信息，4:调试
  disabled: false, // 禁用控件
  focusOnSelect: true, // 当鼠标单击选中节点时设置焦点
  escapeTitles: false, // Escape node.title 显示内容
  generateIds: true, // 生成id属性，如 <span id='fancytree-id-KEY'>
  idPrefix: "fancytree_ft_", // 用于生成节点id like <span id='fancytree-id-<key>'>
  icon: true, // 显示节点图标
  keyboard: true, // 支持键盘导航
  keyPathSeparator: "/", // 由node.getKeyPath()和tree.loadKeyPath()使用
  minExpandLevel: 1, // 1: 根节点不可折叠
  quicksearch: false, // 通过键入第一个字母导航到下一个节点
  rtl: false, // 启用rtl(从右到左)模式
  selectMode: 1, // 1:single, 2:multi, 3:multi-hier
  tabindex: "0", // 整棵树表现为一个单独的控件
  titlesTabbable: false, // 节点标题可以接收键盘焦点
  // 使用title作为工具提示(也可以指定回调)
  tooltip: (_, data) => data.node.data.fullPath,
  // 节点数据转换
  postProcess: function (event, data) {
    // console.log("event", event);
    // console.log("data", data);
    transformTreeNode(data.response);
  },
  // 双击节点
  dblclick: function (event, data) {
    if (data.node.folder) return;
    // console.log("dblclick-data", data.node);
    openFileTab(data.node.data);
  },
  // 选中节点
  click: function (event, data) {
    if (data.node.folder) return;
    // console.log("click-data", data.node);
    openFileTab(data.node.data);
  },
  edit: {
    // triggerStart: ["dblclick"], // clickActive
    beforeEdit: function (event, data) {
      // Return false to prevent edit mode
    },
    edit: function (event, data) {
      // Editor was opened (available as data.input)
    },
    // beforeClose: function (event, data) {
    //   // Return false to prevent cancel/save (data.input is available)
    //   console.log(event.type, event, data);
    //   if (data.originalEvent.type === "mousedown") {
    //     // We could prevent the mouse click from generating a blur event
    //     // (which would then again close the editor) and return `false` to keep
    //     // the editor open:
    //     //                  data.originalEvent.preventDefault();
    //     //                  return false;
    //     // Or go on with closing the editor, but discard any changes:
    //     //                  data.save = false;
    //   }
    // },
    // save: function (event, data) {
    //   // Save data.input.val() or return false to keep editor open
    //   console.log("save...", this, data);
    //   // Simulate to start a slow ajax request...
    //   setTimeout(function () {
    //     $(data.node.span).removeClass("pending");
    //     // Let's pretend the server returned a slightly modified
    //     // title:
    //     data.node.setTitle(data.node.title + "!");
    //   }, 2000);
    //   // We return true, so ext-edit will set the current user input
    //   // as title
    //   return true;
    // },
    // close: function (event, data) {
    //   // Editor was removed
    //   if (data.save) {
    //     // Since we started an async request, mark the node as preliminary
    //     $(data.node.span).addClass("pending");
    //   }
    // }
  },
};

// 初始化工作空间树
const initWorkspaceTree = async () => {
  const data = await tree(AppContext.bizType, AppContext.groupName);
  const workspaceTree = createTree('#workspace-file-tree', {
    ...treeConfig,
    source: data,
  });
  new SimpleBar(
    document.querySelector('.workspace .workspace-content'),
    {
      autoHide: true,
      scrollbarMinSize: 35,
    }
  );
  AppContext.workspaceTree = workspaceTree;
};
$(document).ready(() => {
  initWorkspaceTree();
  AppContext.workspacePanel.tools.title.html(`${AppContext.bizType}-${AppContext.groupName}`);
});

// 重新加载工作空间树
const reloadWorkspaceTree = async () => {
  if (!AppContext.workspaceTree) {
    return;
  }
  // const oldData = AppContext.workspaceTree.toDict(false);
  AppContext.workspacePanel.tools.title.html(`${AppContext.bizType}-${AppContext.groupName}`);
  const data = await tree(AppContext.bizType, AppContext.groupName);
  AppContext.workspaceTree.reload(data).done(() => {
    // 重新加载完成
    console.log("reloaded");
  });
};
AppContext.workspacePanel.tools.actions.refresh.on("click", () => reloadWorkspaceTree());

// 打开代码页签
const openFileTab = async (nodeData) => {
  // TODO 最多只能打开10个文件
  lodash.forEach(AppContext.openFileArray, file => {
    if (!file) return;
    file.active = false;
  });
  let fileData;
  fileData = AppContext.openFileArray[nodeData.dataId];
  if (fileData) {
    fileData.active = true;
  } else {
    fileData = await jsCodeFile(nodeData.dataId);
    AppContext.openFileArray[fileData.id] = {
      ...fileData,
      active: true,
      needSave: false,
      // isLock: false,
    };
  }
  AppContext.editorTools.fileTabs.html(fileTabArt({ openFileArray: AppContext.openFileArray }));
  // openFileArray
  AppContext.editorInstance.setValue(fileData.jsCode || "");
};
