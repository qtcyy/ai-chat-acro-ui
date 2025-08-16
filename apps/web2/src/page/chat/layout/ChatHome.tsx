import styled from "styled-components";
import { useHistory } from "../hooks/useHistory";
import { useNavigate } from "react-router-dom";
import { 
  AiOutlineMessage, 
  AiOutlinePlus, 
  AiOutlineRocket,
  AiOutlineHeart,
  AiOutlineStar 
} from "react-icons/ai";

const ChatHome = () => {
  const { createChat } = useHistory();
  const route = useNavigate();

  const handleNewChat = async () => {
    const chat = createChat();
    route(`/chat/${chat.id}`);
  };

  return (
    <ChatHomeContainer>
      <ContentWrapper>
        <WelcomeSection>
          <LogoIcon>
            <AiOutlineMessage size={64} />
          </LogoIcon>
          <WelcomeTitle>
            欢迎使用 AI 智能对话助手
          </WelcomeTitle>
          <WelcomeSubtitle>
            开启你的智能对话之旅，体验前所未有的AI交互体验
          </WelcomeSubtitle>
        </WelcomeSection>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon color="#3b82f6">
              <AiOutlineRocket size={32} />
            </FeatureIcon>
            <FeatureTitle>智能对话</FeatureTitle>
            <FeatureDesc>基于最新AI技术，提供自然流畅的对话体验</FeatureDesc>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon color="#10b981">
              <AiOutlineHeart size={32} />
            </FeatureIcon>
            <FeatureTitle>个性化体验</FeatureTitle>
            <FeatureDesc>根据你的需求定制专属的AI助手服务</FeatureDesc>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon color="#f59e0b">
              <AiOutlineStar size={32} />
            </FeatureIcon>
            <FeatureTitle>高效便捷</FeatureTitle>
            <FeatureDesc>快速响应，随时随地获得智能帮助和建议</FeatureDesc>
          </FeatureCard>
        </FeatureGrid>

        <ActionSection>
          <StartButton onClick={handleNewChat}>
            <AiOutlinePlus size={20} />
            <span>开始新对话</span>
          </StartButton>
          <ActionHint>点击上方按钮，立即开始你的AI对话体验</ActionHint>
        </ActionSection>
      </ContentWrapper>
      
      <BackgroundDecoration />
    </ChatHomeContainer>
  );
};

const ChatHomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #f5576c 75%,
    #4facfe 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 40px 24px;
  text-align: center;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 32px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

const WelcomeSection = styled.div`
  margin-bottom: 60px;
  animation: fadeInUp 1s ease-out;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LogoIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  color: white;
  margin-bottom: 32px;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin: 0 0 16px 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 50px;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div<{ color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: ${props => props.color};
  border-radius: 16px;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FeatureDesc = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ActionSection = styled.div`
  animation: fadeInUp 1s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

const StartButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 16px;
  
  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.6);
    background: linear-gradient(135deg, #764ba2, #667eea);
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02);
  }
  
  @media (max-width: 480px) {
    padding: 14px 24px;
    font-size: 1rem;
  }
`;

const ActionHint = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 4s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 10%;
    right: 10%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 5s ease-in-out infinite reverse;
  }
`;

export { ChatHome };
