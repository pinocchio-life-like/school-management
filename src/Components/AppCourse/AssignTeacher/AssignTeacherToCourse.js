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
  Checkbox,
  Row,
  Col,
} from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import "./AssignTeacherToCourse.css";
const { Search } = Input;
const { Option } = Select;

const originData = [
  {
    key: Math.random(),
    teacherName: `Alemu Abera`,
    grade: (
      <>
        <ul>
          <li style={{ marginLeft: -20, display: "inline" }}>Grade 7</li>
          <li>Mathemathics A B C</li>
          <li>English A C</li>
          <li style={{ marginLeft: -20, display: "inline" }}>Grade 8</li>
          <li>Mathemathics A</li>
          <li>Chemistry A C</li>
        </ul>
      </>
    ),
    assigned: "Assigned",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    teacherName: `Abebe Tafese`,
    grade: (
      <>
        <ul>
          <li style={{ marginLeft: -20, display: "inline" }}>Grade 7</li>
          <li>Mathemathics A B C</li>
          <li>English A C</li>
          <li style={{ marginLeft: -20, display: "inline" }}>Grade 8</li>
          <li>Mathemathics A</li>
          <li>English A C</li>
        </ul>
      </>
    ),
    assigned: "Assigned",
  },
  {
    key: Math.random(),
    teacherName: `Alemu Shega`,
    grade: (
      <>
        <ul>
          <li style={{ marginLeft: -20, display: "inline" }}>Grade 2</li>
          <li>English</li>
        </ul>
      </>
    ),
    assigned: "Not Assigned",
  },
  {
    key: Math.random(),
    teacherName: `Shafi Ahmed`,
    grade: (
      <>
        <ul>
          <li style={{ marginLeft: -20, display: "inline" }}>Grade 2</li>
          <li>English</li>
        </ul>
      </>
    ),
    assigned: "Not Assigned",
  },
  {
    key: Math.random(),
    teacherName: `Gemeda Tola`,
    grade: (
      <>
        <ul>
          <li style={{ marginLeft: -20, display: "inline" }}>Grade 2</li>
          <li>English</li>
        </ul>
      </>
    ),
    assigned: "Not Assigned",
  },
  {
    key: Math.random(),
    teacherName: `Abebe Mola`,
    grade: (
      <>
        <ul>
          <li style={{ marginLeft: -20, display: "inline" }}>Grade 2</li>
          <li>English</li>
        </ul>
      </>
    ),
    assigned: "Not Assigned",
  },
];

// Editable Cell

const AssignTeacherToCourse = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [editing, setEditing] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [assigningKey, setAssigningKey] = useState("");
  const [containerCss, setContainerCss] = useState("FullTableContainerCss");
  const isEditing = (record) => record.key === editingKey;
  const [messageApi, contextHolder] = message.useMessage();
  const isAssigning = (record) => record.key === assigningKey;
  const [sectionsForEachGrade, setSectionsForEachGrade] = useState([]);
  const [tableData, setTableData] = useState(originData);

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
      title: "Grade, Course And Section",
      dataIndex: "grade",
      width: "35%",
      editable: true,
      Assignable: true,
    },
    {
      title: "Status",
      dataIndex: "assigned",
      width: "15%",
      editable: true,
      Assignable: true,
    },
    {
      width: "25%",
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Typography.Link
              disabled={editing}
              // disabled={editingKey !== ""}
              onClick={() => {
                setEditing(true);
                setContainerCss("OnAssignTeacherContainer");
                const listLength =
                  record.grade.props.children.props.children.length;
                const grade = [],
                  course = [],
                  section = [];
                let singleGrade;
                const courseForGrade = [];
                for (let i = 0; i < listLength; i++) {
                  if (
                    record.grade.props.children.props.children[i].props.style
                  ) {
                    singleGrade =
                      record.grade.props.children.props.children[i].props
                        .children;
                    grade.push(
                      record.grade.props.children.props.children[i].props
                        .children
                    );
                  } else if (
                    !record.grade.props.children.props.children[i].props.style
                  ) {
                    let courseAndSection =
                      record.grade.props.children.props.children[i].props
                        .children;
                    let courses = courseAndSection.split(" ");
                    let sections = courses.filter((course) => {
                      return course !== courses[0];
                    });
                    course.push(courses[0]);
                    section.push(sections);
                    courseForGrade.push({
                      grade: singleGrade,
                      course: courses[0],
                      sections: sections,
                    });
                  }
                }
                const courseDefaultValue = [];
                const GradeCourseSection = [];
                const gradeDefaultValue = [];
                for (let i = 0; i < grade.length; i++) {
                  const courseForGradeInOne = [];
                  const insideCourses = [];
                  for (let j = 0; j < courseForGrade.length; j++) {
                    if (grade[i] === courseForGrade[j].grade) {
                      insideCourses.push(courseForGrade[j].course);
                      courseForGradeInOne.push({
                        courses: courseForGrade[j].course,
                        sections: courseForGrade[j].sections,
                      });
                    }
                  }
                  courseDefaultValue.push(insideCourses);
                  GradeCourseSection.push({
                    grade: grade[i],
                    courses: courseForGradeInOne,
                  });
                }
                gradeDefaultValue.push(
                  <Form.Item
                    initialValue={grade}
                    label="Grade"
                    style={{
                      minWidth: 200,
                      textAlign: "left",
                      marginTop: -20,
                    }}
                    name={`grade`}>
                    <Select
                      disabled
                      mode="multiple"
                      style={{ marginTop: -25 }}
                      onChange={onGradeSelectChange}
                      placeholder="Select Grade">
                      <Option value="Grade 1">Grade 1</Option>
                      <Option value="Grade 2">Grade 2</Option>
                      <Option value="Grade 3">Grade 3</Option>
                      <Option value="Grade 4">Grade 4</Option>
                      <Option value="Grade 5">Grade 5</Option>
                      <Option value="Grade 6">Grade 6</Option>
                      <Option value="Grade 7">Grade 7</Option>
                      <Option value="Grade 8">Grade 8</Option>
                    </Select>
                  </Form.Item>
                );
                const gradeRender = [];
                for (let i = 0; i < GradeCourseSection.length; i++) {
                  const courseRender = [];
                  for (
                    let j = 0;
                    j < GradeCourseSection[i].courses.length;
                    j++
                  ) {
                    const checkedSections = [];
                    for (
                      let k = 0;
                      k < GradeCourseSection[i].courses[j].sections.length;
                      k++
                    ) {
                      checkedSections.push(
                        GradeCourseSection[i].courses[j].sections[k]
                      );
                      // console.log("here");
                    }
                    // console.log(checkedSections);

                    courseRender.push(
                      <Form.Item
                        initialValue={checkedSections}
                        label={`${GradeCourseSection[i].grade} ${GradeCourseSection[i].courses[j].courses} Sections`}
                        style={{
                          minWidth: 200,
                          textAlign: "left",
                          marginTop: -20,
                        }}
                        name={`${GradeCourseSection[i].grade.substring(6, 7)}${
                          GradeCourseSection[i].courses[j].courses
                        }Sections`}>
                        <Checkbox.Group
                          style={{
                            width: "100%",
                            marginTop: -10,
                          }}
                          onChange={onChangeCheckBox}>
                          <Col>
                            <Row>
                              <Checkbox value="A">A</Checkbox>
                              <Checkbox value="B">B</Checkbox>
                              <Checkbox value="C">C</Checkbox>
                            </Row>
                          </Col>
                        </Checkbox.Group>
                      </Form.Item>
                    );
                  }
                  gradeRender.push(
                    <>
                      <Form.Item
                        initialValue={courseDefaultValue[i]}
                        label={`${GradeCourseSection[i].grade} Courses`}
                        style={{
                          minWidth: 200,
                          textAlign: "left",
                          marginTop: -20,
                        }}
                        name={`${GradeCourseSection[i].grade.substring(
                          6,
                          7
                        )}Courses`}>
                        <Select
                          disabled
                          mode="multiple"
                          allowClear
                          style={{ marginTop: -25 }}
                          onChange={onCourseSelectChange}
                          placeholder="Select Courses">
                          <Option value="Mathemathics">Mathemathics</Option>
                          <Option value="English">English</Option>
                          <Option value="Chemistry">Chemistry</Option>
                          <Option value="Biology">Biology</Option>
                          <Option value="Physics">Physics</Option>
                        </Select>
                      </Form.Item>
                      {courseRender}
                    </>
                  );
                }

                const wholeFormRender = [];
                wholeFormRender.push(
                  <Form
                    style={{ justifyContent: "left", marginTop: 17 }}
                    form={addForm}
                    name="horizontal_login"
                    layout="vertical"
                    onFinish={(values) => {
                      // console.log(values);
                      const list = [];
                      Object.entries(values).forEach(([key, value]) => {
                        if (key === "grade") {
                          for (let i = 0; i < grade.length; i++) {
                            let gradeString = "";
                            gradeString = `${gradeString}`.concat(
                              `${grade[i]} `
                            );
                            list.push(
                              <li
                                style={{ marginLeft: -20, display: "inline" }}>
                                {gradeString}
                              </li>
                            );
                            // console.log(gradeString);
                            Object.entries(values).forEach(([key, value]) => {
                              if (
                                key.slice(-8) === "Sections" &&
                                key.slice(0, 1) === `${grade[i]}`.slice(-1)
                              ) {
                                let sectionString = "";
                                for (let i = 0; i < value.length; i++) {
                                  sectionString = `${sectionString} `.concat(
                                    `${value[i]}`
                                  );
                                }
                                let otherList = `${key
                                  .slice(1)
                                  .slice(0, -8)}${sectionString}`;
                                list.push(<li>{otherList}</li>);
                              }
                            });
                          }
                        }
                      });
                      const indexValue = tableData.indexOf(record);
                      // console.log(indexValue);
                      tableData.splice(indexValue, 1, {
                        key: Math.random(),
                        teacherName: values.teacherName,
                        grade: (
                          <>
                            <ul>{list}</ul>
                          </>
                        ),
                        assigned: "Assigned",
                      });
                      // console.log(originData);
                      setTableData([...originData]);
                      setEditing(false);
                      setContainerCss("FullTableContainerCss");
                    }}>
                    <Form.Item
                      initialValue={record.teacherName}
                      label="Teacher Name"
                      style={{ minWidth: 200 }}
                      name={`teacherName`}>
                      <Input
                        style={{ marginTop: -25 }}
                        // onChange={onCourseNameChange}
                        type="text"
                        placeholder="Course Name"
                      />
                    </Form.Item>
                    {gradeDefaultValue}

                    {gradeRender}
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
                );
                setSectionsForEachGrade(wholeFormRender);
                // grade.length = 0;
                addForm.resetFields();
              }}>
              Assign | Edit
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
      }),
    };
  });
  //on Grade Select Change
  const onGradeSelectChange = (value) => {
    console.log(value);
  };
  const onCourseSelectChange = (value) => {
    console.log(value);
  };
  //on Change Checkbox
  const onChangeCheckBox = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  //Delete handler
  const deleteCourse = (record) => {
    const indexValue = tableData.indexOf(record);
    tableData.splice(indexValue, 1);
    setTableData([...tableData]);
  };

  return (
    <>
      <div className={containerCss}>
        <div className="AssignTeacherTitle" style={{ marginBottom: 15 }}>
          <Title
            level={3}
            style={{ textAlign: "left", marginLeft: 5, marginTop: 10 }}>
            Teachers List
          </Title>
        </div>
        <div
          className="CourseListTitleAndSearchBar"
          style={{ marginBottom: 15 }}>
          <div className="CourseGroupSearchBar">
            <div
              style={{
                display: "flex",
                textAlign: "left",
                marginBottom: 0,
                marginTop: 10,
                marginRight: 5,
              }}>
              <Search
                style={{ marginLeft: "30%" }}
                placeholder="input search text"
                //   onSearch={onSearch}
                // onChange={onSearchChange}
                // onChange=
                enterButton
              />
            </div>
          </div>
        </div>
        {editing ? (
          <>
            <div className="AssignTeacherForm">{sectionsForEachGrade}</div>
            <div className="OnAssignTeacherTable">
              <Table
                style={{ marginTop: 15 }}
                //   bordered
                dataSource={tableData}
                columns={mergedColumns}
                rowClassName="editable-row"
                // pagination={{
                //   onChange: deleteCourseGroup,
                // }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="FullTableCss">
              <Form form={form} component={false}>
                <Table
                  style={{ marginTop: 15 }}
                  //   bordered
                  dataSource={tableData}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  // pagination={{
                  //   onChange: deleteCourseGroup,
                  // }}
                />
              </Form>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default AssignTeacherToCourse;
