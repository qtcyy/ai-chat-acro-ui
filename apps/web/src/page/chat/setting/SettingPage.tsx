import { IconSettings } from "@arco-design/web-react/icon";
import { motion } from "motion/react";
import { JSX, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

type ListType = {
  label: string;
  location: string;
};

const SettingList: ListType[] = [
  { label: "偏好", location: "appearance" },
  { label: "账户", location: "account" },
  { label: "产品信息", location: "info" },
];

const SettingPage = (): JSX.Element => {
  const location = useLocation();
  const route = useNavigate();

  useEffect(() => {
    route("/ai/setting/appearance");
  }, []);

  return (
    <LayoutWrapper>
      <HeaderContainer>
        <div className="flex flex-row gap-2 items-center text-2xl font-serif">
          <IconSettings />
          设置
        </div>
      </HeaderContainer>
      <ContentWrapper>
        <div className="flex-[2]">
          <ListContainer>
            {SettingList.map((item, i) => {
              return (
                <ListWrapper
                  key={i}
                  selected={location.pathname.endsWith(item.location)}
                  className="px-4 py-3 text-lg rounded-lg"
                  onClick={() => route("/ai/setting/" + item.location)}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.label}
                </ListWrapper>
              );
            })}
          </ListContainer>
        </div>
        <div className="flex-[8]">
          <Outlet />
        </div>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

const ListWrapper = styled(motion.li)<{ selected?: boolean }>`
  ${(props) =>
    props.selected &&
    css`
      background: ${({ theme }) => theme.colors.bubbleUserBg};
      font-weight: bold;
    `}
  transition: background 100ms ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "dark" ? "#3C3C3C" : "#e5e3d8"};
  }
`;

const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContentWrapper = styled.div`
  margin-top: 50px;

  display: flex;
  flex-direction: row;
  gap: 36px;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  padding: 24px;
  flex-direction: row;
  align-items: center;
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SettingPage;
