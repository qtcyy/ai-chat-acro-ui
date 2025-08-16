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
import { HttpLoading, useHttp } from "utils";

const LocalStorageKey = "ai-chat-history";

type ChatType = {
  id: UUIDTypes;
  title: string;
  createTime?: string;
  updateTime?: string;
};

type HistoryContextType = {
  chats: ChatType[];
  createChat: (title?: string) => ChatType;
  renameChat: (id: UUIDTypes, title: string) => boolean;
  deleteChat: (id: UUIDTypes) => Promise<boolean>;
};

const HistoryContext = createContext<HistoryContextType>({
  chats: [],
  createChat: () => ({ id: v4(), title: "", messages: [] }),
  renameChat: () => true,
  deleteChat: () => Promise.resolve(true),
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = (props: { children: ReactNode }) => {
  // 获取本地保存的历史对话信息（临时方案）
  const StorageStr = localStorage.getItem(LocalStorageKey);

  const [storageItem, setStorageItem] = useState<ChatType[]>(
    // 序列化为对象
    JSON.parse(StorageStr ?? "")
  );
  const http = useHttp();
  const { loading, loadingOperator } = HttpLoading();

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
      id: newId,
      createTime: dayjs().toISOString(),
      updateTime: dayjs().toISOString(),
    };
    const newChats = [...chats, newChat];
    setChats(newChats);
    localStorage.setItem(LocalStorageKey, JSON.stringify(newChats));

    return newChat;
  };

  const renameChat = (id: UUIDTypes, title: string) => {
    const chatsCopy = [...chats];
    const idx = chatsCopy.findIndex((chat) => chat.id === id);
    if (idx === -1) {
      return false;
    }
    chatsCopy[idx] = {
      ...chatsCopy[idx],
      title: title,
    };
    setChats(chatsCopy);
    localStorage.setItem(LocalStorageKey, JSON.stringify(chatsCopy));

    return true;
  };

  const deleteChat = async (id: UUIDTypes) => {
    let chatsCopy = [...chats];
    const idx = chatsCopy.findIndex((chat) => chat.id === id);
    if (idx === -1) {
      return false;
    }
    chatsCopy = chatsCopy.filter((chat) => chat.id !== id);
    setChats(chatsCopy);
    localStorage.setItem(LocalStorageKey, JSON.stringify(chatsCopy));
    http
      ?.delete(`http://localhost:8000/chat/history/${id}`)
      .pipe(loadingOperator)
      .subscribe({
        next: (data) => console.log(data),
        error: (error) => {
          console.error(error);
          throw error;
        },
      });

    return true;
  };

  const ContextValue = {
    chats,
    createChat,
    renameChat,
    deleteChat,
  };

  return (
    <HistoryContext.Provider value={ContextValue}>
      {props.children}
    </HistoryContext.Provider>
  );
};
