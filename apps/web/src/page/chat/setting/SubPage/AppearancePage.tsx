import { motion } from "motion/react";
import { JSX, useState } from "react";
import styled, { css } from "styled-components";
import { useSetting } from "../../hooks/useSetting";
import { useTheme } from "theme";

type DefaultModelType = {
  key: string;
  name: string;
};

type ThemeType = {
  key: "dark" | "light";
  name: string;
};

const modelList: DefaultModelType[] = [
  { key: "deepseek-r1", name: "DeepSeek" },
  { key: "qwen-omni-turbo", name: "qwen omni" },
  { key: "qwq-32b", name: "qwq 32B" },
];

const themeList: ThemeType[] = [
  { key: "dark", name: "夜间模式" },
  { key: "light", name: "白天模式" },
];

const AppearancePage = (): JSX.Element => {
  const { defaultModel, setDefaultModel } = useSetting();
  const { isDarkMode, setTheme } = useTheme();

  return (
    <Card className="border-gray-300 border-[.5px] flex flex-col gap-4">
      <div className="text-lg font-bold mt-8">默认对话模型</div>
      <div className="flex flex-row w-full gap-[16px]">
        {modelList.map((model) => {
          const handleClick = () => {
            setDefaultModel(model.key);
          };

          return (
            <Card
              key={model.key}
              $options
              $selected={defaultModel === model.key}
              whileTap={{ scale: 0.9 }}
              onClick={handleClick}
              className="flex-1 justify-center items-center text-center 
        border-gray-300 border-[.5px]"
            >
              {model.name}
            </Card>
          );
        })}
      </div>
      <div className="mt-6 text-lg font-bold">主题颜色</div>
      <div className="flex flex-row w-full gap-[16px]">
        {themeList.map((theme) => {
          const handleClick = () => {
            setTheme(theme.key);
          };

          return (
            <Card
              key={theme.key}
              $options
              $selected={theme.key === (isDarkMode ? "dark" : "light")}
              onClick={handleClick}
              className="flex-1 justify-center items-center text-center 
        border-gray-300 border-[.5px]"
            >
              {theme.name}
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

const Card = styled(motion.div)<{ $selected?: boolean; $options?: boolean }>`
  background: ${({ theme }) => theme.colors.bubbleAssistantBg};
  border-radius: 16px;
  padding: 24px;

  ${(props) =>
    props.$options &&
    css`
      &:hover {
        background: ${({ theme }) => theme.colors.bubbleUserBg};
      }
    `}

  ${(props) =>
    props.$selected &&
    css`
      border: 1px solid blue;
    `}
`;

export default AppearancePage;
