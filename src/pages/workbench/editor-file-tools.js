// import lodash from "lodash";
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
