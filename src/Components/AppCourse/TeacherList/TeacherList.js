import { useNavigate } from "react-router-dom";
import {
  Button,
  Space,
  Table,
  Input,
  Form,
  Select,
  Popconfirm,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
// import { EditFilled, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./TeacherList.css";
// import coursesIdearchForm from "./coursesIdearchForm/coursesIdearchForm";
const { Search } = Input;
const { Option } = Select;

let originData = [];
let courseData = [];

const TeacherList = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [addForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [filteredData, setFilteredData] = useState(originData);
  const [coursesForGradeRender, setCoursesForGradeRender] = useState([]);
  const [onLevelRender, setOnLevelRender] = useState([]);
  // const [onEditRender, setOnEditRender] = useState();
  const [refresher, setRefresher] = useState(1);

  useEffect(() => {
    const getClasses = async () => {
      const response = await fetch("http://localhost:8080/teacher/teacherList");
      const responseData = await response.json();

      const courseResponse = await fetch(
        "http://localhost:8080/course/courseBreakDown"
      );
      const coursesData = await courseResponse.json();
      courseData = coursesData.courses;

      const data = [];
      for (let i = 0; i < responseData.teachers.length; i++) {
        let grade = [];
        for (let j = 0; j < responseData.teachers[i].grade.length; j++) {
          grade.push(
            <p key={Math.random()}>{responseData.teachers[i].grade[j]}</p>
          );
        }
        let coursesId = [];
        for (let j = 0; j < responseData.teachers[i].coursesId.length; j++) {
          for (
            let k = 0;
            k < responseData.teachers[i].coursesId[j].length;
            k++
          ) {
            coursesId.push(
              <p style={{ margin: 0 }} key={Math.random()}>
                {responseData.teachers[i].coursesId[j][k]}
              </p>
            );
          }
          // console.log(responseData.teachers[i].coursesId[i]);
        }
        data.push({
          key: responseData.teachers[i].teacherId,
          teacherName: responseData.teachers[i].teacherName,
          grade: <>{grade}</>,
          coursesId: <>{coursesId}</>,
          competitionalLevel: responseData.teachers[i].competitionalLevel,
          status: responseData.teachers[i].status,
        });
      }

      originData = data.map((data) => data);
      setFilteredData([...originData]);
    };
    getClasses();
  }, [filteredData]);
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
  //Save edit end
  //delete course
  const deleteTeacher = async (record) => {
    const index = originData.indexOf(record);
    originData.splice(index, 1);

    try {
      const response = await fetch(
        `http://localhost:8080/teacher/teacherList/${record.key}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      if (responseData.code === 404) {
        throw new Error("Couldnt delete, check your internet");
      }
      success("Deleted Successfully");
      setFilteredData([...originData]);
    } catch (err) {
      error("Couldn't delete Check your internet");
    }
  };
  //table columns data

  //on form render if editing
  // const onFormRender = (key) => {
  //   let teacherName;
  //   let competitionalLevel;
  //   let grade;
  //   let coursesId;
  //   let status;
  //   for (let i = 0; i < originData.length; i++) {
  //     if (originData[i].key === key) {
  //       teacherName = originData[i].teacherName;
  //       competitionalLevel = originData[i].competitionalLevel;

  //       const jsxExpr = originData[i].grade;
  //       const tempEl = document.createElement("div");
  //       tempEl.innerHTML = ReactDOMServer.renderToString(jsxExpr); // convert JSX to string
  //       const pTags = tempEl.getElementsByTagName("p"); // get <p> tags
  //       const gradesArr = Array.from(pTags).map((tag) =>
  //         tag.textContent.trim()
  //       ); // get text content of each <p> tag // should print ['Grade 7', 'Grade 8']
  //       grade = gradesArr;
  //       const jsxExpre = originData[i].coursesId;
  //       const tempEle = document.createElement("div");
  //       tempEle.innerHTML = ReactDOMServer.renderToString(jsxExpre); // set the JSX expression as innerHTML
  //       const pTagss = tempEle.getElementsByTagName("p"); // get <p> tags
  //       const coursesArr = Array.from(pTagss).map((tag) =>
  //         tag.textContent.trim()
  //       ); // get text content of each <p> tag
  //       coursesId = coursesArr;

  //       const coursesForGrade = [];
  //       const value = grade;
  //       for (let i = 0; i < value.length; i++) {
  //         const gradeCourses = [];
  //         for (let j = 0; j < coursesId.length; j++) {
  //           if (value[i].slice(6) === coursesId[j].slice(5)) {
  //             gradeCourses.push(coursesId[j]);
  //           }
  //         }
  //         const options = [];
  //         for (let l = 0; l < courseData.length; l++) {
  //           if (value[i] === courseData[l].grade) {
  //             options.push(
  //               <Option value={`${courseData[l].courseId}`}>
  //                 {courseData[l].courseName}
  //               </Option>
  //             );
  //           }
  //         }

  //         coursesForGrade.push(
  //           <Form.Item
  //             initialValue={gradeCourses}
  //             label={`${value[i]} Courses`}
  //             style={{ minWidth: 250, textAlign: "left", marginTop: -20 }}
  //             name={`${value[i].slice(-1)}Courses`}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Please select Courses!",
  //               },
  //             ]}>
  //             <Select
  //               // disabled
  //               mode="multiple"
  //               allowClear
  //               style={{ marginTop: -25 }}
  //               onSelect={(values) => {
  //                 console.log(values);
  //               }}
  //               placeholder="Select Courses">
  //               {options}
  //             </Select>
  //           </Form.Item>
  //         );
  //       }
  //       // setCoursesForGradeRender(coursesForGrade);

  //       status = originData[i].status;

  //       const wholeFormRender = [];

  //       wholeFormRender.push(
  //         <Form
  //           style={{ justifyContent: "left", marginTop: 17 }}
  //           form={editForm}
  //           name="horizontal_login"
  //           layout="vertical"
  //           onFinish={onEditFinish}>
  //           <Form.Item
  //             initialValue={teacherName}
  //             label="Teacher Name"
  //             style={{ minWidth: 250 }}
  //             name="teacherName"
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Please input Teacher name!",
  //               },
  //             ]}>
  //             <Input
  //               style={{ marginTop: -25 }}
  //               type="text"
  //               placeholder="Teacher Name"
  //             />
  //           </Form.Item>
  //           <Form.Item
  //             initialValue={competitionalLevel}
  //             name="competitionalLevel"
  //             label="Competitional Level"
  //             style={{ minWidth: 250, textAlign: "left", marginTop: -20 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Please input Teacher name!",
  //               },
  //             ]}>
  //             <Select
  //               disabled
  //               style={{ marginTop: -25 }}
  //               onChange={onLevelSelectChange}
  //               placeholder="Select Grade">
  //               <Option value="Level 1-4">Level 1-4</Option>
  //               <Option value="Level 5-8">Level 5-8</Option>
  //             </Select>
  //           </Form.Item>
  //           <Form.Item
  //             initialValue={grade}
  //             label="Grade"
  //             style={{ minWidth: 320, textAlign: "left", marginTop: -20 }}
  //             name="grade"
  //             rules={[
  //               {
  //                 required: true,
  //                 message: "Please select grade!",
  //               },
  //             ]}>
  //             <Select
  //               disabled
  //               mode="multiple"
  //               allowClear
  //               style={{ marginTop: -25 }}
  //               onChange={onGradeSelectChange}
  //               placeholder="Select Grade">
  //               {competitionalLevel === "Level 1-4" ? (
  //                 <>
  //                   <Option value="Grade 1">Grade 1</Option>
  //                   <Option value="Grade 2">Grade 2</Option>
  //                   <Option value="Grade 3">Grade 3</Option>
  //                   <Option value="Grade 4">Grade 4</Option>
  //                 </>
  //               ) : (
  //                 <>
  //                   <Option value="Grade 5">Grade 5</Option>
  //                   <Option value="Grade 6">Grade 6</Option>
  //                   <Option value="Grade 7">Grade 7</Option>
  //                   <Option value="Grade 8">Grade 8</Option>
  //                 </>
  //               )}
  //             </Select>
  //           </Form.Item>
  //           {coursesForGrade}
  //           <Form.Item
  //             initialValue={status}
  //             label="Status"
  //             style={{ minWidth: 250, marginTop: -20 }}
  //             name="status"
  //             rules={[
  //               {
  //                 required: false,
  //                 message: "Please input coursesId!",
  //               },
  //             ]}>
  //             <div
  //               style={{
  //                 border: "1px solid #AAE3E2",
  //                 height: "33px",
  //                 borderRadius: "6px",
  //                 textAlign: "left",
  //                 paddingTop: "4px",
  //                 paddingLeft: "10px",
  //                 marginTop: -10,
  //               }}>
  //               <strong>Not Assigned</strong>
  //             </div>
  //           </Form.Item>
  //           <div className="coursesIdaveButton">
  //             <Form.Item shouldUpdate>
  //               {() => (
  //                 <Button
  //                   style={{ minWidth: 100, marginTop: 5 }}
  //                   type="primary"
  //                   htmlType="submit">
  //                   Save
  //                 </Button>
  //               )}
  //             </Form.Item>
  //           </div>
  //         </Form>
  //       );
  //       setOnEditRender(wholeFormRender);
  //     }
  //   }
  // };

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
        return (
          <Space size="middle">
            {/* <Typography.Link
              // disabled={editingKey !== ""}
              onClick={() => {
                setOnEditRender();
                localStorage.setItem("key", `${record.key}`);
                editForm.resetFields();
                setEditingKey(record.key);
                onFormRender(record.key);
              }}>
              Edit
            </Typography.Link> */}
            <Popconfirm
              title="Sure want to delete?"
              onConfirm={() => {
                deleteTeacher(record);
              }}>
              <a>Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    const coursesId = [];
    const normalID = [];
    Object.entries(values).forEach(([key, value]) => {
      console.log(key, value);
      if (key.slice(1) === "Courses") {
        coursesId.push(<p>{value}</p>);
        normalID.push(value);
      }
    });
    const grades = values.grade.map((grade) => {
      return <p>{grade}</p>;
    });
    let length = originData.length;

    try {
      const teacherId = `${values.teacherName.split(" ")[0]}0${length}`;
      const addedData = {
        key: teacherId,
        teacherName: `${values.teacherName}`,
        teacherId: teacherId,
        grade: grades,
        coursesId: coursesId,
        competitionalLevel: values.competitionalLevel,
        status: `Not Assigned`,
      };
      originData.unshift(addedData);

      const response = await fetch(
        "http://localhost:8080/teacher/teacherList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: teacherId,
            teacherName: `${values.teacherName}`,
            teacherId: teacherId,
            grade: values.grade,
            coursesId: normalID,
            competitionalLevel: values.competitionalLevel,
            status: `Not Assigned`,
            assignedTo: [[]],
          }),
        }
      );
      setFilteredData([...originData]);
      success("Teacher Successfully Added");
      addForm.resetFields();
    } catch (err) {
      error("Check your Intenet and try Again");
    }
    // // console.log("Finish:", values, coursesIdValue);
  };
  // const onEditFinish = async (values) => {
  //   const coursesId = [];
  //   Object.entries(values).forEach(([key, value]) => {
  //     console.log(key, value);
  //     if (key.slice(1) === "Courses") {
  //       coursesId.push(<p>{value}</p>);
  //     }
  //   });
  //   const grades = values.grade.map((grade) => {
  //     return <p>{grade}</p>;
  //   });
  //   let index;
  //   for (let i = 0; i < originData.length; i++) {
  //     if (originData[i].key === editingKey) {
  //       index = i;
  //     }
  //   }
  //   const courses = [];
  //   for (let k = 0; k < coursesId.length; k++) {
  //     // console.log(coursesId[k]);
  //     for (let i = 0; i < coursesId[k].props.children.length; i++) {
  //       courses.push(
  //         <p style={{ margin: 0 }}>{coursesId[k].props.children[i]}</p>
  //       );
  //     }
  //   }
  //   const key = localStorage.getItem("key");
  //   console.log(courses);
  //   originData.splice(index, 1, {
  //     key: key,
  //     teacherName: `${values.teacherName}`,
  //     grade: grades,
  //     coursesId: courses,
  //     competitionalLevel: values.competitionalLevel,
  //     status: `Not Assigned`,
  //   });
  //   success("Teacher Editted Successfully");
  //   // console.log("Finish:", values, coursesIdValue);
  //   setFilteredData([...originData]);
  //   editForm.resetFields();
  //   setOnEditRender();
  //   setEditingKey("");
  //   setCoursesForGradeRender();
  //   setOnLevelRender();
  //   setOnEditRender();
  //   setRefresher((prev) => prev++);
  // };
  const onGradeSelectChange = (value) => {
    console.log(courseData);
    const coursesForGrade = [];
    for (let i = 0; i < value.length; i++) {
      const options = [];
      for (let j = 0; j < courseData.length; j++) {
        if (value[i] === courseData[j].grade) {
          options.push(
            <Option value={`${courseData[j].courseId}`}>
              {courseData[j].courseName}
            </Option>
          );
        }
      }
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
            {options}
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
    }
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
    refresher && (
      <div className="CourseListCSS">
        {contextHolder}
        <div className="CourseAddContainer">
          <div className="CourseAddTitle">
            <Title level={3} style={{ textAlign: "left", marginBottom: 10 }}>
              Add Teacher
            </Title>
          </div>
          {/* {editingKey !== "" ? (
            onEditRender
          ) : ( */}
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
              </Select>
            </Form.Item>
            <Form.Item
              label="Grade"
              style={{ minWidth: 320, textAlign: "left", marginTop: -20 }}
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
                }}>
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
          {/* )} */}
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
                marginTop: 18,
              }}>
              <Search
                style={{ marginLeft: "46.9%" }}
                placeholder="input search text"
                onSearch={onSearch}
                onChange={onSearchChange}
                // onChange=
                // enterButton
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
                  bordered
                  dataSource={filteredData}
                  columns={columns}
                  rowClassName="editable-row"
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default TeacherList;
