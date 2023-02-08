import {
  Button,
  Form,
  Image,
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
import { Link, useNavigate } from "react-router-dom";
import "./StudentsList.css";
const { Option } = Select;
const originData = [
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">John Wick</Link>,
    studentId: "ELEM32023",
    grade: "Grade 1",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://s3.amazonaws.com/media.thecrimson.com/photos/2014/11/07/202918_1301040.jpg",
  },
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">Nairobi Shoan</Link>,
    studentId: "ELEM32023",
    grade: "Grade 1",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://cdn.dribbble.com/users/1306069/screenshots/11105138/media/dc177a1a6d655f48d90812e5389bcb85.jpg?compress=1&resize=1000x750&vertical=top",
  },
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">Adams Kent</Link>,
    studentId: "ELEM32023",
    grade: "Grade 1",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://www.etstours.com/images/r/adam-kent_updated-new/480x480g1278-0-4683-3405/adam-kent_updated-new.jpg",
  },
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">Bohr Castle</Link>,
    studentId: "ELEM32023",
    grade: "Grade 1",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://d2jyir0m79gs60.cloudfront.net/news/images/successful-college-student-lg.png",
  },
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">Islam Sobhi</Link>,
    studentId: "ELEM32023",
    grade: "Grade 2",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://i2.wp.com/rollercoasteryears.com/wp-content/uploads/Thrive-During-Finals-.jpg?resize=1000%2C667&ssl=1",
  },
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">Omar Hisham</Link>,
    studentId: "ELEM32023",
    grade: "Grade 2",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://assets.audiomack.com/al-afasy/5008d01a721b2382767130df7732ed70aafa2600138855aa1071731cf3a0e84c.jpeg?width=240&height=240&max=true",
  },
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">Mishari Rashid</Link>,
    studentId: "ELEM32023",
    grade: "Grade 3",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/277759480_517508559945240_2716516652627364052_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=-6zoqapMHroAX9idRJD&_nc_ht=scontent.fadd1-1.fna&oh=00_AfBoIRLh6kks3FAnonVmUPGgDyHodC_-dqa3S2JpN-7diQ&oe=63E32851",
  },
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">Solomon David</Link>,
    studentId: "ELEM32023",
    grade: "Grade 3",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://media.licdn.com/dms/image/C4E03AQGQazFu7td4Jw/profile-displayphoto-shrink_400_400/0/1601898761596?e=1680739200&v=beta&t=z1sIytfHwp1DVLw0WgP5DziH3zWPcLa7g7IlNuq0NGA",
  },
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">Stem Hash</Link>,
    studentId: "ELEM32023",
    grade: "Grade 7",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://townsquare.media/site/812/files/2021/05/j-cole.jpg?w=980&q=75",
  },
  {
    key: Math.random(),
    studentName: <Link to="/studentDetail">Carol Gedion</Link>,
    studentId: "ELEM32023",
    grade: "Grade 7",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage: "https://i.mdel.net/i/db/2022/10/1802684/1802684-500w.jpg",
  },
  {
    key: Math.random(),
    studentName: `Nicki Baltmore`,
    studentId: "ELEM32023",
    grade: "Grade 2",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://photos.psychologytoday.com/6f3c2e5c-deeb-4e31-ad7a-47d4df3a2c2e/2/320x400.jpeg",
  },
  {
    key: Math.random(),
    studentName: `Khabib Nomagomedov`,
    studentId: "ELEM32023",
    grade: "Grade 7",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://cdn.images.express.co.uk/img/dynamic/167/590x/Khabib-Nurmagomedov-Conor-McGregor-1647370.webp?r=1659021075853",
  },
  {
    key: Math.random(),
    studentName: `Kamaru Usman`,
    studentId: "ELEM32023",
    grade: "Grade 8",
    section: "A",
    dob: "22-04-2000",
    parentName: "Mola Seyemu",
    mobileNumber: "0923656550",
    address: "Addis Ababa, Yeka, Megenagna",
    studentImage:
      "https://ichef.bbci.co.uk/news/800/cpsprodpb/F07C/production/_116946516_af324088-7b4f-424e-b35e-e95ebe5d1c9d.jpg",
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
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [xScroll, setXScroll] = useState("fixed");
  const [editingKey, setEditingKey] = useState("");
  const [tableData, setTableData] = useState(originData);
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
  //Save Edit Record
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...tableData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setTableData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setTableData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  //delete Student
  const deleteStudent = (record) => {
    const indexValue = tableData.indexOf(record);
    tableData.splice(indexValue, 1);
    setTableData([...tableData]);
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
      width: 200,
      editable: true,
      Assignable: true,
      render: (_, record) => {
        // console.log(record);
        return (
          <div>
            <Image
              style={{ borderRadius: 5 }}
              alt="hello"
              width={40}
              height={40}
              src={record.studentImage}
            />
            <span style={{ marginLeft: 10 }}>{record.studentName}</span>
          </div>
        );
      },
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
              onClick={() => save(record.key)}
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
                deleteStudent(record);
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
      <div className="StudentsListConatiner">
        <div className="StudentListTitle">
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
        <div className="StudentListSearch">
          <div
            style={{
              display: "flex",
              textAlign: "left",
              marginBottom: 5,
              marginTop: 8,
            }}>
            <Search
              style={{
                // border: "1px solid blue",
                // borderRadius: 8,
                marginLeft: "30%",
                marginRight: 5,
              }}
              placeholder="input search text"
              // onSearch={onSearch}
              // onChange={onSearchChange}
              // onChange=
              enterButton
            />
          </div>
        </div>
        <div className="ActionsTab">
          <div
            style={{
              display: "flex-end",
              textAlign: "right",
              marginBottom: 5,
              marginTop: 20,
              marginRight: 5,
            }}>
            <Button
              onClick={() => {
                navigate("/studentAdmission");
              }}
              type="primary"
              style={{ marginLeft: 5 }}>
              Assign Teacher
            </Button>
          </div>
        </div>
        <div className="ReloadAndSelectCount">
          <div
            style={{
              display: "flex",
              textAlign: "left",
              marginBottom: 5,
              marginTop: 20,
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
                marginTop: 6,
              }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
        </div>
        <div className="StudentListTableContainer">
          <Form form={form} component={false}>
            <Table
              style={{ zIndex: -100 }}
              {...tableProps}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered={false}
              rowSelection={rowSelection}
              dataSource={tableData}
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
