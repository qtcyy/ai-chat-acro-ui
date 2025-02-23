import { Button, Menu } from "@arco-design/web-react";
import { IconApps } from "@arco-design/web-react/icon";
import { ReactNode, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  padding: 24px;
`;

const OutletWrapper = styled.div`
  border-radius: 4px;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.02);
`;

type MenuItemType = {
  key: string;
  content: ReactNode;
};

const items: MenuItemType[] = [
  {
    key: "1",
    content: "Card",
  },
  {
    key: "2",
    content: "Menu",
  },
] as const;

type ItemKeys = (typeof items)[number]["key"];

const ItemsRouter: Record<string, string> = {
  ["1"]: "/ui/card",
  ["2"]: "/ui/menu",
};

const HomePage = () => {
  const route = useNavigate();
  const [selected, setSelected] = useState<ItemKeys>("1");

  const handleClickMenu = (key: string) => {
    setSelected(key);
    route(ItemsRouter[key]);
  };

  return (
    <ContentWrapper>
      <div className="text-3xl font-bold">Welcome to my web app.</div>
      <div className="text-xl">Acro UI Test Page</div>
      <div className="flex flex-row gap-4 overflow-y-auto">
        {/* <Button.Group>
          <Button type="primary" onClick={() => route("/ui/card")}>
            Card
          </Button>
          <Button type="primary">Layout</Button>
        </Button.Group> */}
        <Menu
          className={"w-full items-center justify-center"}
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selected]}
          onClickMenuItem={(key) => handleClickMenu(key)}
        >
          <Menu.Item key="0" style={{ padding: 0, marginRight: 38 }} disabled>
            <div className="inline-flex gap-4 items-center">
              <IconApps className=" size-7" />
              <div>UI Menu</div>
            </div>
          </Menu.Item>
          {items.map((item) => (
            <Menu.Item key={item.key}>{item.content}</Menu.Item>
          ))}
          <Button
            className={"ml-8"}
            type="primary"
            onClick={() => route("/layout")}
          >
            Layout
          </Button>
          <Button
            className={"ml-4"}
            type="primary"
            onClick={() => route("/test/timer")}
          >
            Timer
          </Button>
        </Menu>
      </div>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </ContentWrapper>
  );
};

export { HomePage };
