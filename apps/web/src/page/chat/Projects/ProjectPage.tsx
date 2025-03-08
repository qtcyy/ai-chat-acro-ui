import { Dropdown, Menu } from "@arco-design/web-react";
import {
  IconArrowLeft,
  IconBook,
  IconCommon,
  IconDelete,
  IconMoreVertical,
} from "@arco-design/web-react/icon";
import NiceModal from "@ebay/nice-modal-react";
import { JSX, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "theme";
import { ProjectEditModal } from "./components/ProjectEditModal";
import { ProjectItem, useProjectStorage } from "../hooks/useProjectStorage";
import { ProjectRemoveModal } from "./components/ProjectRemoveModal";
import { Sender } from "../Sender/Sender";
import { SetInstructionModal } from "./components/SetInstructionModal";
import { ChatItem, useChatStorage } from "../hooks/useChatStorage";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { useStore } from "../../../store";
import { motion } from "motion/react";

const timeDiscrepancy = (timeStr: string): string => {
  const time = dayjs(timeStr);
  const secondDiff = dayjs().diff(time, "second");
  const minuteDiff = dayjs().diff(time, "minute");
  const hourDiff = dayjs().diff(time, "hour");
  const dayDiff = dayjs().diff(time, "day");
  const monthDiff = dayjs().diff(time, "month");
  const yearDiff = dayjs().diff(time, "year");
  return yearDiff
    ? String(yearDiff) + "年"
    : monthDiff
    ? String(monthDiff) + "月"
    : dayDiff
    ? String(dayDiff) + "天"
    : hourDiff
    ? String(hourDiff) + "小时"
    : minuteDiff
    ? String(minuteDiff) + "分钟"
    : String(secondDiff) + "秒";
};

const ProjectPage = (): JSX.Element => {
  const id = useParams().id;
  const location = useLocation();
  const route = useNavigate();
  const { isDarkMode } = useTheme();
  const { projects, updateProject, deleteProject } = useProjectStorage();
  const temp = projects.find((o) => o.id === id);

  const [project, setProject] = useState<ProjectItem>(
    temp ?? {
      id: "-1",
      name: "unknown",
      chatIds: [],
      createTime: "-1",
      updateTime: "-1",
    }
  );
  const store = useChatStorage();
  const { setWaitSendQuestion, setWaitSendProps } = useStore();
  const getChatList = () => {
    const chatIds = new Set(project.chatIds);
    const chats = store?.chats.filter((o) => chatIds.has(o.chatId));
    if (!chats) {
      return [];
    }
    console.log(chats);
    return chats.sort((a, b) =>
      dayjs(a.updateTime).isAfter(b.updateTime) ? -1 : 1
    );
  };
  const [chats, setChats] = useState<ChatItem[]>(getChatList());

  if (!temp || !id) {
    return <div>项目不存在</div>;
  }

  const dropdownMenu = (): ReactNode => {
    const handleClick = async (key: string) => {
      switch (key) {
        case "edit":
          const result = await NiceModal.show(ProjectEditModal, { project });
          if (result) {
            updateProject((old) => {
              const index = old.findIndex((o) => o.id === id);
              const newArray = [...old];
              if (index !== -1) {
                newArray[index] = {
                  ...newArray[index],
                  ...result,
                  updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                };
              }
              return newArray;
            });
            setProject((old) => {
              return { ...old, ...result };
            });
          }
          break;
        case "remove":
          const removeResult = await NiceModal.show(ProjectRemoveModal);
          if (removeResult) {
            deleteProject(id);
            route("/ai/chat/projects");
          }
          break;
      }
    };

    return (
      <Menu
        className={`w-[6rem] ${isDarkMode && "bg-gray-700 border-none"}`}
        onClickMenuItem={handleClick}
      >
        <Menu.Item
          className={`${isDarkMode && "hover:bg-gray-500"}`}
          key="edit"
        >
          <div className={`w-5 ${isDarkMode && "text-white"}`}>编辑</div>
        </Menu.Item>
        <Menu.Item
          className={`${isDarkMode && "hover:bg-gray-500"}`}
          key="remove"
        >
          <div className={`w-5 text-red-500`}>删除</div>
        </Menu.Item>
      </Menu>
    );
  };

  const handleAsk = (question: string) => {
    console.log(question);
    if (!question.trim()) {
      return;
    }
    const chatId = uuidv4();
    store?.addChat({
      chatId,
      name: "新建对话",
      content: [{ role: "start" }],
      createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
    updateProject((old) => {
      const index = old.findIndex((o) => o.id === id);
      const newArray = [...old];
      if (index !== -1) {
        newArray[index] = {
          ...newArray[index],
          chatIds: [...newArray[index].chatIds, chatId],
          updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        };
      }
      return newArray;
    });
    setProject((old) => {
      return {
        ...old,
        chatIds: [...old.chatIds, chatId],
      };
    });
    setWaitSendProps(project.aiProps);
    setWaitSendQuestion(question);
    route(`/ai/chat/page/${chatId}`, { state: { from: location.pathname } });
  };

  const handleClickInstruction = async () => {
    const instruction = (await NiceModal.show(SetInstructionModal, {
      project,
    })) as string;
    console.log(instruction);
    if (instruction) {
      updateProject((old) => {
        const index = old.findIndex((o) => o.id === id);
        const newArray = [...old];
        if (index !== -1) {
          newArray[index] = {
            ...newArray[index],
            aiProps: instruction,
            updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          };
        }
        return newArray;
      });
      console.log(projects);
      setProject((old) => {
        return { ...old, aiProps: instruction };
      });
    }
  };

  return (
    <LayoutWrapper>
      <HeaderWrapper className="w-full pr-8">
        <a
          href="/#/ai/chat/projects"
          className="text-base flex flex-row gap-1 items-center"
        >
          <IconArrowLeft className="scale-125" />
          所有项目
        </a>
        <Dropdown droplist={dropdownMenu()} trigger={["click"]}>
          <div
            className={`ml-auto rounded-lg px-2 py-1 scale-125 cursor-pointer ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            <IconMoreVertical />
          </div>
        </Dropdown>
      </HeaderWrapper>
      <ContentWrapper>
        <MainWrapper>
          <div className="flex flex-col gap-2">
            <div className="text-3xl font-bold font-serif flex flex-row gap-2 items-center">
              <IconCommon />
              {project?.name}
            </div>
            <div className="text-sm text-gray-500">{project?.description}</div>
          </div>
          <Sender
            className="mt-4"
            ask={handleAsk}
            loading={false}
            cancel={() => {}}
            isHome
          />
          <ListWrapper className="mt-5">
            {chats.map((chat) => {
              const handleClick = () => {
                route(`/ai/chat/page/${chat.chatId}`, {
                  state: { from: location.pathname },
                });
              };
              const handleDelete = async (
                e: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => {
                e.stopPropagation();
                store?.removeChat(chat.chatId);
                setChats((old) => {
                  return old.filter((o) => o.chatId !== chat.chatId);
                });
              };

              return (
                <ItemWrapper
                  className="group"
                  key={chat.chatId}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClick}
                >
                  <div className="flex flex-row">
                    <div className="text-lg font-serif">{chat.name}</div>
                    <IconWrapper
                      className="ml-auto px-2 py-1 border-gray-500
                       hidden group-hover:flex justify-center
                        items-center text-base rounded-md cursor-pointer"
                      onClick={handleDelete}
                    >
                      <IconDelete />
                    </IconWrapper>
                  </div>

                  <SecondTextWrapper>
                    上一次更新：{timeDiscrepancy(chat.updateTime)}前
                  </SecondTextWrapper>
                </ItemWrapper>
              );
            })}
          </ListWrapper>
        </MainWrapper>
        <SideWrapper>
          <CardContainer>
            <div className="flex flex-row items-center">
              <div className="text-lg font-bold font-serif">项目知识</div>
              <BorderWrapper
                className="ml-auto py-1 px-3 text-xl
               rounded-lg mr-2 text-center items-center cursor-pointer"
              >
                +
              </BorderWrapper>
            </div>
            <div className="mt-2 p-2">
              <BorderWrapper
                className="p-2 rounded-lg flex cursor-pointer"
                onClick={handleClickInstruction}
              >
                {project.aiProps ? (
                  <>
                    <SpaceText>{project.aiProps}</SpaceText>
                    <div className="text-blue-500 ml-auto text-base font-bold">
                      Edit
                    </div>
                  </>
                ) : (
                  <>
                    <div>设置提示词</div>
                    <SecondTextWrapper className="ml-auto">
                      Optional
                    </SecondTextWrapper>
                  </>
                )}
              </BorderWrapper>
            </div>
            <BodyWrapper className=" rounded-lg justify-center items-center">
              <div className="text-4xl">
                <IconBook />
              </div>
              <SecondTextWrapper>
                尚未添加任何知识。将
                PDF、文档或其他文本添加到项目知识库中，DeepSeek
                将在每次项目对话中引用这些文本。
              </SecondTextWrapper>
            </BodyWrapper>
          </CardContainer>
        </SideWrapper>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

const IconWrapper = styled.div`
  transition: background 200ms ease;
  color: ${({ theme }) => theme.colors.secondary};
  &:hover {
    background: ${({ theme }) =>
      theme.mode === "dark" ? "#374151" : "#e5e7eb"};
  }
`;

const ItemWrapper = styled(motion.li)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  cursor: pointer;

  border: 1px solid ${({ theme }) => theme.colors.secondary};
  transition: background 200ms ease;
  &:hover {
    background: ${({ theme }) => theme.colors.componentBg};
  }
`;

const ListWrapper = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SpaceText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  max-width: 150px;
`;

const SecondTextWrapper = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
`;

const BodyWrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 36px;
  background: ${({ theme }) => theme.colors.bubbleUserBg};
`;

const BorderWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  transition: background 200ms ease;
  &:hover {
    background: ${({ theme }) => theme.colors.componentBg};
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SideWrapper = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  padding-right: 24px;
  width: 100%;
  margin-top: 48px;
  flex-direction: row;
  gap: 32px;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  height: 64px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => `${theme.colors.background}00`},
    ${({ theme }) => theme.colors.background}
  );
`;

const LayoutWrapper = styled.div`
  padding-left: 24px;
  display: flex;
  width: calc(100vw - 108px);
  flex-direction: column;
`;

export default ProjectPage;
