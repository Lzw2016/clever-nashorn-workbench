import lodash from "lodash";
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
    let fileData;
    lodash.forEach(AppContext.openFileArray, file => {
      if (!fileData) {
        fileData = file;
        return;
      }
      if (fileData.lastOpenTime <= file.lastOpenTime) {
        fileData = file;
      }
    });
    if (fileData) {
      AppContext.currentOpenFileId = fileData.id;
      fileData.lastOpenTime = new Date().getTime();
      AppContext.editorInstance.setValue(fileData.jsCode || "");
    } else {
      AppContext.currentOpenFileId = undefined;
      AppContext.editorInstance.setValue("");
    }
    AppContext.openFileArray = AppContext.openFileArray.filter(file => file.id !== id);
    fileTitle.remove();
    return;
  }
  // 切换页签
  const fileData = AppContext.openFileArray.find(file => file.id === id);
  if (fileData) {
    AppContext.currentOpenFileId = fileData.id;
    fileData.lastOpenTime = new Date().getTime();
    AppContext.editorInstance.setValue(fileData.jsCode || "");
  }
  const actives = $(".editor-container .editor-tools .open-file-tabs .file-title.active");
  actives.removeClass("active");
  fileTitle.toggleClass("active");
});
