import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Teacher", "sub2", <TeamOutlined />, [
    getItem("Assign Teacher", "/assignTeacher"),
    getItem("Teacher List", "/teacherList"),
  ]),
  getItem("Course", "sub3", <UserOutlined />, [
    // getItem("Course List", "/courseList"),
    // getItem("Add Course", "/addCourse"),
    // getItem("Edit Course", "/editCourse"),
    getItem("Course Break Down", "/courseBreakDown"),
    getItem("Course Offer", "/courseOffer"),
    // getItem("Course Group", "/courseGroup"),
  ]),
];
const SideBarMenu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={["3"]}
        items={items}
        onClick={({ key }) => {
          if (key === "test") {
          } else {
            navigate(key);
          }
        }}></Menu>
    </div>
  );
};

export default SideBarMenu;
