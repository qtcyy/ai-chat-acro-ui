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
};

const HistoryContext = createContext<HistoryContextType>({
  chats: [],
  createChat: () => ({ id: v4(), title: "", messages: [] }),
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = (props: { children: ReactNode }) => {
  // 获取本地保存的历史对话信息（临时方案）
  const StorageStr = localStorage.getItem(LocalStorageKey);

  const [storageItem, setStorageItem] = useState<ChatType[]>(
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
      id: newId,
      createTime: dayjs().toISOString(),
      updateTime: dayjs().toISOString(),
    };
    const newChats = [...chats, newChat];
    setChats(newChats);
    localStorage.setItem(LocalStorageKey, JSON.stringify(newChats));

    return newChat;
  };

  const ContextValue = {
    chats,
    createChat,
  };

  return (
    <HistoryContext.Provider value={ContextValue}>
      {props.children}
    </HistoryContext.Provider>
  );
};
