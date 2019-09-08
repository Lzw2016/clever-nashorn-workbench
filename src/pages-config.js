/**
 * 多页面配置
 * 使用相对路径，相对于"/src/pages"下的路径
 * htmlPath     - HTML模板文件路径，使用ejs模版(必填)
 * htmlOutPath  - HTML打包处理之后的输出路径，不写就是用htmlPath的值，当一个页面可以使用同一个HTML模板文件时有用(选填)
 * title        - HTML页面标题(选填)
 * jsPathArray  - 当前页面依赖的js文件数组(必填)
 */
const pagesConfig = [
  {
    htmlPath: 'index.html',
  },
  {
    htmlPath: 'workbench/index.html',
    jsPathArray: ['workbench/index.js'],
  },
  {
    htmlPath: 'vConsole/index.html',
    jsPathArray: ['vConsole/index.js'],
  },
  {
    htmlPath: 'monaco-editor/index.html',
    jsPathArray: [
      'monaco-editor/index.js',
      {
        srcPath: '../../node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
        outPath: 'public/monaco-editor/editor.worker.js',
      },
      // {
      //   srcPath: '../../node_modules/monaco-editor/esm/vs/language/css/css.worker.js',
      //   outPath: 'public/monaco-editor/css.worker.js',
      // },
      // {
      //   srcPath: '../../node_modules/monaco-editor/esm/vs/language/html/html.worker.js',
      //   outPath: 'public/monaco-editor/html.worker.js',
      // },
      // {
      //   srcPath: '../../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js',
      //   outPath: 'public/monaco-editor/ts.worker.js',
      // },
    ],
  },
];
module.exports.pagesConfig = pagesConfig;
