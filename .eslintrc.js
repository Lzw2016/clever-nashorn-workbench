module.exports = {
  // 作用的目录是根目录
  root: true,
  extends: [
    'standard',
    "plugin:flowtype/recommended",
    "eslint:recommended"
  ],
  // 继承标准规则
  plugins: [
    // 使用eslint-plugin-html
    'html',
    'react',
    'flowtype'
  ],
  "settings": {
    "flowtype": {
      // 只检查 声明 flow语法的文件
      "onlyFilesWithFlowAnnotation": true,
    }
  },
  parserOptions: {
    // 此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: "babel-eslint",
    // 按照模块的方式解析
    sourceType: 'module',
    // "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  env: {
    browser: true, // 开发环境配置表示可以使用浏览器的方法
    node: true, //
    commonjs: true,
    es6: true,
    amd: true
  },
  // 允许全局变量,将$设置为true，表示允许使用全局变量$
  globals: {
    "document": true,
    "localStorage": true,
    "window": true,
    "jQuery": true,
    $: true
  },
  // 重新覆盖 extends: 'standard'的规则 - // 自定义的规则 0 允许; 1 警告; 2 错误
  rules: {
    "linebreak-style": [0, "error", "windows"],
    // error类型，缩进2个空格
    "indent": ['error', 2],
    // 在函数左括号的前面是否有空格
    'space-before-function-paren': 0,
    // 不检测新文件末尾是否有空行
    'eol-last': 0,
    // 必须在语句后面加分号
    'semi': ['error', 'always'],
    // 字符串没有使用双引号
    "quotes": 0, // ["error", "double"],
    // 允许使用console
    "no-console": 0,
    "arrow-parens": 0,
    // 关闭全局变量检测
    //"no-undef":0,
    //允许使用 new 关键字
    "no-new": 0,
    "comma-dangle": 0,
    // 引入 ant-design-pro 项目的规则
    // 'import/no-cycle': 0,
    // 'jsx-a11y/no-noninteractive-element-interactions': 0,
    // 'jsx-a11y/click-events-have-key-events': 0,
    // 'jsx-a11y/no-static-element-interactions': 0,
    // 'jsx-a11y/anchor-is-valid': 0,
    // 'linebreak-style': 0,
    // 'class-methods-use-this': 0,
    // 'no-continue': 0,
    // 'no-plusplus': 0,
    // 'no-nested-ternary': 0,
    // 'import/prefer-default-export': 0,
    // 'prefer-destructuring': 0,
    // 'react/jsx-boolean-value': 0,
    // 'react/sort-comp': 0,
    // 'camelcase': 0,
    // 'react/prefer-stateless-function': 0,
    // 'react/no-array-index-key': 0,
  }
}
