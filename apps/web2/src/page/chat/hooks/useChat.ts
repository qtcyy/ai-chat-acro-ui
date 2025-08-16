import { createEventSource } from "utils";
import { MessageType } from "../layout/Chat";
import { UUIDTypes, v4 } from "uuid";

type UseChatProps = {
  chatId: UUIDTypes;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  onOpen?: () => void;
  onClose?: () => void;
};

type StreamBodyType = {
  query: string;
  thread_id: UUIDTypes;
  model?: string;
  summary_with_llm?: boolean;
};

export const useChat = (props: UseChatProps) => {
  const { messages, setMessages, onOpen, onClose, chatId } = props;

  const { complete, cancel, completion, loading } = createEventSource({
    api: "http://localhost:8000/chat/tools",
    onMessage(event, completion) {
      console.log(event.data);
      // c9394f42-4d16-49c1-8583-b1e7c3d9be01
      return completion;
    },
    onOpen() {
      console.log("open");
      onOpen?.();
      const newResponseMessage: MessageType = {
        content: "",
        additional_kwargs: {
          reasoning_content: "",
        },
        response_metadata: {},
        type: "ai",
        id: v4(),
      };
      setMessages((pre) => [...pre, newResponseMessage]);
    },
    onError() {
      console.error("error when transport");
    },
    onFinal() {
      console.log("close");
      onClose?.();
    },
  });

  const ask = (query: string, model?: string, summary?: boolean) => {
    // 用户消息
    const newQueryMessage: MessageType = {
      content: query,
      additional_kwargs: {
        reasoning_content: "",
      },
      response_metadata: {},
      type: "human",
      id: v4(),
    };
    setMessages((pre) => [...pre, newQueryMessage]);
    const body: StreamBodyType = {
      query: query,
      thread_id: chatId,
      model: model,
      summary_with_llm: summary,
    };
    complete(body).subscribe();
  };

  const streamLoading = loading;

  return {
    ask,
    streamLoading,
    cancel,
    completion,
  };
};
