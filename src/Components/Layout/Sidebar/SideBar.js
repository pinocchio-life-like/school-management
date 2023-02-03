import Sider from "antd/es/layout/Sider";
import React from "react";
import SideBarMenu from "../SideBarMenu/SideBarMenu";

const SideBar = (props) => {
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <SideBarMenu />
      </Sider>
    </div>
  );
};

export default SideBar;
