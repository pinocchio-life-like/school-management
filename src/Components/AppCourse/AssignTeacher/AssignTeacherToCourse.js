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
import { useEffect, useState } from "react";
import "./AssignTeacherToCourse.css";
const { Search } = Input;
const { Option } = Select;

let originData = [];
let originalData = [];
let courseData = [];
let tableRecord = [];

// Editable Cell
const convertData = (data) => {
  console.log(data);
  let result = {
    key: data.key,
    teacherName: data.teacherName,
    grade: { props: { children: [] } },
    status: data.status,
  };
  // console.log(data);
  data.grade.forEach((grade, index) => {
    let gradeCourses = data.coursesId[index];
    // console.log(gradeCourses);
    let gradeSections = [];
    data.assignedTo.forEach((item) => {
      if (gradeCourses.includes(item.coursesId)) {
        gradeSections.push(...item.sections);
      }
    });
    result.grade.props.children.push(
      <li style={{ marginLeft: -20, display: "inline" }}>{grade}</li>
    );

    gradeCourses.forEach((course, courseIndex) => {
      let sections = [];
      gradeSections.forEach((item) => {
        if (item.coursesId === course) {
          sections.push(item.sections.join(" "));
        }
      });
      result.grade.props.children.push(
        <li>
          {course} {sections.join(", ")}
        </li>
      );
    });
  });
  return result;
};
const AssignTeacherToCourse = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [containerCss, setContainerCss] = useState("FullTableContainerCss");
  const [messageApi, contextHolder] = message.useMessage();
  const [sectionsForEachGrade, setSectionsForEachGrade] = useState([]);
  const [tableData, setTableData] = useState(originData);

  useEffect(() => {
    const getClasses = async () => {
      const response = await fetch("http://localhost:8080/teacher/teacherList");
      const responseData = await response.json();
      console.log(responseData.teachers);
      const courseResponse = await fetch(
        "http://localhost:8080/course/courseBreakDown"
      );
      const coursesData = await courseResponse.json();
      courseData = coursesData.courses;
      const data = [];
      const originaldata = [];
      for (let i = 0; i < responseData.teachers.length; i++) {
        let grade = [];
        let normalGrade = [];
        let insideCourse = [];
        for (let k = 0; k < responseData.teachers[i].coursesId.length; k++) {
          const course = [];
          for (let j = 0; j < courseData.length; j++) {
            // console.log(responseData.teachers[i].coursesId[k]);
            for (
              let l = 0;
              l < responseData.teachers[i].coursesId[k].length;
              l++
            ) {
              if (
                courseData[j].grade === responseData.teachers[i].grade[k] &&
                courseData[j].courseId ===
                  responseData.teachers[i].coursesId[k][l]
              ) {
                course.push(courseData[j].courseName);
              }
            }
          }
          insideCourse.push({
            coursesId: responseData.teachers[i].coursesId[k],
            grade: responseData.teachers[i].grade[k],
            courseName: course,
          });
        }
        // console.log(insideCourse);
        for (let j = 0; j < insideCourse.length; j++) {
          const courseName = [];
          const courseId = [];
          for (let l = 0; l < insideCourse[j].courseName.length; l++) {
            // console.log(insideCourse[j].courseName[l]);
            courseName.push(
              <li key={Math.random()}>{insideCourse[j].courseName[l]}</li>
            );
            courseId.push(insideCourse[j].coursesId[l]);
          }
          grade.push(
            <>
              <ul>
                <li
                  key={Math.random()}
                  style={{ marginLeft: -20, display: "inline" }}>
                  {insideCourse[j].grade}
                </li>
                {courseName}
              </ul>
            </>
          );
          normalGrade.push(insideCourse[j].grade);
        }

        let coursesId = [];
        let normalID = [];
        for (let j = 0; j < responseData.teachers[i].coursesId.length; j++) {
          coursesId.push(
            <p key={Math.random()}>{responseData.teachers[i].coursesId[j]}</p>
          );
          normalID.push(responseData.teachers[i].coursesId[j]);
        }
        const sectionsSet = responseData.teachers[i].assignedTo.map((obj) => ({
          [obj.coursesId]: obj.sections.join(", "),
        }));

        const listValues = sectionsSet.map((obj) => {
          return (
            <li key={Math.random()}>
              {Object.keys(obj)[0]} : {Object.values(obj)[0]}
            </li>
          );
        });

        data.push({
          key: responseData.teachers[i].teacherId,
          teacherName: responseData.teachers[i].teacherName,
          grade: grade,
          coursesId: <>{coursesId}</>,
          competitionalLevel: responseData.teachers[i].competitionalLevel,
          status: (
            <ul style={{ listStyleType: "none", padding: 0 }}>{listValues}</ul>
          ),
          assignedTo: responseData.teachers[i].assignedTo,
        });
        console.log(data);

        originaldata.push({
          key: responseData.teachers[i].teacherId,
          teacherName: responseData.teachers[i].teacherName,
          grade: normalGrade,
          coursesId: normalID,
          competitionalLevel: responseData.teachers[i].competitionalLevel,
          status: responseData.teachers[i].status,
          assignedTo: responseData.teachers[i].assignedTo,
        });
      }
      originalData = originaldata.map((data) => data);
      originData = data.map((data) => data);
      setTableData([...originData]);
    };
    getClasses();
  }, []);

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  //on Assingn Finish
  const onFinish = async (values) => {
    // console.log(values);
    const record = tableRecord;
    // console.log(record);
    let data = [];
    const coursesId = [];
    const assignedTo = [];
    data.teacherId = record.key;
    data.teacherName = record.teacherName;
    Object.entries(values).forEach(([key, value]) => {
      // console.log(key, value);
      if (String(key) === "grade") {
        data.grade = value;
      }
      if (String(key).slice(1) === "Courses") {
        coursesId.push(value);
      }
      if (String(key).slice(-8) === "Sections") {
        assignedTo.push({
          coursesId: `${String(key).slice(1, 7)}`,
          sections: value,
        });
        // data[`${String(key).slice(1, 7)}`] = value;
      }
    });
    data.coursesId = coursesId;
    data.assignedTo = assignedTo;
    const { competitionalLevel } = originalData.find((data) => {
      return data.key === record.key;
    });
    data.competitionalLevel = competitionalLevel;
    data.status =
      // data.assignedTo[0].sections.length > 0 ?
      "Assigned";
    // : "Not Assigned";
    // console.log(data);

    try {
      await fetch("http://localhost:8080/teacher/teacherList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherId: data.teacherId,
          teacherName: data.teacherName,
          competitionalLevel: data.competitionalLevel,
          grade: data.grade,
          status: data.status,
          coursesId: data.coursesId,
          assignedTo: data.assignedTo,
        }),
      });
      success("Teacher Successfully Assigned");
    } catch (err) {
      error("Check your Internet and try Again");
      return;
    }

    const sectionsSet = assignedTo.map((obj) => ({
      [obj.coursesId]: obj.sections.join(", "),
    }));

    const listValues = sectionsSet.map((obj) => {
      return (
        <li key={Math.random()}>
          {Object.keys(obj)[0]} : {Object.values(obj)[0]}
        </li>
      );
    });

    data.status = (
      <ul style={{ listStyleType: "none", padding: 0 }}>{listValues}</ul>
    );
    tableData.splice(tableData.indexOf(tableRecord), 1, data);
    setTableData([...tableData]);
    setEditing(false);
    setContainerCss("FullTableContainerCss");
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
      title: "Grade, Course And Section",
      dataIndex: "grade",
      width: "35%",
      editable: true,
      Assignable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      editable: true,
      Assignable: true,
    },
    {
      width: "15%",
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Typography.Link
              // disabled={editing}
              // disabled={editingKey !== ""}
              onClick={() => {
                tableRecord = record;
                const teacherNameRender = (
                  <Form.Item
                    initialValue={record.teacherName}
                    label="Teacher Name"
                    style={{ minWidth: 200 }}
                    name={`teacherName`}>
                    <Input
                      disabled
                      style={{ marginTop: -25 }}
                      // onChange={onCourseNameChange}
                      type="text"
                      placeholder="Course Name"
                    />
                  </Form.Item>
                );
                setEditing(true);
                setContainerCss("OnAssignTeacherContainer");
                const indexVal = originData.indexOf(record);
                let theData = convertData(originalData[indexVal]);
                let grade = theData.grade;

                const gradeValues = grade.props.children.map(
                  (child, index) => child.props.children
                );

                // console.log(gradeValues);
                let currentIndex = -1;
                const result = [];
                gradeValues.forEach((value) => {
                  if (String(value) && String(value).startsWith("Grade")) {
                    currentIndex++;
                    result[currentIndex] = { grade: value, courses: [] };
                  } else if (result[currentIndex]) {
                    // console.log(value);
                    let [course, ...sectionsString] = value;
                    let sections = sectionsString;
                    let courseObj = { course, sections };
                    result[currentIndex].courses.push(courseObj);
                  }
                });
                // console.log(result);

                const courseDefaultValue = [];
                const GradeCourseSection = [];
                const gradeDefaultValue = [];
                const grad = [];
                const options = [];
                for (let i = 0; i < result.length; i++) {
                  grad.push(result[i].grade);
                  const courseForGradeInOne = [];
                  const insideCourses = [];
                  for (let j = 0; j < result[i].courses.length; j++) {
                    for (let l = 0; l < courseData.length; l++) {
                      if (result[i].grade === courseData[l].grade) {
                        options.push({
                          courseName: courseData[l].courseName,
                          grade: result[i].grade,
                          courseId: courseData[l].courseId,
                        });
                      }
                    }
                    insideCourses.push(result[i].courses[j].course);
                    const { courseName } = courseData.find((data) => {
                      return result[i].courses[j].course === data.courseId;
                    });

                    courseForGradeInOne.push({
                      courses: result[i].courses[j].course,
                      sections: result[i].courses[j].sections,
                      courseName: courseName,
                    });
                  }
                  courseDefaultValue.push(insideCourses);
                  GradeCourseSection.push({
                    grade: result[i].grade,
                    courses: courseForGradeInOne,
                  });
                }

                gradeDefaultValue.push(
                  <Form.Item
                    initialValue={grad}
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
                // console.log("options", options);
                for (let i = 0; i < GradeCourseSection.length; i++) {
                  const courseRender = [];
                  const option = [];
                  for (let j = 0; j < options.length; j++) {
                    if (options[j].grade === GradeCourseSection[i].grade) {
                      option.push(
                        <Option value={`${options[j].courseId}`}>
                          {options[j].courseName}
                        </Option>
                      );
                    }
                  }
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
                        label={`${GradeCourseSection[i].grade} ${GradeCourseSection[i].courses[j].courseName} Sections`}
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
                  // console.log(option);
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
                          {option}
                        </Select>
                      </Form.Item>
                      {courseRender}
                    </>
                  );
                }

                const wholeFormRender = [];
                wholeFormRender.push(
                  <Form
                    style={{ justifyContent: "left", marginTop: -12 }}
                    form={addForm}
                    name="horizontal_login"
                    layout="vertical"
                    onFinish={onFinish}>
                    {teacherNameRender}
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
              Assign
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
    // console.log(value);
  };
  const onCourseSelectChange = (value) => {
    // console.log(value);
  };
  //on Change Checkbox
  const onChangeCheckBox = (checkedValues) => {
    // console.log("checked = ", checkedValues);
  };
  //Delete handler
  const deleteCourse = (record) => {
    const indexValue = tableData.indexOf(record);
    tableData.splice(indexValue, 1);
    setTableData([...tableData]);
  };

  return (
    <>
      {contextHolder}
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
