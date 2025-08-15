import { Button } from "antd";
import styled from "styled-components";
import { useHistory } from "../hooks/useHistory";
import { useNavigate } from "react-router-dom";

const ChatHome = () => {
  const { createChat } = useHistory();
  const route = useNavigate();

  const handleNewChat = async () => {
    // test load
    const chat = createChat("测试");
    route(`/chat/${chat.id}`);
  };

  return (
    <ChatHomeContainer>
      <div className="text-3xl">开始聊天吧</div>
      <Button className="mt-4" type="primary" onClick={handleNewChat}>
        新建对话
      </Button>
    </ChatHomeContainer>
  );
};

const ChatHomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { ChatHome };
