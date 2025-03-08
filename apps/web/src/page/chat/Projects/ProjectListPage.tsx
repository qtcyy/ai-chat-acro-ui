import styled from "styled-components";
import { Button, Skeleton, Spin } from "@arco-design/web-react";
import { useTheme } from "theme";
import { IconSearch, IconSwap } from "@arco-design/web-react/icon";
import { useState } from "react";
import { useProjectStorage } from "../hooks/useProjectStorage";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useRequest, useUpdateEffect } from "ahooks";

type SortType = "active" | "create";

const ProjectListPage = () => {
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState("");
  const route = useNavigate();
  const { projects } = useProjectStorage();
  const [sortBy, setSortBy] = useState<SortType>("create");
  const formatProject = () => {
    if (sortBy === "active") {
      return projects.sort((a, b) =>
        dayjs(a.updateTime).isAfter(dayjs(b.updateTime)) ? -1 : 1
      );
    } else if (sortBy === "create") {
      return projects.sort((a, b) =>
        dayjs(a.createTime).isAfter(dayjs(b.createTime)) ? -1 : 1
      );
    }
    return [];
  };
  const [_projects, _setProjects] = useState(formatProject());

  const handleFilterProjects = async () => {
    if (!search.trim()) {
      _setProjects(formatProject());
      return;
    }
    _setProjects((old) =>
      old.filter((o) => o.name.startsWith(search) || o.name.endsWith(search))
    );
  };

  const { run: runFilterProjects, loading } = useRequest(handleFilterProjects, {
    debounceWait: 200,
    manual: true,
  });

  useUpdateEffect(() => {
    _setProjects(formatProject());
  }, [sortBy]);

  useUpdateEffect(() => {
    runFilterProjects();
  }, [search]);

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
        <div className="ml-auto flex flex-row gap-4">
          <div className="rotate-90 text-lg">
            <IconSwap />
          </div>
          <ToggleButton
            className="font-bold"
            onClick={() =>
              setSortBy((old) => (old === "active" ? "create" : "active"))
            }
          >
            {sortBy === "active" ? "最近活动" : "最近创建"}
          </ToggleButton>
        </div>
      </ContentWrapper>
      <Spin loading={loading} dot className={"w-full"}>
        <ListWrapper>
          {_projects.map((project) => {
            const handleClick = () => {
              route(`/ai/chat/projects/${project.id}`);
            };

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
      </Spin>
    </LayoutWrapper>
  );
};

const ToggleButton = styled.button`
  padding: 12px;
  background: ${({ theme }) => theme.colors.componentBg};
  border-radius: 12px;
  transition: background 200ms ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "dark" ? "#4f4f5d" : "#dfdbdb"};
  }
`;

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
  flex-direction: row;
  align-items: center;
  width: 80%;
`;

const CustomButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`;

export default ProjectListPage;
