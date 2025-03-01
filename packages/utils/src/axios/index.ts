import axios, { AxiosInstance } from "axios";
import { setupInterceptor } from "./interceptor";

const request: AxiosInstance = axios.create({
  withCredentials: true,
});

setupInterceptor(request);

export const updateBaseUrl = (baseUrl: string) => {
  console.log(baseUrl);
  request.defaults.baseURL = baseUrl;
};

export { request };
export * from "./provider/AxiosProvider";
