import axios, { AxiosInstance } from "axios";
import { setupInterceptor } from "./interceptor";

const request: AxiosInstance = axios.create({});

setupInterceptor(request);

export const updateBaseUrl = (baseUrl: string) => {
  console.log("Setting baseURL to:", baseUrl);
  request.defaults.baseURL = baseUrl;
  console.log("Updated baseURL:", request.defaults.baseURL);
};

export { request };
export * from "./provider/AxiosProvider";
