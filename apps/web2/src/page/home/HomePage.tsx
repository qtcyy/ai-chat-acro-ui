import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  const route = useNavigate();

  return (
    <PageContainer>
      <div className="flex flex-col">
        <div className="text-3xl mb-5">大模型智能对话平台</div>
        <Button type="primary" size="large" onClick={() => route("/chat")}>
          点击进入
        </Button>
      </div>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { HomePage };
