import { Card } from "@arco-design/web-react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const CardPage = () => {
  return (
    <ContentWrapper>
      <div className="flex flex-row gap-8 my-4">
        <Card className={"w-[360]"} title={"My Card"} hoverable>
          Card Content
        </Card>
        <Card className={"w-[360]"} title={"My Card 2"}>
          Card Content
        </Card>
      </div>
      <div className=" flex flex-row gap-8 my-4">
        <Card className={"w-[360]"} title={"Hoverable Card"} hoverable>
          Content
        </Card>
        <Card
          className={"w-[360] transition-all hover:translate-y-[-4px]"}
          hoverable
          title={"Transition Card"}
        >
          Content
        </Card>
      </div>
    </ContentWrapper>
  );
};

export { CardPage };
