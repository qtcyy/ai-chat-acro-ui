import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["satoken"] = token;
  }
  return config;
};

export const authResponseInterceptor = (config: AxiosResponse) => {
  //process response

  return config;
};
