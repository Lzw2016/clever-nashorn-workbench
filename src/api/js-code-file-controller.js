import { stringify } from 'qs';
import http from "@/utils/http";

// 获取代码Tree
export async function tree(bizType = "default", groupName = "default") {
  return http.get(`/api/js_code_file/tree?${stringify({ bizType, groupName })}`);
}

// 获取Js代码文件
export async function jsCodeFile(id) {
  return http.get(`/api/js_code_file/${id}`);
}

// 新增文件或者文件夹
export async function add(filedata) {
  return http.post(`/api/js_code_file/add`, filedata);
}

// 更新文件或者文件夹
export async function update(id, filedata) {
  return http.put(`/api/js_code_file/${id}`, filedata);
}

// 删除文件或文件夹
export async function deleteFile(id) {
  return http.delete(`/api/js_code_file/${id}`);
}

// 锁定文件不允许编辑
export async function lockFile(id) {
  return http.put(`/api/js_code_file/lock_file/${id}`);
}
