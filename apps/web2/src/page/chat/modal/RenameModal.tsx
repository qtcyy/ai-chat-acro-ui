import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal, Input, Form, message } from "antd";
import { UUIDTypes } from "uuid";
import { useHistory } from "../hooks/useHistory";
import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";

interface RenameModalProps {
  id: UUIDTypes;
}

const RenameModal = NiceModal.create(({ id }: RenameModalProps) => {
  const modal = useModal();
  const { renameChat, chats } = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 获取当前聊天记录
  const currentChat = chats.find((chat) => chat.id === id);

  useEffect(() => {
    if (currentChat) {
      form.setFieldsValue({
        title: currentChat.title || "未命名对话",
      });
    }
  }, [currentChat, form]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const newTitle = values.title.trim();

      if (newTitle && newTitle !== currentChat?.title) {
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
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          name="title"
          label="对话标题"
          rules={[
            { required: true, message: "请输入对话标题" },
            { max: 50, message: "标题不能超过50个字符" },
            { whitespace: true, message: "标题不能为空" },
          ]}
        >
          <Input
            placeholder="请输入新的对话标题"
            maxLength={50}
            showCount
            autoFocus
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default RenameModal;
