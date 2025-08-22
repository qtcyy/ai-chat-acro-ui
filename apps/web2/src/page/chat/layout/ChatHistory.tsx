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
import { Checkbox, Dropdown, Input } from "antd";
import type { MenuProps } from "antd";
import RenameModal from "../modal/RenameModal";
import {
  DeleteChatModal,
  DeleteChatBatchModal,
} from "../modal/DeleteChatModal";
import { useEffect, useState } from "react";

const ChatHistory = () => {
  const { chats, createChat, sortByTime, loadChats } = useHistory();
  const route = useNavigate();

  const [onSelect, setOnSelect] = useState(false);
  const [selectSet, setSelectSet] = useState<Set<UUIDTypes>>();
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    if (!onSelect) {
      setSelectSet((pre) => {
        const newSet = pre;
        newSet?.clear();
        return new Set(newSet);
      });
    }
  }, [onSelect]);

  useEffect(() => {
    loadChats();
  }, []);

  const handleCreate = async () => {
    const newChat = await createChat();
    await loadChats();
    route(`/chat/${newChat.id}`);
  };

  const handleClick = async (id: UUIDTypes) => {
    route(`/chat/${id}`);
  };

  const handleRename = async (id: UUIDTypes) => {
    await NiceModal.show(RenameModal, { id: id.toString() });
    await loadChats();
  };

  const handleDelete = async (id: UUIDTypes) => {
    await NiceModal.show(DeleteChatModal, { id: id.toString() });
    await loadChats();
  };

  const handleSelect = (id: UUIDTypes) => {
    const newSet = new Set(selectSet);
    if (selectSet?.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectSet(newSet);
  };

  const handleDeleteBatch = () => {
    if (selectSet && selectSet.size > 0) {
      const idsArray = Array.from(selectSet);
      NiceModal.show(DeleteChatBatchModal, { ids: idsArray }).then((result) => {
        if (result) {
          // 删除成功后清空选择集合
          setSelectSet(new Set());
          setOnSelect(false);
          loadChats();
        }
      });
    }
  };

  const handleSearch = () => {};

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
        <div className="mx-auto">
          <Input.Search placeholder="搜索对话标题" onSearch={handleSearch} />
        </div>
        <DeleteBatchButton
          $visible={!!selectSet?.size}
          onClick={handleDeleteBatch}
        >
          <AiFillDelete size={14} />
          删除 ({selectSet?.size || 0})
        </DeleteBatchButton>
        <SelectToggleButton
          $isActive={onSelect}
          onClick={() => setOnSelect((pre) => !pre)}
        >
          {onSelect ? "取消选择" : "快速选择"}
        </SelectToggleButton>
        <CreateButton onClick={handleCreate}>
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
          <ListContainer $selectMode={onSelect}>
            {chats.map((chat, index) => (
              <ListWrapper
                key={chat.id.toString()}
                onClick={() => {
                  onSelect ? handleSelect(chat.id) : handleClick(chat.id);
                }}
                $index={index}
                $selectMode={onSelect}
              >
                <CheckboxContainer $visible={onSelect}>
                  <Checkbox
                    checked={selectSet?.has(chat.id)}
                    onChange={() => handleSelect(chat.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </CheckboxContainer>
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
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 2px solid rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;

  /* 为所有按钮添加统一的进入动画 */
  > button {
    animation: buttonSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    animation-fill-mode: both;
    opacity: 0;
  }

  /* 为每个按钮添加正确的递增延迟 */
  > button:nth-child(3) {
    /* DeleteBatchButton */
    animation-delay: 0.1s;
  }
  > button:nth-child(4) {
    /* SelectToggleButton */
    animation-delay: 0.2s;
  }
  > button:nth-child(5) {
    /* CreateButton */
    animation-delay: 0.3s;
  }

  @keyframes buttonSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
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

const DeleteBatchButton = styled.button<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 10px rgba(220, 38, 38, 0.3);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  transform: ${(props) => (props.$visible ? "scale(1)" : "scale(0.9)")};

  &:hover {
    transform: translateY(-1px)
      ${(props) => (props.$visible ? "scale(1.02)" : "scale(0.9)")};
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
    background: linear-gradient(135deg, #b91c1c, #991b1b);
  }

  &:active {
    transform: translateY(0)
      ${(props) => (props.$visible ? "scale(1)" : "scale(0.9)")};
  }
`;

const SelectToggleButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${(props) =>
    props.$isActive
      ? "linear-gradient(135deg, #059669, #047857)"
      : "rgba(59, 130, 246, 0.1)"};
  color: ${(props) => (props.$isActive ? "white" : "#475569")};
  border: 1px solid
    ${(props) =>
      props.$isActive ? "rgba(5, 150, 105, 0.3)" : "rgba(59, 130, 246, 0.2)"};
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$isActive
      ? "0 3px 10px rgba(5, 150, 105, 0.3)"
      : "0 2px 6px rgba(59, 130, 246, 0.15)"};

  &:hover {
    transform: translateY(-1px);
    background: ${(props) =>
      props.$isActive
        ? "linear-gradient(135deg, #047857, #065f46)"
        : "rgba(59, 130, 246, 0.15)"};
    border-color: ${(props) =>
      props.$isActive ? "rgba(5, 150, 105, 0.4)" : "rgba(59, 130, 246, 0.3)"};
    box-shadow: ${(props) =>
      props.$isActive
        ? "0 4px 12px rgba(5, 150, 105, 0.4)"
        : "0 4px 10px rgba(59, 130, 246, 0.2)"};
  }

  &:active {
    transform: translateY(0);
  }
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

const ListContainer = styled.ul<{ $selectMode: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: ${(props) =>
    props.$selectMode ? "translateX(8px)" : "translateX(0)"};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CheckboxContainer = styled.div<{ $visible: boolean }>`
  width: ${(props) => (props.$visible ? "32px" : "0px")};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${(props) =>
    props.$visible ? "translateX(0)" : "translateX(-10px)"};
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-checkbox-wrapper {
    transition: all 0.2s ease;
    transform: ${(props) => (props.$visible ? "scale(1)" : "scale(0.8)")};
  }

  .ant-checkbox {
    transform: ${(props) =>
      props.$visible ? "rotate(0deg)" : "rotate(-15deg)"};
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    animation: ${(props) =>
      props.$visible ? "checkboxPulse 0.4s ease-out" : "none"};
  }

  @keyframes checkboxPulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const ListWrapper = styled.li<{ $index: number; $selectMode: boolean }>`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${(props) => (props.$selectMode ? "0.1s" : "0s")};
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
