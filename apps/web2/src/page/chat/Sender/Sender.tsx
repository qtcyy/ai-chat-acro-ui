import { useState, useRef, KeyboardEvent, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineSend, AiOutlineStop, AiOutlineDown } from "react-icons/ai";
import { BsRobot } from "react-icons/bs";
import { MdSettings } from "react-icons/md";

type SenderProps = {
  ask: (query: string, model?: string, summary?: boolean) => void;
  cancel: () => void;
  loading?: boolean;
};

type ModelOption = {
  id: string;
  name: string;
  description: string;
};

const MODEL_OPTIONS: ModelOption[] = [
  {
    id: "Qwen/Qwen3-30B-A3B-Thinking-2507",
    name: "Qwen3 30B Thinking",
    description: "高性能推理模型，擅长复杂思考",
  },
  {
    id: "deepseek-ai/DeepSeek-R1",
    name: "DeepSeek R1",
    description: "优秀的推理和代码生成模型",
  },
  {
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    description: "平衡性能和速度的通用模型",
  },
];

const Sender = (props: SenderProps) => {
  const { ask, cancel, loading = false } = props;
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState<ModelOption>(
    MODEL_OPTIONS[0]
  );
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showModelConfig, setShowModelConfig] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelSelectorRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (message.trim() && !loading) {
      ask(message.trim(), selectedModel.id, true);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleModelSelect = (model: ModelOption) => {
    setSelectedModel(model);
    setShowModelSelector(false);
  };

  // 点击外部关闭模型选择器
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelSelectorRef.current &&
        !modelSelectorRef.current.contains(event.target as Node)
      ) {
        setShowModelSelector(false);
      }
    };

    if (showModelSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModelSelector]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
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
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleClickArea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleCancel = () => {
    if (loading) {
      cancel();
    }
  };

  return (
    <SenderContainer>
      {/* 可折叠的模型配置区域 */}
      {showModelConfig && (
        <ModelConfigRow>
          <ModelConfigContent>
            <CurrentModelInfo>
              <BsRobot size={16} />
              <ModelDetails>
                <ModelName>当前模型: {selectedModel.name}</ModelName>
                <ModelDescription>{selectedModel.description}</ModelDescription>
              </ModelDetails>
            </CurrentModelInfo>
            
            <CompactModelSelector ref={modelSelectorRef}>
              <ModelButton
                onClick={() => setShowModelSelector(!showModelSelector)}
                $isOpen={showModelSelector}
              >
                切换模型
                <AiOutlineDown 
                  size={12} 
                  style={{
                    transform: showModelSelector ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }} 
                />
              </ModelButton>
              
              {showModelSelector && (
                <CompactDropdown>
                  {MODEL_OPTIONS.map((model) => (
                    <CompactOption
                      key={model.id}
                      onClick={() => handleModelSelect(model)}
                      $isSelected={selectedModel.id === model.id}
                      title={model.description}
                    >
                      <BsRobot size={12} />
                      <span>{model.name}</span>
                    </CompactOption>
                  ))}
                </CompactDropdown>
              )}
            </CompactModelSelector>
          </ModelConfigContent>
        </ModelConfigRow>
      )}

      <InputWrapper onClick={handleClickArea}>
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
          {/* 配置按钮 */}
          <ConfigButton
            onClick={(e) => {
              e.stopPropagation();
              setShowModelConfig(!showModelConfig);
              if (showModelSelector) setShowModelSelector(false);
            }}
            $isActive={showModelConfig}
            title="AI模型配置"
          >
            <MdSettings size={16} />
          </ConfigButton>
          
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

      <HintText>💡 提示：按 Enter 发送消息，按 Shift+Enter 换行</HintText>
    </SenderContainer>
  );
};

const SenderContainer = styled.div`
  position: sticky;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(248, 250, 252, 0.95) 0%,
    rgba(241, 245, 249, 0.98) 100%
  );
  border-top: 2px solid rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(12px);
  padding: 20px 24px 16px;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 16px 16px 12px;
  }

  @media (max-width: 480px) {
    padding: 12px 12px 8px;
  }
`;

const ModelConfigRow = styled.div`
  margin-bottom: 12px;
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
      max-height: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0);
      max-height: 200px;
    }
  }
`;

const ModelConfigContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 12px;
  padding: 12px 16px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

const CurrentModelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const ModelDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ModelName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
`;

const ModelDescription = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`;

const CompactModelSelector = styled.div`
  position: relative;
  display: inline-block;
`;

const ModelButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  color: #475569;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
    color: #334155;
  }

  ${props => props.$isOpen && `
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.4);
    color: #1e293b;
  `}
`;

const CompactDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(12px);
  z-index: 1000;
  margin-top: 4px;
  animation: dropdownFadeIn 0.15s ease-out;
  overflow: hidden;

  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const CompactOption = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  background: ${props => props.$isSelected 
    ? 'rgba(59, 130, 246, 0.1)'
    : 'transparent'
  };
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 0.8rem;
  color: #1e293b;
  text-align: left;

  &:hover {
    background: rgba(59, 130, 246, 0.08);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(59, 130, 246, 0.08);
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
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  max-width: 1200px;
  margin: 0 auto;

  &:focus-within {
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 12px 32px rgba(59, 130, 246, 0.18),
      0 6px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 1200px) {
    max-width: 100%;
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

const ConfigButton = styled.button<{ $isActive: boolean }>`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    : 'rgba(59, 130, 246, 0.1)'
  };
  color: ${props => props.$isActive ? 'white' : '#475569'};
  border: 1px solid ${props => props.$isActive 
    ? 'rgba(59, 130, 246, 0.3)'
    : 'rgba(59, 130, 246, 0.2)'
  };

  &:hover {
    background: ${props => props.$isActive 
      ? 'linear-gradient(135deg, #1d4ed8, #1e40af)'
      : 'rgba(59, 130, 246, 0.15)'
    };
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionButton = styled.button<{ $variant: "send" | "stop" }>`
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

  background: ${(props) =>
    props.$variant === "send"
      ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
      : "linear-gradient(135deg, #ef4444, #dc2626)"};

  color: white;
  box-shadow: 0 4px 12px
    ${(props) =>
      props.$variant === "send"
        ? "rgba(59, 130, 246, 0.3)"
        : "rgba(239, 68, 68, 0.3)"};

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 20px
      ${(props) =>
        props.$variant === "send"
          ? "rgba(59, 130, 246, 0.4)"
          : "rgba(239, 68, 68, 0.4)"};
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &:after {
    content: "";
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
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1200px) {
    max-width: 100%;
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

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
  &:nth-child(3) {
    animation-delay: 0s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
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
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1200px) {
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-top: 6px;
  }
`;

export { Sender };