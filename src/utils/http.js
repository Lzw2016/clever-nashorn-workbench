import axios from 'axios';
// import qs from 'qs';
import notification from './notification';

const CodeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

// 全局请求配置
axios.interceptors.request.use(
  config => {
    const baseURL = '/';
    const timeout = 30000;
    const validateStatus = status => (status >= 200 && status < 300);
    return { ...config, baseURL, timeout, validateStatus };
  },
  error => {
    notification.error({ message: '请求发送失败', description: '发送请求给服务端失败，请检查电脑网络，再重试' });
    return Promise.reject(error);
  }
);

// 请求异常通知
const errorNotice = error => {
  const { response } = error;
  if (error && response) {
    const { data } = response;
    if (data && data.message) {
      if (data.validMessageList) {
        // TODO 解析校验错误
        data.message = '请求参数校验失败';
      }
      notification.error({ message: `${data.error} -> ${data.path}`, description: data.message });
      return true;
    }
    const errortext = CodeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误,响应状态码:${response.status}`,
      description: errortext,
    });
  } else {
    notification.error({ message: '请求服务端异常', description: '服务器异常' });
  }
  return false;
};

//  全局拦截配置
axios.interceptors.response.use(
  response => response,
  error => {
    // resolve 通过， reject 驳回
    if (errorNotice(error)) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);

// 处理响应数据
const transformResponse = response => {
  if (response.data) {
    return response.data;
  }
  return null;
};

export default {
  request(config) {
    return axios.request(config).then(response => transformResponse(response));
  },
  async get(url, config) {
    return axios.get(url, config).then(response => transformResponse(response));
  },
  delete(url, config) {
    return axios.delete(url, config).then(response => transformResponse(response));
  },
  head(url, config) {
    return axios.head(url, config).then(response => transformResponse(response));
  },
  options(url, config) {
    return axios.options(url, config).then(response => transformResponse(response));
  },
  post(url, data, config) {
    return axios.post(url, data, config).then(response => transformResponse(response));
  },
  put(url, data, config) {
    return axios.put(url, data, config).then(response => transformResponse(response));
  },
  patch(url, data, config) {
    return axios.patch(url, data, config).then(response => transformResponse(response));
  },
};
