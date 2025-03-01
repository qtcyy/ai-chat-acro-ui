import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bg from "../../../assets/register/register-bg.jpg";
import { TitleBird } from "../svg/BgSvg";
import { Button, Checkbox, Divider, Form, Input } from "@arco-design/web-react";
import { useEffect, useState } from "react";

const LayoutWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;

  .arco-form-item-label {
    position: relative;
    display: flex !important;
    align-items: center;
  }

  .arco-form-item-label-required-symbol {
    position: relative;
    top: 0 !important;
    margin-right: 4px;
  }
`;

const ContentWrapper = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  padding: 64px;

  background: #fff;
  height: 100vh;
  z-index: 10;
`;

const TitleWrapper = styled.div`
  font-family: "dingliesongtypeface";
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const RegisterPage = () => {
  const route = useNavigate();
  const [form] = Form.useForm();
  const password = Form.useWatch("password", form);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      await form.validate();
    } catch (error) {
      console.error("登录错误", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutWrapper>
      <div className="flex flex-row w-screen">
        <div className=" flex-[0.7] h-screen w-full overflow-hidden">
          <img src={bg} className="h-screen" />
        </div>
        <ContentWrapper>
          <TitleWrapper>
            <TitleBird />
            <div className="text-2xl font-bold">小鸟软件</div>
          </TitleWrapper>
          <div className="mt-[100px] text-4xl font-serif font-bold">
            欢迎注册DeepSeek
          </div>
          <div className="mt-5 flex">
            <Form form={form} autoComplete="off" layout="vertical">
              <Form.Item
                label="用户名"
                field={"username"}
                requiredSymbol={false}
                rules={[
                  {
                    required: true,
                    message: "用户名必填",
                  },
                ]}
              >
                <Input className={"h-[50px]"} placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                label="手机号"
                field={"phone"}
                requiredSymbol={false}
                rules={[
                  {
                    required: true,
                    message: "手机号必填",
                  },
                ]}
              >
                <Input className={"h-[50px]"} placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item
                label="电子邮箱"
                field={"email"}
                requiredSymbol={false}
                rules={[{ required: true, message: "邮箱号必填" }]}
              >
                <Input className={"h-[50px]"} placeholder="请输入邮箱号" />
              </Form.Item>
              <Form.Item
                label="密码"
                field={"password"}
                requiredSymbol={false}
                rules={[{ required: true, message: "密码必填" }]}
              >
                <Input.Password
                  className={"h-[50px]"}
                  placeholder="请输入密码"
                />
              </Form.Item>
              <Form.Item
                label="验证密码"
                requiredSymbol={false}
                required
                rules={[
                  {
                    validator(value, cb) {
                      console.log(value);
                      if (value !== password) {
                        return cb("密码不一致");
                      }
                      return cb();
                    },
                  },
                ]}
              >
                <Input.Password
                  className={"h-[50px]"}
                  placeholder="请输入验证密码"
                />
              </Form.Item>
            </Form>
          </div>
          <div className="w-full flex justify-center items-center mt-4">
            <Checkbox />
            <div className={"flex flex-row gap-1 ml-2"}>
              <div>已阅读同意</div>
              <a className="text-blue-500 cursor-pointer">《模型服务协议》</a>
              <div>和</div>
              <a className="text-blue-500 cursor-pointer">《用户隐私协议》</a>
            </div>
          </div>
          <Button className={"mt-4 h-[50px]"} onClick={handleRegister}>
            注册
          </Button>
          <Divider />
          <Button className={" h-[50px]"} type="primary">
            登录
          </Button>
        </ContentWrapper>
      </div>
    </LayoutWrapper>
  );
};

export { RegisterPage };
