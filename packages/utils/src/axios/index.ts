import axios, { AxiosInstance } from "axios";
import { setupInterceptor } from "./interceptor";

const request: AxiosInstance = axios.create({});

setupInterceptor(request);

export const updateBaseUrl = (baseUrl: string) => {
  request.defaults.baseURL = baseUrl;
};

export { request };
export * from "./provider/AxiosProvider";
