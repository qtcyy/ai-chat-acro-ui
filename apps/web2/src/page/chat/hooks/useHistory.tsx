import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UUIDTypes } from "uuid";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { request } from "utils";
import { BaseResponseType } from "../types/RequestType";

const LocalStorageKey = "ai-chat-history";

type ChatStorageType = {
  id: UUIDTypes;
  title: string;
  createTime?: string;
  updateTime?: string;
};

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

export type ChatType = ChatStorageType & {
  messages: MessageType[];
};

type HistoryContextType = {
  chats: ChatType[];
  createChat: (title?: string) => ChatType;
  loadChatMessages: (id: UUIDTypes) => Promise<void>;
};

const HistoryContext = createContext<HistoryContextType>({
  chats: [],
  createChat: () => ({ id: v4(), title: "", messages: [] }),
  loadChatMessages: () => Promise.resolve(),
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = (props: { children: ReactNode }) => {
  // 获取本地保存的历史对话信息（临时方案）
  const StorageStr = localStorage.getItem(LocalStorageKey);

  const [storageItem, setStorageItem] = useState<ChatStorageType[]>(
    // 序列化为对象
    JSON.parse(StorageStr ?? "")
  );

  // 如果类型不是列表，说明保存内容错误
  if (!Array.isArray(storageItem)) {
    setStorageItem([]);
    localStorage.setItem(LocalStorageKey, JSON.stringify([]));
  }

  // 初始化chats，注意messages为空，需要调用函数进行加载
  const [chats, setChats] = useState<ChatType[]>(
    storageItem.map((item) => ({ ...item, messages: [] }))
  );

  useEffect(() => {}, []);

  const createChat = (title?: string): ChatType => {
    const newId = v4();
    const newChat: ChatType = {
      title: title ?? "Untitled",
      messages: [],
      id: newId,
      createTime: dayjs().toISOString(),
      updateTime: dayjs().toISOString(),
    };
    setChats((pre) => [...pre, newChat]);

    return newChat;
  };

  const loadChatMessages = async (id: UUIDTypes) => {
    const chatsCopy = [...chats];
    const idx = chatsCopy.findIndex((item) => item.id === id);
    if (idx === -1) {
      return Promise.reject("ID not found");
    }
    const response = await request.get<
      BaseResponseType & { data: MessageType[] }
    >(`/chat/history/${id}`);
    const data = response.data;
    chatsCopy[idx].messages = data.data;
    setChats(chatsCopy);
  };

  const ContextValue = {
    chats,
    createChat,
    loadChatMessages,
  };

  return (
    <HistoryContext.Provider value={ContextValue}>
      {props.children}
    </HistoryContext.Provider>
  );
};
