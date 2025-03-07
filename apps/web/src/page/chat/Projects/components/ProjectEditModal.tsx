import { Modal } from "@arco-design/web-react";
import NiceModal from "@ebay/nice-modal-react";
import styled from "styled-components";
import { ProjectItem } from "../../hooks/useProjectStorage";
import { useState } from "react";

type Props = {
  project: ProjectItem;
};

const ProjectEditModal = NiceModal.create<Props>(({ project }) => {
  const modal = NiceModal.useModal();
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [error, setError] = useState(false);
  const handleClose = () => {
    modal.hide();
    setTimeout(() => {
      modal.remove();
    }, 300);
  };

  const handleConfirm = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    modal.resolve({
      name,
      description,
    });
    handleClose();
  };

  return (
    <CustomModal
      visible={modal.visible}
      title={<CustomTitle>编辑项目信息</CustomTitle>}
      onCancel={handleClose}
      onOk={handleConfirm}
    >
      <ContentWrapper>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">Name</div>
          <CustomInput value={name} onChange={(e) => setName(e.target.value)} />
          {error && (
            <div className="text-red-500 ml-auto font-bold">请输入项目名称</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">Description</div>
          <CustomTextArea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </ContentWrapper>
    </CustomModal>
  );
});

const CustomTextArea = styled.textarea`
  padding: 6px 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.componentBg};
  resize: none;
`;

const CustomInput = styled.input`
  padding: 6px 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.componentBg};
`;

const CustomTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
`;

const CustomModal = styled(Modal)`
  background: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export { ProjectEditModal };
