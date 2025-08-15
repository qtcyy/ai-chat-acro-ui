import styled from "styled-components";
import SimpleBar from "simplebar-react";
import { AiFillBook, AiFillHome } from "react-icons/ai";
import { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { HistoryProvider } from "../hooks/useHistory";

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
    <HistoryProvider>
      <LayoutContainer>
        <div className="flex flex-row h-screen">
          <SiderWrapper>
            {/* Logo区域 */}
            <LogoSection>
              <LogoIcon>✨</LogoIcon>
            </LogoSection>
            
            {/* 导航区域 */}
            <NavSection>
              {SiderItem.map((item, i) => (
                <SiderButton
                  key={i}
                  onClick={() => moveTo(item.href)}
                  $index={i}
                >
                  <IconWrapper>{item.icon}</IconWrapper>
                  <Tooltip>
                    {item.href === "/chat/home" ? "首页" : "历史"}
                  </Tooltip>
                </SiderButton>
              ))}
            </NavSection>
            
            {/* 底部装饰 */}
            <BottomDecoration>
              <DecorativeLine />
            </BottomDecoration>
          </SiderWrapper>
          
          <ContentWrapper>
            <SimpleBar
              style={{
                overflow: "auto",
                width: "100%",
                height: "100%",
              }}
            >
              <Outlet />
            </SimpleBar>
          </ContentWrapper>
        </div>
      </LayoutContainer>
    </HistoryProvider>
  );
};

const SiderWrapper = styled.div`
  height: 100vh;
  width: 72px;
  background: linear-gradient(
    180deg,
    rgba(248, 250, 252, 0.95) 0%,
    rgba(241, 245, 249, 0.98) 50%,
    rgba(226, 232, 240, 0.95) 100%
  );
  border-right: 2px solid rgba(59, 130, 246, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  backdrop-filter: blur(8px);
  
  /* 添加细微的内阴影 */
  box-shadow: 
    inset -1px 0 0 rgba(255, 255, 255, 0.5),
    2px 0 12px rgba(59, 130, 246, 0.08);
`;

const LogoSection = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(59, 130, 246, 0.15);
  margin-bottom: 16px;
`;

const LogoIcon = styled.div`
  font-size: 2rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: logo-pulse 3s ease-in-out infinite;
  
  @keyframes logo-pulse {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.1) rotate(5deg); }
  }
`;

const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
`;

const SiderButton = styled.button<{ $index: number }>`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: slide-in 0.5s ease-out;
  animation-delay: ${props => props.$index * 0.1}s;
  animation-fill-mode: both;
  
  box-shadow: 
    0 4px 12px rgba(59, 130, 246, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    background: rgba(59, 130, 246, 0.1);
    box-shadow: 
      0 8px 24px rgba(59, 130, 246, 0.25),
      0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
  
  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 1.25rem;
  color: #475569;
  transition: all 0.2s ease;
  
  ${SiderButton}:hover & {
    color: #3b82f6;
    transform: scale(1.1);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  left: 60px;
  background: rgba(15, 23, 42, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-8px);
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
  z-index: 1000;
  
  &:before {
    content: '';
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    border: 4px solid transparent;
    border-right-color: rgba(15, 23, 42, 0.9);
  }
  
  ${SiderButton}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const BottomDecoration = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const DecorativeLine = styled.div`
  width: 32px;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 1px;
  animation: line-glow 2s ease-in-out infinite alternate;
  
  @keyframes line-glow {
    0% { opacity: 0.5; transform: scaleX(0.8); }
    100% { opacity: 1; transform: scaleX(1); }
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: calc(100vw - 72px);
  height: 100vh;
  overflow: hidden;
`;

const LayoutContainer = styled.div`
  height: 100vh;
  background: linear-gradient(
    135deg,
    #f8fafc 0%,
    #f1f5f9 30%,
    #e2e8f0 70%,
    #cbd5e1 100%
  );
`;

export default ChatLayout;
