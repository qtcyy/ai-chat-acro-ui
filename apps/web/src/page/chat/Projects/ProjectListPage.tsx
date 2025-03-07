import styled from "styled-components";
import { Button } from "@arco-design/web-react";
import { useTheme } from "theme";
import { IconSearch } from "@arco-design/web-react/icon";
import { useState } from "react";
import { ProjectItem, useProjectStorage } from "../hooks/useProjectStorage";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const ProjectListPage = () => {
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState("");
  const route = useNavigate();
  const { projects } = useProjectStorage();
  const [_projects, _setProjects] = useState(projects);

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <div className="text-3xl font-bold">项目</div>
        <div>
          <CustomButton
            type="primary"
            size="large"
            onClick={() => route("/ai/chat/projects/create")}
          >
            新建项目
          </CustomButton>
        </div>
      </HeaderWrapper>
      <ContentWrapper>
        <div className="flex flex-row mt-4 relative">
          <IconWrapper>
            <IconSearch />
          </IconWrapper>
          <CustomInput
            type="text"
            placeholder="搜索项目"
            className="w-[300px] p-2 rounded-md border border-gray-300 px-2 py-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </ContentWrapper>
      <ListWrapper>
        {_projects.map((project) => {
          const handleClick = () => {};

          const formatDescription = () => {
            return project.description?.slice(0, 50);
          };

          return (
            <List
              key={project.id}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              <div className="text-lg font-serif">{project.name}</div>
              <div className="mt-1">{formatDescription()}</div>
              <SubText className="ml-auto mt-auto">
                更新时间：{dayjs(project.updateTime).format("MM-DD HH:mm")}
              </SubText>
            </List>
          );
        })}
      </ListWrapper>
    </LayoutWrapper>
  );
};

const SubText = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
`;

const ListWrapper = styled.ul`
  display: flex;
  margin-top: 30px;
  list-style: none;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

const List = styled(motion.li)`
  display: flex;
  flex-direction: column;
  width: calc((100% - 16px) / 2);
  padding: 24px;
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "dark" ? "#a6a39a" : "rgba(0, 0.1, 0.1, 0.3)"};
  margin-bottom: 16px;
  border-radius: 24px;
  &:hover {
    background: ${({ theme }) => theme.colors.componentBg};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }
  cursor: pointer;
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CustomInput = styled.input`
  width: 400px;
  padding: 8px 18px 8px 40px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.componentBg};
  color: ${({ theme }) => theme.colors.text};
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 2%;
  top: 13px;
  scale: 1.2;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const CustomButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`;

export default ProjectListPage;
