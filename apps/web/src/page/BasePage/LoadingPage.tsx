import { IconLoading } from "@arco-design/web-react/icon";
import styled from "styled-components";

const LoadingPage = () => {
  return (
    <LayoutWrapper className="h-screen w-screen">
      <div className="text-6xl">
        <IconLoading />
      </div>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { LoadingPage };
