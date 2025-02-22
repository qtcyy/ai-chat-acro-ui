import styled from "styled-components";
import { DeepSeekIcons } from "../../../assets/home/Deepseek";
import { Avatar, Divider, Modal, Tooltip } from "@arco-design/web-react";
import {
  IconClose,
  IconFolderAdd,
  IconHome,
  IconList,
} from "@arco-design/web-react/icon";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NiceModal from "@ebay/nice-modal-react";

const SiderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 24px;
  margin-left: 20px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ClearButtonWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 40px;
  font-size: 25px;
  padding: 8px 12px;
  background: red;
  color: white;
  border-radius: 12px;
  cursor: pointer;
`;

const RemoveAllModal = NiceModal.create(() => {
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
      title="删除所有对话"
    >
      <div>所有对话数据将被永久删除，不可恢复及撤销。确定要删除吗？</div>
    </Modal>
  );
});

const Sider = () => {
  const route = useNavigate();
  const location = useLocation();

  const handleRemoveAll = async () => {
    const confirm = await NiceModal.show(RemoveAllModal);
    if (confirm) {
      console.log("remove all");
    }
  };

  const handleNewCon = () => {
    const chatId = uuidv4();
    route(`/ai/chat/page/${chatId}`);
  };

  const handleLogin = () => {};

  return (
    <SiderWrapper>
      {location.pathname.endsWith("/list") && (
        <ClearButtonWrapper onClick={handleRemoveAll}>
          <IconClose />
        </ClearButtonWrapper>
      )}
      <ContentWrapper>
        <Tooltip position="right" trigger={"hover"} content="回到主页">
          <div
            className="h-[40px] w-[40px] cursor-pointer rounded-md transition-colors duration-100 hover:bg-gray-200"
            onClick={() => route("/ai/chat")}
          >
            <DeepSeekIcons />
          </div>
        </Tooltip>
        <Divider className={"my-2"} type="horizontal" />
        <Tooltip position="right" trigger={"hover"} content="新建对话">
          <div
            className="p-3 my-2 cursor-pointer rounded-md transition-colors duration-100 hover:bg-gray-200"
            onClick={handleNewCon}
          >
            <IconFolderAdd className=" scale-150" />
          </div>
        </Tooltip>
        <Tooltip position="right" trigger={"hover"} content="历史记录">
          <div
            className="p-3 my-2 cursor-pointer rounded-md transition-colors duration-100 hover:bg-gray-200"
            onClick={() => route("/ai/chat/list")}
          >
            <IconList className=" scale-150" />
          </div>
        </Tooltip>
        <Divider className={"my-2"} type="horizontal" />
        <Avatar className={"cursor-pointer mt-4"} onClick={handleLogin}>
          登录
        </Avatar>
        <Tooltip position="right" trigger={"hover"} content="仪表盘">
          <div
            className="text-xl mt-6 py-1 px-2 rounded-md transition-colors duration-100 cursor-pointer hover:bg-gray-200"
            onClick={() => route("/layout")}
          >
            <IconHome />
          </div>
        </Tooltip>
      </ContentWrapper>
    </SiderWrapper>
  );
};

export { Sider };
