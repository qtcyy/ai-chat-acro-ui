import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  RobotOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../hooks/auth/AuthProvider";

const HomePage = () => {
  const route = useNavigate();
  const auth = useAuth();

  const handleStart = () => {
    const loginState = auth?.authState;
    if (loginState?.isAuthed) {
      route("/chat/home");
    } else {
      route("/login");
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <HeaderSection>
          <IconWrapper>
            <RobotOutlined />
          </IconWrapper>
          <Title>AI智能对话平台</Title>
          <Subtitle>体验下一代人工智能对话助手</Subtitle>
        </HeaderSection>

        <FeatureGrid>
          <FeatureCard>
            <MessageOutlined className="text-2xl text-blue-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">智能对话</h3>
            <p className="text-gray-600">与AI进行自然流畅的对话交流</p>
          </FeatureCard>
          <FeatureCard>
            <StarOutlined className="text-2xl text-yellow-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">专业助手</h3>
            <p className="text-gray-600">获得专业的问题解答和建议</p>
          </FeatureCard>
        </FeatureGrid>

        <ActionSection>
          <EnterButton type="primary" size="large" onClick={handleStart}>
            开始对话
          </EnterButton>
        </ActionSection>
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
    transform: translateY(-10px);
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
`;

const HeaderSection = styled.div`
  margin-bottom: 60px;
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: white;
  margin-bottom: 20px;
  animation: ${float} 3s ease-in-out infinite;

  .anticon {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0;
  font-weight: 300;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const FeatureCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-align: center;
  padding: 20px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .ant-card-body {
    padding: 20px;
  }
`;

const ActionSection = styled.div`
  margin-top: 40px;
`;

const EnterButton = styled(Button)`
  height: 60px;
  padding: 0 40px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 30px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    background: linear-gradient(45deg, #ff5252, #26c6da);
  }

  &:active {
    transform: translateY(0);
  }
`;

export { HomePage };
