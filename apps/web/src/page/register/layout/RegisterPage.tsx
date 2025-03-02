import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bg from "../../../assets/register/register-bg.jpg";
import { TitleBird } from "../svg/BgSvg";
import { Button, Checkbox, Divider, Form, Input } from "@arco-design/web-react";
import { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { LoginModal } from "../../chat/login/LoginModal";
import {
  checkEmail,
  checkPhone,
  checkUsername,
  register,
  RegisterInfoType,
} from "../request/RequestUtils";
import { useRequest } from "ahooks";

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

type FormType = RegisterInfoType & { confirmPassword: string };

const RegisterPage = () => {
  const route = useNavigate();
  const [form] = Form.useForm();
  const password = Form.useWatch("password", form);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await form.validate();
      if (!checked) {
        throw new Error("未勾选同意");
      }
      console.log(form.getFieldsValue());
      const finalInfo = form.getFieldsValue() as RegisterInfoType;
      await register(finalInfo);
      route("/ai/chat");
    } catch (error) {
      console.error("注册错误", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    NiceModal.show(LoginModal, { route: route });
  };

  const { runAsync: runCheckUsername } = useRequest(checkUsername, {
    debounceWait: 1000,
    manual: true,
  });
  const { runAsync: runCheckPhone } = useRequest(checkPhone, {
    debounceWait: 1000,
    manual: true,
  });
  const { runAsync: runCheckEmail } = useRequest(checkEmail, {
    debounceWait: 1000,
    manual: true,
  });

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
                    validator: async (value, cb) => {
                      if (!value) {
                        return cb("用户名必填");
                      } else if (!(await runCheckUsername(value))) {
                        return cb("用户名已存在");
                      }
                      return cb();
                    },
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
                    validator: async (value, cb) => {
                      const phoneRegex = /^1[3-9]\d{9}$/;
                      if (!value) {
                        return cb("手机号必填");
                      } else if (!phoneRegex.test(value)) {
                        cb("手机号格式错误");
                      } else if (!(await runCheckPhone(value))) {
                        return cb("手机号已存在");
                      }
                      return cb();
                    },
                  },
                ]}
              >
                <Input className={"h-[50px]"} placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item
                label="电子邮箱"
                field={"email"}
                requiredSymbol={false}
                rules={[
                  {
                    validator: async (value, cb) => {
                      const emailRegex =
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                      if (!value) {
                        return cb("邮箱号必填");
                      } else if (!emailRegex.test(value)) {
                        return cb("邮箱格式错误");
                      } else if (!(await runCheckEmail(value))) {
                        return cb("邮箱号已存在");
                      }
                      return cb();
                    },
                  },
                ]}
              >
                <Input className={"h-[50px]"} placeholder="请输入邮箱号" />
              </Form.Item>
              <Form.Item
                label="密码"
                field={"password"}
                requiredSymbol={false}
                rules={[
                  {
                    validator: async (value, cb) => {
                      if (!value) {
                        return cb("密码必填");
                      } else if ((value as string).length < 8) {
                        return cb("密码要求至少8位");
                      }
                      return cb();
                    },
                  },
                ]}
              >
                <Input.Password
                  className={"h-[50px]"}
                  placeholder="请输入密码"
                />
              </Form.Item>
              <Form.Item
                label="验证密码"
                field={"confirmPassword"}
                requiredSymbol={false}
                required
                rules={[
                  {
                    validator: async (value, cb) => {
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
            <Checkbox value={checked} onChange={(e) => setChecked(e)} />
            <div className={"flex flex-row gap-1 ml-2"}>
              <div>已阅读同意</div>
              <a className="text-blue-500 cursor-pointer">《模型服务协议》</a>
              <div>和</div>
              <a className="text-blue-500 cursor-pointer">《用户隐私协议》</a>
            </div>
          </div>
          <Button
            loading={loading}
            className={"mt-4 h-[50px]"}
            onClick={handleRegister}
          >
            注册
          </Button>
          <Divider />
          <Button className={" h-[50px]"} type="primary" onClick={handleLogin}>
            登录
          </Button>
        </ContentWrapper>
      </div>
    </LayoutWrapper>
  );
};

export { RegisterPage };
