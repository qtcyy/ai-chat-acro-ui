import React from "react";
import { Result, Button } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Console logging for 404 errors with route information
  React.useEffect(() => {
    console.group("🔍 404 Page Not Found");
    console.warn("Route not found:", location.pathname);
    console.info("Full location:", {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state,
    });
    console.info("Current URL:", window.location.href);
    console.info("Referrer:", document.referrer || "Direct access");
    console.info("Timestamp:", new Date().toISOString());
    console.groupEnd();
  }, [location]);

  const handleGoHome = () => {
    console.log("🏠 Navigating to home page from 404");
    navigate("/");
  };

  const handleGoBack = () => {
    console.log("↩️ Going back from 404 page");
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history, go to home page
      navigate("/");
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <StyledResult
          status="404"
          title="404"
          subTitle="抱歉，您访问的页面不存在"
          extra={[
            <ActionButton
              key="home"
              type="primary"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
            >
              返回首页
            </ActionButton>,
            <ActionButton
              key="back"
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
            >
              返回上页
            </ActionButton>,
          ]}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const StyledResult = styled(Result)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  padding: 40px 20px;
  animation: ${float} 4s ease-in-out infinite;

  @media (max-width: 768px) {
    padding: 30px 15px;
    border-radius: 16px;
  }

  .ant-result-title {
    color: #667eea !important;
    font-size: 4rem !important;
    font-weight: 700 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px !important;

    @media (max-width: 768px) {
      font-size: 3rem !important;
    }
  }

  .ant-result-subtitle {
    color: #666 !important;
    font-size: 1.2rem !important;
    font-weight: 400 !important;
    margin-bottom: 32px !important;

    @media (max-width: 768px) {
      font-size: 1rem !important;
      margin-bottom: 24px !important;
    }
  }

  .ant-result-extra {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
  }
`;

const ActionButton = styled(Button)`
  height: 48px;
  padding: 0 24px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 24px;
  transition: all 0.3s ease;
  min-width: 120px;

  @media (max-width: 768px) {
    width: 200px;
    height: 44px;
    font-size: 0.9rem;
  }

  &.ant-btn-primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border: none;
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      background: linear-gradient(45deg, #5a6fd8, #6a42a6);
    }
  }

  &.ant-btn-default {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(102, 126, 234, 0.3);
    color: #667eea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 0.9);
      border-color: #667eea;
      color: #5a6fd8;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export { NotFound };