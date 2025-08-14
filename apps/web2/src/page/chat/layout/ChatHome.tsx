import { Button } from "antd";
import styled from "styled-components";
import { useHistory } from "../hooks/useHistory";

const ChatHome = () => {
  const { loadChatMessages } = useHistory();

  const handleNewChat = () => {
    // test load
    loadChatMessages("4");
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
