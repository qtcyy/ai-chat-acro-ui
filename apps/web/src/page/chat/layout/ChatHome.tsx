import styled from "styled-components";
import { Sender } from "../Sender/Sender";
import { useNavigate } from "react-router-dom";
import { useChatStorage } from "../hooks/useChatStorage";
import { v4 as uuidv4 } from "uuid";
import { ROLE } from "./Chat";
import dayjs from "dayjs";
import { useStore } from "../../../store";

const ContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChatHome = () => {
  const route = useNavigate();
  const chatStore = useChatStorage();
  const { setWaitSendQuestion } = useStore();

  const ask = (question: string) => {
    const chatId = uuidv4();
    if (!chatStore?.addChat) return;
    chatStore?.addChat({
      chatId,
      name: "新建对话",
      isName: false,
      content: [{ role: ROLE.start }],
      createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
    setWaitSendQuestion(question);
    route(`/ai/chat/page/${chatId}`);
  };

  return (
    <ContentWrapper>
      <div className="text-6xl font-bold bg-gradient-to-b from-blue-500 to-red-500 bg-clip-text text-transparent">
        DeepSeek
      </div>
      <div className="w-full mt-10">
        <Sender
          ask={ask}
          loading={false}
          cancel={() => console.log("cancel")}
          isHome
        />
      </div>
    </ContentWrapper>
  );
};

export { ChatHome };
