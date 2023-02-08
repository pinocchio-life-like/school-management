import { useNavigate } from "react-router-dom";
import {
  Button,
  Space,
  Table,
  Input,
  Form,
  Select,
  Typography,
  Popconfirm,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
// import { EditFilled, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./TeacherList.css";
// import coursesIdearchForm from "./coursesIdearchForm/coursesIdearchForm";
const { Search } = Input;
const { Option } = Select;

const originData = [
  {
    key: Math.random(),
    teacherName: `Tesfa Daba`,
    grade: (
      <>
        <p>Grade 7</p> <p>Grade 8</p>
      </>
    ),
    coursesId: (
      <>
        <p>MathG7</p>
        <p>PhysG8</p>
      </>
    ),
    competitionalLevel: "Level 7-8",
    status: `Not Assigned`,
  },
  {
    key: Math.random(),
    teacherName: `Kifle Yilma`,
    grade: (
      <>
        <p>Grade 7</p> <p>Grade 8</p>
      </>
    ),
    coursesId: (
      <>
        <p>MathG7</p>
        <p>PhysG8</p>
      </>
    ),
    competitionalLevel: "Level 7-8",
    status: `Not Assigned`,
  },
  {
    key: Math.random(),
    teacherName: `Alemu Addis`,
    grade: (
      <>
        <p>Grade 7</p> <p>Grade 8</p>
      </>
    ),
    coursesId: (
      <>
        <p>MathG7</p>
        <p>PhysG8</p>
      </>
    ),
    competitionalLevel: "Level 7-8",
    status: `Not Assigned`,
  },
  {
    key: Math.random(),
    teacherName: `Mulugeta hailu`,
    grade: (
      <>
        <p>Grade 7</p> <p>Grade 8</p>
      </>
    ),
    coursesId: (
      <>
        <p>MathG7</p>
        <p>PhysG8</p>
      </>
    ),
    competitionalLevel: "Level 7-8",
    status: `Not Assigned`,
  },
  {
    key: Math.random(),
    teacherName: `Hulu Kebede`,
    grade: (
      <>
        <p>Grade 7</p> <p>Grade 8</p>
      </>
    ),
    coursesId: (
      <>
        <p>MathG7</p>
        <p>PhysG8</p>
      </>
    ),
    competitionalLevel: "Level 7-8",
    status: `Not Assigned`,
  },
  {
    key: Math.random(),
    teacherName: `Islam Sobhi`,
    grade: (
      <>
        <p>Grade 7</p> <p>Grade 8</p>
      </>
    ),
    coursesId: (
      <>
        <p>MathG7</p>
        <p>PhysG8</p>
      </>
    ),
    competitionalLevel: "Level 7-8",
    status: `Not Assigned`,
  },
];

// Editable Cell

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

const TeacherList = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [addForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [coursesIdValue, setcoursesIdValue] = useState("none");
  const [teacherNameForId, setteacherNameForId] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const [messageApi, contextHolder] = message.useMessage();
  const [filteredData, setFilteredData] = useState(originData);
  const [coursesForGradeRender, setCoursesForGradeRender] = useState([]);
  const [onLevelRender, setOnLevelRender] = useState([]);

  // edit start start
  const edit = (record) => {
    form.setFieldsValue({
      teacherName: "",
      grade: "",
      coursesId: "",
      status: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  //edit start end

  //cancel edit
  const cancel = () => {
    setEditingKey("");
  };
  // cancel edit || assign end
  //Save Edit start
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...filteredData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setFilteredData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setFilteredData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Saved Successfully!",
    });
  };
  //Save edit end
  //delete course
  const deleteCourse = (record) => {
    const index = originData.indexOf(record);
    originData.splice(index, 1);
    setFilteredData([...originData]);
  };
  //table columns data

  const columns = [
    {
      title: "Teacher Name",
      dataIndex: "teacherName",
      width: "21%",
      editable: true,
      Assignable: true,
    },
    {
      title: "courses Id",
      dataIndex: "coursesId",
      width: "14%",
      editable: true,
      Assignable: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      width: "12%",
      editable: true,
      Assignable: true,
    },
    {
      title: "Competitional Level",
      dataIndex: "competitionalLevel",
      width: "20%",
      editable: true,
      Assignable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "18%",
      editable: true,
      Assignable: true,
    },
    {
      width: "15%",
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
                deleteCourse(record);
              }}>
              <a>Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //table columns end

  //columns merge start

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

  // columns merge end

  // const [expandable, setExpandable] = useState(true);

  const onFinish = (values) => {
    // console.log(values);
    const coursesId = [];
    Object.entries(values).forEach(([key, value]) => {
      console.log(key, value);
      if (key.slice(1) === "Courses") {
        coursesId.push(<p>{value}</p>);
      }
    });
    const grades = values.grade.map((grade) => {
      return <p>{grade}</p>;
    });
    originData.unshift({
      key: Math.random(),
      teacherName: `${values.teacherName}`,
      grade: grades,
      coursesId: coursesId,
      competitionalLevel: values.competitionalLevel,
      status: `Not Assigned`,
    });
    success();
    // // console.log("Finish:", values, coursesIdValue);
    setFilteredData([...originData]);
  };
  const onGradeSelectChange = (value) => {
    const coursesForGrade = [];
    for (let i = 0; i < value.length; i++) {
      coursesForGrade.push(
        <Form.Item
          label={`${value[i]} Courses`}
          style={{ minWidth: 250, textAlign: "left", marginTop: -20 }}
          name={`${value[i].slice(-1)}Courses`}
          rules={[
            {
              required: true,
              message: "Please select Courses!",
            },
          ]}>
          <Select
            mode="multiple"
            allowClear
            style={{ marginTop: -25 }}
            onSelect={(values) => {
              console.log(values);
            }}
            placeholder="Select Courses">
            <Option value={`MathG${value[i].slice(-1)}`}>Mathemathics</Option>
            <Option value={`EnglG${value[i].slice(-1)}`}>English</Option>
            <Option value={`ChemG${value[i].slice(-1)}`}>Chemistry</Option>
            <Option value={`BiolG${value[i].slice(-1)}`}>Biology</Option>
            <Option value={`PhysG${value[i].slice(-1)}`}>Physics</Option>
            <Option value={`HistG${value[i].slice(-1)}`}>Hisory</Option>
            <Option value={`OtheG${value[i].slice(-1)}`}>Other</Option>
          </Select>
        </Form.Item>
      );
    }
    setCoursesForGradeRender([...coursesForGrade]);
  };
  const onLevelSelectChange = (value) => {
    const data = [];
    if (value === "Level 1-4") {
      setOnLevelRender(
        <>
          <Option value="Grade 1">Grade 1</Option>
          <Option value="Grade 2">Grade 2</Option>
          <Option value="Grade 3">Grade 3</Option>
          <Option value="Grade 4">Grade 4</Option>
        </>
      );
    } else if (value === "Level 5-8") {
      setOnLevelRender(
        <>
          <Option value="Grade 5">Grade 5</Option>
          <Option value="Grade 6">Grade 6</Option>
          <Option value="Grade 7">Grade 7</Option>
          <Option value="Grade 8">Grade 8</Option>
        </>
      );
    } else if (value === "Level 9-10") {
      setOnLevelRender(
        <>
          <Option value="Grade 9">Grade 9</Option>
          <Option value="Grade 10">Grade 10</Option>
        </>
      );
    } else if (value === "Level 11-12") {
      setOnLevelRender(
        <>
          <Option value="Grade 11">Grade 11</Option>
          <Option value="Grade 12">Grade 12</Option>
        </>
      );
    }
  };
  const onteacherNameChange = (e) => {
    const teacherName = e.target.value;
    setteacherNameForId(() => {
      return teacherName.substring(0, 4).toUpperCase();
    });
    setcoursesIdValue(() => {
      return teacherName.substring(0, 4).toUpperCase();
    });
  };

  const onSearch = (values) => {
    let searchText = values;
    let teacherName = filteredData.map((name) => {
      return name.teacherName;
    });
    let grade = filteredData.map((grade) => {
      return grade.grade;
    });

    const courseListByName = originData.filter((list, i) => {
      return searchText.toLowerCase() ===
        teacherName[i].substring(0, searchText.length).toLowerCase()
        ? list
        : "";
    });

    const courseListByGrade = originData.filter((list, i) => {
      return searchText.toLowerCase() ===
        grade[i].substring(0, searchText.length).toLowerCase()
        ? list
        : "";
    });

    if (courseListByName.length !== 0) {
      setFilteredData(courseListByName);
    } else if (courseListByGrade.length !== 0) {
      setFilteredData(courseListByGrade);
    } else {
      setFilteredData("");
    }
  };

  const onSearchChange = (e) => {
    if (e.target.value.length === 0) setFilteredData(originData);
  };
  return (
    <div className="CourseListCSS">
      {contextHolder}
      <div className="CourseAddContainer">
        <div className="CourseAddTitle">
          <Title level={3} style={{ textAlign: "left", marginBottom: 10 }}>
            Add Teacher
          </Title>
        </div>
        <Form
          style={{ justifyContent: "left", marginTop: 17 }}
          form={addForm}
          name="horizontal_login"
          layout="vertical"
          onFinish={onFinish}>
          <Form.Item
            label="Teacher Name"
            style={{ minWidth: 250 }}
            name="teacherName"
            rules={[
              {
                required: true,
                message: "Please input Teacher name!",
              },
            ]}>
            <Input
              style={{ marginTop: -25 }}
              onChange={onteacherNameChange}
              type="text"
              placeholder="Teacher Name"
            />
          </Form.Item>
          <Form.Item
            name="competitionalLevel"
            label="Competitional Level"
            style={{ minWidth: 250, textAlign: "left", marginTop: -20 }}
            rules={[
              {
                required: true,
                message: "Please input Teacher name!",
              },
            ]}>
            <Select
              style={{ marginTop: -25 }}
              onChange={onLevelSelectChange}
              placeholder="Select Grade">
              <Option value="Level 1-4">Level 1-4</Option>
              <Option value="Level 5-8">Level 5-8</Option>
              <Option value="Level 9-10">Level 9-10</Option>
              <Option value="Level 11-12">Level 11-12</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Grade"
            style={{ minWidth: 250, textAlign: "left", marginTop: -20 }}
            name="grade"
            rules={[
              {
                required: true,
                message: "Please select grade!",
              },
            ]}>
            <Select
              mode="multiple"
              allowClear
              style={{ marginTop: -25 }}
              onChange={onGradeSelectChange}
              placeholder="Select Grade">
              {onLevelRender}
            </Select>
          </Form.Item>
          {coursesForGradeRender}
          <Form.Item
            label="Status"
            style={{ minWidth: 250, marginTop: -20 }}
            name="status"
            rules={[
              {
                required: false,
                message: "Please input coursesId!",
              },
            ]}>
            <div
              style={{
                border: "1px solid #AAE3E2",
                height: "33px",
                borderRadius: "6px",
                textAlign: "left",
                paddingTop: "4px",
                paddingLeft: "10px",
                marginTop: -10,
              }}
              // readOnly
              // defaultValue=
              // type="text"
              // placeholder="Course Id"
            >
              <strong>Not Assigned</strong>
            </div>
          </Form.Item>

          <div className="coursesIdaveButton">
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  style={{ minWidth: 100, marginTop: 5 }}
                  type="primary"
                  htmlType="submit">
                  Save
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="CourseListContainer">
        <div className="CourseListTitle">
          <Title level={3} style={{ textAlign: "left", marginBottom: 10 }}>
            Teacher List
          </Title>
          <div
            style={{
              display: "flex",
              textAlign: "left",
              marginBottom: 5,
              marginTop: 27,
            }}>
            <Search
              style={{ marginLeft: "30%" }}
              placeholder="input search text"
              onSearch={onSearch}
              onChange={onSearchChange}
              // onChange=
              enterButton
            />
            <Button
              onClick={() => {
                navigate("/assignTeacher");
              }}
              type="primary"
              style={{ marginLeft: 5 }}>
              Assign Teacher
            </Button>
          </div>
        </div>
        <div className="CourseListTable">
          <div>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={filteredData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeacherList;
