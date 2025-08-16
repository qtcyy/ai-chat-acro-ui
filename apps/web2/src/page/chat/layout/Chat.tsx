import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HttpLoading, useHttp } from "utils";
import { MessageList, RenderersType } from "../renderer/MessageList";
import { MDRenderer } from "components";
import { Sender } from "../Sender/Sender";
import { useChat } from "../hooks/useChat";
import { v4 } from "uuid";
import SimpleBar from "simplebar-react";
import { ChatType, LocalStorageKey } from "../hooks/useHistory";

const ROLE = {
  start: "start",
  query: "query",
  response: "response",
} as const;

export type RoleType = keyof typeof ROLE;

export type ChunkType = "human" | "ai" | "tool" | "start" | "AIMessageChunk";

export type MessageType = {
  content: string;
  additional_kwargs: {
    reasoning_content?: string;
    tool_calls?: [];
  };
  response_metadata: {
    finish_reason?: string;
    model_name?: string;
  };
  type: ChunkType;
  name?: string;
  id: string;
  isProcessing?: boolean;
};

const Chat = () => {
  const chatId = useParams().chatId;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const chats = JSON.parse(
    localStorage.getItem(LocalStorageKey) ?? ""
  ) as ChatType[];
  const chatItem = chats.find((chat) => chat.id === chatId);

  const http = useHttp();
  const { loading, loadingOperator } = HttpLoading();

  const { ask, streamLoading, cancel } = useChat({
    chatId: chatId ?? v4(),
    messages: messages,
    setMessages: setMessages,
    onOpen() {},
    onClose() {},
  });

  useEffect(() => {
    http
      ?.get<MessageType[]>(`http://localhost:8000/chat/history/${chatId}`)
      .pipe(loadingOperator)
      .subscribe({
        next: (data) => setMessages(data),
        error: (error) => console.error(`Error loading messages: ${error}`),
      });
  }, [chatId]);

  const renderer: RenderersType<MessageType> = {
    [ROLE.query]: {
      render: (content, id) => {
        return (
          <div className="bg-blue-50 text-gray-800 p-4 rounded-lg shadow-sm border border-blue-200 relative">
            <div className="absolute top-0 right-0 w-1 h-full bg-blue-400 rounded-r-lg"></div>
            <MDRenderer text={content.content} />
          </div>
        );
      },
    },
    [ROLE.response]: {
      render: (content, id) => {
        const reasoningContent = content.additional_kwargs.reasoning_content;
        const [foldThink, setFoldThink] = useState(true);

        useEffect(() => {
          // 处理中时展开，处理结束时折叠
          setFoldThink(!content.isProcessing);
        }, [content.isProcessing]);

        if (content.type === "tool") {
          return (
            <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400 shadow-sm">
              <div className="text-orange-800 font-medium">
                🛠️ {content.isProcessing ? "Tool Calling" : "Tool Called"}
              </div>
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-4">
            {reasoningContent && (
              <div className="bg-gray-50 rounded-lg border-l-4 border-blue-400 overflow-hidden shadow-sm">
                <div
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                  onClick={() => setFoldThink(!foldThink)}
                >
                  <div className="text-blue-800 font-medium flex items-center gap-2">
                    💭 {content.isProcessing ? "Thinking" : "Finish Think"}
                    <span className="text-xs text-gray-500">
                      {foldThink ? "(点击展开)" : "(点击折叠)"}
                    </span>
                  </div>
                  <div
                    className={`transform transition-transform duration-300 text-blue-600 ${
                      foldThink ? "" : "rotate-180"
                    }`}
                  >
                    ▼
                  </div>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    foldThink
                      ? "max-h-0 opacity-0"
                      : "max-h-[800px] opacity-100 pb-4"
                  }`}
                >
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none"></div>
                    <SimpleBar
                      className="w-full max-h-52 overflow-auto"
                      forceVisible="y"
                    >
                      <div className="px-4 pt-2">
                        <MDRenderer
                          text={reasoningContent}
                          fontSize="13px"
                          textColor="#6b7280"
                          lineHeight="1.5"
                          className="thinking-content"
                        />
                      </div>
                    </SimpleBar>
                  </div>
                </div>
              </div>
            )}

            {content.content.trim() && (
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                <MDRenderer
                  text={content.content}
                  fontSize="15px"
                  textColor="#374151"
                  lineHeight="1.7"
                  className="main-content"
                />
              </div>
            )}
          </div>
        );
      },
    },
    [ROLE.start]: {
      render: () => {
        return (
          <div className="flex justify-center my-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-full border border-blue-200">
              <div className="text-blue-600 font-medium">
                ✨ Hello! 开始对话吧
              </div>
            </div>
          </div>
        );
      },
    },
  };

  return (
    <ChatContainer>
      <HeaderContainer>
        <HeaderContent>
          <ChatIcon>💬</ChatIcon>
          <ChatTitle>{chatItem?.title || "新对话"}</ChatTitle>
        </HeaderContent>
      </HeaderContainer>
      <SimpleBar
        className="flex-1"
        style={{
          width: "100%",
          // height: "calc(100vh - 194px)",
          height: "100%",
          overflow: "auto",
        }}
        forceVisible="y"
      >
        <MessageList<MessageType> messages={messages} renderer={renderer} />
      </SimpleBar>
      <Sender ask={ask} cancel={cancel} loading={streamLoading} />
    </ChatContainer>
  );
};

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px !important;
  min-height: 60px;
  max-height: 60px;
  width: 100%;
  z-index: 10;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  box-sizing: border-box;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  max-width: 800px;
  width: 100%;
`;

const ChatIcon = styled.div`
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const ChatTitle = styled.h1`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ChatContainer = styled.div`
  min-width: 320px;
  /* max-width: 1200px; */
  width: 100%;
  height: 100vh;
  /* min-height: 100vh; */
  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  /* 响应式最小宽度 */
  @media (max-width: 768px) {
    min-width: 280px;
  }

  @media (max-width: 480px) {
    min-width: 240px;
  }
`;

export { Chat };
