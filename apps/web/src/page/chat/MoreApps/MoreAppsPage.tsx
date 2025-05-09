import { JSX } from "react";
import styled from "styled-components";

const MoreAppsPage = (): JSX.Element => {
  return (
    <ContentWrapper>
      <div className="w-full flex items-center justify-center py-4 text-2xl">
        更多应用
      </div>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MoreAppsPage;
