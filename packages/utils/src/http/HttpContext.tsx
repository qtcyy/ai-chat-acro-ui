import { HttpClient, HttpInterceptorFn, withInterceptors } from "@ngify/http";
import { createContext, useContext } from "react";

const HttpContext = createContext<HttpClient | null>(null);

type HttpContextProviderProps = {
  children: React.ReactNode;
  fnInterceptors?: HttpInterceptorFn[];
};

export const useHttp = () => {
  return useContext(HttpContext);
};

export const HttpContextProvider = (props: HttpContextProviderProps) => {
  const fnInterceptors = () => props.fnInterceptors || [];
  const http = new HttpClient(withInterceptors(fnInterceptors()));

  return (
    <HttpContext.Provider value={http}>{props.children}</HttpContext.Provider>
  );
};
