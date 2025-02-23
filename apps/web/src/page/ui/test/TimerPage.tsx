import { Button } from "@arco-design/web-react";
import styled from "styled-components";
import { timer } from "utils";

const ContentWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TimerPage = () => {
  const { getCurrent, onStart, onEnd } = timer({ init: 0 });

  return (
    <ContentWrapper>
      <div className="text-3xl font-bold">计时器测试</div>
      <div className="flex flex-row gap-3">
        <Button type="primary" onClick={onStart}>
          Start
        </Button>
        <Button type="primary" onClick={onEnd}>
          End
        </Button>
      </div>
      <div className="text-lg">{getCurrent()} S</div>
    </ContentWrapper>
  );
};

export { TimerPage };
