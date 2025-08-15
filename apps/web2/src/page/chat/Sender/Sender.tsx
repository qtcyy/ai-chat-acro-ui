import { useState, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { AiOutlineSend, AiOutlineStop } from 'react-icons/ai';

type SenderProps = {
  ask: (query: string) => void;
  cancel: () => void;
  loading?: boolean;
};

const Sender = (props: SenderProps) => {
  const { ask, cancel, loading = false } = props;
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !loading) {
      ask(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift+Enter 换行
        return;
      } else {
        // Enter 发送
        e.preventDefault();
        handleSend();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // 自动调整高度
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleCancel = () => {
    if (loading) {
      cancel();
    }
  };

  return (
    <SenderContainer>
      <InputWrapper>
        <TextArea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="输入你的问题... (Enter 发送, Shift+Enter 换行)"
          disabled={loading}
          rows={1}
        />
        <ButtonGroup>
          {loading ? (
            <ActionButton 
              onClick={handleCancel}
              $variant="stop"
              title="停止生成"
            >
              <AiOutlineStop size={18} />
            </ActionButton>
          ) : (
            <ActionButton 
              onClick={handleSend}
              disabled={!message.trim()}
              $variant="send"
              title="发送消息"
            >
              <AiOutlineSend size={18} />
            </ActionButton>
          )}
        </ButtonGroup>
      </InputWrapper>
      
      {loading && (
        <LoadingIndicator>
          <LoadingDots>
            <Dot />
            <Dot />
            <Dot />
          </LoadingDots>
          <LoadingText>AI 正在思考中...</LoadingText>
        </LoadingIndicator>
      )}
      
      <HintText>
        💡 提示：按 Enter 发送消息，按 Shift+Enter 换行
      </HintText>
    </SenderContainer>
  );
};

const SenderContainer = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    rgba(248, 250, 252, 0.95) 0%,
    rgba(241, 245, 249, 0.98) 100%
  );
  border-top: 2px solid rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(12px);
  padding: 20px 24px 16px;
  z-index: 100;
  
  /* 响应式padding */
  @media (max-width: 768px) {
    padding: 16px 16px 12px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 12px 8px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 
    0 8px 24px rgba(59, 130, 246, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 
      0 12px 32px rgba(59, 130, 246, 0.18),
      0 6px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-size: 1rem;
  line-height: 1.5;
  color: #1e293b;
  background: transparent;
  font-family: inherit;
  min-height: 24px;
  max-height: 200px;
  overflow-y: auto;
  
  &::placeholder {
    color: #94a3b8;
    font-style: italic;
  }
  
  &:disabled {
    color: #94a3b8;
    cursor: not-allowed;
  }
  
  /* 美化滚动条 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button<{ $variant: 'send' | 'stop' }>`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  background: ${props => 
    props.$variant === 'send' 
      ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
      : 'linear-gradient(135deg, #ef4444, #dc2626)'
  };
  
  color: white;
  box-shadow: 
    0 4px 12px ${props => 
      props.$variant === 'send' 
        ? 'rgba(59, 130, 246, 0.3)'
        : 'rgba(239, 68, 68, 0.3)'
    };
  
  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 8px 20px ${props => 
        props.$variant === 'send' 
          ? 'rgba(59, 130, 246, 0.4)'
          : 'rgba(239, 68, 68, 0.4)'
      };
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  /* 发送按钮的波纹效果 */
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }
  
  &:active:after {
    width: 100px;
    height: 100px;
    margin-left: -50px;
    margin-top: -50px;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  animation: bounce 1.4s ease-in-out infinite both;
  
  &:nth-child(1) { animation-delay: -0.32s; }
  &:nth-child(2) { animation-delay: -0.16s; }
  &:nth-child(3) { animation-delay: 0s; }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
`;

const LoadingText = styled.span`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
`;

const HintText = styled.div`
  font-size: 0.8rem;
  color: #94a3b8;
  text-align: center;
  margin-top: 8px;
  animation: slideUp 0.5s ease-out;
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-top: 6px;
  }
`;

export { Sender };
