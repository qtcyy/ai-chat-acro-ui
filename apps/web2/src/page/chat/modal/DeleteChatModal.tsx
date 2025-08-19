import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal, message } from "antd";
import { UUIDTypes } from "uuid";
import { useHistory } from "../hooks/useHistory";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineExclamationCircle } from "react-icons/ai";

interface DeleteChatModalProps {
  id: UUIDTypes;
}

interface DeleteChatBatchModalProps {
  ids: UUIDTypes[];
}

const DeleteChatModal = NiceModal.create(({ id }: DeleteChatModalProps) => {
  const modal = useModal();
  const { deleteChat, chats } = useHistory();
  const [loading, setLoading] = useState(false);

  // 获取当前聊天记录
  const currentChat = chats.find((chat) => chat.id === id);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteChat(id);
      message.success("对话已删除");
      modal.resolve(true);
      modal.hide();
    } catch (error) {
      console.error("删除失败:", error);
      message.error("删除失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    modal.resolve(false);
    modal.hide();
  };

  return (
    <Modal
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#dc2626",
          }}
        >
          <AiOutlineDelete />
          <span>删除对话</span>
        </div>
      }
      open={modal.visible}
      onOk={handleDelete}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="确认删除"
      cancelText="取消"
      okButtonProps={{
        danger: true,
      }}
      width={480}
      centered
      destroyOnHidden
    >
      <div
        className="flex flex-col"
        style={{ padding: "16px 0", textAlign: "center" }}
      >
        <div className="mx-auto" style={{ marginBottom: "16px" }}>
          <AiOutlineExclamationCircle
            size={48}
            style={{ color: "#dc2626", marginBottom: "12px" }}
          />
        </div>
        <div
          style={{ fontSize: "16px", color: "#374151", marginBottom: "8px" }}
        >
          确定要删除对话 <strong>"{currentChat?.title || "未命名对话"}"</strong>{" "}
          吗？
        </div>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>
          此操作无法撤销，对话中的所有消息都将被永久删除。
        </div>
      </div>
    </Modal>
  );
});

const DeleteChatBatchModal = NiceModal.create(
  (props: DeleteChatBatchModalProps) => {
    const { ids } = props;
    const modal = useModal();
    const { deleteChatBatch, chats } = useHistory();
    const [loading, setLoading] = useState(false);

    // 获取要删除的聊天记录
    const selectedChats = chats.filter((chat) => ids.includes(chat.id));

    const handleDelete = async () => {
      try {
        setLoading(true);
        await deleteChatBatch(ids);
        message.success(`已删除 ${ids.length} 个对话`);
        modal.resolve(true);
        modal.hide();
      } catch (error) {
        console.error("批量删除失败:", error);
        message.error("删除失败，请重试");
      } finally {
        setLoading(false);
      }
    };

    const handleCancel = () => {
      modal.resolve(false);
      modal.hide();
    };

    return (
      <Modal
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#dc2626",
            }}
          >
            <AiOutlineDelete />
            <span>批量删除对话</span>
          </div>
        }
        open={modal.visible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="确认删除"
        cancelText="取消"
        okButtonProps={{
          danger: true,
        }}
        width={520}
        centered
        destroyOnHidden
      >
        <div
          className="flex flex-col"
          style={{ padding: "16px 0", textAlign: "center" }}
        >
          <div className="mx-auto" style={{ marginBottom: "16px" }}>
            <AiOutlineExclamationCircle
              size={48}
              style={{ color: "#dc2626", marginBottom: "12px" }}
            />
          </div>
          <div
            style={{ fontSize: "16px", color: "#374151", marginBottom: "12px" }}
          >
            确定要删除选中的 <strong>{ids.length}</strong> 个对话吗？
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "12px" }}>
            此操作无法撤销，所有选中对话中的消息都将被永久删除。
          </div>
          
          {/* 显示要删除的对话列表 */}
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              padding: "12px",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
              将要删除的对话:
            </div>
            {selectedChats.map((chat, index) => (
              <div
                key={chat.id.toString()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 0",
                  borderBottom: index < selectedChats.length - 1 ? "1px solid #e5e7eb" : "none",
                }}
              >
                <AiOutlineDelete size={14} style={{ color: "#dc2626" }} />
                <span style={{ fontSize: "14px", color: "#374151" }}>
                  {chat.title || "未命名对话"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    );
  }
);

export { DeleteChatModal, DeleteChatBatchModal };
