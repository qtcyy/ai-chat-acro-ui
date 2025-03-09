import { JSX } from "react";
import styled from "styled-components";

const AppearancePage = (): JSX.Element => {
  return (
    <Card className="border-gray-300 border-[.5px] flex flex-col gap-4">
      <div className="text-lg font-bold mt-8">默认对话模型</div>
      <div className="flex flex-row w-full gap-[16px]">
        <Card
          className="flex-1 justify-center items-center text-center 
        border-gray-300 border-[.5px]"
        >
          DeepSeek
        </Card>
        <Card
          className="flex-1 justify-center items-center text-center 
        border-gray-300 border-[.5px]"
        >
          qwq 32B
        </Card>
        <Card
          className="flex-1 justify-center items-center text-center 
        border-gray-300 border-[.5px]"
        ></Card>
      </div>
    </Card>
  );
};

const Card = styled.div<{ $selected?: boolean; $options?: boolean }>`
  background: ${({ theme }) => theme.colors.bubbleAssistantBg};
  border-radius: 16px;
  padding: 24px;
`;

export default AppearancePage;
