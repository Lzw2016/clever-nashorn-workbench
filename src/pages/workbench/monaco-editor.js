import * as monacoRequire from 'require';
import lodash from 'lodash';
import AppContext from './context';
import jsCodeLib from './js-code-lib';
import { useOss, appVersion, runMode, runModeEnum } from '../../../build/config';
import { ossUrl } from '../../../ali-oss-conf';

const isDev = runMode === runModeEnum.dev;
// monaco-editor 资源文件路径配置
monacoRequire.config({
  baseUrl: (!isDev && useOss) ? `${ossUrl}/${appVersion}/public/js/monaco-editor` : "/public/js/monaco-editor",
  paths: { vs: 'min/vs' },
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
    () => AppContext.saveJsCodeFile(),
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
    // validation settings(验证配置)
    // monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    //   noSemanticValidation: true,
    //   noSyntaxValidation: false
    // });
    // compiler options(编译配置) https://microsoft.github.io/monaco-editor/api/interfaces/monaco.languages.typescript.compileroptions.html#module
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      ...monaco.languages.typescript.javascriptDefaults.getCompilerOptions(),
      target: monaco.languages.typescript.ScriptTarget.ES5,
      allowNonTsExtensions: true,
      noLib: false,
    });
    // extra libraries(配置扩展的库)
    monaco.languages.typescript.javascriptDefaults.addExtraLib(jsCodeLib);
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
    AppContext.initEditorViewState = editorInstance.saveViewState();
    // editorInstance.onDidChangeModelContent(e => console.log(e));
    editorInstance.onDidChangeModelContent(lodash.debounce(AppContext.fileContentChange, 100, { maxWait: 350 }));
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
