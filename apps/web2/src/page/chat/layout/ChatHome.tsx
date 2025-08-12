import { Button } from "antd";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const ChatHome = () => {
  const handleNewChat = () => {
    const newChatId = uuidv4();
    console.log(newChatId);
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
