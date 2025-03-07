import { Button } from "@arco-design/web-react";
import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "theme";
import { v4 as uuidv4 } from "uuid";
import { ProjectItem, useProjectStorage } from "../hooks/useProjectStorage";
import dayjs from "dayjs";

const CreateProjectPage = (): JSX.Element => {
  const { isDarkMode, theme } = useTheme();
  const route = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { addProject } = useProjectStorage();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    route("/ai/chat/projects");
  };

  const handleConfirm = async () => {
    setLoading(true);
    const id = uuidv4();
    const newProject: ProjectItem = {
      id,
      name,
      description,
      updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    addProject(newProject);
    setLoading(false);
    route("/ai/chat/projects");
  };

  return (
    <LayoutWrapper>
      <ContentWrapper className="mx-auto">
        <div className="text-3xl font-serif">创建一个项目</div>
        <div className="flex flex-col gap-2">
          <div className="text-sm">你想要做什么？</div>
          <CustomInput
            className="h-11 "
            placeholder="项目名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm">你想要达到什么目的？</div>
          <CustomTextArea
            className="p-3 resize-none"
            placeholder="描述你的使用场景"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-4 ml-auto">
          <Button
            style={{
              backgroundColor: isDarkMode ? "#454545" : "",
              color: theme.colors.text,
            }}
            onClick={handleCancel}
          >
            取消
          </Button>
          <Button loading={loading} type="primary" onClick={handleConfirm}>
            创建项目
          </Button>
        </div>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

const CustomTextArea = styled.textarea`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.componentBg};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  height: 90px;
  font-size: 100%;
`;

const CustomInput = styled.input`
  padding: 8px 12px;
  width: 450px;
  background-color: ${({ theme }) => theme.colors.componentBg};
  font-size: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const LayoutWrapper = styled.div`
  padding-top: 10vh;
  display: flex;
  width: 100%;
  height: 100%;
`;

export default CreateProjectPage;
