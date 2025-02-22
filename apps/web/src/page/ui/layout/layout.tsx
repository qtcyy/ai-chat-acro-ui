import { Avatar, Button, Input, Menu } from "@arco-design/web-react";
import { IconApps, IconFire } from "@arco-design/web-react/icon";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { HomePopover } from "components";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { Devil } from "../../../assets/devil68-svg";

const ContentWrapper = styled.div`
  height: 100vh;
  background: #f3f3f3;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  top: 0px;
  width: 100%;
  height: 60px;
  border-bottom-width: 2px;
  border-bottom-color: rgba(0, 0, 0, 0.07);
  background: #fff;
`;

const SiderWrapper = styled.div`
  position: fixed;
  left: 0px;
  top: 60px;
  height: calc(100vh - 60px);
  border-right-width: 2px;
  border-right-color: rgba(0, 0, 0, 0.07);
  overflow-y: auto;
`;

const OutletWrapper = styled.div<{ collapsed?: boolean }>`
  background: #f3f3f3;
  padding: 20px;
  margin-top: 60px;
  margin-left: ${(props) => (props.collapsed ? "48px" : "250px")};
  min-height: calc(100vh - 60px);
  transition: margin-left 0.2s;
`;

const ItemRouter: Record<string, string> = {
  ["0_0"]: "/layout/main",
  ["0_1"]: "/layout/manage",
};

const RouterItem: Record<string, string> = {
  ["/layout/main"]: "0_0",
  ["/layout/manage"]: "0_1",
};

const Layout = () => {
  const route = useNavigate();
  const location = useLocation();

  const [siderSelected, setSiderSelected] = useState("0_0");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    console.log((typeof RouterItem).match(location.pathname));
    setSiderSelected(RouterItem[location.pathname]);
  }, [location.pathname]);

  const handleClickSider = (key: string) => {
    setSiderSelected(key);
    route(ItemRouter[key]);
  };

  return (
    <ContentWrapper>
      <SimpleBar style={{ height: "100%", width: "100%" }}>
        <HeaderWrapper>
          <HomePopover>
            <div className=" p-1 rounded-xl hover:bg-gray-200 transition-colors duration-150">
              <Devil />
            </div>
          </HomePopover>
          <div className="ml-8 text-xl font-bold text-gray-500">
            后台管理系统
          </div>
          <div className="ml-auto flex flex-row gap-4">
            <Input.Search size="large" placeholder="search..." />
            <Avatar className={"bg-[#00d0b6] w-[50px]"}>A</Avatar>
          </div>
        </HeaderWrapper>
        <SiderWrapper>
          <Menu
            className={"h-full"}
            hasCollapseButton
            defaultOpenKeys={["0"]}
            defaultSelectedKeys={["0_0"]}
            selectedKeys={[siderSelected]}
            onClickMenuItem={(key) => handleClickSider(key)}
            onCollapseChange={(collapse) => setCollapsed(collapse)}
            style={{ width: 250 }}
          >
            <Menu.SubMenu
              key="0"
              title={
                <>
                  <IconApps />
                  主菜单
                </>
              }
            >
              <Menu.Item key="0_0">
                <div className=" pl-3">仪表盘</div>
              </Menu.Item>
              <Menu.Item key="0_1">
                <div className=" pl-3">用户管理</div>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="1"
              title={
                <>
                  <IconFire />
                  热门菜单
                </>
              }
            >
              <Menu.Item key="1_0">
                <div className=" pl-3">AI对话列表</div>
              </Menu.Item>
              <Menu.Item key="1_1">
                <div className=" pl-3">用量统计</div>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </SiderWrapper>
        <OutletWrapper collapsed={collapsed}>
          <Outlet />
        </OutletWrapper>
      </SimpleBar>
    </ContentWrapper>
  );
};

export { Layout };
