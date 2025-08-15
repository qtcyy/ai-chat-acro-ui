import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAsyncEffect } from "ahooks";
import { request } from "utils";
import dayjs from "dayjs";

export type MessageType = {
  content: string;
  additional_kwargs: {
    reasoning_content: string;
  };
  response_metadata: {
    finish_reason?: string;
    model_name?: string;
  };
  type: "human" | "ai" | "tool";
  name?: string;
  id: string;
};

const Chat = () => {
  const chatId = useParams().chatId;
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useAsyncEffect(async () => {
    setLoading(true);
    try {
      console.log("Request baseURL:", request.defaults.baseURL);
      console.log("Request URL:", `/chat/history/${chatId}`);
      const response = await request.get<MessageType[]>(
        `/chat/history/${chatId}`
      );
      console.log(response);
      setMessages(response.data);
      setTimeout(() => console.log(messages), 1000);
    } catch (error) {
      console.error(`Error when loading message ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return <ChatContainer></ChatContainer>;
};

const ChatContainer = styled.div``;

export { Chat };
