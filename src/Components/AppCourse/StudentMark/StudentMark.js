import { Button, Form, InputNumber, message, Select, Table } from "antd";
import "./StudentMark.css";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";

const { Option } = Select;
let CourseData = [];
let StudentData = [];
let MarkData = [];

const StudentMark = () => {
  const [searchForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [dataSource, setDataSource] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [marks, setMarks] = useState([]);
  const [formsData, setFormsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const studentResponse = await fetch(
        "http://localhost:8080/admission/studentsList"
      );
      const studentData = await studentResponse.json();
      //   console.log(studentData.students);
      StudentData = studentData.students;
      setStudents([...StudentData]);

      const courseResponse = await fetch(
        "http://localhost:8080/course/courseBreakDown"
      );
      const courseData = await courseResponse.json();
      //   console.log(courseData.courses);
      CourseData = courseData.courses;
      setCourses([...CourseData]);

      const markResponse = await fetch("http://localhost:8080/mark/markList");
      const markData = await markResponse.json();
      console.log(markData.marks);
      MarkData = markData.marks;
      setMarks([...MarkData]);
    };
    getData();
  }, []);

  const handleInputChange = async (record, dataIndex, value) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => record.key === item.key);
    const item = newData[index];
    item[dataIndex] = value;
    item.total = parseFloat(
      Number(
        (
          item.mark1 +
          item.mark2 +
          item.mark3 +
          item.mark4 +
          item.mark5 +
          item.final
        ).toFixed(2)
      )
    );
    setDataSource(newData);
    let first = [];
    let second = [];
    let firstG = formsData.semister === "firstSemister" ? item.total : 0;
    let secondG = formsData.semister === "secondSemister" ? item.total : 0;

    if (marks.length > 0) {
      const { firstSemister, secondSemister, firstGrade, secondGrade } =
        marks.find((data) => {
          return data.markId === item.key && data.courseId === formsData.course;
        });
      first = firstSemister;
      second = secondSemister;
      firstG = firstGrade;
      secondG = secondGrade;
    }
    const dbData = {
      markId: item.key,
      studentName: item.name,
      courseId: formsData.course,
      firstSemister:
        formsData.semister === "firstSemister"
          ? [
              {
                mark1: item.mark1,
                mark2: item.mark2,
                mark3: item.mark3,
                mark4: item.mark4,
                mark5: item.mark5,
                final: item.final,
              },
            ]
          : first,
      secondSemister:
        formsData.semister === "secondSemister"
          ? [
              {
                mark1: item.mark1,
                mark2: item.mark2,
                mark3: item.mark3,
                mark4: item.mark4,
                mark5: item.mark5,
                final: item.final,
              },
            ]
          : second,
      finalGrade: Number((firstG + secondG) / 2).toFixed(3),
      firstGrade: formsData.semister === "firstSemister" ? item.total : firstG,
      secondGrade:
        formsData.semister === "secondSemister" ? item.total : secondG,
      year: `${formsData.year}`,
      grade: formsData.grade,
      section: formsData.section,
    };
    await fetch("http://localhost:8080/mark/markList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dbData),
    });
    console.log(dbData);
  };

  const columns = [
    { title: "Student Name", dataIndex: "name" },
    {
      title: "10%",
      dataIndex: "mark1",
      render: (text, record, index) => {
        return (
          <InputNumber
            value={record.mark1}
            min={0}
            max={10}
            onChange={(value) => handleInputChange(record, "mark1", value)}
          />
        );
      },
    },
    {
      title: "10%",
      dataIndex: "mark2",
      render: (text, record, index) => (
        <InputNumber
          value={record.mark2}
          min={0}
          max={10}
          onChange={(value) => handleInputChange(record, "mark2", value)}
        />
      ),
    },
    {
      title: "10%",
      dataIndex: "mark3",
      render: (text, record, index) => (
        <InputNumber
          value={record.mark3}
          min={0}
          max={10}
          onChange={(value) => handleInputChange(record, "mark3", value)}
        />
      ),
    },
    {
      title: "15%",
      dataIndex: "mark4",
      render: (text, record, index) => (
        <InputNumber
          value={record.mark4}
          min={0}
          max={15}
          onChange={(value) => handleInputChange(record, "mark4", value)}
        />
      ),
    },
    {
      title: "5%",
      dataIndex: "mark5",
      render: (text, record, index) => (
        <InputNumber
          value={record.mark5}
          min={0}
          max={5}
          onChange={(value) => handleInputChange(record, "mark5", value)}
        />
      ),
    },
    {
      title: "Final (50%)",
      dataIndex: "final",
      render: (text, record, index) => (
        <InputNumber
          value={record.final}
          min={0}
          max={50}
          onChange={(value) => handleInputChange(record, "final", value)}
        />
      ),
    },
    {
      title: "Mark (100%)",
      dataIndex: "total",
      render: (text, record, index) => (
        <InputNumber value={record.total} disabled={true} />
      ),
    },
  ];

  //error message
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  const onGradeChange = (value) => {
    localStorage.setItem("grade", value);
    const cour = CourseData.filter((data) => {
      return data.offered === "Offered" && data.grade === value;
    });
    setCourses([...cour]);
  };
  const onSectionChange = (value) => {
    const grade = localStorage.getItem("grade");
    localStorage.setItem("section", value);
    const stud = StudentData.filter((data) => {
      return data.section === value && data.grade === grade;
    });
    setStudents([...stud]);
  };
  const onCourseChange = (value) => {
    const grade = localStorage.getItem("grade");
    const section = localStorage.getItem("section");
    const mar = MarkData.filter((data) => {
      return (
        data.courseId === value &&
        data.section === section &&
        data.grade === grade
      );
    });
    setMarks([...mar]);
  };
  const onFinish = (values) => {
    let date = new Date();
    date = date.getFullYear();
    setFormsData({ ...values, year: date });
    if (marks.length === 0) {
      const tData = students.map((data) => {
        return {
          key: data.admissionNumber,
          name: `${data.firstName} ${data.lastName}`,
          mark1: 0,
          mark2: 0,
          mark3: 0,
          mark4: 0,
          mark5: 0,
          final: 0,
          total: 0,
        };
      });
      setDataSource([...tData]);
    } else {
      const tData = marks.map((data) => {
        // console.log(data.secondSemister[0].mark1);
        return values.semister === "firstSemister"
          ? {
              key: data.markId,
              name: data.studentName,
              mark1: data.firstSemister[0].mark1,
              mark2: data.firstSemister[0].mark2,
              mark3: data.firstSemister[0].mark3,
              mark4: data.firstSemister[0].mark4,
              mark5: data.firstSemister[0].mark5,
              final: data.firstSemister[0].final,
              total:
                data.firstSemister[0].mark1 +
                data.firstSemister[0].mark2 +
                data.firstSemister[0].mark3 +
                data.firstSemister[0].mark4 +
                data.firstSemister[0].mark5 +
                data.firstSemister[0].final,
            }
          : {
              key: data.markId,
              name: data.studentName,
              mark1: data.secondSemister[0].mark1,
              mark2: data.secondSemister[0].mark2,
              mark3: data.secondSemister[0].mark3,
              mark4: data.secondSemister[0].mark4,
              mark5: data.secondSemister[0].mark5,
              final: data.secondSemister[0].final,
              total:
                data.secondSemister[0].mark1 +
                data.secondSemister[0].mark2 +
                data.secondSemister[0].mark3 +
                data.secondSemister[0].mark4 +
                data.secondSemister[0].mark5 +
                data.secondSemister[0].final,
            };
      });
      setDataSource([...tData]);
    }
  };

  return (
    <div>
      {contextHolder}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <div
          style={{
            textAlign: "left",
            marginBottom: 10,
            marginTop: 0,
            // width: "15%",
          }}>
          <Title level={4}>Select Criteria</Title>
        </div>
        <div
          style={{
            textAlign: "left",
            marginBottom: 20,
            marginTop: 24.5,
            // width: "80%",
            // marginLeft: 49,
          }}>
          <Form form={searchForm} onFinish={onFinish}>
            <Form.Item noStyle name="grade">
              <Select
                onChange={onGradeChange}
                placeholder="Grade"
                style={{ width: 220 }}>
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
            <Form.Item noStyle name="section">
              <Select
                onChange={onSectionChange}
                placeholder="Section"
                style={{
                  marginLeft: 5,
                  width: 220,
                  textAlign: "left",
                }}>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
              </Select>
            </Form.Item>
            <Form.Item noStyle name="course" required>
              <Select
                onChange={onCourseChange}
                style={{
                  marginLeft: 5,
                  width: 220,
                  textAlign: "left",
                }}
                placeholder="Subject">
                {courses.map((course) => {
                  const grade = localStorage.getItem("grade");
                  return course.grade === grade &&
                    course.offered === "Offered" ? (
                    <Option key={Math.random()} value={`${course.courseId}`}>
                      {course.courseName}
                    </Option>
                  ) : (
                    []
                  );
                })}
              </Select>
            </Form.Item>
            {/* {periodRender} */}
            <Form.Item noStyle name="semister" required>
              <Select
                style={{
                  width: 220,
                  textAlign: "left",
                  marginLeft: 5,
                }}
                placeholder="Semister">
                <Option value="firstSemister">First Semister</Option>
                <Option value="secondSemister">Second Semister</Option>
              </Select>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              <Button
                style={{
                  marginLeft: 10,
                }}
                type="primary"
                htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowClassName={(record) =>
          record.total < 50 ? "red-row" : record.total >= 50 ? "green-row" : ""
        }
      />
    </div>
  );
};

export default StudentMark;
