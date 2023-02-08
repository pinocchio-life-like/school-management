import { theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React from "react";

const AppHeader = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          position: "fixed",
          top: 0,
          zIndex: 100,
          width: "100%",
        }}>
        {React.createElement(
          props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => {
              props.onSetCollapsed(!props.collapsed);
              if (props.collapsed === false) {
                props.onSetMarginLeft(80);
              } else {
                props.onSetMarginLeft(200);
              }
            },
          }
        )}
      </Header>
    </div>
  );
};

export default AppHeader;
