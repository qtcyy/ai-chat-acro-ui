import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@arco-design/web-react";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 120px;
  margin: 0;
  color: #1890ff;
  font-weight: bold;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 20px 0;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  max-width: 500px;
`;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/ai/chat/");
  };

  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>页面未找到</Subtitle>
      <Description>
        抱歉，您访问的页面不存在。可能是输入了错误的地址，或者该页面已被移动或删除。
      </Description>
      <div>
        <Button
          type="primary"
          onClick={handleGoHome}
          style={{ marginRight: 16 }}
        >
          返回首页
        </Button>
        <Button onClick={handleGoBack}>返回上一页</Button>
      </div>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
