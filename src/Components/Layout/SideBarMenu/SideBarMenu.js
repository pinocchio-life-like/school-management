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
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
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
