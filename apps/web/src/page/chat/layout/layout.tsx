import styled from "styled-components";
import SimpleBar from "simplebar-react";
import { ChatProvider } from "../hooks/useChatStorage";
import { Outlet } from "react-router-dom";
import { Sider } from "../sider/Sider";
import { useEffect, useRef, useState } from "react";
import { ScrollProvider } from "../hooks/useScroll";
import { ProjectStorageProvider } from "../hooks/useProjectStorage";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  /* background: #f3f3f3; */
  /* background: rgb(244, 242, 236); */
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const DELTA = 20;

const ChatLayout = () => {
  const ref = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(true);
  const [clientHeight, setClientHeight] = useState(0);

  // useEffect(() => console.log(clientHeight), [clientHeight]);

  const captureScrollState = () => {
    if (ref.current) {
      //@ts-ignore
      const target = ref.current.getScrollElement();
      if (clientHeight !== target.scrollHeight) {
        setClientHeight(target.scrollHeight);
      }
      // console.log(target.scrollHeight, target.scrollTop, target.clientHeight);
      // console.log(scrollTarget?.scrollTop);
      if (
        target.scrollHeight - target.scrollTop >
        DELTA + target.clientHeight
      ) {
        setShouldScroll(false);
      } else {
        setShouldScroll(true);
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    console.log("checking");
    if (e.currentTarget) {
      //@ts-ignore
      setClientHeight(e.currentTarget.clientHeight);
    }
  };

  return (
    <ProjectStorageProvider>
      <ChatProvider>
        <LayoutWrapper>
          <div className="flex flex-row">
            <Sider />
            <SimpleBar
              ref={ref}
              style={{ width: "calc(100vw - 108px)", height: "100%" }}
              onScrollCapture={captureScrollState}
              onScroll={handleScroll}
            >
              <ScrollProvider
                ref={ref}
                shouldScroll={shouldScroll}
                clientHeight={clientHeight}
                //@ts-ignore
              >
                <Outlet />
              </ScrollProvider>
            </SimpleBar>
          </div>
        </LayoutWrapper>
      </ChatProvider>
    </ProjectStorageProvider>
  );
};

export default ChatLayout;
