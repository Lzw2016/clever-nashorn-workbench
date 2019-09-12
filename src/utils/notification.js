import { options, error, warning, info, success, clear, getContainer, subscribe, remove } from "toastr";
import "toastr/build/toastr.min.css";
import "./notification.scss";
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
options.timeOut = 8000;
options.extendedTimeOut = 1500;
options.showEasing = "swing";
options.hideEasing = "linear";
options.showMethod = "fadeIn";
options.hideMethod = "fadeOut";

const notification = {
  error: ({ message, description }) => {
    error(description || message);
  },
  warning: ({ message, description }) => {
    warning(description || message);
  },
  info: ({ message, description }) => {
    info(description || message);
  },
  success: ({ message, description }) => {
    success(description || message);
  },
  clear,
  getContainer,
  subscribe,
  remove
};

// notification.error({ message: "message1" });
// notification.warning({ message: "message2" });
// notification.info({ message: "message3" });
// notification.success({ message: "message4" });
export default notification;
