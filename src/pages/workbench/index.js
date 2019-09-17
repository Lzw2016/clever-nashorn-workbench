import './index.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'simplebar/dist/simplebar.css';
// import lodash from 'lodash';
import $ from 'jquery';
import 'jquery-contextmenu/dist/jquery.contextMenu.min.css';
import 'jquery-contextmenu/dist/jquery.contextMenu.min';
import './context-menu.scss';
// import notification from '@/utils/notification';
import './context';
import './layout-split';
import './vconsole';
import './monaco-editor';
import './resource-manager';
import './editor-file-tools';

$(document).ready(() => {
  // 显示内容
  $(".workbench-root").css("visibility", "visible");
  // 禁止鼠标右键菜单
  document.oncontextmenu = () => false;
});
