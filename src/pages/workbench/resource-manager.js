import "jquery";
import "jquery.fancytree/dist/skin-lion/ui.fancytree.less";
import { createTree } from "jquery.fancytree";
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import AppContext from "./context";
import { tree } from "@/api/js-code-file-controller";

// 重新加载工作空间树
const reloadWorkspaceTree = async () => {
  const data = await tree(AppContext.bizType, AppContext.groupName);
  console.log(data);
  const workspaceTree = createTree('#workspace-content', {
    extensions: ['edit', 'filter'],
    treeId: "id",
    source: data,
  });
  console.log(workspaceTree);
};

reloadWorkspaceTree();

export default {
  reload: reloadWorkspaceTree,
};
