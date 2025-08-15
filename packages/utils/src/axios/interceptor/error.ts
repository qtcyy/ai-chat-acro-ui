import { AxiosError } from "axios";

export const errorResponseInterceptor = (error: AxiosError) => {
  //process error
  const status = error.response?.status;
  
  // 2xx 和 304 状态码都是正常的，不应该进入错误处理
  if (status && status >= 400) {
    console.error("网络请求错误", error.response?.statusText);
  }

  return Promise.reject(error);
};
