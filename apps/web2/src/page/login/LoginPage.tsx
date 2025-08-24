import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Alert, message } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../../hooks/auth/AuthProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useAuth();
  
  if (!authContext) {
    return (
      <PageContainer>
        <ContentWrapper>
          <LoginCard>
            <LogoSection>
              <Title>加载中...</Title>
            </LogoSection>
          </LoginCard>
        </ContentWrapper>
      </PageContainer>
    );
  }

  const { 
    loginValidation, 
    authState, 
    updateUsername, 
    updatePassword,
    login 
  } = authContext;

  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();

  const from = location.state?.from?.pathname || "/chat/home";

  useEffect(() => {
    if (authState.isAuthed) {
      navigate(from, { replace: true });
    }
  }, [authState.isAuthed, from, navigate]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      
      login().subscribe({
        next: (response: any) => {
          message.success("登录成功！");
          console.log("Login successful:", response);
        },
        error: (error: any) => {
          console.error("Login failed:", error);
          message.error(error.message || "登录失败，请重试");
        }
      });
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleForgotPassword = () => {
    message.info("密码重置功能暂未开放");
  };

  const handleRegister = () => {
    message.info("注册功能暂未开放");
  };

  return (
    <PageContainer>
      <BackgroundPattern />
      <ContentWrapper>
        <LoginCard>
          <LogoSection>
            <LogoIcon>
              <LoginOutlined />
            </LogoIcon>
            <Title>欢迎回来</Title>
            <Subtitle>登录到 AI 智能对话平台</Subtitle>
          </LogoSection>

          <FormSection>
            <Form
              form={form}
              name="login"
              onFinish={handleSubmit}
              autoComplete="off"
              layout="vertical"
            >
              <StyledFormItem
                name="username"
                rules={[
                  { required: true, message: "请输入用户名" },
                  { min: 6, message: "用户名至少6个字符" }
                ]}
                validateStatus={
                  !loginValidation.usernameValid && form.getFieldValue("username") 
                    ? "error" 
                    : ""
                }
                help={
                  !loginValidation.usernameValid && form.getFieldValue("username")
                    ? "用户名至少需要6个字符"
                    : ""
                }
              >
                <StyledInput
                  prefix={<UserOutlined />}
                  placeholder="用户名"
                  size="large"
                  onChange={handleUsernameChange}
                />
              </StyledFormItem>

              <StyledFormItem
                name="password"
                rules={[
                  { required: true, message: "请输入密码" },
                  { min: 8, message: "密码至少8个字符" }
                ]}
                validateStatus={
                  !loginValidation.passwordValid && form.getFieldValue("password")
                    ? "error"
                    : ""
                }
                help={
                  !loginValidation.passwordValid && form.getFieldValue("password")
                    ? "密码至少需要8个字符"
                    : ""
                }
              >
                <StyledInput
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="密码"
                  size="large"
                  onChange={handlePasswordChange}
                />
              </StyledFormItem>

              <RememberSection>
                <Checkbox 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  记住我
                </Checkbox>
                <ForgotLink onClick={handleForgotPassword}>
                  忘记密码？
                </ForgotLink>
              </RememberSection>

              {authState.error && (
                <Alert
                  message="登录失败"
                  description={authState.error.message}
                  type="error"
                  showIcon
                  closable
                  style={{ marginBottom: 16 }}
                />
              )}

              <Form.Item>
                <LoginButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={authState.loading}
                  disabled={!loginValidation.formValid}
                  icon={<LoginOutlined />}
                >
                  {authState.loading ? "登录中..." : "登录"}
                </LoginButton>
              </Form.Item>

              <RegisterSection>
                还没有账号？
                <RegisterLink onClick={handleRegister}>立即注册</RegisterLink>
              </RegisterSection>
            </Form>
          </FormSection>
        </LoginCard>
      </ContentWrapper>
    </PageContainer>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
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

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-out;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.5),
      transparent,
      rgba(255, 255, 255, 0.5)
    );
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: ${shimmer} 3s infinite linear;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const LogoIcon = styled.div`
  font-size: 3.5rem;
  color: #667eea;
  margin-bottom: 16px;
  animation: ${float} 3s ease-in-out infinite;
  
  .anticon {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const FormSection = styled.div`
  width: 100%;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px;

  .ant-form-item-label {
    font-weight: 500;
    color: #333;
  }
`;

const StyledInput = styled(Input)`
  height: 48px;
  border-radius: 12px;
  font-size: 16px;
  border: 2px solid #e1e8ed;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
  }

  &:focus,
  &.ant-input-focused {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .ant-input-prefix {
    color: #8e8e93;
    margin-right: 12px;
  }
`;

const RememberSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .ant-checkbox-wrapper {
    color: #666;
    
    &:hover {
      color: #667eea;
    }
  }
`;

const ForgotLink = styled.a`
  color: #667eea;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

const LoginButton = styled(Button)`
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    filter: brightness(1.1);
  }

  &:focus {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  }

  &:active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    transform: translateY(0);
    filter: brightness(0.95);
  }

  &:disabled {
    background: #d1d5db !important;
    box-shadow: none;
    cursor: not-allowed;
    filter: none;
  }

  &.ant-btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    }
  }

  .anticon {
    margin-right: 8px;
  }
`;

const RegisterSection = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #666;
  font-size: 14px;
`;

const RegisterLink = styled.a`
  color: #667eea;
  font-weight: 600;
  margin-left: 8px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

export default LoginPage;
