import { Modal } from "@arco-design/web-react";
import NiceModal from "@ebay/nice-modal-react";
import { useState } from "react";
import styled from "styled-components";
import { ProjectItem } from "../../hooks/useProjectStorage";

type Props = {
  project: ProjectItem;
};

const SetInstructionModal = NiceModal.create<Props>(({ project }) => {
  const modal = NiceModal.useModal();
  const [text, setText] = useState(project.aiProps ?? "");

  const handleClose = () => {
    modal.hide();
    setTimeout(() => modal.remove(), 300);
  };

  const handleConfirm = () => {
    if (!text.trim()) {
      modal.reject();
    } else {
      modal.resolve(text);
    }
    handleClose();
  };

  return (
    <CustomModal
      visible={modal.visible}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      title={null}
    >
      <ContentWrapper>
        <div className="text-xl font-bold">设置项目的AI提示词</div>
        <CustomTextArea
          rows={10}
          placeholder="请填写AI提示词"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </ContentWrapper>
    </CustomModal>
  );
});

const CustomTextArea = styled.textarea`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 20px;
  background: ${({ theme }) => theme.colors.componentBg};
  resize: none;
`;

const ContentWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CustomModal = styled(Modal)`
  background: ${({ theme }) => theme.colors.background};
`;

export { SetInstructionModal };
