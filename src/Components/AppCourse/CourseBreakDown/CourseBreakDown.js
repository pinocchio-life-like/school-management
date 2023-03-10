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
import "./CourseBreakDown.css";
// import CourseSearchForm from "./CourseSearchForm/CourseSearchForm";
const { Search } = Input;
const { Option } = Select;

const originData = [
  {
    key: Math.random(),
    courseName: `Mathemathics`,
    grade: "Grade 1",
    courseId: "Math1",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `English`,
    grade: "Grade 1",
    courseId: "Engl1",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `Chemistry`,
    grade: "Grade 7",
    courseId: "Chem7",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `English`,
    grade: "Grade 5",
    courseId: "Engl5",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `Biology`,
    grade: "Grade 7",
    courseId: "Biol7",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `Chemistry `,
    grade: "Grade 8",
    courseId: "ChemG8",
    teacher: `Not Assigned`,
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
            <Select placeholder="Select Teacher">
              <Option value="Grade 1">Grade 1</Option>
              <Option value="Grade 2">Grade 2</Option>
              <Option value="Grade 3">Grade 3</Option>
            </Select>
          ) : dataIndex === "teacher" ? (
            <Input readOnly />
          ) : dataIndex === "courseId" ? (
            <Input readOnly />
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

const CourseBreakDown = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [addForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [courseIdValue, setCourseIdValue] = useState("none");
  const [courseNameForId, setCourseNameForId] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const [messageApi, contextHolder] = message.useMessage();
  const [filteredData, setFilteredData] = useState(originData);

  // edit start start
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
      title: "Course Name",
      dataIndex: "courseName",
      width: "21%",
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
      title: "Course Id",
      dataIndex: "courseId",
      width: "14%",
      editable: true,
      Assignable: true,
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      width: "25%",
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
        inputType: col.dataIndex === "grade" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // columns merge end

  // const [expandable, setExpandable] = useState(true);

  const onFinish = (values) => {
    originData.push({
      key: Math.random(),
      courseName: `${values.courseName}`,
      grade: `${values.grade}`,
      courseId: `${courseIdValue}`,
      teacher: `Not Assigned`,
    });
    success();
    // console.log("Finish:", values, courseIdValue);
    setFilteredData([...originData]);
  };
  const onGradeSelectChange = (value) => {
    const gradeforId = value
      .substring(value.length - 1, value.length)
      .toUpperCase();
    setCourseIdValue(`${courseNameForId}G${gradeforId}`);
  };
  const onCourseNameChange = (e) => {
    const courseName = e.target.value;
    setCourseNameForId(() => {
      return courseName.substring(0, 4).toUpperCase();
    });
    setCourseIdValue(() => {
      return courseName.substring(0, 4).toUpperCase();
    });
  };

  const onSearch = (values) => {
    let searchText = values;
    let courseName = filteredData.map((name) => {
      return name.courseName;
    });
    let grade = filteredData.map((grade) => {
      return grade.grade;
    });

    const courseListByName = originData.filter((list, i) => {
      return searchText.toLowerCase() ===
        courseName[i].substring(0, searchText.length).toLowerCase()
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
            Add Course
          </Title>
        </div>
        <Form
          style={{ justifyContent: "left", marginTop: 17 }}
          form={addForm}
          name="horizontal_login"
          layout="vertical"
          onFinish={onFinish}>
          <Form.Item
            label="Course Name"
            style={{ minWidth: 250 }}
            name="courseName"
            rules={[
              {
                required: true,
                message: "Please input course name!",
              },
            ]}>
            <Input
              style={{ marginTop: -25 }}
              onChange={onCourseNameChange}
              type="text"
              placeholder="Course Name"
            />
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
              style={{ marginTop: -25 }}
              onSelect={onGradeSelectChange}
              placeholder="Select Grade">
              <Option value="Grade 1">Grade 1</Option>
              <Option value="Grade 2">Grade 2</Option>
              <Option value="Grade 3">Grade 3</Option>
              <Option value="Grade 4">Grade 4</Option>
              <Option value="Grade 5">Grade 5</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Course ID"
            style={{ minWidth: 250, marginTop: -20 }}
            name="courseId"
            rules={[
              {
                required: false,
                message: "Please input courseId!",
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
              <strong>{courseIdValue}</strong>
            </div>
          </Form.Item>

          <div className="CourseSaveButton">
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
            Course List
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
                navigate("/courseOffer");
              }}
              type="primary"
              style={{ marginLeft: 5 }}>
              Offer Courses
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
export default CourseBreakDown;
