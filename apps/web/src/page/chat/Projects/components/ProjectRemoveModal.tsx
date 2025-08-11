import { Modal } from "@arco-design/web-react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import styled from "styled-components";

const ProjectRemoveModal = NiceModal.create(() => {
  const modal = useModal();

  const handleClose = () => {
    modal.hide();
    setTimeout(() => {
      modal.remove();
    }, 300);
  };

  const handleConfirm = () => {
    modal.resolve(true);
    handleClose();
  };

  return (
    <CustomModal
      title={<CustomTitle>删除项目</CustomTitle>}
      visible={modal.visible}
      onCancel={handleClose}
      onOk={handleConfirm}
    >
      <ContentWrapper>确定删除项目吗？</ContentWrapper>
    </CustomModal>
  );
});

const ContentWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

const CustomTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
`;

const CustomModal = styled(Modal)`
  background: ${({ theme }) => theme.colors.componentBg};
`;

export { ProjectRemoveModal };
