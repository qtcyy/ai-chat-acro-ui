import styled from "styled-components";
import SimpleBar from "simplebar-react";
import { ChatProvider } from "../hooks/useChatStorage";
import { Outlet } from "react-router-dom";
import { Sider } from "../sider/Sider";
import { useRef, useState } from "react";
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

const DELTA = 50;

const ChatLayout = () => {
  const ref = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  const captureScrollState = () => {
    if (ref) {
      //@ts-ignore
      const target = ref.current.getScrollElement();
      // console.log(target.scrollTop, target.offsetHeight);
      // console.log(shouldScroll);
      if (
        target.scrollHeight - target.scrollTop >
        DELTA + target.offsetHeight
      ) {
        setShouldScroll(false);
      } else {
        setShouldScroll(true);
      }
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
            >
              <ScrollProvider ref={ref} shouldScroll={shouldScroll}>
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
