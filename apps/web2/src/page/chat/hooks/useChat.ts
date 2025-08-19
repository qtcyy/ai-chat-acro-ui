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

// 处理内容转换，确保返回有效字符串
const contentTransfer = (content: string | undefined) => {
  if (!content || content === "null" || content === "undefined") {
    return "";
  } else {
    return content;
  }
};

export const useChat = (props: UseChatProps) => {
  const { setMessages, onOpen, onClose, chatId } = props;

  // 处理流式消息数据块，更新消息列表
  const onMessageChunk = (data: string) => {
    try {
      const messageChunk = JSON.parse(data) as MessageType;
      if (messageChunk.response_metadata.finish_reason === "stop") {
        const newResponseMessage: MessageType = {
          content: "",
          additional_kwargs: {
            reasoning_content: "",
          },
          response_metadata: {},
          type: "AIMessageChunk",
          isProcessing: true,
          id: v4(),
        };
        setMessages((currentMessages) => {
          const newMessages = [...currentMessages];
          newMessages[newMessages.length - 1].isProcessing = false;
          return [...newMessages, newResponseMessage];
        });
      }
      // 没有内容鉴定为工具调用挂起chunk
      if (
        !messageChunk.content &&
        !messageChunk.additional_kwargs.reasoning_content
      ) {
        return;
      }
      messageChunk.isProcessing = true;
      if (
        (messageChunk.type === "AIMessageChunk" &&
          "tool_calls" in messageChunk.additional_kwargs) ||
        messageChunk.response_metadata.finish_reason === "tool_calls"
      ) {
        messageChunk.type = "tool";
      }
      const chunkType = messageChunk.type;

      setMessages((currentMessages) => {
        const lastMessage = currentMessages[currentMessages.length - 1];
        // console.log("当前最后一条消息:", lastMessage);

        if (lastMessage.type === chunkType) {
          if (chunkType === "ai" || chunkType === "AIMessageChunk") {
            const lastReason = lastMessage.additional_kwargs.reasoning_content;
            const lastContent = lastMessage.content;
            const chunkReason =
              messageChunk.additional_kwargs.reasoning_content;
            const chunkContent = messageChunk.content;

            const newReason =
              contentTransfer(lastReason) + contentTransfer(chunkReason);
            const newContent =
              contentTransfer(lastContent) + contentTransfer(chunkContent);

            const newMessage: MessageType = {
              id: messageChunk.id,
              content: newContent,
              additional_kwargs: {
                reasoning_content: newReason,
              },
              response_metadata: {},
              isProcessing: newContent ? false : true,
              type: chunkType,
            };

            const newMessages = [...currentMessages];
            newMessages[newMessages.length - 1] = newMessage;
            return newMessages;
          } else if (chunkType === "tool") {
            const newMessages = [...currentMessages];
            newMessages[newMessages.length - 1].isProcessing = false;
            return [...newMessages, messageChunk];
          } else {
            return currentMessages;
          }
        } else {
          console.log(`add a new message with type: ${chunkType}`);
          const newMessages = [...currentMessages];
          newMessages[newMessages.length - 1].isProcessing = false;
          return [...newMessages, messageChunk];
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { complete, cancel, completion, loading } = createEventSource({
    api: "http://localhost:8000/chat/tools",
    onMessage(event, completion) {
      // console.log(event.data);
      onMessageChunk(event.data);
      return completion;
    },
    // 连接建立时回调，创建初始AI响应消息
    onOpen() {
      console.log("open");
      onOpen?.();
      const newResponseMessage: MessageType = {
        content: "",
        additional_kwargs: {
          reasoning_content: "",
        },
        response_metadata: {},
        type: "AIMessageChunk",
        isProcessing: true,
        id: v4(),
      };
      setMessages((pre) => {
        const newMessages = [...pre, newResponseMessage];
        return newMessages;
      });
    },
    // 连接错误时回调
    onError() {
      console.error("error when transport");
    },
    // 连接关闭时回调
    onFinal() {
      console.log("close");
      onClose?.();
    },
  });

  // 发送用户查询，创建用户消息并启动流式响应
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
    complete(body).pipe().subscribe();
  };

  const streamLoading = loading;

  return {
    ask,
    streamLoading,
    cancel,
    completion,
  };
};
