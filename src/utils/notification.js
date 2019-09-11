import { options, error, warning, info, success, clear, getContainer, subscribe, remove } from "toastr";
import "toastr/build/toastr.min.css";
// TODO 样式修改

// https://github.com/CodeSeven/toastr
// https://codeseven.github.io/toastr/demo.html#
options.closeButton = false;
options.debug = false;
options.newestOnTop = true;
options.progressBar = false;
options.positionClass = "toast-bottom-right";
options.preventDuplicates = true;
options.onclick = null;
options.showDuration = 300;
options.hideDuration = 1000;
options.timeOut = 5000;
options.extendedTimeOut = 1000;
options.showEasing = "swing";
options.hideEasing = "linear";
options.showMethod = "fadeIn";
options.hideMethod = "fadeOut";

const notification = {
  error,
  warning,
  info,
  success,
  clear,
  getContainer,
  subscribe,
  remove
};

export default notification;
