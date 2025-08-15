import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HttpLoading, useHttp } from "utils";
import { MessageList, RenderersType } from "../renderer/MessageList";

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

  useEffect(() => {
    console.log(http);
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
        return <div className="my-4">{content.content}</div>;
      },
    },
    [ROLE.response]: {
      render: (content, id) => {
        const reasoningContent = content.additional_kwargs.reasoning_content;

        if (content.type === "tool") {
          return <div className="my-4">Tool Calling</div>;
        }

        return (
          <div className="flex flex-col gap-4 my-5">
            {reasoningContent && (
              <div className="flex flex-row gap-3">
                <div>Thinking:</div>
                <div>{reasoningContent}</div>
              </div>
            )}

            <div>{content.content}</div>
          </div>
        );
      },
    },
    [ROLE.start]: {
      render: () => {
        return (
          <div className="flex">
            <div>Hello</div>
          </div>
        );
      },
    },
  };

  return (
    <ChatContainer>
      <MessageList<MessageType> messages={messages} renderer={renderer} />
    </ChatContainer>
  );
};

const ChatContainer = styled.div``;

export { Chat };
