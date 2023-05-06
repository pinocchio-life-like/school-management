import {
  TeamOutlined,
  // UserOutlined,
  PicCenterOutlined,
  DeploymentUnitOutlined,
  IdcardOutlined,
  BarChartOutlined,
  DollarCircleOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Year = new Date();
const CalenderYear = Year.getFullYear();
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("DashBoard", "sub1", <AppstoreOutlined />, [
    getItem("Admin", "/feesGroup"),
    getItem("Teacher", "/collectFees"),
    getItem("Student", "/collectFees"),
    getItem("Transport", "/collectFees"),
    getItem("Inventory", "/collectFees"),
    getItem("Human Resource", "/collectFees"),
  ]),
  getItem("Class", "/classList", <PicCenterOutlined />),
  getItem("Course", "sub2", <DeploymentUnitOutlined />, [
    getItem("Course Break Down", "/courseBreakDown"),
    getItem("Course Offer", "/courseOffer"),
    getItem("Courses Group", "/courseGroup"),
  ]),
  getItem("Teacher", "sub3", <TeamOutlined />, [
    getItem("Teacher List", "/teacherList"),
    getItem("Assign Teacher", "/assignTeacher"),
  ]),
  getItem("Student", "sub4", <IdcardOutlined />, [
    // getItem("Student Admission", "/studentAdmission"),
    getItem("Student Registration", "/studentRegistration"),
    getItem("Students List", "/studentsList"),
    getItem(`Admit for ${CalenderYear}`, "/admitForYear"),
    // getItem("Students Detail", "/studentDetail"),
  ]),
  getItem("Student Attendance", "/studentsAttendance", <SnippetsOutlined />),
  getItem("Student Mark", "/studentsMark", <FileDoneOutlined />),
  getItem("Fees Collection", "sub5", <DollarCircleOutlined />, [
    getItem("Fees Group", "/feesGroup"),
    getItem("Collect Fees", "/collectFees"),
  ]),
  getItem("Reports", "sub6", <BarChartOutlined />, [
    getItem("Admission Report", "/admissionReport"),
    getItem("Class And Section Report", "/classAndSectionReport"),
    getItem("Student Attendance Report", "/studentAttendanceReport"),
    getItem("Student Mark Report", "/studentMarkReport"),
    // getItem("Student Attendance Report", "/studentAttendanceReport"),
    getItem("Student History Report", "/studentHistoryReport"),
    getItem("Gender Ratio Report", "/genderRatioReport"),
  ]),

  // getItem("Reports", "/reports", <BarChartOutlined />),
];
const SideBarMenu = (props) => {
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]);

  const handleOpenChange = (keys) => {
    console.log([keys[keys.length - 1]]);
    setOpenKeys([keys[keys.length - 1]]);
  };
  return (
    <div>
      <Menu
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "rgba(0, 0, 0, 0.5)",
          width: props.width,
        }}
        theme="light"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
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
