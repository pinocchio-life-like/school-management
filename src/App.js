import { Layout, theme } from "antd";
import React, { useState } from "react";
import AppRoute from "./Components/AppRoutes/AppRoute";
import AppFooter from "./Components/Layout/AppFooter/AppFooter";
import AppHeader from "./Components/Layout/AppHeader/AppHeader";
import SideBar from "./Components/Layout/Sidebar/SideBar";
const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [marginLeft, setMarginLeft] = useState(200);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setMarginLeftHandler = (value) => {
    setMarginLeft(value);
  };
  const setCollapsedHandler = (value) => {
    setCollapsed(value);
  };
  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
          margin: "0",
        }}>
        <SideBar collapsed={collapsed} />
        <Layout
          className="site-layout"
          style={{
            marginLeft: marginLeft,
            backgroundColor: "#f7f7fa",
          }}>
          <AppHeader
            collapsed={collapsed}
            onSetMarginLeft={setMarginLeftHandler}
            onSetCollapsed={setCollapsedHandler}
          />
          <Content
            style={{
              margin: "84px 16px 24px 16px",
              overflow: "initial",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}>
            <div
              style={{
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
              }}>
              <AppRoute />
            </div>
          </Content>
        </Layout>
      </Layout>
      <AppFooter />
    </div>
  );
};
export default App;
