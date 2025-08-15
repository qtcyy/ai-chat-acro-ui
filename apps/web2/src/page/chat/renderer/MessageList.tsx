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
                <MessageItemWrapper key={i} $isEven={i % 2 === 0}>
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
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to bottom,
    #fafafa 0%,
    #f8f9fa 50%,
    #f1f3f4 100%
  );
  position: relative;
  overflow: hidden;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 24px;
  scroll-behavior: smooth;
  
  /* 美化滚动条 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  
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

const MessageItemWrapper = styled.div<{ $isEven: boolean }>`
  margin-bottom: 16px;
  animation: slideInUp 0.4s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.$isEven ? '0s' : '0.1s'};
  
  /* 交替背景色增强可读性 */
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: -8px;
    bottom: -8px;
    background: ${props => props.$isEven ? 'rgba(255, 255, 255, 0.5)' : 'transparent'};
    border-radius: 12px;
    z-index: -1;
    transition: all 0.2s ease;
  }
  
  &:hover:before {
    background: ${props => props.$isEven ? 'rgba(255, 255, 255, 0.8)' : 'rgba(240, 242, 247, 0.6)'};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  
  @keyframes slideInUp {
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

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  animation: fadeIn 0.6s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
  animation: bounce 2s ease-in-out infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const EmptyText = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const EmptySubtext = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  max-width: 300px;
`;

const MessageStartIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 32px 0;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 50px;
    right: 50px;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent 0%,
      #e5e7eb 20%,
      #d1d5db 50%,
      #e5e7eb 80%,
      transparent 100%
    );
  }
`;

const StartIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 8px;
  animation: sparkle 2s ease-in-out infinite;
  
  @keyframes sparkle {
    0%, 100% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
  }
`;

const StartText = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
  font-weight: 500;
  background: white;
  padding: 0 12px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ScrollAnchor = styled.div`
  height: 1px;
  width: 1px;
`;
