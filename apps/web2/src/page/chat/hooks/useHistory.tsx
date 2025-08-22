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
import { apiConfig } from "../../../config/api";
import { useAsyncEffect } from "ahooks";

export const LocalStorageKey = "ai-chat-history";

export type ChatType = {
  id: UUIDTypes;
  title: string;
  createTime?: string;
  updateTime?: string;
};

type HistoryContextType = {
  chats: ChatType[];
  loadChats: () => Promise<boolean>;
  createChat: (title?: string) => Promise<ChatType>;
  renameChat: (id: UUIDTypes, title: string) => Promise<boolean>;
  deleteChat: (id: UUIDTypes) => Promise<boolean>;
  deleteChatBatch: (ids: UUIDTypes[]) => Promise<boolean>;
  sortByTime: () => void;
};

const HistoryContext = createContext<HistoryContextType>({
  chats: [],
  loadChats: () => Promise.resolve(true),
  createChat: () => Promise.reject(),
  renameChat: () => Promise.resolve(true),
  deleteChat: () => Promise.resolve(true),
  deleteChatBatch: () => Promise.resolve(true),
  sortByTime: () => {},
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = (props: { children: ReactNode }) => {
  const http = useHttp();
  const { loading, loadingOperator } = HttpLoading();

  // 初始化chats，注意messages为空，需要调用函数进行加载
  const [chats, setChats] = useState<ChatType[]>([]);

  const loadChats = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      http
        ?.get(apiConfig.getChatManageUrl("/chat/get/list"))
        .pipe(loadingOperator)
        .subscribe({
          next(value) {
            console.log(value);
            setChats(value.data);
            resolve(true);
          },
          error(err) {
            console.error("Error on get chat list:", err);
            reject(false);
          },
        });
    });
  };

  useAsyncEffect(async () => {
    await loadChats();
  }, []);

  const createChat = (title?: string): Promise<ChatType> => {
    return new Promise((resolve, reject) => {
      http
        ?.post(apiConfig.getChatManageUrl("/chat/create"), { title: title })
        .subscribe({
          next(value) {
            resolve(value.data);
          },
          error(err) {
            console.error("Error on creating chat: ", err);
            reject();
          },
        });
    });
  };

  const renameChat = (id: UUIDTypes, title: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      const poseBody = {
        id: id,
        newTitle: title,
      };
      http
        ?.post(apiConfig.getChatManageUrl("/chat/rename"), poseBody)
        .subscribe({
          next() {
            resolve(true);
          },
          error(err) {
            console.error("Error on renaming chat: ", err);
            reject(false);
          },
        });
    });
  };

  const deleteChat = async (id: UUIDTypes): Promise<boolean> => {
    const deleteBody = {
      id: id,
    };
    return new Promise<boolean>((resolve, reject) => {
      http
        ?.post(apiConfig.getChatManageUrl("/chat/delete"), deleteBody)
        .subscribe({
          next(value) {
            console.log(value);
            if (value.msg === "success") {
              resolve(true);
            }
            reject(false);
          },
          error(err) {
            console.error("Error on deleting chat: ", err);
            reject(false);
          },
        });
    });
  };

  const deleteChatBatch = async (ids: UUIDTypes[]) => {
    const postBody = {
      thread_ids: ids,
    };
    const idSet = new Set(ids);
    http
      ?.post(apiConfig.getChatbotUrl("/chat/history/batch/delete"), postBody)
      .pipe(loadingOperator)
      .subscribe({
        next(value) {
          if (value.message === "success") {
            const filteredChats = chats.filter((chat) => !idSet.has(chat.id));
            localStorage.setItem(
              LocalStorageKey,
              JSON.stringify(filteredChats)
            );
            setChats([...filteredChats]);
          } else {
            throw Error("Error on delete chat batch");
          }
        },
      });

    return true;
  };

  const sortByTime = () => {
    const newChats = [...chats];
    newChats.sort((a, b) =>
      dayjs(a.updateTime).isAfter(dayjs(b.updateTime)) ? -1 : 1
    );
    localStorage.setItem(LocalStorageKey, JSON.stringify(newChats));
    setChats(newChats);
  };

  const ContextValue = {
    chats,
    loadChats,
    createChat,
    renameChat,
    deleteChat,
    deleteChatBatch,
    sortByTime,
  };

  return (
    <HistoryContext.Provider value={ContextValue}>
      {props.children}
    </HistoryContext.Provider>
  );
};
