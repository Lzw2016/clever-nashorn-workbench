import Split from "split.js";
import lodash from 'lodash';

const layout = () => {
  if (window.editorInstance) {
    window.editorInstance.layout();
  }
};

const layoutDebounce = lodash.debounce(
  () => layout(),
  50,
  { maxWait: 80, trailing: false }
);

// 布局处理 - 容器左右
const leftCenterLayout = Split(['.container-left', '.container-center'], {
  direction: 'horizontal',
  sizes: [10, 90],
  // sizes: ['296px', 'calc(100% - 300px)'],
  // sizes: ['296px'],
  minSize: [210, 800],
  gutterSize: 6,
  cursor: 'ew-resize',
  onDrag: () => layoutDebounce(),
  onDragEnd: () => layout(),
});

// 布局处理 - 编辑器和控制台
const editorConsoleLayout = Split(['.editor-container', '.console-container'], {
  direction: 'vertical',
  sizes: [90, 10],
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
