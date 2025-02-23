import { BubbleDataType } from "components";
import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";

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
  removeChat: (chatId: string) => void;
  removeAllChat: () => void;
};

const ChatStorageContext = createContext<ChatListContextType | undefined>(
  undefined
);

export const useChatStorage = () => {
  return useContext(ChatStorageContext);
};

export const ChatProvider = (props: { children: any }) => {
  let history: ChatItem[] = [];
  const historyStr = localStorage.getItem("chat-history");
  if (historyStr) {
    history = JSON.parse(historyStr) as ChatItem[];
  } else {
    localStorage.setItem("chat-history", JSON.stringify(history));
  }
  const [chats, setChats] = useState<ChatItem[]>(history);

  const addChat = (chat: ChatItem) => {
    let newChats = chats;
    newChats.push(chat);
    localStorage.setItem("chat-history", JSON.stringify(newChats));
    setChats(newChats);
  };

  const sortByTime = () => {
    let newChats = chats.sort((a, b) =>
      dayjs(a.updateTime).isAfter(dayjs(b.updateTime)) ? -1 : 1
    );
    localStorage.setItem("chat-history", JSON.stringify([...newChats]));
    setChats([...newChats]);
  };

  const updateChat = (chatFn: ChatFn) => {
    let newChats = chatFn(chats);
    localStorage.setItem("chat-history", JSON.stringify(newChats));
    setChats(newChats);
  };

  const removeChat = (chatId: string) => {
    let newChats = chats.filter((o) => o.chatId !== chatId);
    localStorage.setItem("chat-history", JSON.stringify(newChats));
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
  };

  return (
    <ChatStorageContext.Provider value={ContextValue}>
      {props.children}
    </ChatStorageContext.Provider>
  );
};
