import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Typography,
  Popconfirm,
  Table,
} from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import "./FeesGroup.css";
const { RangePicker } = DatePicker;
const { Option } = Select;
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
          {dataIndex === "feeName" ? (
            <Input />
          ) : dataIndex === "feeType" ? (
            <Select placeholder="Select Fee Type">
              <Option value="Admission">Admission</Option>
              <Option value="Monthly">Monthly</Option>
              <Option value="Exercise Book">Exercise Book</Option>
              <Option value="Sport Kits">Sport Kits</Option>
            </Select>
          ) : (
            <Input disabled />
          )}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const originData = [
  {
    key: Math.random(),
    feeName: "May Fee",
    feeType: "Monthly",
    feeStartDate: "01-04-2023",
    feeDueDate: "15-05-2023",
  },
  {
    key: Math.random(),
    feeName: "May Fee",
    feeType: "Monthly",
    feeStartDate: "01-04-2023",
    feeDueDate: "15-05-2023",
  },
  {
    key: Math.random(),
    feeName: "May Fee",
    feeType: "Monthly",
    feeStartDate: "01-04-2023",
    feeDueDate: "15-05-2023",
  },
  {
    key: Math.random(),
    feeName: "May Fee",
    feeType: "Monthly",
    feeStartDate: "01-04-2023",
    feeDueDate: "15-05-2023",
  },
  {
    key: Math.random(),
    feeName: "May Fee",
    feeType: "Monthly",
    feeStartDate: "01-04-2023",
    feeDueDate: "15-05-2023",
  },
  {
    key: Math.random(),
    feeName: "May Fee",
    feeType: "Monthly",
    feeStartDate: "01-04-2023",
    feeDueDate: "15-05-2023",
  },
  {
    key: Math.random(),
    feeName: "May Fee",
    feeType: "Monthly",
    feeStartDate: "01-04-2023",
    feeDueDate: "15-05-2023",
  },
];

const FeesGroup = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [tableData, setTableData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const onFinish = (values) => {
    let startDate = new Date(values.feeDueDate[0]);
    let dueDate = new Date(values.feeDueDate[1]);
    startDate = startDate.toDateString();
    dueDate = dueDate.toDateString();
    const data = {
      key: Math.random(),
      feeName: values.feeName,
      feeType: values.feeType,
      feeStartDate: startDate.toString().slice(4),
      feeDueDate: dueDate.toString().slice(4),
    };
    setTableData([data, ...tableData]);
  };
  //Edit Student Start
  const edit = (record) => {
    form.setFieldsValue({
      feeName: "",
      feeType: "",
      feeStartDate: "",
      feeDueDate: "",
      ...record,
    });
    setEditingKey(record.key);
  };
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
  const deleteFee = (record) => {
    const indexValue = tableData.indexOf(record);
    tableData.splice(indexValue, 1);
    setTableData([...tableData]);
  };
  const columns = [
    {
      title: "Fee Name",
      dataIndex: "feeName",
      width: "16%",
      editable: true,
    },
    {
      title: "Fee Type",
      dataIndex: "feeType",
      width: "18%",
      editable: true,
    },
    {
      title: "Fee Start Date",
      dataIndex: "feeStartDate",
      width: "14%",
      editable: true,
    },
    {
      title: "Fee Due Date",
      dataIndex: "feeDueDate",
      width: "14%",
      editable: true,
    },
    {
      width: "5%",
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
                deleteFee(record);
              }}>
              <a>Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
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
  //cancel edit
  const cancel = () => {
    setEditingKey("");
  };
  return (
    <div>
      <div className="FeesGroupCSS">
        <div className="FeesGroupTitle">
          <Title
            level={3}
            style={{
              marginLeft: 5,
              textAlign: "left",
              marginTop: 5,
              marginBottom: 10,
            }}>
            Add Fees Group
          </Title>
        </div>
        <div className="FeesGroupForm">
          <Form form={addForm} onFinish={onFinish} style={{ display: "flex" }}>
            <Form.Item name="feeName" style={{ width: "35%" }}>
              <Input placeholder="Enter Fee Name" />
            </Form.Item>
            <Form.Item
              name="feeType"
              style={{ width: "35%", marginLeft: 15, textAlign: "left" }}>
              <Select placeholder="Select Fee Type">
                <Option value="Admission">Admission</Option>
                <Option value="Monthly">Monthly</Option>
                <Option value="Exercise Book">Exercise Book</Option>
                <Option value="Sport Kits">Sport Kits</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="feeDueDate"
              style={{ width: "35%", marginLeft: 15, textAlign: "left" }}>
              <RangePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item style={{ width: "5%" }}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="FeesGroupList">
          <div className="FeesGroupListTitle">
            <Title
              level={4}
              style={{
                marginLeft: 5,
                textAlign: "left",
                marginTop: 5,
                marginBottom: 10,
              }}>
              Fees Group List
            </Title>
          </div>
          <div className="FeesGroupSearch">
            <div
              style={{
                display: "flex",
                textAlign: "left",
                marginBottom: 5,
                marginTop: 5,
              }}>
              <Search
                style={{
                  marginLeft: "28.8%",
                  marginRight: 0,
                }}
                placeholder="input search text"
                // onSearch={onSearch}
                // onChange={onSearchChange}
                // onChange=
                enterButton
              />
            </div>
          </div>
          <div className="FeesGroupTable">
            <Form form={form} component={false}>
              <Table
                //   bordered
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                dataSource={tableData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: deleteFee,
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesGroup;
