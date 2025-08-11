import { createContext, ReactNode, useEffect } from "react";
import { updateBaseUrl } from "..";

type AxiosConfigType = {
  baseUrl: string;
};

const AxiosContext = createContext<AxiosConfigType>({ baseUrl: "" });

type Props = {
  baseUrl: string;
  children: ReactNode;
};

const AxiosProvider = (props: Props) => {
  useEffect(() => {
    updateBaseUrl(props.baseUrl);
  }, []);

  return (
    <AxiosContext.Provider value={{ baseUrl: props.baseUrl }}>
      {props.children}
    </AxiosContext.Provider>
  );
};

export { AxiosProvider };
