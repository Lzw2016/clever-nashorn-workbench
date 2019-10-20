// import lodash from "lodash";
import layer from "layer";
import copy from 'copy-to-clipboard';
import { deleteFile } from "@/api/js-code-file-controller";
import { loading } from "@/utils/loading";
import AppContext from "./context";

// 文件页签事件处理
$(document).on("click", ".editor-container .editor-tools .open-file-tabs .file-title", (e) => {
  const target = $(e.target);
  let fileTitle;
  if (target.hasClass("file-title")) {
    fileTitle = target;
  } else {
    fileTitle = target.parent(".file-title");
  }
  const id = $(fileTitle).attr("data-id");
  // 关闭页签
  if (target.hasClass("file-close")) {
    if (target.hasClass("need-save")) {
      layer.confirm(
        `文件还未保存，是否先保存文件？`,
        { btn: ["保存", '放弃修改'] },
        function (index) {
          layer.close(index);
          AppContext.saveJsCodeFile(id, () => {
            AppContext.openFileArray = AppContext.openFileArray.filter(file => file.id !== id);
            AppContext.renderOpenFile(null, {});
          });
        },
        function () {
          AppContext.openFileArray = AppContext.openFileArray.filter(file => file.id !== id);
          AppContext.renderOpenFile(null, {});
        }
      );
    } else {
      AppContext.openFileArray = AppContext.openFileArray.filter(file => file.id !== id);
      AppContext.renderOpenFile(null, {});
    }
    return;
  }
  // 切换页签
  // const actives = $(".editor-container .editor-tools .open-file-tabs .file-title.active");
  // actives.removeClass("active");
  // fileTitle.toggleClass("active");
  AppContext.renderOpenFile(id, {});
});

// 已打开的脚本
$(document).on("click", "#opened-file-content .file-title", (e) => {
  const target = $(e.target);
  let fileTitle;
  if (target.hasClass("file-title")) {
    fileTitle = target;
  } else {
    fileTitle = target.parent(".file-title");
  }
  const id = $(fileTitle).attr("data-id");
  // 关闭文件
  if (target.hasClass("file-close")) {
    if (target.hasClass("need-save")) {
      layer.confirm(
        `文件还未保存，是否先保存文件？`,
        { btn: ["保存", '放弃修改'] },
        function (index) {
          layer.close(index);
          AppContext.saveJsCodeFile(id, () => {
            AppContext.openFileArray = AppContext.openFileArray.filter(file => file.id !== id);
            AppContext.renderOpenFile(null, {});
          });
        },
        function () {
          AppContext.openFileArray = AppContext.openFileArray.filter(file => file.id !== id);
          AppContext.renderOpenFile(null, {});
        }
      );
    } else {
      AppContext.openFileArray = AppContext.openFileArray.filter(file => file.id !== id);
      AppContext.renderOpenFile(null, {});
    }
    return;
  }
  // 切换文件
  AppContext.renderOpenFile(id, {});
});

// 文件页签右键菜单
$.contextMenu({
  selector: ".editor-tools .open-file-tabs .file-title",
  // autoHide: true,
  items: {
    closeOther: { name: "关闭其它", icon: "context-menu-close-other" },
    closeRight: { name: "关闭右侧", icon: "context-menu-close-right" },
    closeLeft: { name: "关闭左侧", icon: "context-menu-close-left" },
    closeAll: { name: "关闭所有", icon: "context-menu-close-all" },
    sep1: "---------",
    copyFileName: { name: "复制文件名", icon: "context-menu-copy-file-name" },
    copyFullPath: { name: "复制全路径", icon: "context-menu-copy-full-path" },
  },
  callback: function (itemKey, opt) {
    const id = opt.$trigger.attr("data-id");
    if (!id) {
      return;
    }
    const fileData = AppContext.openFileArray.find(file => file.id === id);
    if (!fileData) {
      return;
    }
    const ids = [];
    if (itemKey === "closeOther") {
      AppContext.openFileArray.forEach(file => {
        if (file.id === id) {
          return;
        }
        ids.push(file.id);
      });
    } else if (itemKey === "closeRight") {
      let flag = false;
      AppContext.openFileArray.forEach(file => {
        if (file.id === id) {
          flag = true;
          return;
        }
        if (flag) {
          ids.push(file.id);
        }
      });
    } else if (itemKey === "closeLeft") {
      let flag = true;
      AppContext.openFileArray.forEach(file => {
        if (file.id === id) {
          flag = false;
          return;
        }
        if (flag) {
          ids.push(file.id);
        }
      });
    } else if (itemKey === "closeAll") {
      AppContext.openFileArray.forEach(file => {
        ids.push(file.id);
      });
    } else if (itemKey === "copyFileName") {
      copy(fileData.name, { format: "text/plain" });
    } else if (itemKey === "copyFullPath") {
      copy(fileData.filePath + fileData.name, { format: "text/plain" });
    }
    if (ids.length <= 0) {
      return;
    }
    // 关闭编辑器
    const needSaveArray = AppContext.openFileArray.filter(file => file.needSave && ids.findIndex(id => id === file.id) >= 0);
    if (needSaveArray.length > 0) {
      layer.confirm(
        `有${needSaveArray.length}个文件未保存，是否先保存文件？`,
        { btn: ["全部保存", '放弃修改'] },
        function (index) {
          layer.close(index);
          let count = 0;
          needSaveArray.forEach(tmp => {
            AppContext.saveJsCodeFile(tmp.id, () => {
              count++;
              if (count >= needSaveArray.length) {
                AppContext.openFileArray = AppContext.openFileArray.filter(file => ids.findIndex(id => id === file.id) < 0);
                AppContext.renderOpenFile(undefined, { treePosition: false });
              }
            });
          });
        },
        function () {
          AppContext.openFileArray = AppContext.openFileArray.filter(file => ids.findIndex(id => id === file.id) < 0);
          AppContext.renderOpenFile(undefined, { treePosition: false });
        }
      );
      return;
    }
    AppContext.openFileArray = AppContext.openFileArray.filter(file => ids.findIndex(id => id === file.id) < 0);
    AppContext.renderOpenFile(undefined, { treePosition: false });
  }
});

// 保存文件
AppContext.editorTools.buttons.saveFile.on("click", () => {
  AppContext.saveJsCodeFile(AppContext.currentOpenFileId);
});

// 锁定文件
AppContext.editorTools.buttons.lockFile.on("click", () => {
  AppContext.lockJsFile(AppContext.currentOpenFileId);
});

// 删除文件
AppContext.editorTools.buttons.deleteFile.on("click", () => {
  const node = AppContext.workspaceTree.getNodeByKey(AppContext.currentOpenFileId);
  if (!node) return;
  layer.confirm(
    `确定删除${node.folder ? '文件夹' : '文件'}？此操作不可撤销！<br />${node.data.fullPath}`,
    { btn: ["删除", '取消'] },
    function (index) {
      layer.close(index);
      const loadingAttr = loading.start();
      deleteFile(node.data.dataId)
        .then(() => {
          const ids = [];
          const getAllIds = (nodes) => {
            if (!nodes || nodes.length <= 0) return;
            // console.log("nodes ---> ", nodes.length);
            nodes.forEach(tmp => {
              if (tmp && tmp.data) {
                ids.push(tmp.data.dataId);
              }
              if (tmp && tmp.children && tmp.children.length > 0) {
                getAllIds(tmp.children);
              }
            });
          };
          getAllIds([node]);
          // console.log("ids ---> ", ids, deleteFile);
          AppContext.openFileArray = AppContext.openFileArray.filter(file => ids.indexOf(file.id) === -1);
          AppContext.renderOpenFile(null, {});
          node.remove();
        })
        .finally(() => loading.done(loadingAttr));
    },
  );
});

// 查看运行日志
AppContext.workbenchHeaderTools.runLogs.on("click", () => {
  layer.msg("还未实现，敬请期待！(查看运行日志)", { time: 1500 });
});

// 查看文件历史
AppContext.workbenchHeaderTools.history.on("click", () => {
  layer.msg("还未实现，敬请期待！(查看文件历史)", { time: 1500 });
});

// 查看快捷键
AppContext.workbenchHeaderTools.keyboard.on("click", () => {
  layer.msg("还未实现，敬请期待！(查看快捷键)", { time: 1500 });
});
