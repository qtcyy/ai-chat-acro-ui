import styled from "styled-components";
import { DeepSeekIcons } from "../../../assets/home/Deepseek";
import { Divider, Tooltip } from "@arco-design/web-react";
import { IconFolderAdd, IconList } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SiderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  left: 0;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 24px;
  margin-left: 20px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Sider = () => {
  const route = useNavigate();

  const handleNewCon = () => {
    const chatId = uuidv4();
    route(`/ai/chat/page/${chatId}`);
  };

  return (
    <SiderWrapper>
      <ContentWrapper>
        <Tooltip position="right" trigger={"hover"} content="返回主页">
          <div
            className="h-[40px] w-[40px] cursor-pointer rounded-md transition-colors duration-100 hover:bg-gray-200"
            onClick={() => route("/ai/chat")}
          >
            <DeepSeekIcons />
          </div>
        </Tooltip>
        <Divider className={"my-2"} type="horizontal" />
        <Tooltip position="right" trigger={"hover"} content="新建对话">
          <div
            className="p-3 my-2 cursor-pointer rounded-md transition-colors duration-100 hover:bg-gray-200"
            onClick={handleNewCon}
          >
            <IconFolderAdd className=" scale-150" />
          </div>
        </Tooltip>
        <Tooltip position="right" trigger={"hover"} content="历史记录">
          <div
            className="p-3 my-2 cursor-pointer rounded-md transition-colors duration-100 hover:bg-gray-200"
            onClick={() => route("/ai/chat/list")}
          >
            <IconList className=" scale-150" />
          </div>
        </Tooltip>
        <Divider className={"my-2"} type="horizontal" />
      </ContentWrapper>
    </SiderWrapper>
  );
};

export { Sider };
