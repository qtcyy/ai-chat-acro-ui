import { SelectedLine } from "components";
import { JSX, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import SimpleBarCore from "simplebar-core";
import styled from "styled-components";
import { Avatar, Button } from "@arco-design/web-react";
import { useTheme } from "theme";

type ItemType = {
  id: string;
  name: string;
  href?: string;
};

export type AppsType = {
  id: string;
  top?: boolean;
  classify: string;
  name: string;
  description?: string;
  from?: string;
  icon?: string;
};

const classItems: ItemType[] = [
  {
    id: "1",
    name: "我的应用",
  },
  {
    id: "2",
    name: "推荐应用",
  },
];

const appItems: AppsType[] = [
  {
    id: "1",
    classify: "2",
    top: true,
    name: "写作助手",
    description: "完成你的写作任务",
    from: "cyy",
  },
  {
    id: "2",
    classify: "2",
    name: "翻译助手",
    description: "你的专属翻译助手",
    from: "GitHub",
  },
];

const MoreAppsPage = (): JSX.Element => {
  const [itemSelected, setItemSelected] = useState<string>("1");
  const [scrollTop, setScrollTop] = useState<number | undefined>(undefined);
  const { theme } = useTheme();

  const pageRef = useRef<SimpleBarCore>(null);
  const target = pageRef.current?.getScrollElement();

  const getScrollInfo = () => {
    setScrollTop(target?.scrollTop);
    console.log(scrollTop);
  };

  useEffect(() => {
    console.log(scrollTop);
  }, [scrollTop]);

  return (
    <SimpleBar
      ref={pageRef}
      onScrollCapture={getScrollInfo}
      style={{ overflow: "auto", width: "100%", height: "100vh" }}
    >
      <ContentWrapper>
        <div className="w-full flex items-center justify-center py-4 text-2xl font-bold">
          更多应用
        </div>
        <div className="flex text-xl font-bold">探索</div>
        <ListWrapper>
          {classItems.map((item) => {
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
          <Button type="primary" onClick={getScrollInfo}>
            Get
          </Button>
        </ListWrapper>
        <EnumWrapper>
          {classItems.map((classItem) => {
            return (
              <>
                <div key={classItem.id} className="mt-4 mb-2 text-md font-bold">
                  {classItem.name}
                </div>
                <AppListWrapper>
                  {appItems.map((appItem) => {
                    if (
                      appItem.classify == classItem.id ||
                      (appItem.top && classItem.id == "1")
                    ) {
                      return (
                        <AppItemWrapper>
                          <Avatar size={60} shape="circle">
                            <img src={appItem.icon} />
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="font-bold text-lg">
                              {appItem.name}
                            </div>
                            <div className={`text-[${theme.colors.secondary}]`}>
                              {appItem.description}
                            </div>
                            <div className="mt-2">
                              {"来自: " + appItem.from}
                            </div>
                          </div>
                        </AppItemWrapper>
                      );
                    } else {
                      return null;
                    }
                  })}
                </AppListWrapper>
              </>
            );
          })}
        </EnumWrapper>
      </ContentWrapper>
    </SimpleBar>
  );
};

const TestBlock = styled.div`
  height: 1500px;
`;

const AppListWrapper = styled.ul`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-between;
`;

const AppItemWrapper = styled.li`
  width: calc((100% - 16px) / 2);
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.componentBg};
  display: flex;
  flex-direction: row;
  gap: 12px;
  height: 104px;
  cursor: pointer;
`;

const EnumWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  top: 20px;
  gap: 30px;
  z-index: 10;
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
