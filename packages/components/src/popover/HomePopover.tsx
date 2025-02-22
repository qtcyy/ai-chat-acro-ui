import { Divider, Popover } from "@arco-design/web-react";
import { ReactNode } from "react";
import styled from "styled-components";
import { Icon } from "../assets/Icon";
import {
  IconArrowRight,
  IconLarkColor,
  IconTiktokColor,
  IconXiguaColor,
} from "@arco-design/web-react/icon";
import { DeepSeekIcons } from "../assets/popover/Icons";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 230px;
  background: #fff;
`;

const Content = () => {
  const route = useNavigate();

  return (
    <ContentWrapper>
      <div className="p-2 inline-flex flex-row gap-4 items-center">
        <Icon />
        <div className="text-xl font-bold">Welcome</div>
        <div className="ml-auto p-2 group rounded-e-full hover:bg-blue-500 transition-colors duration-300 ease-out cursor-pointer">
          <IconArrowRight className="size-5 group-hover:text-white transition-all duration-300 ease-out" />
        </div>
      </div>
      <Divider style={{ margin: "5px" }} />
      <div className="p-2 flex flex-row gap-8 ">
        <div className="flex-1 flex flex-col gap-4">
          <div
            className="h-[70px]  pl-3 flex flex-row gap-3 items-center rounded-xl hover:bg-gray-100/80 transition-all duration-300 ease-out cursor-pointer group"
            onClick={() => route("/ai/chat")}
          >
            <div className="size-8 transition-transform duration-300 group-hover:scale-110">
              <DeepSeekIcons />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-lg font-medium translate-y-3 text-gray-800 transform transition-all duration-300 ease-out group-hover:translate-y-[-4px]">
                DeepSeek
              </div>
              <div className="text-sm text-gray-500 transform transition-all duration-300 ease-out opacity-0 -translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                DeepSeek平台
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-[70px]  pl-3 flex flex-row gap-3 items-center rounded-xl hover:bg-gray-100/80 transition-all duration-300 ease-out cursor-pointer group">
              <IconTiktokColor className="size-8 transition-transform duration-300 group-hover:scale-110" />
              <div className="flex flex-col gap-1">
                <div className="text-lg font-medium translate-y-3 text-gray-800 transform transition-all duration-300 ease-out group-hover:translate-y-[-4px]">
                  TickTok
                </div>
                <div className="text-sm text-gray-500 transform transition-all duration-300 ease-out opacity-0 -translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                  抖音短视频
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-[70px]  pl-3 flex flex-row gap-3 items-center rounded-xl hover:bg-gray-100/80 transition-all duration-300 ease-out cursor-pointer group">
            <IconLarkColor className="size-8 transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col gap-1">
              <div className="text-lg font-medium translate-y-3 text-gray-800 transform transition-all duration-300 ease-out group-hover:translate-y-[-4px]">
                Lark App
              </div>
              <div className="text-sm text-gray-500 transform transition-all duration-300 ease-out opacity-0 -translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                飞书平台
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-[70px] pl-3 flex flex-row gap-3 items-center rounded-xl hover:bg-gray-100/80 transition-all duration-300 ease-out cursor-pointer group">
              <IconXiguaColor className="size-8 transition-transform duration-300 group-hover:scale-110" />
              <div className="flex flex-col gap-1">
                <div className="text-lg font-medium translate-y-3 text-gray-800 transform transition-all duration-300 ease-out group-hover:translate-y-[-4px]">
                  Watermelon
                </div>
                <div className="text-sm text-gray-500 transform transition-all duration-300 ease-out opacity-0 -translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                  西瓜视频
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

const HomePopover = (props: Props) => {
  return (
    <Popover
      className={"!max-w-[410px] !left-3"}
      content={<Content />}
      trigger={["click", "hover"]}
      style={{ width: "400px", height: "250px" }}
    >
      {props.children}
    </Popover>
  );
};

export { HomePopover };
