import { Button, Input, Modal } from "@arco-design/web-react";
import NiceModal from "@ebay/nice-modal-react";
import { ChatItem } from "../hooks/useChatStorage";
import styled from "styled-components";
import { useState } from "react";
import { useAutoRename } from "../hooks/useAutoRename";

type Props = {
  chat: ChatItem;
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const RenameModal = NiceModal.create<Props>((props) => {
  const { chat } = props;
  const modal = NiceModal.useModal();
  const [name, setName] = useState(chat.name);
  const [loading, setLoading] = useState(false);

  const { getName } = useAutoRename({
    messages: chat.content,
    body: {
      model: "doubao-1-5-lite-32k-250115",
    },
  });

  const handleClose = () => {
    modal.hide();
    setTimeout(() => {
      modal.remove();
    }, 300);
  };

  const handleConfirm = () => {
    if (name === "") {
      return;
    }
    modal.resolve(name);
    handleClose();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.select();
  };

  const handleAutoRename = async () => {
    setLoading(true);
    try {
      const newName = await getName();
      setName(newName);
      console.log(newName);
    } catch (error) {
      console.error("命名错误： ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={modal.visible}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      title="重命名对话"
    >
      <ContentWrapper>
        <Input
          value={name}
          onChange={(e) => setName(e)}
          placeholder="请输入名称..."
          onFocus={(e) => handleFocus(e)}
          allowClear
        />
        <Button loading={loading} onClick={handleAutoRename}>
          智能命名
        </Button>
      </ContentWrapper>
    </Modal>
  );
});

export { RenameModal };
