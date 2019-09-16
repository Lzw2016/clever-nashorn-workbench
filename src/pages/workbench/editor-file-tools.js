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
    AppContext.openFileArray[id] = undefined;
    AppContext.editorInstance.setValue("");
    fileTitle.remove();
    return;
  }
  // 切换页签
  // lodash.forEach(AppContext.openFileArray, (file, idTmp) => {
  //   if (!file) return;
  //   if (idTmp === id) {
  //     file.active = true;
  //   } else {
  //     file.active = false;
  //   }
  // });
  const actives = $(".editor-container .editor-tools .open-file-tabs .file-title.active");
  actives.removeClass("active");
  fileTitle.toggleClass("active");
  // console.log("fileTitle-->", fileTitle);
  AppContext.editorInstance.setValue(AppContext.openFileArray[id].jsCode || "");
});
