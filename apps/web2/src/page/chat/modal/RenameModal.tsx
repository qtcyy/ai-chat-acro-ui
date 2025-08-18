import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal, Input, message, Button } from "antd";
import { UUIDTypes } from "uuid";
import { useHistory } from "../hooks/useHistory";
import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useAutoRename } from "../utils/AutoRename";

interface RenameModalProps {
  id: UUIDTypes;
}

const RenameModal = NiceModal.create(({ id }: RenameModalProps) => {
  const modal = useModal();
  const { renameChat, chats } = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { loading: autoRenameLoading, getName } = useAutoRename({ setName });

  // 获取当前聊天记录
  const currentChat = chats.find((chat) => chat.id === id);

  // 初始化输入框值
  useEffect(() => {
    if (currentChat) {
      setInputValue(currentChat.title || "未命名对话");
    }
  }, [currentChat]);

  // 自动重命名后更新输入框
  useEffect(() => {
    if (name) {
      console.log("自动命名结果:", name);
      setInputValue(name);
    }
  }, [name]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const newTitle = inputValue.trim();

      // 验证输入
      if (!newTitle) {
        message.error("请输入对话标题");
        return;
      }

      if (newTitle.length > 50) {
        message.error("标题不能超过50个字符");
        return;
      }

      if (newTitle !== currentChat?.title) {
        // 调用重命名方法
        await renameChat(id, newTitle);
        message.success("对话标题已更新");
        modal.resolve(newTitle);
      }

      modal.hide();
    } catch (error) {
      console.error("重命名失败:", error);
      message.error("重命名失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    modal.hide();
  };

  const handleRename = () => {
    if (!currentChat?.id) return;
    getName(currentChat.id);
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AiOutlineEdit />
          <span>重命名对话</span>
        </div>
      }
      open={modal.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="确认"
      cancelText="取消"
      width={480}
      centered
      destroyOnHidden
    >
      <div style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>对话标题</div>
        <div className="flex flex-row gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="请输入新的对话标题"
            maxLength={50}
            showCount
            autoFocus
          />
          <Button onClick={handleRename} loading={autoRenameLoading}>
            智能命名
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default RenameModal;
