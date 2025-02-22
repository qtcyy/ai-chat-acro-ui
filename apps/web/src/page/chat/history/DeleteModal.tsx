import { Modal } from "@arco-design/web-react";
import NiceModal from "@ebay/nice-modal-react";

const DeleteModal = NiceModal.create(() => {
  const modal = NiceModal.useModal();

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
    <Modal
      visible={modal.visible}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      title={<div className="w-full flex text-xl">永久删除会话</div>}
    >
      本条会话数据将被永久删除，不可恢复及撤销。确定要删除吗？
    </Modal>
  );
});

export { DeleteModal };
