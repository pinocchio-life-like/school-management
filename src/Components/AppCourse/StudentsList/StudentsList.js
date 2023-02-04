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
import "./StudentsList.css";
const { Option } = Select;
const originData = [
  {
    key: Math.random(),
    studentName: `Mathemathics`,
    studentId: "ELEM32023",
    grade: "Grade 1",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `English`,
    studentId: "ELEM32023",
    grade: "Grade 1",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `Physical Education`,
    studentId: "ELEM32023",
    grade: "Grade 1",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `Art and Music`,
    studentId: "ELEM32023",
    grade: "Grade 1",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `Physical Education`,
    studentId: "ELEM32023",
    grade: "Grade 2",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `English`,
    studentId: "ELEM32023",
    grade: "Grade 2",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `Mathemathics`,
    studentId: "ELEM32023",
    grade: "Grade 3",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `English`,
    studentId: "ELEM32023",
    grade: "Grade 3",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `Chemistry`,
    studentId: "ELEM32023",
    grade: "Grade 7",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `Biology`,
    studentId: "ELEM32023",
    grade: "Grade 7",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `Mathemathics`,
    studentId: "ELEM32023",
    grade: "Grade 2",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `English`,
    studentId: "ELEM32023",
    grade: "Grade 5",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `Biology`,
    studentId: "ELEM32023",
    grade: "Grade 7",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    studentName: `Chemistry`,
    studentId: "ELEM32023",
    grade: "Grade 8",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    teacher: `Not Assigned`,
  },
];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}>
          {dataIndex === "grade" ? (
            <Select disabled placeholder="Cannot Edit">
              <Option value="Grade 1">Grade 1</Option>
              <Option value="Grade 2">Grade 2</Option>
              <Option value="Grade 3">Grade 3</Option>
            </Select>
          ) : dataIndex === "status" ? (
            <Input readOnly />
          ) : dataIndex === "coursesId" ? (
            <Select placeholder="Cannot Edit" disabled />
          ) : (
            <Input />
          )}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const StudentsList = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [xScroll, setXScroll] = useState("fixed");
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  //Edit Student Start
  const edit = (record) => {
    form.setFieldsValue({
      courseName: "",
      grade: "",
      courseId: "",
      teacher: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //on selected row reload
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  //columns
  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      width: 250,
      editable: true,
      Assignable: true,
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      width: 130,
      editable: true,
      Assignable: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      width: 100,
      editable: true,
      Assignable: true,
    },
    {
      title: "Section",
      dataIndex: "section",
      width: 100,
      editable: true,
      Assignable: true,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      width: 110,
      editable: true,
      Assignable: true,
    },
    {
      title: "Parent Name",
      dataIndex: "parentName",
      width: 140,
      editable: true,
      Assignable: true,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      width: 140,
      editable: true,
      Assignable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: 250,
      editable: true,
      Assignable: true,
    },
    // {
    //   title: "Teacher",
    //   dataIndex: "teacher",
    //   width: "30%",
    //   editable: true,
    //   Assignable: true,
    // },
    {
      width: 120,
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              // onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space size="middle">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure want to delete?"
              onConfirm={() => {
                // deleteCourse(record);
              }}>
              <a>Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const hasSelected = selectedRowKeys.length > 0;
  //merged columns
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    } else if (!col.Assignable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  if (xScroll === "fixed") {
    mergedColumns[0].fixed = true;
    mergedColumns[mergedColumns.length - 1].fixed = "right";
  }
  const scroll = {};
  scroll.x = "100vw";

  const tableProps = {
    loading,
    scroll,
  };
  //cancel edit
  const cancel = () => {
    setEditingKey("");
  };
  return (
    <div>
      <div class="StudentsListConatiner">
        <div class="StudentListTitle">
          <Title
            level={3}
            style={{ textAlign: "left", marginTop: 0, marginBottom: 10 }}>
            Students List
          </Title>
        </div>
        <div class="StudentListSearch">
          <div
            style={{
              display: "flex",
              textAlign: "left",
              marginBottom: 10,
              marginTop: 0,
            }}>
            <Search
              style={{ marginLeft: "30%" }}
              placeholder="input search text"
              // onSearch={onSearch}
              // onChange={onSearchChange}
              // onChange=
              enterButton
            />
          </div>
        </div>
        <div class="ActionsTab">Hello</div>
        <div class="ReloadAndSelectCount">
          <div
            style={{
              display: "flex",
              textAlign: "left",
              marginBottom: 5,
              marginTop: 19,
            }}>
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}>
              Reload
            </Button>
            <span
              style={{
                marginLeft: 8,
              }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
        </div>
        <div class="StudentListTableContainer">
          <Form form={form} component={false}>
            <Table
              style={{ zIndex: -100 }}
              {...tableProps}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              rowSelection={rowSelection}
              dataSource={originData}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={true}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
