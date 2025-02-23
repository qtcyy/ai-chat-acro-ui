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

const LoginModal = NiceModal.create(() => {
  const modal = NiceModal.useModal();

  const handleClose = () => {
    modal.hide();
    modal.remove();
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
              <Input className={"h-[50px]"} placeholder="请输入账号" />
              <Input.Password
                className={"h-[50px] text-lg"}
                placeholder="请输入密码"
              />
              <div className="flex flex-row">
                <Checkbox>记住密码</Checkbox>
                <a className="ml-auto text-blue-500 cursor-pointer">
                  忘记密码?
                </a>
              </div>
              <Button type="primary" size="large">
                登录
              </Button>
              <Button size="large">注册</Button>
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
          <Checkbox />
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
