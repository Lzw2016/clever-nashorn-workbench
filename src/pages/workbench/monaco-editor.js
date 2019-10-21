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
  // Alt + / --> 智能提示
  editorInstance.addCommand(
    monaco.KeyMod.Alt | monaco.KeyCode.US_SLASH,
    () => editorInstance.trigger(null, 'editor.action.triggerSuggest', {}),
    '!findWidgetVisible && !inReferenceSearchEditor && !editorHasSelection'
  );
  // Ctrl + Shift + U --> 选中内容转大写
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_U,
    () => editorInstance.trigger(null, 'editor.action.transformToUppercase', {}),
  );
  // Ctrl + Shift + I --> 选中内容转小写
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_I,
    () => editorInstance.trigger(null, 'editor.action.transformToLowercase', {}),
  );
  // Ctrl + Alt + L --> 代码格式化
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KEY_L,
    () => editorInstance.trigger(null, 'editor.action.formatDocument', {}),
    'editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly'
  );
  // Ctrl + Alt + L --> 选中代码格式化
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KEY_L,
    () => editorInstance.trigger(null, 'editor.action.formatSelection', {}),
    'editorHasDocumentFormattingProvider && editorHasSelection && editorTextFocus && !editorReadonly'
  );
  // Ctrl + Alt + O --> 优化导入语句
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KEY_O,
    () => editorInstance.trigger(null, 'editor.action.organizeImports', {}),
    'editorTextFocus && !editorReadonly && supportedCodeAction =~ /(\\s|^)source\\.organizeImports\\b/'
  );
  // Shift + Enter 在下面插入一行
  editorInstance.addCommand(
    monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    () => editorInstance.trigger(null, 'editor.action.insertLineAfter', {}),
    'editorTextFocus && !editorReadonly'
  );
  // Ctrl + Shift + Enter 在上面插入一行
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    () => editorInstance.trigger(null, 'editor.action.insertLineBefore', {}),
    'editorTextFocus && !editorReadonly'
  );
  // Ctrl + D 向下复制一行
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_D,
    () => editorInstance.trigger(null, 'editor.action.copyLinesDownAction', {}),
    'editorTextFocus && !editorReadonly'
  );
  // Ctrl + Y 删除行
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_Y,
    () => editorInstance.trigger(null, 'editor.action.deleteLines', {}),
    'editorTextFocus && !editorReadonly'
  );
  // Ctrl + P 触发参数提示
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_P,
    () => editorInstance.trigger(null, 'editor.action.triggerParameterHints', {}),
    'editorHasSignatureHelpProvider && editorTextFocus'
  );
  // Ctrl + Shift + UP 向上移动行
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.UpArrow,
    () => editorInstance.trigger(null, 'editor.action.moveLinesUpAction', {}),
    'editorTextFocus && !editorReadonly'
  );
  // Ctrl + Shift + Down 向下移动行
  editorInstance.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.DownArrow,
    () => editorInstance.trigger(null, 'editor.action.moveLinesDownAction', {}),
    'editorTextFocus && !editorReadonly'
  );
  // Ctrl + S --> 保存
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
