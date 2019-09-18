// import lodash from "lodash";
import copy from 'copy-to-clipboard';
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
      console.log("需要保存");
    }
    AppContext.openFileArray = AppContext.openFileArray.filter(file => file.id !== id);
    AppContext.renderOpenFile(null, {});
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
      console.log("需要保存");
    }
    AppContext.openFileArray = AppContext.openFileArray.filter(file => file.id !== id);
    AppContext.renderOpenFile(null, {});
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
      console.log("需要保存", needSaveArray.length);
    }
    AppContext.openFileArray = AppContext.openFileArray.filter(file => ids.findIndex(id => id === file.id) < 0);
    AppContext.renderOpenFile(undefined, { treePosition: false });
    console.log("关闭所有文件");
  }
});
