import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import SideBarMenu from "../SideBarMenu/SideBarMenu";
import "./SideBar.css";
const SideBar = (props) => {
  return (
    <div>
      <div
        style={{
          height: 64,
          padding: 16,
          position: "fixed",
          left: 0,
          top: 0,
          width: props.width,
          bottom: 0,
          background: "rgba(255, 255, 255)",
          color: "#4593FF",
          fontSize: 29,
          fontFamily: "Times",
          textAlign: "center",
        }}>
        {props.collapsed ? "OS" : "Ozone School"}
      </div>
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        width={props.width}
        className="my-sider"
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 64,
          bottom: 0,
          background: "rgba(255, 255, 255)",
        }}>
        <SideBarMenu width={props.width} />
      </Sider>
    </div>
  );
};

export default SideBar;
