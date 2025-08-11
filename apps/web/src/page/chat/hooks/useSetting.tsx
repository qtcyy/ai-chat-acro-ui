import { createContext, ReactNode, useContext, useState } from "react";

interface SettingContextType {
  defaultModel: string;
  setDefaultModel: (value: string) => void;
}

const DefaultSetting: SettingContextType = {
  defaultModel: "deepseek-r1",
  setDefaultModel: () => {},
};

const SettingContext = createContext<SettingContextType>(DefaultSetting);

export const useSetting = () => useContext(SettingContext);

type Props = {
  children: ReactNode;
};

const SettingProvider = ({ children }: Props) => {
  const [defaultModel, setDefaultModel] = useState(DefaultSetting.defaultModel);

  const ContextValue: SettingContextType = { defaultModel, setDefaultModel };

  return (
    <SettingContext.Provider value={ContextValue}>
      {children}
    </SettingContext.Provider>
  );
};

export { SettingProvider };
