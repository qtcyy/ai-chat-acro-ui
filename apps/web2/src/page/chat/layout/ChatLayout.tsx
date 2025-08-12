import styled from "styled-components";
import SimpleBar from "simplebar-react";
import { AiFillBook, AiFillHome } from "react-icons/ai";
import { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type SiderItemType = {
  icon: ReactNode;
  href: string;
};

const SiderItem: SiderItemType[] = [
  {
    icon: <AiFillHome />,
    href: "/chat/home",
  },
  {
    icon: <AiFillBook />,
    href: "/chat/history",
  },
];

const ChatLayout = () => {
  const route = useNavigate();

  const moveTo = (path: string) => {
    route(path);
  };

  return (
    <LayoutContainer>
      <div className="flex flex-row h-screen">
        <SiderWrapper>
          {/* blank */}
          <div className="h-[30px]" />
          {SiderItem.map((item, i) => (
            <div
              key={i}
              className=" rounded-md p-3 hover:bg-gray-300 cursor-pointer scale-125"
              onClick={() => moveTo(item.href)}
            >
              {item.icon}
            </div>
          ))}
        </SiderWrapper>
        <SimpleBar
          style={{
            overflow: "auto",
            width: "calc(100vw - 60px)",
            height: "100%",
          }}
        >
          <Outlet />
        </SimpleBar>
      </div>
    </LayoutContainer>
  );
};

const SiderWrapper = styled.div`
  height: 100vh;
  width: 60px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const LayoutContainer = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export default ChatLayout;
