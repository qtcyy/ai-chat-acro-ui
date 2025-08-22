import { motion } from "motion/react";
import {
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineShareAlt,
} from "react-icons/ai";
import styled from "styled-components";

interface MessageToolbarProps {
  messageId: string;
  onCopy?: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
  onShare?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
}

const MessageToolbar: React.FC<MessageToolbarProps> = ({
  messageId,
  onCopy,
  onEdit,
  onShare,
  onDelete,
}) => {
  const handleCopy = () => onCopy?.(messageId);
  const handleEdit = () => onEdit?.(messageId);
  const handleShare = () => onShare?.(messageId);
  const handleDelete = () => onDelete?.(messageId);

  return (
    <motion.div
      className="ml-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      <ToolbarContainer>
        <ToolbarButton onClick={handleCopy} title="复制内容">
          <AiOutlineCopy size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={handleEdit} title="编辑消息">
          <AiOutlineEdit size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={handleShare} title="分享消息">
          <AiOutlineShareAlt size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={handleDelete} title="删除消息">
          <AiOutlineDelete size={16} color="red" />
        </ToolbarButton>
      </ToolbarContainer>
    </motion.div>
  );
};

export { MessageToolbar };

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  margin-top: 8px;
  background: rgba(249, 250, 251, 0.8);
  border: 1px solid rgba(229, 231, 235, 0.6);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: fit-content;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(243, 244, 246, 0.9);
    border-color: rgba(209, 213, 219, 0.8);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    gap: 4px;
    padding: 4px 6px;
    margin-top: 6px;
  }
`;

const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(107, 114, 128, 0.1);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    color: #374151;
    transform: translateY(-1px);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);

    &::before {
      background: rgba(107, 114, 128, 0.15);
    }
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
