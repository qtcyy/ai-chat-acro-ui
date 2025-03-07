import styled, { css } from "styled-components";
import { DeepSeekIcons } from "../../../assets/home/Deepseek";
import { Avatar, Divider, Modal, Tooltip } from "@arco-design/web-react";
import {
  IconClose,
  IconCommand,
  IconFolderAdd,
  IconHome,
  IconList,
} from "@arco-design/web-react/icon";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NiceModal from "@ebay/nice-modal-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoginModal } from "../login/LoginModal";
import { request } from "utils";
import { BaseResponseType } from "../../../env";
import { useStore } from "../../../store";
import { useAsyncEffect } from "ahooks";
import { DropdownList } from "./components/dropdown";
import { useTheme } from "theme";

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
  background: ${(props) => (props.theme.mode === "dark" ? "#31313a" : "#fff")};
  box-shadow: ${(props) => props.theme.colors.boxShadow};
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
  const { isDarkMode } = useTheme();

  const [isHover, setIsHover] = useState(false);
  const { setLoginId, loginUsername, setLoginUsername, reloadSignal } =
    useStore();

  const checkLogin = async () => {
    try {
      const response = await request.get<BaseResponseType>("/api/user/isLogin");
      if (response.data.code !== 200) {
        throw new Error(response.data.msg);
      }
      console.log(response.data);
      setLoginId(response.data.id);
    } catch (error) {
      console.error("检查登录错误", error);
      setLoginId(undefined);
    }
  };

  const getUsername = async () => {
    try {
      const response = await request.get<BaseResponseType>(
        "/api/user/getLoginUsername"
      );
      if (response.data.code !== 200) {
        throw new Error(response.data.msg);
      }
      setLoginUsername(response.data.username);
    } catch (error) {
      console.error(error);
      setLoginUsername(undefined);
    }
  };

  useAsyncEffect(async () => {
    await checkLogin();
    await getUsername();
  }, [reloadSignal]);

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

  const handleLogin = async () => {
    if (!loginUsername) {
      await NiceModal.show(LoginModal, { route });
    }
  };

  return (
    <SiderWrapper>
      {location.pathname.endsWith("/list") && (
        <ClearButtonWrapper onClick={handleRemoveAll}>
          <IconClose />
        </ClearButtonWrapper>
      )}
      <ContentWrapper>
        <Tooltip position="right" trigger={"hover"} content="回到主页">
          <motion.div
            className={`h-[40px] w-[40px] cursor-pointer rounded-md 
              transition-colors duration-100 ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            onClick={() => route("/ai/chat")}
            whileTap={{ scale: 0.9 }}
          >
            <DeepSeekIcons />
          </motion.div>
        </Tooltip>
        <Divider className={"my-2"} type="horizontal" />
        <Tooltip position="right" trigger={"hover"} content="新建对话">
          <motion.div
            className={`p-3 my-2 cursor-pointer rounded-md transition-colors 
              duration-100 hover:bg-gray-200 ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            onClick={handleNewCon}
            whileTap={{ scale: 0.9 }}
          >
            <IconFolderAdd className=" scale-150" />
          </motion.div>
        </Tooltip>
        <Tooltip position="right" trigger={"hover"} content="历史记录">
          <motion.div
            className={`p-3 my-2 cursor-pointer rounded-md transition-colors
               duration-100 ${
                 isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
               }`}
            onClick={() => route("/ai/chat/list")}
            whileTap={{ scale: 0.9 }}
          >
            <IconList className=" scale-150" />
          </motion.div>
        </Tooltip>
        <Tooltip position="right" trigger={"hover"} content="更多应用">
          <div
            className={`text-xl my-2 py-1 px-2 rounded-md transition-colors
               duration-100 cursor-pointer ${
                 isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
               }`}
          >
            <IconCommand />
          </div>
        </Tooltip>
        <Divider className={"my-2"} type="horizontal" />
        <div
          className=" relative"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Avatar className={"cursor-pointer mt-4"} onClick={handleLogin}>
            {loginUsername?.slice(0, 2).toUpperCase()}
          </Avatar>
          <AnimatePresence>{isHover && <DropdownList />}</AnimatePresence>
        </div>
        <Tooltip position="right" trigger={"hover"} content="仪表盘">
          <div
            className={`text-xl mt-6 py-1 px-2 rounded-md transition-colors
               duration-100 cursor-pointer ${
                 isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
               }`}
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
