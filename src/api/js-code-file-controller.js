import { stringify } from 'qs';
import http from "@/utils/http";

// 获取代码Tree
export async function tree(bizType = "default", groupName = "default") {
  return http.get(`/api/js_code_file/tree?${stringify({ bizType, groupName })}`);
}
