import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HttpLoading, useHttp } from "utils";
import { MessageList, RenderersType } from "../renderer/MessageList";
import { MDRenderer } from "components";
import { Sender } from "../Sender/Sender";
import { useChat } from "../hooks/useChat";
import { v4 } from "uuid";

const ROLE = {
  start: "start",
  query: "query",
  response: "response",
} as const;

export type RoleType = keyof typeof ROLE;

export type MessageType = {
  content: string;
  additional_kwargs: {
    reasoning_content: string;
  };
  response_metadata: {
    finish_reason?: string;
    model_name?: string;
  };
  type: "human" | "ai" | "tool" | "start";
  name?: string;
  id: string;
};

const Chat = () => {
  const chatId = useParams().chatId;
  const [messages, setMessages] = useState<MessageType[]>([]);

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
          <div className="my-4 flex">
            <div className="ml-auto bg-blue-50 p-3 rounded-lg max-w-[80%]">
              <MDRenderer text={content.content} />
            </div>
          </div>
        );
      },
    },
    [ROLE.response]: {
      render: (content, id) => {
        const reasoningContent = content.additional_kwargs.reasoning_content;
        const [foldThink, setFoldThink] = useState(true);

        if (content.type === "tool") {
          return (
            <div className="my-4 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
              <div className="text-yellow-800 font-medium">🛠️ Tool Calling</div>
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-4 my-5">
            {reasoningContent && (
              <div className="bg-gray-50 rounded-lg border-l-4 border-blue-400 overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                  onClick={() => setFoldThink(!foldThink)}
                >
                  <div className="text-blue-800 font-medium flex items-center gap-2">
                    💭 Thinking
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
                  <div className="px-4 text-gray-700">
                    <MDRenderer text={reasoningContent} />
                  </div>
                </div>
              </div>
            )}

            {content.content.trim() && (
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <MDRenderer text={content.content} />
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
      <MessageList<MessageType> messages={messages} renderer={renderer} />
      <Sender ask={ask} cancel={cancel} loading={streamLoading} />
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  min-width: 320px;
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
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
