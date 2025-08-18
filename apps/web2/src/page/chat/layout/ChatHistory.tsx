import styled from "styled-components";
import { useHistory } from "../hooks/useHistory";
import { useNavigate } from "react-router-dom";
import { UUIDTypes } from "uuid";
import dayjs from "dayjs";
import NiceModal from "@ebay/nice-modal-react";
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineClockCircle,
  AiOutlineEdit,
  AiOutlineMore,
  AiFillDelete,
} from "react-icons/ai";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import RenameModal from "../modal/RenameModal";
import { DeleteChatModal } from "../modal/DeleteChatModal";
import { useEffect } from "react";

const ChatHistory = () => {
  const { chats, createChat, sortByTime } = useHistory();
  const route = useNavigate();

  useEffect(() => {
    sortByTime();
  }, []);

  const handleClick = (id: UUIDTypes) => {
    route(`/chat/${id}`);
  };

  const handleRename = (id: UUIDTypes) => {
    NiceModal.show(RenameModal, { id: id.toString() });
  };

  const handleDelete = (id: UUIDTypes) => {
    NiceModal.show(DeleteChatModal, { id: id.toString() });
  };

  const getMenuItems = (chatId: UUIDTypes): MenuProps["items"] => [
    {
      key: "rename",
      label: "重命名",
      icon: <AiOutlineEdit />,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        handleRename(chatId);
      },
    },
    {
      key: "delete",
      label: "删除对话",
      icon: <AiFillDelete />,
      danger: true,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        handleDelete(chatId);
      },
    },
  ];

  return (
    <ChatHistoryContainer>
      <HeaderSection>
        <HeaderIcon>📚</HeaderIcon>
        <HeaderTitle>对话历史</HeaderTitle>
        <CreateButton onClick={() => createChat()}>
          <AiOutlinePlus size={16} />
          <span>新建对话</span>
        </CreateButton>
      </HeaderSection>

      <ContentSection>
        {chats.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <AiOutlineMessage size={48} />
            </EmptyIcon>
            <EmptyText>还没有对话记录</EmptyText>
            <EmptySubtext>点击"新建对话"开始你的第一次AI对话</EmptySubtext>
          </EmptyState>
        ) : (
          <ListContainer>
            {chats.map((chat, index) => (
              <ListWrapper
                key={chat.id.toString()}
                onClick={() => handleClick(chat.id)}
                $index={index}
              >
                <ChatIcon>
                  <AiOutlineMessage size={20} />
                </ChatIcon>
                <ChatContent>
                  <ChatTitle>{chat.title || "未命名对话"}</ChatTitle>
                  <ChatTime>
                    <AiOutlineClockCircle size={14} />
                    <span>{dayjs(chat.updateTime).format("MM-DD HH:mm")}</span>
                  </ChatTime>
                </ChatContent>
                <ActionMenu>
                  <Dropdown
                    menu={{ items: getMenuItems(chat.id) }}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <MenuButton onClick={(e) => e.stopPropagation()}>
                      <AiOutlineMore size={16} />
                    </MenuButton>
                  </Dropdown>
                </ActionMenu>
                <HoverIndicator />
              </ListWrapper>
            ))}
          </ListContainer>
        )}
      </ContentSection>
    </ChatHistoryContainer>
  );
};

const ChatHistoryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #f8fafc 0%,
    #f1f5f9 30%,
    #e2e8f0 70%,
    #cbd5e1 100%
  );
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 2px solid rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const HeaderIcon = styled.div`
  font-size: 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  flex: 1;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
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

const EmptyIcon = styled.div`
  color: #94a3b8;
  margin-bottom: 24px;
  animation: gentle-bounce 3s ease-in-out infinite;

  @keyframes gentle-bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const EmptyText = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #475569;
  margin: 0 0 12px 0;
`;

const EmptySubtext = styled.p`
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  max-width: 300px;
  line-height: 1.5;
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListWrapper = styled.li<{ $index: number }>`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.4s ease-out;
  animation-delay: ${(props) => props.$index * 0.05}s;
  animation-fill-mode: both;
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.15),
      0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(-2px);
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

const ChatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ChatContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChatTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatTime = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #64748b;

  svg {
    flex-shrink: 0;
  }
`;

const ActionMenu = styled.div`
  opacity: 0;
  transition: all 0.2s ease;

  ${ListWrapper}:hover & {
    opacity: 1;
  }
`;

const MenuButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    transform: scale(1.1);
  }
`;

const HoverIndicator = styled.div`
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  opacity: 0;
  transition: all 0.2s ease;

  ${ListWrapper}:hover & {
    opacity: 1;
    transform: translateY(-50%) scale(1.2);
  }
`;

export { ChatHistory };
