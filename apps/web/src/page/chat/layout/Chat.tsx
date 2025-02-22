import { BubbleList, MDRenderer, RolesType } from "components";
import { MessageType, useChatStorage } from "../hooks/useChatStorage";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useChat } from "../hooks/useChat";
import { useEffect, useState } from "react";
import { Sender } from "../Sender/Sender";
import {
  IconDelete,
  IconDown,
  IconEdit,
  IconShareInternal,
  IconUp,
} from "@arco-design/web-react/icon";
import { useScroll } from "../hooks/useScroll";
import { Dropdown, Menu } from "@arco-design/web-react";
import NiceModal from "@ebay/nice-modal-react";
import { RenameModal } from "../history/RenameModal";
import { DeleteModal } from "../history/DeleteModal";
import { useAutoRename } from "../hooks/useAutoRename";
import { useStore } from "../../../store";

const ChatWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  display: flex;
  min-width: 375px;
  height: 56px;
  padding: 14px 50px;
  background: rgb(244, 242, 236);
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .title {
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s ease;
    &:hover {
      background: #e5e7ed;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -20px; /* 控制渐变高度 */
    left: 0;
    width: 100%;
    height: 20px;
    background: linear-gradient(
      to bottom,
      rgba(244, 242, 236, 1) 0%,
      rgba(244, 242, 236, 0) 100%
    );
    pointer-events: none; /* 防止遮挡下方交互 */
  }
`;

const QueryWrapper = styled.div`
  display: inline-flex;
  padding: 16px;
  max-width: 70%;
  background: rgb(226, 224, 213);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  font-family: sans-serif;
  font-size: 18px;
  margin-left: auto;
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 300px;
  max-width: 80%;
  /* background: #fff; */
  background: rgb(250, 249, 246);
  padding: 24px;
  font-family: serif;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ThinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 16px;
`;

const SenderWrapper = styled.div`
  position: sticky;
  /* top: 100vh; */
  bottom: 0px;
  width: 100%;
`;

const SAFE_DIST = styled.div`
  /* height: 50px; */
`;

const getCurrentTime = () => {
  const time = dayjs();
  if (time.hour() < 12) {
    return "早上好!";
  } else if (time.hour() === 12) {
    return "中午好!";
  } else if (time.hour() < 18) {
    return "下午好!";
  } else {
    return "晚上好!";
  }
};

export const ROLE = {
  user: "user",
  assistant: "assistant",
  system: "system",
  start: "start",
} as const;

const Chat = () => {
  const store = useChatStorage();
  const scroll = useScroll();
  const chatId = useParams().chatId;
  const { waitSendQuestion, setWaitSendQuestion } = useStore();
  const route = useNavigate();
  if (!chatId) {
    return null;
  }

  let history = store?.chats.find((o) => o.chatId === chatId);

  useEffect(() => {
    console.log(messages);
    history = store?.chats.find((o) => o.chatId === chatId);
    if (!history) {
      history = {
        chatId,
        name: "新建对话",
        isName: false,
        content: [{ role: ROLE.start }],
        createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      store?.addChat(history);
    }

    setMessages(history.content);
  }, [chatId]);

  useEffect(() => {
    if (waitSendQuestion) {
      ask(waitSendQuestion);
      setWaitSendQuestion(undefined);
    }
  }, [waitSendQuestion]);

  const { messages, setMessages, ask, loading, cancel } = useChat({
    initialMessages: history?.content,
    onOpen: () => {},
    onMessage: () => {},
    onClose: async () => {
      console.log("start close");
      setMessages((old) => {
        const last = old[old.length - 1].content;
        if (last) {
          last.isEnd = true;
        }
        old[old.length - 1].content = last;
        return [...old];
      });
      console.log("messages: ", messages);
      let nowChat = store?.chats.find((o) => o.chatId === chatId);
      let newName = "";
      if (!nowChat?.isName) {
        newName = await getName();
      }
      store?.updateChat((old) => {
        const index = old.findIndex((o) => o.chatId === chatId);
        let newChat = old[index];
        newChat.content = messages;
        newChat.name = newName || newChat.name;
        newChat.isName = newChat.isName || newName !== "";
        newChat.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
        old[index] = newChat;
        return [...old];
      });
      console.log(store?.chats);
    },
  });

  const roles: RolesType<MessageType> = {
    [ROLE.start]: {
      render: () => {
        return (
          <div className="flex flex-col gap-8 mt-[100px] mb-[50px]">
            <div className="text-3xl">{getCurrentTime()}</div>
            <div className="text-xl">你好，请问有什么可以帮您？</div>
          </div>
        );
      },
    },
    [ROLE.assistant]: {
      render: (content) => {
        const [collapsed, setCollapsed] = useState(false);

        let think = content?.think;
        const answer = content?.answer;
        if (think) {
          think = think.replaceAll("undefined", " ");
        }

        return (
          <AnswerWrapper>
            {think && (
              <ThinkWrapper>
                <div className=" flex flex-row items-center">
                  {content?.isThink ? (
                    <div className="my-2 text-xl">思考中...</div>
                  ) : (
                    <div className="my-2 text-xl">思考过程</div>
                  )}
                  <div
                    className="ml-auto scale-125 p-1 cursor-pointer"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    {collapsed ? <IconUp /> : <IconDown />}
                  </div>
                </div>
                {!collapsed && <MDRenderer text={think} />}
              </ThinkWrapper>
            )}
            <MDRenderer text={answer ?? " "} />
          </AnswerWrapper>
        );
      },
    },
    [ROLE.user]: {
      render: (content) => {
        const answer = content?.answer;

        return <QueryWrapper>{answer}</QueryWrapper>;
      },
    },
  };

  const { getName } = useAutoRename({
    messages: messages,
    body: { model: "doubao-1-5-lite-32k-250115" },
  });

  const [autoScroll, setAutoScroll] = useState(true);

  const DropAction: Record<string, () => void> = {
    ["1"]: async () => {
      const name = await NiceModal.show(RenameModal, { chat: history });
      if (typeof name !== "string") {
        return;
      }
      store?.updateChat((old) => {
        const index = old.findIndex((o) => o.chatId === chatId);
        old[index].name = name;
        return [...old];
      });
    },
    ["2"]: () => {},
    ["3"]: async () => {
      const confirm = await NiceModal.show(DeleteModal);
      if (confirm) {
        store?.removeChat(chatId);
        route("/ai/chat/list");
      }
    },
  };

  const DropList = () => {
    const handleClick = (key: string) => {
      DropAction[key]();
    };

    return (
      <Menu onClickMenuItem={(key) => handleClick(key)}>
        <Menu.Item key="1">
          <div className=" flex flex-row gap-4 items-center justify-center text-lg pl-2 pr-10">
            <IconEdit />
            <div>修改名称</div>
          </div>
        </Menu.Item>
        <Menu.Item key="2">
          <div className=" flex flex-row gap-4 items-center justify-left text-lg pl-2 pr-10">
            <IconShareInternal />
            <div>分享</div>
          </div>
        </Menu.Item>
        <Menu.Item key="3">
          <div className=" flex flex-row gap-4 items-center justify-left text-lg pl-2 pr-10 text-red-500">
            <IconDelete />
            <div>删除</div>
          </div>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <ChatWrapper>
      <HeaderWrapper>
        <Dropdown droplist={DropList()} trigger={"click"}>
          <div className="title text-lg px-[16px] py-[4px] mt-1 flex flex-row justify-center items-center">
            {history?.name}
            <IconDown />
          </div>
        </Dropdown>
      </HeaderWrapper>
      <BubbleList<MessageType>
        items={messages}
        roles={roles}
        autoScroll={autoScroll}
        //@ts-ignore
        target={scroll?.target.current?.getScrollElement()}
        scrollStore={scroll}
      />
      <SAFE_DIST />
      <SenderWrapper>
        <Sender ask={ask} loading={loading} cancel={cancel} showTop />
      </SenderWrapper>
    </ChatWrapper>
  );
};

export { Chat };
