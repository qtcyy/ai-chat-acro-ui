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

/** LocalStorage键值，用于存储聊天历史记录 */
export const LocalStorageKey = "ai-chat-history";

/**
 * 聊天记录类型定义
 * @interface ChatType
 */
export type ChatType = {
  /** 聊天唯一标识符 */
  id: UUIDTypes;
  /** 聊天标题 */
  title: string;
  /** 是否已收藏 */
  star?: boolean;
  /** 创建时间 */
  createTime?: string;
  /** 最后更新时间 */
  updateTime?: string;
};

/**
 * 聊天历史Context类型定义
 * @interface HistoryContextType
 */
type HistoryContextType = {
  /** 当前聊天记录列表 */
  chats: ChatType[];
  /** 设置聊天记录列表的状态更新函数 */
  setChats: React.Dispatch<React.SetStateAction<ChatType[]>>;
  /** 加载所有聊天记录 */
  loadChats: () => Promise<boolean>;
  /** 获取单个聊天记录详情 */
  getOneChat: (id: UUIDTypes) => Promise<boolean>;
  /** 创建新的聊天记录 */
  createChat: (title?: string) => Promise<ChatType>;
  /** 重命名聊天记录 */
  renameChat: (id: UUIDTypes, title: string) => Promise<boolean>;
  /** 删除单个聊天记录 */
  deleteChat: (id: UUIDTypes) => Promise<boolean>;
  /** 批量删除聊天记录 */
  deleteChatBatch: (ids: UUIDTypes[]) => Promise<boolean>;
  /** 搜索聊天记录 */
  searchChats: (title?: string) => Observable<ChatType[]>;
  /** 切换聊天收藏状态 */
  toggleStarChat: (id: UUIDTypes) => Observable<boolean>;
  /** 搜索查询的响应式流 */
  searchQuery$: BehaviorSubject<string>;
  /** 过滤后的聊天列表响应式流 */
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
  toggleStarChat: (id: UUIDTypes) => new Observable<boolean>(),
  searchQuery$: new BehaviorSubject<string>(""),
  filteredChats$: new Observable<ChatType[]>(),
});

/**
 * 获取聊天历史Context数据的Hook
 * @returns {HistoryContextType} 聊天历史相关的所有方法和状态
 */
export const useHistory = () => useContext(HistoryContext);

/**
 * 聊天历史Context提供者组件
 * @param {Object} props - 组件属性
 * @param {ReactNode} props.children - 子组件
 * @returns {JSX.Element} Context Provider组件
 */
export const HistoryProvider = (props: { children: ReactNode }) => {
  const http = useHttp();
  const { loading, loadingOperator } = HttpLoading();

  /** 聊天记录列表状态（初始为空，需调用loadChats进行加载） */
  const [chats, setChats] = useState<ChatType[]>([]);

  /** 搜索查询的响应式流，用于实时搜索功能 */
  const [searchQuery$] = useState(() => new BehaviorSubject<string>(""));

  /** 聊天列表的响应式流，用于响应式数据管理 */
  const [chats$] = useState(() => new BehaviorSubject<ChatType[]>([]));

  /**
   * 同步chats状态变化到BehaviorSubject
   * 确保响应式流能够及时获取最新的聊天数据
   */
  useEffect(() => {
    chats$.next(chats);
  }, [chats, chats$]);

  /**
   * 加载所有聊天记录
   * @returns {Promise<boolean>} 加载是否成功
   */
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

  /**
   * 获取单个聊天记录详情并更新本地状态
   * @param {UUIDTypes} id - 聊天ID
   * @returns {Promise<boolean>} 获取是否成功
   */
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

  /**
   * 创建新的聊天记录
   * @param {string} [title] - 可选的聊天标题
   * @returns {Promise<ChatType>} 新创建的聊天记录
   */
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

  /**
   * 重命名聊天记录
   * @param {UUIDTypes} id - 聊天ID
   * @param {string} title - 新的聊天标题
   * @returns {Promise<boolean>} 重命名是否成功
   */
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

  /**
   * 删除单个聊天记录
   * @param {UUIDTypes} id - 要删除的聊天ID
   * @returns {Promise<boolean>} 删除是否成功
   */
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

  /**
   * 批量删除聊天记录
   * @param {UUIDTypes[]} ids - 要删除的聊天ID数组
   * @returns {Promise<boolean>} 批量删除是否成功
   */
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

  /**
   * 搜索聊天记录（支持远程API搜索，失败时回退到本地过滤）
   * @param {string} [title] - 搜索关键词
   * @returns {Observable<ChatType[]>} 搜索结果的Observable流
   */
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

  /**
   * 创建过滤后的聊天列表响应式流
   * 结合搜索查询和聊天数据，提供防抖、去重和智能搜索功能
   * - 空查询时返回所有聊天记录
   * - 优先本地过滤，结果不足时进行远程搜索
   * - 支持本地和远程结果的智能合并
   */
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

  /**
   * 切换聊天记录的收藏状态
   * @param {UUIDTypes} id - 聊天ID
   * @returns {Observable<boolean>} 操作结果的Observable流
   */
  const toggleStarChat = (id: UUIDTypes): Observable<boolean> => {
    const url = apiConfig.getChatManageUrl("/chat/star/toggle");
    const postBody = {
      id: id,
    };
    return http!.post(url, postBody).pipe(
      loadingOperator,
      map((c) => c.msg === "success")
    );
  };

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
    toggleStarChat,
    searchQuery$,
    filteredChats$,
  };

  return (
    <HistoryContext.Provider value={ContextValue}>
      {props.children}
    </HistoryContext.Provider>
  );
};
