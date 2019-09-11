import './index.scss';
import 'font-awesome/css/font-awesome.min.css';
// import lodash from 'lodash';
import $ from 'jquery';
import { leftCenterLayout } from './layout-split';
import { vConsole } from './vconsole';
import { editorInstance } from './monaco-editor';

$(document).ready(() => {
  // 显示内容
  $(".workbench-root").css("visibility", "visible");
  // 禁止鼠标右键菜单
  document.oncontextmenu = () => false;
});

export {
  leftCenterLayout,
  vConsole,
  editorInstance,
};
