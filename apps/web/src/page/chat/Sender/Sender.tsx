import { Dropdown, Menu, Tooltip } from "@arco-design/web-react";
import {
  IconArrowUp,
  IconCheck,
  IconDown,
  IconLoading,
  IconRecordStop,
} from "@arco-design/web-react/icon";
import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  HTMLAttributes,
} from "react";
import styled from "styled-components";
import { useScroll } from "../hooks/useScroll";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store";
import { useTheme } from "theme";

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
  background: ${(props) => (props.theme.mode === "dark" ? "#45454e" : "#fff")};

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
} & HTMLAttributes<HTMLDivElement>;

const ModelName: Record<string, string> = {
  ["deepseek-r1-250120"]: "DeepSeek-R1",
  ["doubao-1-5-pro-32k-250115"]: "DouBao-1.5-Pro",
  ["doubao-1-5-lite-32k-250115"]: "DouBao-1.5-lite",
};

const Sender = (props: Props) => {
  const { ask, loading, cancel, showTop, isHome } = props;
  const route = useNavigate();
  const { selectedModel, setSelectedModel, insertText, setInsertText } =
    useStore();

  const { isDarkMode } = useTheme();

  const send = async (question: string) => {
    ask(question);
  };

  const { run } = useRequest(send, {
    debounceWait: 200,
    manual: true,
  });

  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    if (!insertText.trim()) {
      return;
    }
    console.log("insert text", insertText);
    setText(insertText);
    setInsertText("");
  }, [insertText]);

  const handleSend = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      e?.preventDefault();
      if (text === "" || loading) return;
      run(text);
      setText("");
    },
    [loading, text, run]
  );

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

  const DropdownItem = (): ReactNode => {
    return (
      <Menu
        style={{ width: "150px" }}
        onClickMenuItem={(key) => setSelectedModel(key)}
      >
        <Menu.Item key="deepseek-r1-250120">
          <div className="flex flex-row w-full items-center">
            <div>DeepSeek-R1</div>

            {selectedModel === "deepseek-r1-250120" && (
              <IconCheck className="ml-auto" />
            )}
          </div>
        </Menu.Item>
        <Menu.Item key={"doubao-1-5-pro-32k-250115"}>
          <div className="flex flex-row w-full items-center">
            <div>DouBao-1.5-Pro</div>

            {selectedModel === "doubao-1-5-pro-32k-250115" && (
              <IconCheck className="ml-auto" />
            )}
          </div>
        </Menu.Item>
        <Menu.Item key={"doubao-1-5-lite-32k-250115"}>
          <div className="flex flex-row w-full items-center">
            <div>DouBao-1.5-lite</div>

            {selectedModel === "doubao-1-5-lite-32k-250115" && (
              <IconCheck className="ml-auto" />
            )}
          </div>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <ContentWrapper className={props.className} style={props.style}>
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
      <SenderWrapper className="p-3 min-h-[150px] max-h-[250px] rounded-xl w-[60%] min-w-[700px] flex flex-col items-center">
        <textarea
          className={`flex-[0.7] w-full text-lg ${
            isDarkMode && "bg-[#45454e]"
          }`}
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
          {!isHome && (
            <Dropdown droplist={DropdownItem()}>
              <div className="ml-2 px-2 py-1 hover:bg-[#eeebe2] rounded-lg transition-colors cursor-pointer">
                {ModelName[selectedModel]}
                <IconDown />
              </div>
            </Dropdown>
          )}
          <div className="ml-auto flex flex-row gap-2 justify-center items-center">
            {loading && (
              <div
                className="text-xl text-white px-2 py-2 rounded-[50%] bg-red-500 cursor-pointer flex justify-center items-center"
                onClick={cancel}
              >
                <IconRecordStop />
              </div>
            )}
            <div
              className={
                text === ""
                  ? "flex flex-row px-3 py-2 bg-blue-300 text-gray-100 rounded-md transition-colors duration-200"
                  : "flex flex-row px-3 py-2 bg-blue-500 text-white rounded-md transition-colors duration-200 cursor-pointer"
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
        </div>
      </SenderWrapper>
    </ContentWrapper>
  );
};

export { Sender };
