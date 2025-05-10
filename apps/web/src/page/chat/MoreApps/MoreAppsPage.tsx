import { SelectedLine } from "components";
import { JSX, useState } from "react";
import styled from "styled-components";

type ItemType = {
  id: string;
  name: string;
  href?: string;
};

const appItems: ItemType[] = [
  {
    id: "1",
    name: "我的应用",
  },
  {
    id: "2",
    name: "推荐应用",
  },
];

const MoreAppsPage = (): JSX.Element => {
  const [itemSelected, setItemSelected] = useState<string>("1");

  return (
    <ContentWrapper>
      <div className="w-full flex items-center justify-center py-4 text-2xl font-bold">
        更多应用
      </div>
      <div className="flex text-xl font-bold">探索</div>
      <ListWrapper>
        {appItems.map((item) => {
          const handleClick = () => {
            setItemSelected(item.id);
          };
          const isSelected = itemSelected == item.id;

          return (
            <ItemWrapper
              key={item.id}
              $selected={isSelected}
              onClick={handleClick}
            >
              {item.name}
              {isSelected && (
                <SelectedLine top={"26px"} width={"24px"} height={"2px"} />
              )}
            </ItemWrapper>
          );
        })}
      </ListWrapper>
    </ContentWrapper>
  );
};

const ItemWrapper = styled.li<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 15px;
  transition: color 0.2s ease-in-out;
  cursor: pointer;
  color: ${({ theme, $selected }) => {
    if ($selected) {
      return theme.colors.text;
    } else {
      return theme.colors.secondary;
    }
  }};
`;

const ListWrapper = styled.ul`
  display: flex;
  position: sticky;
  flex-direction: row;
  gap: 30px;
  list-style: none;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  padding: 0 16px;
  margin-left: auto;
  margin-right: auto;
`;

export default MoreAppsPage;
