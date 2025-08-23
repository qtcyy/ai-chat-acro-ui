import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HttpLoading, useHttp } from "utils";
import { MessageList, RenderersType } from "../renderer/MessageList";
import { MDRenderer } from "components";
import { Sender } from "../Sender/Sender";
import { useChat } from "../hooks/useChat";
import { v4 } from "uuid";
import SimpleBar from "simplebar-react";
import SimpleBarCore from "simplebar-core";
import { ChatType, useHistory } from "../hooks/useHistory";
import { useAutoRename } from "../utils/AutoRename";
import { useDebounceFn } from "ahooks";
import { Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import {
  AiOutlineEdit,
  AiFillDelete,
  AiOutlineMore,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import NiceModal from "@ebay/nice-modal-react";
import RenameModal from "../modal/RenameModal";
import { DeleteChatModal } from "../modal/DeleteChatModal";
import { StarOutlined } from "@ant-design/icons";
import { MessageToolbar } from "../components/MessageToolBar";
import { apiConfig } from "../../../config/api";

const ROLE = {
  start: "start",
  query: "query",
  response: "response",
} as const;

export type RoleType = keyof typeof ROLE;

export type ChunkType = "human" | "ai" | "tool" | "start" | "AIMessageChunk";

export type MessageType = {
  content: string;
  additional_kwargs: {
    reasoning_content?: string;
    tool_calls?: [];
  };
  response_metadata: {
    finish_reason?: string;
    model_name?: string;
  };
  type: ChunkType;
  name?: string;
  id: string;
  isProcessing?: boolean;
};

const Chat = () => {
  const chatId = useParams().chatId;
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { chats, renameChat, deleteChat, getOneChat, setChats } = useHistory();
  const chatItem = chats.find((chat) => chat.id === chatId);

  const { getName } = useAutoRename({});

  const http = useHttp();
  const { loading, loadingOperator } = HttpLoading();

  const handleStar = () => {
    console.log("star chat: ", chatId);
    const postBody = {
      id: chatId,
    };
    http
      ?.post(apiConfig.getChatManageUrl("chat/star/toggle"), postBody)
      .subscribe({
        next(value) {
          const newChat = value.data as ChatType;
          const newChats = [...chats];
          const idx = newChats.findIndex((chat) => chat.id === chatId);
          newChats[idx] = newChat;
          setChats(newChats);
          if (newChat.star) {
            message.success("收藏成功");
          } else {
            message.info("取消收藏");
          }
        },
        error(err) {
          console.error("Error on star chat");
          message.error("收藏操作失败");
          throw err;
        },
      });
  };

  const handleRename = async () => {
    if (!chatId) return;
    await NiceModal.show(RenameModal, { id: chatId.toString() });
    await getOneChat(chatId);
  };

  const handleDelete = () => {
    if (!chatId) return;
    NiceModal.show(DeleteChatModal, { id: chatId.toString() }).then(
      (result) => {
        if (result) {
          // 删除成功后跳转到聊天历史页面
          navigate("/chat/history");
        }
      }
    );
  };

  const getMenuItems = (): MenuProps["items"] => [
    {
      key: "star",
      label: "收藏",
      icon: chatItem?.star ? <AiFillStar /> : <AiOutlineStar />,
      onClick: handleStar,
    },
    {
      key: "rename",
      label: "重命名",
      icon: <AiOutlineEdit />,
      onClick: handleRename,
    },
    {
      key: "delete",
      label: "删除对话",
      icon: <AiFillDelete />,
      danger: true,
      onClick: handleDelete,
    },
  ];

  const { ask, streamLoading, cancel } = useChat({
    chatId: chatId ?? v4(),
    messages: messages,
    setMessages: setMessages,
    onOpen() {},
    onClose() {
      if (!chatId) return;
      if (
        messages.length > 1 &&
        (!chatItem?.title || chatItem.title === "Untitled")
      ) {
        getName(chatId)
          .then((value) => {
            renameChat(chatId, value);
          })
          .catch((error) => console.error("Error on closing stream: ", error));
      }
    },
  });

  useEffect(() => {
    http
      ?.get<MessageType[]>(apiConfig.getChatbotUrl(`/chat/history/${chatId}`))
      .pipe(loadingOperator)
      .subscribe({
        next: (data) => {
          setMessages(
            data.map((message) => {
              if (message.type !== "ai") {
                return message;
              } else {
                let newContent = message.content.replace(
                  /\\\((.*?)\\\)/g,
                  "$$$1$$"
                );
                newContent = newContent.replace(/\\\[(.*?)\\\]/g, "$$$$$1$$$$");
                newContent = newContent.replaceAll("\\[", "$$");
                newContent = newContent.replaceAll("\\]", "$$");

                let newReason =
                  message.additional_kwargs.reasoning_content?.replace(
                    /\\\((.*?)\\\)/g,
                    "$$$1$$"
                  );
                newReason = newReason?.replace(/\\\[(.*?)\\\]/g, "$$$$$1$$$$");
                newReason = newReason?.replaceAll("\\[", "$$");
                newReason = newReason?.replaceAll("\\]", "$$");

                return {
                  ...message,
                  content: newContent,
                  additional_kwargs: {
                    ...message.additional_kwargs,
                    reasoning_content: newReason,
                  },
                };
              }
            })
          );
        },
        error: (error) => console.error(`Error loading messages: ${error}`),
      });
  }, [chatId]);

  const renderer: RenderersType<MessageType> = {
    [ROLE.query]: {
      render: (content, id) => {
        return (
          <div className="bg-blue-50 text-gray-800 p-4 rounded-lg shadow-sm border border-blue-200 relative">
            <div className="absolute top-0 right-0 w-1 h-full bg-blue-400 rounded-r-lg"></div>
            <MDRenderer text={content.content} />
          </div>
        );
      },
    },
    [ROLE.response]: {
      render: (content, id) => {
        const reasoningContent = content.additional_kwargs.reasoning_content;
        const [foldThink, setFoldThink] = useState(true);
        const [scrollReachEnd, setScrollReachEnd] = useState(true);

        const responseScrollRef = useRef<SimpleBarCore | null>(null);
        const TOLERANCE = 1;

        const onInternalScroll = () => {
          const e = responseScrollRef.current?.getScrollElement();
          if (e) {
            setScrollReachEnd(
              e.scrollHeight - Math.abs(e.scrollTop) - e.clientHeight <=
                TOLERANCE
            );
          }
        };

        // 防抖的滚动监听函数，避免频繁更新状态
        const { run: debouncedInternalScroll } = useDebounceFn(
          onInternalScroll,
          {
            wait: 50,
          }
        );

        const scrollButton = () => {
          const target = responseScrollRef.current?.getScrollElement();
          if (target) {
            target.scrollTo({
              top: target.scrollHeight,
              behavior: "smooth",
            });
          }
        };

        // 防抖的滚动函数，防止频繁调用导致卡顿
        const { run: debouncedScrollToBottom } = useDebounceFn(scrollButton, {
          wait: 100,
        });

        useEffect(() => {
          // 处理中时展开，处理结束时折叠
          setFoldThink(!content.isProcessing);
        }, [content.isProcessing]);

        useEffect(() => {
          // 只有当用户在底部时才自动滚动，使用防抖函数避免卡顿
          if (scrollReachEnd && reasoningContent) {
            debouncedScrollToBottom();
          }
        }, [
          content.additional_kwargs.reasoning_content,
          scrollReachEnd,
          debouncedScrollToBottom,
        ]);

        if (content.type === "tool") {
          const [foldTool, setFoldTool] = useState(true);

          return (
            <div className="bg-orange-50 rounded-lg border-l-4 border-orange-400 overflow-hidden shadow-sm">
              <div
                className="p-4 cursor-pointer hover:bg-orange-100 transition-colors duration-200 flex items-center justify-between"
                onClick={() => setFoldTool(!foldTool)}
              >
                <div className="text-orange-800 font-medium flex items-center gap-2">
                  🛠️ {content.isProcessing ? "Tool Calling" : "Tool Called"}
                </div>
                <div
                  className={`transform transition-transform duration-300 text-orange-600 ${
                    foldTool ? "" : "rotate-180"
                  }`}
                >
                  ▼
                </div>
              </div>
              {content.content && (
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    foldTool
                      ? "max-h-0 opacity-0"
                      : "max-h-[400px] opacity-100 pb-4"
                  }`}
                >
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-orange-50 to-transparent z-10 pointer-events-none"></div>
                    <div className="px-4 max-h-80 overflow-y-auto">
                      <div className="text-orange-700 text-sm bg-white p-3 rounded border">
                        {/* <pre className="whitespace-pre-wrap font-mono text-xs">
                          {content.content}
                        </pre> */}
                        <MDRenderer
                          text={content.content}
                          fontSize="13px"
                          textColor="#6b7280"
                          lineHeight="1.5"
                          className="tool-content"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-4 min-w-[800px]">
            {reasoningContent && (
              <div className="bg-gray-50 rounded-lg border-l-4 border-blue-400 overflow-hidden shadow-sm">
                <div
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                  onClick={() => setFoldThink(!foldThink)}
                >
                  <div className="text-blue-800 font-medium flex items-center gap-2">
                    💭 {content.isProcessing ? "Thinking" : "Finish Think"}
                    <span className="text-xs text-gray-500">
                      {foldThink ? "(点击展开)" : "(点击折叠)"}
                    </span>
                  </div>
                  <div
                    className={`transform transition-transform duration-300 text-blue-600 ${
                      foldThink ? "" : "rotate-180"
                    }`}
                  >
                    ▼
                  </div>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    foldThink
                      ? "max-h-0 opacity-0"
                      : "max-h-[800px] opacity-100 pb-4"
                  }`}
                >
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none"></div>
                    <SimpleBar
                      ref={responseScrollRef}
                      className="w-full max-h-52 overflow-auto"
                      forceVisible="y"
                      autoHide={false}
                      onScroll={debouncedInternalScroll}
                      onScrollCapture={debouncedInternalScroll}
                    >
                      <div className="px-4 pt-2">
                        <MDRenderer
                          text={reasoningContent}
                          fontSize="13px"
                          textColor="#6b7280"
                          lineHeight="1.5"
                          className="thinking-content"
                        />
                      </div>
                    </SimpleBar>
                  </div>
                </div>
              </div>
            )}

            {content.content.trim() && (
              <div className="flex flex-col">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                  <MDRenderer
                    text={content.content}
                    fontSize="15px"
                    textColor="#374151"
                    lineHeight="1.7"
                    className="main-content"
                  />
                </div>

                {/* Add MessageToolbar for completed messages */}
                {content.response_metadata.finish_reason === "stop" && (
                  <MessageToolbar
                    messageId={content.id}
                    onCopy={async (id) => {
                      try {
                        const messageToFind = messages.find(
                          (msg) => msg.id === id
                        );
                        if (!messageToFind?.content) {
                          message.warning("没有找到要复制的内容");
                          return;
                        }

                        await navigator.clipboard.writeText(
                          messageToFind.content
                        );
                        message.success("内容已复制到剪贴板");
                      } catch (error) {
                        console.error("复制失败:", error);
                        message.error("复制失败，请重试");
                      }
                    }}
                    onEdit={(id) => {
                      // Placeholder for edit functionality
                      console.log("Edit message:", id);
                    }}
                    onShare={(id) => {
                      // Placeholder for share functionality
                      console.log("Share message:", id);
                    }}
                    onDelete={(id) => {
                      console.log("Delete message:", id);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        );
      },
    },
    [ROLE.start]: {
      render: () => {
        return (
          <div className="flex justify-center my-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-full border border-blue-200">
              <div className="text-blue-600 font-medium">
                ✨ Hello! 开始对话吧
              </div>
            </div>
          </div>
        );
      },
    },
  };

  return (
    <ChatContainer>
      <HeaderContainer>
        <HeaderContent>
          <ChatIcon>💬</ChatIcon>
          <ChatTitle>{chatItem?.title || "新对话"}</ChatTitle>
          <Dropdown
            menu={{ items: getMenuItems() }}
            trigger={["click"]}
            placement="bottomRight"
            overlayStyle={{ minWidth: "120px" }}
          >
            <DropdownButton>
              <AiOutlineMore size={16} />
            </DropdownButton>
          </Dropdown>
        </HeaderContent>
      </HeaderContainer>

      {loading ? (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>正在加载对话历史...</LoadingText>
          <LoadingSubtext>请稍候片刻</LoadingSubtext>
        </LoadingContainer>
      ) : (
        <>
          <MessageList<MessageType>
            messages={messages}
            renderer={renderer}
            autoScroll
          />
          <Sender ask={ask} cancel={cancel} loading={streamLoading} />
        </>
      )}
    </ChatContainer>
  );
};

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px !important;
  min-height: 70px;
  max-height: 70px;
  width: 100%;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15),
    0 2px 8px rgba(31, 38, 135, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  /* 添加渐变装饰 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(99, 102, 241, 0.3) 20%,
      rgba(139, 92, 246, 0.3) 50%,
      rgba(99, 102, 241, 0.3) 80%,
      transparent 100%
    );
  }

  /* 添加底部光影 */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(99, 102, 241, 0.2) 50%,
      transparent 100%
    );
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const ChatIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  position: relative;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3),
    0 2px 4px rgba(102, 126, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 12px;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 14px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-1px) scale(1.05);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4),
      0 4px 8px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);

    &::after {
      opacity: 0.6;
    }
  }
`;

const ChatTitle = styled.h1`
  color: #1a202c;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  text-align: center;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const DropdownButton = styled.button`
  color: #64748b;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(31, 38, 135, 0.1);

  &:hover {
    color: #475569;
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(31, 38, 135, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(31, 38, 135, 0.1);
  }
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: linear-gradient(
    135deg,
    #f8fafc 0%,
    #f1f5f9 30%,
    #e2e8f0 70%,
    #cbd5e1 100%
  );
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  margin-bottom: 24px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-align: center;
`;

const LoadingSubtext = styled.div`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  opacity: 0.8;
`;

const ChatContainer = styled.div`
  min-width: 320px;
  /* max-width: 1200px; */
  width: 100%;
  height: 100vh;
  /* min-height: 100vh; */
  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  /* 响应式最小宽度 */
  @media (max-width: 768px) {
    min-width: 280px;
  }

  @media (max-width: 480px) {
    min-width: 240px;
  }
`;

export { Chat };
