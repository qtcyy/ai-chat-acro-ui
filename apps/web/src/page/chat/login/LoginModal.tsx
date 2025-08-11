import {
  Button,
  Checkbox,
  Divider,
  Input,
  Modal,
} from "@arco-design/web-react";
import NiceModal from "@ebay/nice-modal-react";
import styled from "styled-components";
import rqCode from "../../../assets/chat/TestRQCode.png";
import { NavigateFunction } from "react-router-dom";
import { useState } from "react";
import { login, LoginRequestType } from "./request/LoginRequest";
import { useStore } from "../../../store";

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
`;

type Props = {
  route: NavigateFunction;
};

const LoginModal = NiceModal.create<Props>((props) => {
  const modal = NiceModal.useModal();
  const { route } = props;

  const { reloadSignal, setReloadSignal } = useStore();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mergedName, setMergedName] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    modal.hide();
    modal.remove();
  };

  const handleClickRegister = () => {
    route("/ai/register");
    modal.remove();
  };

  const handleClickLogin = async () => {
    setLoading(true);
    try {
      if (!mergedName || !password || !checked) {
        throw new Error("信息错误");
      }
      const params: LoginRequestType = { mergedName, password };
      await login(params);
      setReloadSignal(reloadSignal + 1);
      route("/ai/chat");
      modal.hide();
      setTimeout(() => {
        modal.remove();
      }, 200);
    } catch (error) {
      console.error("登录错误", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className={"w-[650px]"}
      visible={modal.visible}
      title={null}
      footer={null}
      onCancel={handleClose}
    >
      <ModalWrapper>
        <div className="w-full flex flex-col gap-2">
          <div className="pl-4 text-3xl font-bold">登录</div>
          <div className="pl-4 text-3xl font-bold ">免费与DeepSeek对话</div>
        </div>
        <Divider />
        <LoginWrapper>
          <div className="text-lg font-bold">密码登录</div>
          <div className="flex flex-row mt-4">
            <div className="flex-[0.65] flex flex-col gap-4">
              <Input
                className={"h-[50px]"}
                placeholder="请输入用户名/手机号/邮箱"
                value={mergedName}
                onChange={setMergedName}
              />
              <Input.Password
                className={"h-[50px] text-lg"}
                placeholder="请输入密码"
                value={password}
                onChange={setPassword}
              />
              <div className="flex flex-row">
                <Checkbox>记住密码</Checkbox>
                <a className="ml-auto text-blue-500 cursor-pointer">
                  忘记密码?
                </a>
              </div>
              <Button
                loading={loading}
                type="primary"
                size="large"
                onClick={handleClickLogin}
              >
                登录
              </Button>
              <Button size="large" onClick={handleClickRegister}>
                注册
              </Button>
            </div>
            <Divider type="vertical" className={"h-full"} />
            <div className="flex-[0.35] flex flex-col gap-4">
              <div className="text-lg font-bold">微信扫码登录</div>
              <div className="w-full ">
                <img className="h-[180px] w-[180px]" src={rqCode} />
              </div>
            </div>
          </div>
        </LoginWrapper>
        <div className="w-full flex justify-center items-center mt-4">
          <Checkbox value={checked} onChange={(e) => setChecked(e)} />
          <div className={"flex flex-row gap-1 ml-2"}>
            <div>已阅读同意</div>
            <a className="text-blue-500 cursor-pointer">《模型服务协议》</a>
            <div>和</div>
            <a className="text-blue-500 cursor-pointer">《用户隐私协议》</a>
          </div>
        </div>
      </ModalWrapper>
    </Modal>
  );
});

export { LoginModal };
