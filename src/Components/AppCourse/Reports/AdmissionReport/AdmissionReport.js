import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Table,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;
const originData = [
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "John Kittessa",
    gender: "Male",
    class: "8",
    fatherName: "Kittessa Dhugumaa",
    dob: "02-12-2000",
    admissionDate: "2022-01-12",
    mobileNumber: "+9876545672",
  },
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "Abebe Mola",
    gender: "Male",
    class: "8",
    fatherName: "Mola Andu",
    dob: "02-12-2000",
    admissionDate: "2023-01-23",
    mobileNumber: "+9876545672",
  },
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "Sileshih Seyfu",
    gender: "Male",
    class: "8",
    fatherName: "Seyfu Fantaye",
    dob: "02-12-2000",
    admissionDate: "2023-02-05",
    mobileNumber: "+9876545672",
  },
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "Nahoo Timber",
    gender: "Male",
    class: "10",
    fatherName: "Timber Isnow",
    dob: "02-12-2000",
    admissionDate: "2023-02-09",
    mobileNumber: "+9876545672",
  },
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "Gadise Alemu",
    gender: "Female",
    class: "9",
    fatherName: "Alemu Yilma",
    dob: "03-01-1999",
    admissionDate: "2023-02-01",
    mobileNumber: "+2345676543",
  },
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "Getahun Worku",
    gender: "Male",
    class: "9",
    fatherName: "Worku Taye",
    dob: "03-01-1999",
    admissionDate: "2022-12-21",
    mobileNumber: "+2345676543",
  },
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "Worku Afera",
    gender: "Male",
    class: "9",
    fatherName: "Afera Taye",
    dob: "03-01-1999",
    admissionDate: "2022-02-21",
    mobileNumber: "+2345676543",
  },
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "Simon Worku",
    gender: "Male",
    class: "9",
    fatherName: "Worku Gamo",
    dob: "03-01-1999",
    admissionDate: "2022-05-11",
    mobileNumber: "+2345676543",
  },
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "Getahun Worku",
    gender: "Male",
    class: "9",
    fatherName: "Worku Taye",
    dob: "03-01-1999",
    admissionDate: "2022-09-21",
    mobileNumber: "+2345676543",
  },
  {
    key: Math.random(),
    admissionNumber: "23563",
    studentName: "Shamil Kamil",
    gender: "Male",
    class: "9",
    fatherName: "Kamil Aamir",
    dob: "03-01-1999",
    admissionDate: "2022-03-18",
    mobileNumber: "+2345676543",
  },
];
const columns = [
  {
    title: "Admission Number",
    dataIndex: "admissionNumber",
    width: "",
  },
  {
    title: "Student Name",
    dataIndex: "studentName",
    width: "",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    width: "",
  },
  {
    title: "Class",
    dataIndex: "class",
    width: "",
  },
  {
    title: "Father Name",
    dataIndex: "fatherName",
    width: "",
  },
  {
    title: "Date Of Birth",
    dataIndex: "dob",
    width: "",
  },
  {
    title: "Admission Date",
    dataIndex: "admissionDate",
    width: "",
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    width: "",
  },
];
const AdmissionReport = () => {
  const [searchForm] = Form.useForm();
  const [periodRender, setPeriodRender] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const onDateRangeChange = (value) => {
    let start = new Date(value[0]);
    let end = new Date(value[1]);
    start = start.getTime();
    end = end.getTime();
    const data = originData.filter((data) => {
      let admissionDate = Date.parse(data.admissionDate);
      return admissionDate <= end && admissionDate >= start;
    });
    setFilteredData([...data]);
  };

  const onChangeDate = (value) => {
    if (value === "Period") {
      setPeriodRender(
        <Form.Item noStyle name="period" required>
          <RangePicker
            onChange={onDateRangeChange}
            style={{ width: "40%", marginLeft: 15 }}
            format="DD-MM-YYYY"
          />
        </Form.Item>
      );
    } else {
      setPeriodRender("");
    }
  };
  const onFinish = (values) => {
    if (values.date === "Period") {
      let start = new Date(values.period[0]);
      let end = new Date(values.period[1]);
      start = start.getTime();
      end = end.getTime();
      const data = originData.filter((data) => {
        let admissionDate = Date.parse(data.admissionDate);
        if (values.gender === "Both") {
          return admissionDate <= end && admissionDate >= start;
        } else {
          return (
            admissionDate <= end &&
            admissionDate >= start &&
            data.gender === values.gender
          );
        }
      });
      setFilteredData([...data]);
    } else if (values.date === "Today") {
      let date = new Date();
      date = date.toDateString();
      const data = originData.filter((data) => {
        let admissionDate = Date.parse(data.admissionDate);
        admissionDate = new Date(admissionDate);
        admissionDate = admissionDate.toDateString();
        if (values.gender === "Both") {
          return admissionDate === date;
        } else {
          return admissionDate === date && data.gender === values.gender;
        }
      });
      setFilteredData([...data]);
    } else if (values.date === "This Week") {
      let date = new Date();
      date = date.setDate(date.getDate() - 7);
      const data = originData.filter((data) => {
        let admissionDate = Date.parse(data.admissionDate);
        if (values.gender === "Both") {
          return admissionDate >= date;
        } else {
          return admissionDate >= date && data.gender === values.gender;
        }
      });
      setFilteredData([...data]);
    } else if (values.date === "This Month") {
      let date = new Date();
      date = date.setDate(date.getDate() - 30);
      const data = originData.filter((data) => {
        let admissionDate = Date.parse(data.admissionDate);
        if (values.gender === "Both") {
          return admissionDate >= date;
        } else {
          return admissionDate >= date && data.gender === values.gender;
        }
      });
      setFilteredData([...data]);
    } else if (values.date === "Last 3 Months") {
      let date = new Date();
      date = date.setDate(date.getDate() - 90);
      const data = originData.filter((data) => {
        let admissionDate = Date.parse(data.admissionDate);
        if (values.gender === "Both") {
          return admissionDate >= date;
        } else {
          return admissionDate >= date && data.gender === values.gender;
        }
      });
      setFilteredData([...data]);
    } else if (values.date === "Last 6 Months") {
      let date = new Date();
      date = date.setDate(date.getDate() - 180);
      const data = originData.filter((data) => {
        let admissionDate = Date.parse(data.admissionDate);
        if (values.gender === "Both") {
          return admissionDate >= date;
        } else {
          return admissionDate >= date && data.gender === values.gender;
        }
      });
      setFilteredData([...data]);
    } else if (values.date === "This Year") {
      let date = new Date();
      date = date.setDate(date.getDate() - 365);
      const data = originData.filter((data) => {
        let admissionDate = Date.parse(data.admissionDate);
        if (values.gender === "Both") {
          return admissionDate >= date;
        } else {
          return admissionDate >= date && data.gender === values.gender;
        }
      });
      setFilteredData([...data]);
    }
    searchForm.resetFields();
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            textAlign: "left",
            marginBottom: 10,
            marginTop: 0,
            width: "15%",
          }}>
          <Title level={5}>Select Criteria</Title>
        </div>
        <div
          style={{
            textAlign: "left",
            marginBottom: 20,
            marginTop: 24.5,
            width: "80%",
            // marginLeft: 49,
          }}>
          <Form form={searchForm} onFinish={onFinish}>
            <Form.Item noStyle name="date" required>
              <Select
                onChange={onChangeDate}
                style={{
                  width: "22.9%",
                  textAlign: "left",
                }}
                placeholder="Date">
                <Option value="Today">Today</Option>
                <Option value="This Week">This Week</Option>
                <Option value="This Month">This Month</Option>
                <Option value="Last 3 Months">Last 3 Months</Option>
                <Option value="Last 6 Months">Last 6 Months</Option>
                <Option value="This Year">This Year</Option>
                <Option value="Period">Period</Option>
              </Select>
            </Form.Item>
            {periodRender}
            <Form.Item noStyle name="gender" required>
              <Select
                style={{
                  width: "22.5%",
                  textAlign: "left",
                  marginLeft: 15,
                }}
                placeholder="Gender">
                <Option value="Both">Both</Option>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              <Button
                style={{
                  marginLeft: 15,
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
        dataSource={filteredData}
        columns={columns}
        size="small"
        summary={(tableData) => {
          let total = 0;
          let male = 0;
          let female = 0;
          tableData.forEach((data) => {
            if (data.gender === "Male") {
              male++;
            } else if (data.gender === "Female") {
              female++;
            }
          });
          total = female + male;
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>
                  <Text type="danger">Total: {total}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text type="danger">Male: {male}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text type="danger">Female: {female}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};

export default AdmissionReport;
