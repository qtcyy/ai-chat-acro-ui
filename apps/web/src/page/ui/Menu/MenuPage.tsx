import { Menu } from "@arco-design/web-react";
import { IconApps, IconBook } from "@arco-design/web-react/icon";
import styled from "styled-components";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 32px;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MenuPage = () => {
  return (
    <ContentWrapper>
      <TitleText>Horizontal Menu</TitleText>
      <Menu
        className={"w-full overflow-y-auto"}
        mode="horizontal"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Solution</Menu.Item>
        <Menu.Item key="3">Cloud Service</Menu.Item>
      </Menu>
      <TitleText className="mt-3">Dark Menu</TitleText>
      <Menu
        className={"w-full overflow-y-auto"}
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Solution</Menu.Item>
        <Menu.Item key="3">Cloud Service</Menu.Item>
      </Menu>
      <TitleText className="mt-3">Vertical Menu</TitleText>
      <div className=" inline-flex flex-row gap-4 overflow-y-auto">
        <Menu
          className={"w-[220]"}
          mode="vertical"
          hasCollapseButton
          defaultOpenKeys={["1"]}
        >
          <Menu.SubMenu
            key="1"
            title={
              <>
                <IconApps /> Navigation 1
              </>
            }
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <Menu.Item key={`1_${idx}`}>{`Item ${idx}`}</Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu.SubMenu
            key="2"
            title={
              <>
                <IconBook /> Navigation 2
              </>
            }
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <Menu.Item key={`2_${idx}`}>{`Item ${idx}`}</Menu.Item>
            ))}
          </Menu.SubMenu>
        </Menu>
        <Menu
          className={"w-[220]"}
          hasCollapseButton
          theme="dark"
          mode="vertical"
          defaultOpenKeys={["1"]}
        >
          <Menu.SubMenu
            key="1"
            title={
              <>
                <IconApps /> Navigation 1
              </>
            }
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <Menu.Item key={`1_${idx}`}>{`Item ${idx}`}</Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu.SubMenu
            key="2"
            title={
              <>
                <IconBook /> Navigation 2
              </>
            }
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <Menu.Item key={`2_${idx}`}>{`Item ${idx}`}</Menu.Item>
            ))}
          </Menu.SubMenu>
        </Menu>
      </div>
    </ContentWrapper>
  );
};

export { MenuPage };
