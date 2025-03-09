import { JSX } from "react";
import { useStore } from "../../../../store";
import { useNavigate } from "react-router-dom";
import { request } from "utils";
import { BaseResponseType } from "../../../../env";
import {
  IconMessage,
  IconExport,
  IconSettings,
} from "@arco-design/web-react/icon";
import { motion } from "motion/react";
import { CgDarkMode } from "react-icons/cg";
import styled from "styled-components";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "theme";

const DropdownList = (): JSX.Element => {
  const { loginUsername, setReloadSignal, reloadSignal, setLoginUsername } =
    useStore();
  const route = useNavigate();
  const { setTheme, isDarkMode } = useTheme();

  const handleLogout = async () => {
    try {
      const response = await request.get<BaseResponseType>("/api/user/logout");
      if (response.data.code !== 200) {
        throw new Error(response.data.msg);
      }
      localStorage.removeItem("token");
      setReloadSignal(reloadSignal + 1);
      setLoginUsername(undefined);
      route("/ai/chat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContentWrapper
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className="absolute z-10 w-48 mt-2 text-sm rounded shadow-lg left-[70px] bottom-[-10px] -translate 
                         x-1/2"
    >
      <ul style={{ listStyle: "none" }}>
        <ListWrapper
          className={`${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
        >
          <div className="text-md">
            <IconMessage />
          </div>
          用户反馈
        </ListWrapper>
        <MotionListWrapper
          className={`${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
          initial="rest"
          animate="rest"
          whileHover={"hover"}
        >
          <div className="text-md">
            <CgDarkMode />
          </div>
          界面主题
          <motion.div
            className=" absolute z-11 left-[12rem] px-2 py-1"
            variants={{
              hover: { opacity: 1, y: 0 },
              rest: { opacity: 0, y: 10 },
            }}
            transition={{ duration: 0.2, delay: 0 }}
          >
            <ThemeContainer>
              <div
                className={`flex flex-row items-center gap-2 px-[12px] py-[12px] ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
                onClick={() => setTheme("light")}
              >
                <IoSunnyOutline />
                浅色
              </div>
              <div
                className={`flex flex-row items-center gap-2 px-[12px] py-[12px] ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
                onClick={() => setTheme("dark")}
              >
                <IoMoon />
                深色
              </div>
            </ThemeContainer>
          </motion.div>
        </MotionListWrapper>
        <MotionListWrapper
          className={`${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
          onClick={() => route("/ai/setting")}
        >
          <IconSettings />
          应用设置
        </MotionListWrapper>
        {loginUsername && (
          <MotionListWrapper
            className={`${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            } text-red-400`}
            onClick={handleLogout}
          >
            <div className="text-md">
              <IconExport />
            </div>
            退出登录
          </MotionListWrapper>
        )}
      </ul>
    </ContentWrapper>
  );
};

const ContentWrapper = styled(motion.div)`
  color: ${(props) => props.theme.colors.text};
`;

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.componentBg};
  width: 100px;
`;

const ListWrapper = styled.li`
  padding: 12px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background: ${(props) => props.theme.colors.componentBg};
  cursor: pointer;
`;

const MotionListWrapper = styled(motion.li)`
  padding: 12px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background: ${(props) => props.theme.colors.componentBg};
  cursor: pointer;
`;

export { DropdownList };
