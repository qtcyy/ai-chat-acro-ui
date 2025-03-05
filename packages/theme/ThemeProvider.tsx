import {
  createContext,
  ReactNode,
  useContext,
  FC,
  useState,
  useEffect,
} from "react";
import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { GlobalStyles } from "./GlobalStyles";

const LightTheme: DefaultTheme = {
  mode: "light",
  colors: {
    primary: "#F4F2EC",
    secondary: "",
    background: "#F4F2EC",
    text: "#000",
    boxShadow: "2px 4px 12px rgba(0, 0, 0, 0.1);",
    componentBg: "#fff",
    bubbleUserBg: "#E2E0D5",
    bubbleAssistantBg: "#FAF9F6",
  },
};

const DarkTheme: DefaultTheme = {
  mode: "dark",
  colors: {
    primary: "#272725",
    secondary: "",
    background: "#272725",
    text: "#f5f4ef",
    boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.25),
            0px 0px 1px 1px rgba(255, 255, 255, 0.2) inset;`,
    componentBg: "#31313a",
    bubbleUserBg: "#1C1C1C",
    bubbleAssistantBg: "#313131",
  },
};

interface ThemeContextType {
  theme: DefaultTheme;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  toggleTheme() {},
  setTheme() {},
  isDarkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme-preference");
    if (savedTheme) {
      return savedTheme === "dark";
    } else {
      localStorage.setItem("theme-preference", "light");
    }
    return false;
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme());

  const toggleTheme = () => {
    setIsDarkMode((old) => !old);
  };

  const setTheme = (theme: "light" | "dark") => {
    if (theme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme-preference", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const currentTheme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, toggleTheme, isDarkMode, setTheme }}
    >
      <StyledThemeProvider theme={currentTheme}>
        <GlobalStyles theme={currentTheme} />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
