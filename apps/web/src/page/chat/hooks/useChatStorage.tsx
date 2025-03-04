import { BubbleDataType } from "components";
import dayjs from "dayjs";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "../../../store";
import { useAsyncEffect } from "ahooks";
import { deleteHistory, getHistory, writeHistory } from "./updateRequest";

export type MessageType = {
  key?: string;
  id?: string;
  query: string;
  answer: string;
  think?: string;
  isEnd?: boolean;
  isThink?: boolean;
  thinkTime?: number;
  createTime?: string;
};

export type ChatItem = {
  chatId: string;
  key?: string;
  name: string;
  isName?: boolean;
  content: BubbleDataType<MessageType>[];
  createTime: string;
  updateTime: string;
};

type ChatFn = (chat: ChatItem[]) => ChatItem[];

type ChatListContextType = {
  chats: ChatItem[];
  addChat: (chat: ChatItem) => void;
  sortByTime: () => void;
  updateChat: (chatFn: ChatFn) => void;
  removeChat: (chatId: string) => Promise<void>;
  removeAllChat: () => void;
  getChatHistory: () => Promise<void>;
};

const ChatStorageContext = createContext<ChatListContextType | undefined>(
  undefined
);

export const useChatStorage = () => {
  return useContext(ChatStorageContext);
};

export const ChatProvider = (props: { children: any }) => {
  const { chatLoadSignal, loginUsername } = useStore();
  const [chats, setChats] = useState<ChatItem[]>([]);

  const getChatHistory = async () => {
    let chatHistory: ChatItem[] = [];
    try {
      console.log(loginUsername);
      const responseChats = await getHistory();
      localStorage.setItem("chat-history", JSON.stringify(responseChats ?? []));
      setChats(responseChats ?? []);
    } catch (error) {
      const historyStr = localStorage.getItem("chat-history");
      console.log(historyStr);

      if (historyStr) {
        chatHistory = JSON.parse(historyStr) as ChatItem[];
      } else {
        localStorage.setItem("chat-history", JSON.stringify(chatHistory));
      }
      setChats(chatHistory);
    }
  };

  const writeChat = async (chatItem: ChatItem) => {
    if (!loginUsername) return;
    await writeHistory(chatItem);
  };

  const deleteChat = async (chatId: string) => {
    if (!loginUsername) return;
    await deleteHistory(chatId);
  };

  useAsyncEffect(async () => {
    await getChatHistory();
  }, [chatLoadSignal]);

  const addChat = (chat: ChatItem) => {
    let newChats = chats;
    newChats.push(chat);
    localStorage.setItem("chat-history", JSON.stringify(newChats));
    writeChat(chat);
    setChats(newChats);
  };

  const sortByTime = () => {
    let newChats = chats.sort((a, b) =>
      dayjs(a.updateTime).isAfter(dayjs(b.updateTime)) ? -1 : 1
    );
    localStorage.setItem("chat-history", JSON.stringify([...newChats]));
    setChats([...newChats]);
  };

  const updateChat = useCallback(
    (chatFn: ChatFn) => {
      let newChats = chatFn(chats);
      localStorage.setItem("chat-history", JSON.stringify(newChats));
      setChats(newChats);
    },
    [chats]
  );

  const removeChat = async (chatId: string) => {
    let newChats = chats.filter((o) => o.chatId !== chatId);
    localStorage.setItem("chat-history", JSON.stringify(newChats));
    await deleteChat(chatId);
    setChats(newChats);
  };

  const removeAllChat = () => {
    setChats([]);
    localStorage.removeItem("chat-history");
  };

  const ContextValue: ChatListContextType = {
    chats,
    addChat,
    sortByTime,
    updateChat,
    removeAllChat,
    removeChat,
    getChatHistory,
  };

  return (
    <ChatStorageContext.Provider value={ContextValue}>
      {props.children}
    </ChatStorageContext.Provider>
  );
};
