import { AxiosInstance } from "axios";
import { authRequestInterceptor, authResponseInterceptor } from "./auth";
import { errorResponseInterceptor } from "./error";

export const setupInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(authRequestInterceptor);
  instance.interceptors.response.use(authResponseInterceptor);

  instance.interceptors.response.use(undefined, errorResponseInterceptor);

  return instance;
};
