import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CollectFees.css";
const { Option } = Select;

const originData = [
  {
    key: Math.random(),
    grade: "Grade 1",
    section: "A",
    admissionNumber: "00023",
    studentName: "Gamachis Kuma",
    fatherName: "Kuma Demeka",
    phone: "+251978544325",
    dob: "02-20-2000",
  },
  {
    key: Math.random(),
    grade: "Grade 1",
    section: "A",
    admissionNumber: "00023",
    studentName: "Biru Feje",
    fatherName: "Demeka Qamaa",
    phone: "+251978544325",
    dob: "02-20-2000",
  },
  {
    key: Math.random(),
    grade: "Grade 1",
    section: "A",
    admissionNumber: "00023",
    studentName: "John Gadisa",
    fatherName: "shabel Garre",
    phone: "+251978544325",
    dob: "02-20-2000",
  },
  {
    key: Math.random(),
    grade: "Grade 1",
    section: "B",
    admissionNumber: "00023",
    studentName: "Stiff Gome",
    fatherName: "Abelu Demeka",
    phone: "+251978544325",
    dob: "02-20-2000",
  },
  {
    key: Math.random(),
    grade: "Grade 1",
    section: "B",
    admissionNumber: "00023",
    studentName: "Mann Steller",
    fatherName: "Steller Mann",
    phone: "+251978544325",
    dob: "02-20-2000",
  },
];
const CollectFees = () => {
  const [form] = Form.useForm();
  const [tableForm] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const onFinish = (values) => {
    const data = originData.filter((filter) => {
      return filter.grade === values.grade && filter.section === values.section;
    });
    setTableData([...data]);
  };
  const columns = [
    {
      title: "Grade",
      dataIndex: "grade",
      width: "10%",
    },
    {
      title: "Section",
      dataIndex: "section",
      width: "10%",
    },
    {
      title: "Admission Number",
      dataIndex: "admissionNumber",
      width: "12%",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      width: "14%",
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      width: "14%",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      width: "14%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "14%",
    },
    {
      width: "10%",
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Typography.Link
              onClick={() => {
                console.log(record);
              }}>
              <Link to="/addFee">Collect Fess</Link>
            </Typography.Link>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <div className="CollectFeesPageCss">
        <div className="CollectFeesTitle">
          <Title
            level={4}
            style={{
              marginLeft: 5,
              textAlign: "left",
              marginTop: 5,
              marginBottom: 10,
            }}>
            Select Search Criteria
          </Title>
        </div>
        <div className="ClassAndSectionSearch">
          <Form form={form} onFinish={onFinish}>
            <div style={{ display: "flex", textAlign: "left" }}>
              <Form.Item name="grade" style={{ width: "50%" }}>
                <Select placeholder="Select Grade">
                  <Option value="Grade 1">Grade 1</Option>
                  <Option value="Grade 2">Grade 2</Option>
                  <Option value="Grade 3">Grade 3</Option>
                  <Option value="Grade 4">Grade 4</Option>
                  <Option value="Grade 5">Grade 5</Option>
                  <Option value="Grade 6">Grade 6</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="section"
                style={{ width: "50%", marginLeft: 10 }}>
                <Select placeholder="Select Section">
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="C">C</Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ marginLeft: 10 }}>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="SearchByKeyword">
          <div
            style={{
              display: "flex",
              textAlign: "left",
              marginBottom: 5,
              marginTop: 0,
            }}>
            <Search
              style={{
                marginLeft: "10%",
                marginRight: 0,
              }}
              placeholder="input search text"
              onSearch={(value) => {
                console.log(value);
              }}
              // onChange={onSearchChange}
              // onChange=
              enterButton
            />
          </div>
        </div>
        <div className="SearchedStudentsList">
          <div className="SearchedStudentsListTitle">
            <Title
              level={3}
              style={{
                marginLeft: 5,
                textAlign: "left",
                marginTop: 5,
                marginBottom: 10,
              }}>
              Students List
            </Title>
          </div>
          <div className="SearchedStudentsListTable">
            <Form form={tableForm} component={false}>
              <Table
                size="small"
                //   bordered
                dataSource={tableData}
                columns={columns}
                rowClassName="editable-row"
                pagination={
                  {
                    //   onChange: deleteFee,
                  }
                }
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectFees;
