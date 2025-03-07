import { useNavigate } from "react-router-dom";
import { ChatItem, useChatStorage } from "../hooks/useChatStorage";
import styled from "styled-components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { IconDelete, IconEdit } from "@arco-design/web-react/icon";
import NiceModal from "@ebay/nice-modal-react";
import { RenameModal } from "./RenameModal";
import { DeleteModal } from "./DeleteModal";
import { motion } from "motion/react";
import { useStore } from "../../../store";
import { useTheme } from "theme";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemWrapper = styled(motion.div)`
  padding: 16px 24px;
  background: ${(props) => props.theme.colors.componentBg};
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-size: 18px;
  cursor: pointer;

  border-radius: 10px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
`;

const timeDisplay = (timeStr: string) => {
  const time = dayjs(timeStr);
  if (time.day() === dayjs().day()) {
    return "今天" + time.format("HH:mm");
  } else {
    return time.format("MM-DD");
  }
};

const HistoryList = () => {
  const route = useNavigate();
  const store = useChatStorage();
  const { setChatLoadSignal, chatLoadSignal } = useStore();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setChatLoadSignal(chatLoadSignal + 1);
    store?.sortByTime();
  }, []);

  const handleClick = (chatId: string) => {
    route(`/ai/chat/page/${chatId}`);
  };

  const handleEdit = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    chat: ChatItem
  ) => {
    e.stopPropagation();
    const name = await NiceModal.show(RenameModal, { chat: chat });
    if (typeof name !== "string") {
      console.error("type error");
      return;
    }
    console.log(name);
    store?.updateChat((old) => {
      const index = old.findIndex((o) => o.chatId === chat.chatId);
      old[index].name = name;
      return [...old];
    });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    chatId: string
  ) => {
    e.stopPropagation();
    const confirm = await NiceModal.show(DeleteModal);
    if (confirm) {
      store?.removeChat(chatId);
    }
  };

  return (
    <ContentWrapper>
      <div className=" flex flex-col">
        <div className="text-4xl font-bold mt-10 text-center">历史会话</div>
      </div>
      <div className="flex flex-col items-center gap-3 mt-[70px]">
        {store?.chats?.map((item) => {
          return (
            <ItemWrapper
              className="group"
              key={item.chatId}
              onClick={() => handleClick(item.chatId)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              drag={true}
              dragConstraints={{ left: 0, right: 300 }}
              dragElastic={0.2}
              dragMomentum={true}
            >
              <div className="max-w-[80%]">{item.name}</div>
              <div className="ml-auto text-sm group-hover:hidden">
                {timeDisplay(item.updateTime)}
              </div>
              <div className="hidden group-hover:flex ml-auto flex-row gap-2">
                <div
                  className={`px-1  ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-500"
                      : "bg-gray-200 hover:bg-gray-200"
                  } rounded-md`}
                  onClick={(e) => handleEdit(e, item)}
                >
                  <IconEdit />
                </div>
                <div
                  className="px-1 bg-red-200 text-red-600 rounded-md"
                  onClick={(e) => handleDelete(e, item.chatId)}
                >
                  <IconDelete />
                </div>
              </div>
            </ItemWrapper>
          );
        })}
      </div>
    </ContentWrapper>
  );
};

export { HistoryList };
