import { Tooltip } from "@arco-design/web-react";
import { IconArrowUp, IconLoading } from "@arco-design/web-react/icon";
import { useState } from "react";
import styled from "styled-components";
import { useScroll } from "../hooks/useScroll";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`;

const SenderWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);

  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonWrapper = styled.div<{ show: boolean }>`
  background: #fff;
  color: #535126;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.show ? "100%" : "0%")};

  &:hover {
    background: rgb(238, 235, 226);
    color: black;
  }

  transition: all 0.2s ease;
`;

type Props = {
  ask: (question: string) => void;
  loading: boolean;
  cancel: () => void;
  showTop?: boolean;
  isHome?: boolean;
};

const Sender = (props: Props) => {
  const { ask, loading, cancel, showTop } = props;
  const route = useNavigate();

  const send = async (question: string) => {
    ask(question);
  };

  const { run } = useRequest(send, {
    debounceWait: 500,
    manual: true,
  });

  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = () => {
    if (text === "" || loading) return;
    console.log(loading);
    console.log(text);
    run(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
    }
  };

  const scroll = useScroll();

  const handleClickScrollTop = () => {
    if (loading) return;
    scroll?.toTop();
  };

  const handleClickScrollBottom = () => {
    if (loading) return;
    scroll?.toBottom();
  };

  return (
    <ContentWrapper>
      <div className="flex flex-row w-[60%] mb-3 ">
        <div className="ml-auto mr-8 flex flex-row gap-1">
          {showTop && (
            <ButtonWrapper
              show={!loading}
              className="py-1 px-4 cursor-pointer rounded-md "
              onClick={handleClickScrollTop}
            >
              Top
            </ButtonWrapper>
          )}
          {showTop && (
            <ButtonWrapper
              show={!loading}
              className="py-1 px-4 cursor-pointer rounded-md "
              onClick={handleClickScrollBottom}
            >
              Bottom
            </ButtonWrapper>
          )}
        </div>
      </div>
      <SenderWrapper className="p-3 min-h-[150px] max-h-[250px]  bg-white rounded-xl w-[60%] min-w-[700px] flex flex-col items-center">
        <textarea
          className="flex-[0.7] w-full text-lg"
          placeholder="向我提问吧"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          draggable={false}
          style={{ resize: "none" }}
          onKeyDown={handleKeyDown}
        />
        <div className="flex-[0.3] w-full inline-flex flex-row items-center">
          <div
            className={
              text === ""
                ? "ml-auto flex flex-row px-3 py-2 bg-blue-300 text-gray-100 rounded-md transition-colors duration-200"
                : "ml-auto flex flex-row px-3 py-2 bg-blue-500 text-white rounded-md transition-colors duration-200 cursor-pointer"
            }
            onClick={handleSend}
          >
            <Tooltip
              mini
              position="top"
              content={text === "" ? "请输入问题" : "点击发送"}
            >
              <div className="scale-150">
                {loading ? <IconLoading /> : <IconArrowUp />}
              </div>
            </Tooltip>
          </div>
        </div>
      </SenderWrapper>
    </ContentWrapper>
  );
};

export { Sender };
