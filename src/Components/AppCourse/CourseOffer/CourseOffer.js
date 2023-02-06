import { Button, Checkbox, Col, Form, Input, Row, Select, Table } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import "./CourseOffer.css";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

//data
const originData = [
  {
    key: Math.random(),
    courseName: `Mathemathics`,
    grade: "Grade 1",
    courseId: "MathG1",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `English`,
    grade: "Grade 1",
    courseId: "EnglG1",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `Physical Education`,
    grade: "Grade 1",
    courseId: "PhysG1",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `Art and Music`,
    grade: "Grade 1",
    courseId: "ArtG1",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `Physical Education`,
    grade: "Grade 2",
    courseId: "PhysG2",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `English`,
    grade: "Grade 2",
    courseId: "EnglG2",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `Mathemathics`,
    grade: "Grade 3",
    courseId: "MathG3",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `English`,
    grade: "Grade 3",
    courseId: "EnglG3",
    teacher: `Not Assigned`,
  },
  {
    key: Math.random(),
    courseName: `Chemistry`,
    grade: "Grade 7",
    courseId: "ChemG7",
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
    courseName: `Mathemathics`,
    grade: "Grade 2",
    courseId: "Math2",
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
    courseName: `Chemistry`,
    grade: "Grade 8",
    courseId: "ChemG8",
    teacher: `Not Assigned`,
  },
];
const CourseOffer = () => {
  const [addForm] = Form.useForm();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedToOffer, setSelectedToOffer] = useState();
  const [courseGroupName, setCourseGroupName] = useState();
  const navigate = useNavigate();

  //columns
  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      width: "25%",
      editable: true,
      Assignable: true,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      width: "25%",
      editable: true,
      Assignable: true,
    },
    {
      title: "Course Id",
      dataIndex: "courseId",
      width: "20%",
      editable: true,
      Assignable: true,
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      width: "30%",
      editable: true,
      Assignable: true,
    },
  ];
  //select search
  const onSelectSearch = (value) => {
    setSearchKey(value);
    const data = originData.filter((filtered) => {
      return filtered.grade === value;
    });
    setFilteredData([...data]);
    setSelectedToOffer();
  };
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
        inputType: col.dataIndex === "grade" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  //On finish adding course Group
  const onFinish = (values) => {
    const notOffered = filteredData.map((course) => {
      return course.courseName;
    });
    for (let i = 0; i < values.courses.length; i++) {
      const indexValue = notOffered.indexOf(values.courses[i]);
      notOffered.splice(indexValue, 1);
    }
    const courseGroup = {
      courseGroupName: `${searchKey} Courses Group`,
      courses: values.courses,
      notOffered: notOffered,
    };
    navigate("/courseGroup", { state: { courseGroup } });
  };
  //on change checkbox
  const onChangeCheckBox = (checkedValues) => {
    console.log("checked = ", checkedValues);
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

  //on select Change row selection

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    // console.log(filteredData[0].key);
    const selectedCourses = [];
    for (let i = 0; i < filteredData.length; i++) {
      console.log(filteredData[i].key);
      for (let j = 0; j < newSelectedRowKeys.length; j++) {
        if (filteredData[i].key === newSelectedRowKeys[j]) {
          selectedCourses.push(
            <Row>
              <Checkbox value={filteredData[i].courseName}>
                {filteredData[i].courseName}
              </Checkbox>
            </Row>
          );
        }
      }
    }
    // console.log(selectedCourses);
    setSelectedToOffer(selectedCourses);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className="CourseOfferCSS">
      <div className="OfferCourseTitle">
        <Title level={3} style={{ textAlign: "left" }}>
          Offer Courses
        </Title>
      </div>
      <div className="OfferTableName">
        <div className="OfferCourseTitle">
          <Title level={3} style={{ textAlign: "left" }}>
            Courses List
          </Title>
        </div>
      </div>
      <div className="GradeSearchBar">
        <div
          style={{
            display: "flex",
            textAlign: "left",
            marginBottom: 5,
            marginTop: 27,
          }}>
          <Select
            onSelect={onSelectSearch}
            showSearch
            style={{
              width: 350,
              marginLeft: "10%",
            }}
            placeholder="Select Grade To Offer Courses"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "Grade 1",
                label: "Grade 1",
              },
              {
                value: "Grade 2",
                label: "Grade 2",
              },
              {
                value: "Grade 3",
                label: "Grade 3",
              },
              {
                value: "Grade 4",
                label: "Grade 4",
              },
              {
                value: "Grade 5",
                label: "Grade 5",
              },
              {
                value: "Grade 6",
                label: "Grade 6",
              },
            ]}
          />
        </div>
      </div>
      <div className="CourseOfferForm">
        <Form
          className="CourseGroupList"
          style={{ justifyContent: "left", marginTop: 17 }}
          form={addForm}
          name="horizontal_login"
          layout="vertical"
          onFinish={onFinish}>
          <Form.Item
            label={
              <>
                <span
                  style={{
                    color: "red",
                    fontSize: "20px",
                    paddingTop: "5px",
                    marginRight: "2px",
                  }}>
                  *
                </span>
                {` Course Group Name`}
              </>
            }
            style={{
              after: { content: "*", color: "red" },
              minWidth: 200,
              textAlign: "left",
              "&::after": {
                content: "*",
                color: "red",
              },
            }}
            rules={[
              {
                required: false,
                message: "Please input course name!",
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
              <strong>
                {searchKey
                  ? `${searchKey} Courses Group`
                  : "Search Grade To Offer Courses To!"}
              </strong>
            </div>
          </Form.Item>
          <Form.Item
            label="Courses"
            style={{ marginTop: -15, minWidth: 250, textAlign: "left" }}
            name="courses"
            rules={[
              {
                required: true,
                message: "Please Select courses!",
              },
            ]}>
            <Checkbox.Group
              style={{
                width: "100%",
                marginTop: -10,
              }}
              onChange={onChangeCheckBox}>
              <Col>{selectedToOffer}</Col>
            </Checkbox.Group>
          </Form.Item>
          <div className="CourseSaveButton">
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  style={{ minWidth: 100, marginTop: 5 }}
                  type="primary"
                  htmlType="submit">
                  Offer
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="CourseOfferTable">
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
        <Form form={form} component={false}>
          <Table
            bordered
            rowSelection={rowSelection}
            dataSource={filteredData}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={true}
          />
        </Form>
      </div>
    </div>
  );
};

export default CourseOffer;
