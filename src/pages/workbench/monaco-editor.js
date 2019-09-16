import * as monacoRequire from 'require';
import lodash from 'lodash';
import AppContext from './context';

// monaco-editor 资源文件路径配置
monacoRequire.config({
  baseUrl: "/public/js/monaco-editor",
  paths: { vs: './min/vs' },
  'vs/nls': {
    availableLanguages: {
      '*': 'zh-cn'
    }
  }
});

const editorInstanceDom = document.getElementById('monaco-editor-instance');
let editorInstance;

// 增加快捷键(可覆盖默认快捷键)
const keyMapBinding = (monaco) => {
  editorInstance.addCommand(
    monaco.KeyMod.Alt | monaco.KeyCode.US_SLASH,
    () => editorInstance.trigger(null, 'editor.action.triggerSuggest', {}),
    '!findWidgetVisible && !inReferenceSearchEditor && !editorHasSelection'
  );
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_U,
    () => editorInstance.trigger(null, 'editor.action.transformToUppercase', {}),
  );
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_I,
    () => editorInstance.trigger(null, 'editor.action.transformToLowercase', {}),
  );
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KEY_L,
    () => editorInstance.trigger(null, 'editor.action.formatDocument', {}),
    'editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly'
  );
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KEY_L,
    () => editorInstance.trigger(null, 'editor.action.formatSelection', {}),
    'editorHasDocumentFormattingProvider && editorHasSelection && editorTextFocus && !editorReadonly'
  );
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KEY_O,
    () => editorInstance.trigger(null, 'editor.action.organizeImports', {}),
    'editorTextFocus && !editorReadonly && supportedCodeAction =~ /(\\s|^)source\\.organizeImports\\b/'
  );
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
    () => console.log("保存"),
  );
};

$(document).ready(function () {
  // 初始化编辑器
  monacoRequire(['vs/editor/editor.main'], function () {
    const monaco = require('monaco');
    // console.log(monaco.editor);
    // 自定义编辑器 https://github.com/microsoft/monaco-editor-samples/blob/master/browser-amd-monarch/index.html
    // monaco.languages.register({id: 'nashorn-js'});
    // monaco.languages.setMonarchTokensProvider('nashorn-js', nashornJS);
    // 属性配置 https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
    const options = {
      width: "100%",
      height: "100%",
      // 主题，三款：vs、vs-dark、hc-black
      theme: 'vs-dark',
      // 内容
      value: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
      // 语言
      language: 'javascript',
      // 显示行号
      lineNumbers: true,
      // 只读属性
      readOnly: false,
      // 光标样式 'block' or 'line'
      cursorStyle: 'line',
      // 字体大小
      fontSize: 14,
      // 自适应调整
      automaticLayout: false,
      // 右键菜单
      contextmenu: true,
      // 代码略缩图
      minimap: {
        enabled: false
      }
    };
    // 创建编辑器
    editorInstance = monaco.editor.create(editorInstanceDom, options);
    // 绑定快捷键
    keyMapBinding(monaco);
    AppContext.editorInstance = editorInstance;
    AppContext.monaco = monaco;
  });

  // 大小发生变化
  window.addEventListener(
    'resize',
    lodash.debounce(
      () => {
        if (!editorInstance) return;
        editorInstance.layout();
      },
      100,
      { maxWait: 350 }
    )
  );
});
