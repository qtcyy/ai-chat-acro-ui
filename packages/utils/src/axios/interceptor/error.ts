import { AxiosError } from "axios";

export const errorResponseInterceptor = (error: AxiosError) => {
  //process error
  if (error.response?.status !== 200) {
    console.error("网络请求错误", error.response?.statusText);
  }

  return Promise.reject(error);
};
