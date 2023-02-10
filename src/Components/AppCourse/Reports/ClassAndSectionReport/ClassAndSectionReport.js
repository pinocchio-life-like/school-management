import { Drawer, Table, Typography } from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
const drawerTable = [
  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },
  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },
  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },
  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },

  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },
  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },
  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },
  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },
  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },
  {
    admissionNumber: "65433",
    studentName: "Edward Thomas",
    class: "Class 2(A)",
    fatherName: "Olivier Thomas",
    dob: "2000-12-02",
    gender: "Male",
    mobileNumber: "+9876543234",
  },
];
const drawerColumn = [
  {
    title: "Admission Number",
    dataIndex: "admissionNumber",
  },
  {
    title: "Student Name",
    dataIndex: "studentName",
  },
  {
    title: "Class",
    dataIndex: "class",
  },
  {
    title: "Father Name",
    dataIndex: "fatherName",
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
  {
    title: "Mobile Numner",
    dataIndex: "mobileNumber",
  },
];
const originData = [
  {
    key: Math.random(),
    rollNumber: "2353",
    class: "Class 1(A)",
    students: 11,
  },
  {
    key: Math.random(),
    rollNumber: "2353",
    class: "Class 1(B)",
    students: 10,
  },
  {
    key: Math.random(),
    rollNumber: "2353",
    class: "Class 2(A)",
    students: 18,
  },
  {
    key: Math.random(),
    rollNumber: "2353",
    class: "Class 2(B)",
    students: 21,
  },
  {
    key: Math.random(),
    rollNumber: "2353",
    class: "Class 3(A)",
    students: 19,
  },
  {
    key: Math.random(),
    rollNumber: "2353",
    class: "Class 4(A)",
    students: 31,
  },
  {
    key: Math.random(),
    rollNumber: "2353",
    class: "Class 4(B)",
    students: 27,
  },
  {
    key: Math.random(),
    rollNumber: "2353",
    class: "Class 5(A)",
    students: 22,
  },
  {
    key: Math.random(),
    rollNumber: "2353",
    class: "Class 5(B)",
    students: 24,
  },
];
const ClassAndSectionReport = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const columns = [
    {
      title: "Room Number",
      dataIndex: "rollNumber",
    },
    {
      title: "Class",
      dataIndex: "class",
    },
    {
      title: "Students",
      dataIndex: "students",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "4%",
      render: (_, record) => {
        return (
          <Typography.Link
            onClick={() => {
              showDrawer();
            }}>
            <EyeOutlined />
          </Typography.Link>
        );
      },
    },
  ];
  return (
    <div>
      <div
        style={{
          textAlign: "left",
          marginBottom: 10,
          marginTop: 0,
          width: "20%",
        }}>
        <Title level={4}>Class And Section Report</Title>
        <div>
          <Search
            placeholder="input search text"
            // onSearch={onSearch}
            style={{
              width: 230,
            }}
          />
        </div>
      </div>
      <Table size="small" dataSource={originData} columns={columns} />
      <Drawer
        title="Student List"
        placement="right"
        onClose={onClose}
        width="90%"
        open={openDrawer}>
        <Table dataSource={drawerTable} columns={drawerColumn} size="small" />
      </Drawer>
    </div>
  );
};

export default ClassAndSectionReport;
