import Split from "split.js";
import lodash from 'lodash';
import AppContext from './context';

const layout = () => {
  if (AppContext.editorInstance) {
    AppContext.editorInstance.layout();
  }
};

const layoutDebounce = lodash.debounce(() => layout(), 80, { maxWait: 130 });

// 布局处理 - 容器左右
const leftCenterLayout = Split(['.container-left', '.container-center'], {
  direction: 'horizontal',
  sizes: [5, 95],
  // sizes: ['296px', 'calc(100% - 300px)'],
  // sizes: ['296px'],
  minSize: [260, 800],
  gutterSize: 6,
  cursor: 'ew-resize',
  onDrag: () => layoutDebounce(),
  onDragEnd: () => layout(),
});

// 布局处理 - 编辑器和控制台
const editorConsoleLayout = Split(['.editor-container', '.console-container'], {
  direction: 'vertical',
  sizes: [57, 43],
  // sizes: ['calc(100% - 360px)', '356px'],
  minSize: [160, 48],
  gutterSize: 5,
  cursor: 'ns-resize',
  onDrag: () => layoutDebounce(),
  onDragEnd: () => layout(),
});

export {
  leftCenterLayout,
  editorConsoleLayout
};
