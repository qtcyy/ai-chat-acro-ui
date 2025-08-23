import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { UUIDTypes } from "uuid";
import { HttpLoading, useHttp } from "utils";
import { apiConfig } from "../../../config/api";
import { useAsyncEffect } from "ahooks";
import {
  Observable,
  of,
  catchError,
  map,
  shareReplay,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  BehaviorSubject,
  combineLatest,
} from "rxjs";

export const LocalStorageKey = "ai-chat-history";

export type ChatType = {
  id: UUIDTypes;
  title: string;
  star?: boolean;
  createTime?: string;
  updateTime?: string;
};

type HistoryContextType = {
  chats: ChatType[];
  setChats: React.Dispatch<React.SetStateAction<ChatType[]>>;
  loadChats: () => Promise<boolean>;
  getOneChat: (id: UUIDTypes) => Promise<boolean>;
  createChat: (title?: string) => Promise<ChatType>;
  renameChat: (id: UUIDTypes, title: string) => Promise<boolean>;
  deleteChat: (id: UUIDTypes) => Promise<boolean>;
  deleteChatBatch: (ids: UUIDTypes[]) => Promise<boolean>;
  searchChats: (title?: string) => Observable<ChatType[]>;
  searchQuery$: BehaviorSubject<string>;
  filteredChats$: Observable<ChatType[]>;
};

const HistoryContext = createContext<HistoryContextType>({
  chats: [],
  setChats: () => {},
  loadChats: () => Promise.resolve(true),
  getOneChat: () => Promise.resolve(true),
  createChat: () => Promise.reject(),
  renameChat: () => Promise.resolve(true),
  deleteChat: () => Promise.resolve(true),
  deleteChatBatch: () => Promise.resolve(true),
  searchChats: () => new Observable<ChatType[]>(),
  searchQuery$: new BehaviorSubject<string>(""),
  filteredChats$: new Observable<ChatType[]>(),
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = (props: { children: ReactNode }) => {
  const http = useHttp();
  const { loading, loadingOperator } = HttpLoading();

  // 初始化chats，注意messages为空，需要调用函数进行加载
  const [chats, setChats] = useState<ChatType[]>([]);

  // 搜索查询的响应式流
  const [searchQuery$] = useState(() => new BehaviorSubject<string>(""));

  // 聊天列表的响应式流
  const [chats$] = useState(() => new BehaviorSubject<ChatType[]>([]));

  // 当chats状态变化时，更新BehaviorSubject
  useEffect(() => {
    chats$.next(chats);
  }, [chats, chats$]);

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

  const getOneChat = (id: UUIDTypes): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      http
        ?.get(apiConfig.getChatManageUrl(`/chat/get/one?id=${id}`))
        .subscribe({
          next(value) {
            const newChat = value.data as ChatType;
            const idx = chats.findIndex((chat) => chat.id === id);
            if (idx === -1) {
              console.error("Chat not found");
              reject(false);
            }
            const newChats = [...chats];
            newChats[idx] = newChat;
            setChats(newChats);

            resolve(true);
          },
          error(err) {
            console.error("Error on getting one chat: ", err);
            reject(false);
          },
        });
    });
  };

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

  const deleteChat = (id: UUIDTypes): Promise<boolean> => {
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

  const deleteChatBatch = async (ids: UUIDTypes[]): Promise<boolean> => {
    const postBody = {
      chatIds: ids,
    };
    return new Promise((resolve, reject) => {
      http
        ?.post(apiConfig.getChatManageUrl("/chat/delete/batch"), postBody)
        .subscribe({
          next(value) {
            if (value.msg === "success") {
              resolve(true);
            }
            reject(false);
          },
          error(err) {
            console.error("Error on deleting batch chats: ", err);
            reject(false);
          },
        });
    });
  };

  // 增强的搜索聊天功能，支持远程搜索和本地过滤
  const searchChats = (title?: string): Observable<ChatType[]> => {
    // 如果没有提供搜索词，返回空的Observable
    if (!title || title.trim() === "") {
      return of([]);
    }

    // 构建搜索请求
    const searchUrl = apiConfig.getChatManageUrl(
      `/chat/search?title=${encodeURIComponent(title.trim())}`
    );

    return http!.get<{ data: ChatType[]; msg: string }>(searchUrl).pipe(
      loadingOperator,
      map((response) => {
        // 提取搜索结果数据
        if (response.data && Array.isArray(response.data)) {
          return response.data;
        }
        return [];
      }),
      catchError((error) => {
        console.error("搜索聊天失败:", error);
        // 发生错误时，回退到本地搜索
        return of(
          chats.filter((chat) =>
            chat.title.toLowerCase().includes(title.toLowerCase())
          )
        );
      }),
      shareReplay(1) // 缓存最新的搜索结果
    );
  };

  // 创建过滤后的聊天列表流
  const [filteredChats$] = useState(() =>
    combineLatest([
      searchQuery$.pipe(
        debounceTime(300), // 300ms防抖
        distinctUntilChanged() // 去除重复查询
      ),
      chats$, // 响应式聊天列表
    ]).pipe(
      switchMap(([query, currentChats]) => {
        if (!query || query.trim() === "") {
          // 空查询时返回所有聊天
          return of(currentChats);
        }

        // 优先使用本地过滤，快速响应
        const localResults = currentChats.filter((chat) =>
          chat.title.toLowerCase().includes(query.toLowerCase())
        );

        // 如果本地结果不够（少于3个），则进行远程搜索
        if (localResults.length < 3 && query.trim().length > 0) {
          return searchChats(query).pipe(
            map((remoteResults) => {
              // 合并本地和远程结果，去重
              const combined = [...localResults];
              remoteResults.forEach((remote) => {
                if (!combined.some((local) => local.id === remote.id)) {
                  combined.push(remote);
                }
              });
              return combined;
            }),
            catchError((error) => {
              console.error("远程搜索失败，使用本地结果:", error);
              return of(localResults); // 远程搜索失败时使用本地结果
            })
          );
        }

        return of(localResults);
      }),
      shareReplay(1) // 缓存最新的过滤结果
    )
  );

  const ContextValue = {
    chats,
    setChats,
    loadChats,
    getOneChat,
    createChat,
    renameChat,
    deleteChat,
    deleteChatBatch,
    searchChats,
    searchQuery$,
    filteredChats$,
  };

  return (
    <HistoryContext.Provider value={ContextValue}>
      {props.children}
    </HistoryContext.Provider>
  );
};
