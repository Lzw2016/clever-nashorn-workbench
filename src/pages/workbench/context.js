// 整个App的上下文管理
const AppContext = {
  // 当前的工作空间位置
  bizType: "default",
  groupName: "default",
  // vConsole实例
  vConsole: undefined,
  // 工作空间树实例
  workspaceTree: undefined,
  // 编辑器实例
  editorInstance: undefined,
};

export default AppContext;
