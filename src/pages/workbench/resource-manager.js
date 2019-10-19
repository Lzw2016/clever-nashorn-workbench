// import lodash from "lodash";
import layer from "layer";
import { loading } from "@/utils/loading";
// import "jquery.fancytree/dist/skin-win8-n/ui.fancytree.less";
import copy from 'copy-to-clipboard';
import "./resource-manager.less";
import "./resource-manager.scss";
import { createTree } from "jquery.fancytree";
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd5';
// import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import '@/../public/js/jquery.fancytree/jquery.fancytree.contextMenu';
import 'simplebar/dist/simplebar.css';
import SimpleBar from 'simplebar/dist/simplebar.js';
import AppContext from "./context";
import Browser from "@/utils/browser";
import { tree, jsCodeFile, add } from "@/api/js-code-file-controller";

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
    const { children, fullPath, name, nodeType, dataId } = node;
    // https://wwwendt.de/tech/fancytree/doc/jsdoc/global.html#NodeData
    node.key = dataId;
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
  extensions: ['edit', 'contextMenu', "dnd5"],
  treeId: "WorkspaceTree",
  activeVisible: true,            // 确保活动节点是可见的(展开)
  aria: true,                     // 启用WAI-ARIA支持
  autoActivate: true,             // 当节点使用键盘聚焦时自动激活该节点
  autoCollapse: false,            // 在展开节点时自动折叠所有兄弟节点
  autoScroll: false,              // 自动将节点滚动到可见区域
  clickFolderMode: 3,             // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expand)
  checkbox: false,                // Show复选框
  checkboxAutoHide: undefined,    // 只在悬停时显示复选框
  debugLevel: 0,                  // 0:安静，1:错误，2:警告，3:信息，4:调试
  disabled: false,                // 禁用控件
  focusOnSelect: true,            // 当鼠标单击选中节点时设置焦点
  escapeTitles: false,            // Escape node.title 显示内容
  generateIds: true,              // 生成id属性，如 <span id='fancytree-id-KEY'>
  idPrefix: "fancytree_ft_",      // 用于生成节点id like <span id='fancytree-id-<key>'>
  icon: true,                     // 显示节点图标
  keyboard: true,                 // 支持键盘导航
  keyPathSeparator: "/",          // 由node.getKeyPath()和tree.loadKeyPath()使用
  minExpandLevel: 1,              // 1: 根节点不可折叠
  quicksearch: false,             // 通过键入第一个字母导航到下一个节点
  rtl: false,                     // 启用rtl(从右到左)模式
  selectMode: 1,                  // 1:single, 2:multi, 3:multi-hier
  tabindex: "0",                  // 整棵树表现为一个单独的控件
  titlesTabbable: false,          // 节点标题可以接收键盘焦点
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
  // 编辑器器插件
  edit: {
    triggerStart: ["f2"],
    beforeEdit: function (event, data) {
      console.log("edit - beforeEdit", data);
      if (data && data.originalEvent) data.originalEvent.preventDefault();
      // Return false to prevent edit mode
      data.saveSuccessful = false;
    },
    edit: function (event, data) {
      console.log("edit - edit", data);
      if (data && data.originalEvent) data.originalEvent.preventDefault();
      // Editor was opened (available as data.input)
      data.input.select();
    },
    beforeClose: function (event, data) {
      console.log("edit - beforeClose", data);
      if (data && data.originalEvent) data.originalEvent.preventDefault();
      // const { isNew, node, input, saveSuccessful } = data;
      // 保持编辑器状态
      // return true;
      // 取消保存
      // data.save = true;
    },
    save: function (event, data) {
      console.log("edit - save", data, data.input.val());
      if (data && data.originalEvent) data.originalEvent.preventDefault();
      const { node, input, saveSuccessful } = data;
      // input.select();
      let name = input.val();
      console.log("name -->", name);
      if (!node.folder && name.endsWith(".js")) {
        name = name.substring(0, name.length - 3);
      }
      const loadingAttr = loading.start();
      add({
        bizType: AppContext.bizType,
        groupName: AppContext.groupName,
        nodeType: node.folder ? 2 : 1,
        filePath: node.data.filePath,
        name: name,
        jsCode: node.folder ? undefined : "",
        description: "",
      }).then(resData => {
        console.log("resData --> ", resData);
        data.node.key = resData.id;
        data.node.folder = resData.nodeType === 2;
        data.node.title = resData.name;
        data.node.iconTooltip = resData.filePath;
        // let fullPath = "";
        // let parentId = "";
        const paths = `${resData.filePath}${resData.name}`.split("/");
        console.log("paths --> ", paths); // /新建文件夹/新建文件夹5/新建脚本文件.js --> ["", "新建文件夹", "新建文件夹5", "新建脚本文件.js"]
        data.node.data = {
          ...resData,
          build: true,
          dataId: resData.id,
          id: `${resData.filePath}${resData.name}`,
          fullPath: `${resData.filePath}${resData.name}`, // ? TODO 删除尾部 "/" -> fullPath: "/public"
          parentId: "", // ? 上级路径 -> parentId: "/"
          root: null,
        };
        data.saveSuccessful = true;
        data.isNew = false;
        // node.setTitle(input.val());
        console.log("editEnd -> start !!!");
        node.editEnd(false);
        console.log("editEnd -> end !!!");
        node.setActive(true, { noEvents: true, noFocus: true });
      }).catch(error => {
        console.log("error --> ", error);
      }).finally(() => loading.done(loadingAttr));
      return !!saveSuccessful;
    },
    close: function (event, data) {
      console.log("edit - close", data);
      if (data && data.originalEvent) data.originalEvent.preventDefault();
    }
  },
  // 右键菜单
  contextMenu: {
    selector: "fancytree-node",
    menu: {
      createFile: { name: "新增文件", icon: "context-menu-create-file" },
      createFolder: { name: "新增文件夹", icon: "context-menu-create-folder" },
      copyFileName: { name: "复制文件名", icon: "context-menu-copy-file-name" },
      copyFullPath: { name: "复制全路径", icon: "context-menu-copy-full-path" },
      sep1: "---------",
      delete: { name: "删除", icon: "context-menu-delete" },
      rename: { name: "重命名", icon: "context-menu-rename" },
    },
    actions: function (node, action, options) {
      if (action === "createFile") {
        createFileOrFolder(false, node);
      } else if (action === "createFolder") {
        createFileOrFolder(true, node);
      } else if (action === "copyFileName") {
        copy(node.data.name, { format: "text/plain" });
      } else if (action === "copyFullPath") {
        copy(node.data.fullPath, { format: "text/plain" });
      } else if (action === "delete") {
        // console.log("delete", node.data.dataId);
        node.remove();
      } else if (action === "rename") {
        node.editStart();
      }
    }
  },
  // 节点拖拽移动 https://github.com/mar10/fancytree/wiki/ExtDnd5
  // dnd5: {
  //   autoExpandMS: 1500,
  //   preventRecursion: true,
  //   preventVoidMoves: true,
  //   dragStart: function (node, data) {
  //     // Return true to allow the drag operation
  //     return true;
  //   },
  //   dragDrag: function (node, data) {
  //   },
  //   dragEnd: function (node, data) {
  //   },
  //   dragEnter: function (node, data) {
  //     // Accept everything:
  //     return true;
  //   },
  //   dragOver: function (node, data) {
  //     data.dropEffect = data.dropEffectSuggested;
  //   },
  //   dragExpand: function (node, data) {
  //   },
  //   dragLeave: function (node, data) {
  //   },
  //   dragDrop: function (node, data) {
  //   }
  // },
};

// 初始化工作空间树
const initWorkspaceTree = async () => {
  const loadingAttr = loading.start();
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
  loading.done(loadingAttr);
};
$(document).ready(() => {
  initWorkspaceTree();
  AppContext.workspacePanel.tools.title.html(`${AppContext.bizType}-${AppContext.groupName}`);
  AppContext.workbenchHeaderTools.openFileFullPath.workspaceTitle.html(`[${AppContext.bizType}-${AppContext.groupName}]`);
  if (Browser.client.name !== "Chrome") {
    new SimpleBar(
      document.querySelector('.workbench-container .container-left .opened-file .panel-content'),
      {
        autoHide: true,
        scrollbarMinSize: 35,
      }
    );
  }
});

// 重新加载工作空间树
const reloadWorkspaceTree = async () => {
  if (!AppContext.workspaceTree) {
    return;
  }
  const loadingAttr = loading.start();
  // const oldData = AppContext.workspaceTree.toDict(false);
  // console.log("oldData", oldData);
  AppContext.workspacePanel.tools.title.html(`${AppContext.bizType}-${AppContext.groupName}`);
  AppContext.workbenchHeaderTools.openFileFullPath.workspaceTitle.html(`[${AppContext.bizType}-${AppContext.groupName}]`);
  const data = await tree(AppContext.bizType, AppContext.groupName);
  AppContext.workspaceTree.reload(data).done(() => {
    // 重新加载完成
    positionFileForWorkspaceTree();
  });
  loading.done(loadingAttr);
};
AppContext.workspacePanel.tools.actions.refresh.on("click", () => reloadWorkspaceTree());

// 打开代码页签
let openFileTabLock = false;
const openFileTabMax = 10;
const openFileTab = async (nodeData) => {
  if (openFileTabLock) {
    return;
  }
  const loadingAttr = loading.start();
  try {
    openFileTabLock = true;
    let fileData = AppContext.openFileArray.find(file => file.id === nodeData.dataId);
    if (!fileData && AppContext.openFileArray.length >= openFileTabMax) {
      // 最多只能打开10个文件
      layer.msg(`最多只能打开${openFileTabMax}个文件`, { time: 1500 });
    } else if (!fileData) {
      // 请求服务器获取文件内容
      fileData = await jsCodeFile(nodeData.dataId);
      AppContext.openFileArray.push({ ...fileData, needSave: false, lastOpenTime: new Date().getTime() });
    }
    if (fileData) {
      AppContext.renderOpenFile(fileData.id, { treePosition: false });
    }
  } catch (error) {
    openFileTabLock = false;
  } finally {
    loading.done(loadingAttr);
  }
  openFileTabLock = false;
};

// 定位文件树位置
const positionFileForWorkspaceTree = () => {
  if (!AppContext.currentOpenFileId) {
    return;
  }
  AppContext.workspaceTree.activateKey(AppContext.currentOpenFileId, { noEvents: true, noFocus: true });
};
AppContext.workspacePanel.tools.actions.positionFile.on("click", () => positionFileForWorkspaceTree());

// 新增文件 / 新增文件夹
const createFileOrFolder = (folder, nodeParam) => {
  let node = nodeParam;
  if (!node) {
    node = AppContext.workspaceTree.getActiveNode();
  }
  if (!node) {
    node = AppContext.workspaceTree.getRootNode();
  }
  // console.log("node-->", node, node.isRootNode());
  const newNode = {
    key: -1,
    folder: false,
    title: "新建脚本文件",
    iconTooltip: "",
    tooltip: "",
    data: {},
  };
  if (folder) {
    newNode.folder = true;
    newNode.title = "新建文件夹";
  }
  if (node.isRootNode()) {
    // 根节点
    newNode.data.filePath = "/";
    node.editCreateNode("child", newNode);
  } else if (node.folder) {
    // 文件夹
    newNode.data.filePath = `${node.data.fullPath}/`;
    node.editCreateNode("child", newNode);
  } else {
    // 文件
    newNode.data.filePath = node.data.filePath;
    node.editCreateNode("after", newNode);
  }
};
AppContext.workspacePanel.tools.actions.createFile.on("click", () => createFileOrFolder(false, AppContext.workspaceTree.getRootNode()));
AppContext.workspacePanel.tools.actions.createFolder.on("click", () => createFileOrFolder(true, AppContext.workspaceTree.getRootNode()));

// 文件树全部折叠
const collapseAllWorkspaceTree = () => {
  AppContext.workspaceTree.expandAll(false, { noAnimation: false, noEvents: true });
};
AppContext.workspacePanel.tools.actions.collapseAll.on("click", () => collapseAllWorkspaceTree());

// 保存所有文件
AppContext.openedFile.tools.actions.saveAll.on("click", () => {
  const needSaveArray = AppContext.openFileArray.filter(file => file.needSave);
  console.log("保存所有文件", needSaveArray.length);
  AppContext.renderOpenFile(null, { treePosition: false });
});
// 关闭所有文件
AppContext.openedFile.tools.actions.closeAll.on("click", () => {
  const needSaveArray = AppContext.openFileArray.filter(file => file.needSave);
  if (needSaveArray.length > 0) {
    console.log("需要保存", needSaveArray.length);
  }
  AppContext.openFileArray = [];
  AppContext.renderOpenFile(undefined, { treePosition: false });
  console.log("关闭所有文件");
});
