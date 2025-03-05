import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      boxShadow: string;
      componentBg: string;
      bubbleUserBg: string;
      bubbleAssistantBg: string;
    };
  }
}
