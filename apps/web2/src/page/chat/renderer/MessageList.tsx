import styled from "styled-components";
import { MessageRenderer, MessageRendererContext } from "./MessageRenderer";
import { ReactNode } from "react";
import { RoleType } from "../layout/Chat";
import { useMergeData } from "./useMergeData";

export type MessageListProps<T> = {
  messages: T[];
  renderer: RenderersType<T>;
};

export type RendererType<T> = {
  render: (content: T, id?: string) => ReactNode;
};

export type RenderersType<T> = Record<RoleType, RendererType<T>>;

export const MessageList = <T,>(props: MessageListProps<T>) => {
  const { messages, renderer } = props;

  const { mergedData } = useMergeData({ messages, renderer });

  const onUpdate = () => {};

  return (
    <MessageRendererContext.Provider value={{ onUpdate }}>
      <MessageListWrapper>
        <MessageContainer>
          {mergedData.length === 0 ? (
            <EmptyState>
              <EmptyIcon>💬</EmptyIcon>
              <EmptyText>开始与AI对话吧</EmptyText>
              <EmptySubtext>发送消息开启你的智能对话体验</EmptySubtext>
            </EmptyState>
          ) : (
            <>
              <MessageStartIndicator>
                <StartIcon>✨</StartIcon>
                <StartText>对话开始</StartText>
              </MessageStartIndicator>

              {mergedData.map((data, i) => (
                <MessageItemWrapper
                  key={i}
                  $isEven={i % 2 === 0}
                  //@ts-ignore
                  $messageType={data.message.type}
                >
                  <MessageRenderer<T>
                    //@ts-ignore
                    id={data.message.id ?? String(i)}
                    render={data.render}
                    content={data.message}
                  />
                </MessageItemWrapper>
              ))}

              <ScrollAnchor id="scroll-anchor" />
            </>
          )}
        </MessageContainer>
      </MessageListWrapper>
    </MessageRendererContext.Provider>
  );
};

const MessageListWrapper = styled.div`
  flex: 1;
  width: 100%;
  background: linear-gradient(
    135deg,
    #f8fafc 0%,
    #f1f5f9 30%,
    #e2e8f0 70%,
    #cbd5e1 100%
  );
  position: relative;
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 20px 24px;
  margin: 0 auto;
  max-width: 1200px;

  /* 响应式padding */
  @media (max-width: 768px) {
    padding: 20px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
  }

  /* 大屏幕下的舒适间距 */
  @media (min-width: 1200px) {
    padding: 24px 48px;
  }
`;

const MessageItemWrapper = styled.div<{
  $isEven: boolean;
  $messageType: "human" | "ai" | "tool" | "start";
}>`
  margin-bottom: 12px;
  animation: slideInUp 0.3s ease-out;
  animation-fill-mode: both;
  animation-delay: ${(props) => (props.$isEven ? "0s" : "0.05s")};
  position: relative;
  display: flex;
  width: 100%;

  /* 根据消息类型调整对齐方式 */
  justify-content: ${(props) => {
    switch (props.$messageType) {
      case "human":
        return "flex-end"; // human 消息右对齐
      case "ai":
      case "tool":
        return "flex-start"; // ai 和 tool 消息左对齐
      case "start":
        return "center"; // start 消息居中
      default:
        return "flex-start";
    }
  }};

  /* 消息容器样式 */
  > * {
    max-width: 80%;
    word-wrap: break-word;
    word-break: break-word;
  }

  &:hover {
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(15px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
  padding: 2rem;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gentle-pulse 3s ease-in-out infinite;

  @keyframes gentle-pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

const EmptyText = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const EmptySubtext = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
  max-width: 400px;
  line-height: 1.6;
`;

const MessageStartIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0 24px 0;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 60px;
    right: 60px;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(59, 130, 246, 0.3) 20%,
      rgba(139, 92, 246, 0.4) 50%,
      rgba(59, 130, 246, 0.3) 80%,
      transparent 100%
    );
    border-radius: 1px;
  }
`;

const StartIcon = styled.span`
  font-size: 1.4rem;
  margin-right: 10px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: sparkle 3s ease-in-out infinite;

  @keyframes sparkle {
    0%,
    100% {
      transform: rotate(0deg) scale(1);
    }
    25% {
      transform: rotate(-5deg) scale(1.05);
    }
    50% {
      transform: rotate(5deg) scale(1.1);
    }
    75% {
      transform: rotate(-3deg) scale(1.05);
    }
  }
`;

const StartText = styled.span`
  font-size: 0.95rem;
  color: #475569;
  font-weight: 600;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9),
    rgba(248, 250, 252, 0.8)
  );
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15), 0 2px 4px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
`;

const ScrollAnchor = styled.div`
  height: 1px;
  width: 1px;
`;
