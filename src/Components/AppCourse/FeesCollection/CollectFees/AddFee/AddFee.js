import Title from "antd/es/typography/Title";
import Typography from "antd/es/typography/Typography";
import {
  ArrowLeftOutlined,
  MenuOutlined,
  PrinterOutlined,
  MoneyCollectOutlined,
  FilePdfOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "./AddFee.css";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
const { Option } = Select;
const originData = [
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "2-02-2023",
    status: (
      <span
        style={{
          background: "#D61355",
          borderRadius: 3,
          color: "white",
        }}>
        Not Paid
      </span>
    ),
    amount: "1000.00",
    total: "N/A",
    paymentId: "N/A",
    paymentMode: "N/A",
    payedDate: "N/A",
    paymentFine: "0.00",
    due: `On Time`,
  },
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "12-02-2023",
    status: (
      <span
        style={{
          background: "#1F8A70",
          borderRadius: 3,
          color: "white",
        }}>
        Paid
      </span>
    ),
    amount: "1000.00",
    total: "1000",
    paymentId: "488/1",
    paymentMode: "Cash",
    payedDate: "01-02-2023",
    paymentFine: "0.00",
    due: `On Time`,
  },
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "12-02-2023",
    status: (
      <span
        style={{
          background: "#1F8A70",
          borderRadius: 3,
          color: "white",
        }}>
        Paid
      </span>
    ),
    amount: "1000.00",
    total: "1000",
    paymentId: "488/1",
    paymentMode: "Cash",
    payedDate: "01-02-2023",
    paymentFine: "0.00",
    due: `On Time`,
  },
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "12-02-2023",
    status: (
      <span
        style={{
          background: "#1F8A70",
          borderRadius: 3,
          color: "white",
        }}>
        Paid
      </span>
    ),
    amount: "1000.00",
    total: "1000",
    paymentId: "488/1",
    paymentMode: "Cash",
    payedDate: "01-02-2023",
    paymentFine: "0.00",
    due: `On Time`,
  },
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "2-02-2023",
    status: (
      <span
        style={{
          background: "#D61355",
          borderRadius: 3,
          color: "white",
        }}>
        Not Paid
      </span>
    ),
    amount: "1000.00",
    total: "N/A",
    paymentId: "N/A",
    paymentMode: "N/A",
    payedDate: "N/A",
    paymentFine: "0.00",
    due: `On Time`,
  },
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "12-02-2023",
    status: (
      <span
        style={{
          background: "#1F8A70",
          borderRadius: 3,
          color: "white",
        }}>
        Paid
      </span>
    ),
    amount: "1000.00",
    total: "1000",
    paymentId: "488/1",
    paymentMode: "Cash",
    payedDate: "01-02-2023",
    paymentFine: "0.00",
    due: `On Time`,
  },
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "2-02-2023",
    status: (
      <span
        style={{
          background: "#D61355",
          borderRadius: 3,
          color: "white",
        }}>
        Not Paid
      </span>
    ),
    amount: "1000.00",
    total: "N/A",
    paymentId: "N/A",
    paymentMode: "N/A",
    payedDate: "N/A",
    paymentFine: "0.00",
    due: `On Time`,
  },
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "2-02-2023",
    status: (
      <span
        style={{
          background: "#D61355",
          borderRadius: 3,
          color: "white",
        }}>
        Not Paid
      </span>
    ),
    amount: "1000.00",
    total: "N/A",
    paymentId: "N/A",
    paymentMode: "N/A",
    payedDate: "N/A",
    paymentFine: "0.00",
    due: `On Time`,
  },
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "12-02-2023",
    status: (
      <span
        style={{
          background: "#1F8A70",
          borderRadius: 3,
          color: "white",
        }}>
        Paid
      </span>
    ),
    amount: "1000.00",
    total: "1000",
    paymentId: "488/1",
    paymentMode: "Cash",
    payedDate: "01-02-2023",
    paymentFine: "0.00",
    due: `On Time`,
  },
  {
    key: Math.random(),
    feeName: `General (Admission Fees)`,
    feeCode: "admission-fees",
    feeStartDate: "12-01-2023",
    feeDueDate: "12-02-2023",
    status: (
      <span
        style={{
          background: "#1F8A70",
          borderRadius: 3,
          color: "white",
        }}>
        Paid
      </span>
    ),
    amount: "1000.00",
    total: "1000",
    paymentId: "488/1",
    paymentMode: "Cash",
    payedDate: "01-02-2023",
    paymentFine: "0.00",
    due: `On Time`,
  },
];

const AddFee = () => {
  const [form] = Form.useForm();
  const [collectForm] = Form.useForm();
  let todayDate = new Date();
  todayDate = todayDate.toDateString();
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feeSubmitLoading, setFeeSubmitLoading] = useState(false);
  const [openFeeModal, setOpenFeeModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [paymentRender, setPaymentRender] = useState("");
  const [payingRecord, setPayingRecord] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isFined, setIsFined] = useState(false);
  const [fineAmount, setFineAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState(originData);
  const showModal = () => {
    setOpenFeeModal(true);
  };
  const handleOk = () => {
    setFeeSubmitLoading(true);
    setTimeout(() => {
      setFeeSubmitLoading(false);
      setOpenFeeModal(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpenFeeModal(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns = [
    {
      title: "Fee Name",
      dataIndex: "feeName",
      width: "16%",
      editable: true,
    },
    {
      title: "Fee Code",
      dataIndex: "feeCode",
      width: "9.5%",
      editable: true,
    },
    {
      title: "Start Date",
      dataIndex: "feeStartDate",
      width: "8%",
      editable: true,
    },
    {
      title: "Due Date",
      dataIndex: "feeDueDate",
      width: "8%",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "6%",
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "6%",
      editable: true,
    },
    {
      title: "Fine",
      dataIndex: "paymentFine",
      width: "3%",
      editable: true,
    },
    {
      title: "Total-Discount",
      dataIndex: "total",
      width: "10%",
      editable: true,
    },
    {
      title: "Payment Id",
      dataIndex: "paymentId",
      width: "7.5%",
      editable: true,
    },
    {
      title: "Mode",
      dataIndex: "paymentMode",
      width: "9%",
      editable: true,
    },
    {
      title: "Payed Date",
      dataIndex: "payedDate",
      width: "10%",
      editable: true,
    },
    {
      title: "Due",
      dataIndex: "due",
      width: "35%",
      editable: true,
      render: (_, record) => {
        const dueDate = new Date(record.feeDueDate);
        const todayDate = new Date();
        const dateDifference = dueDate.getTime() - todayDate.getTime();
        return dateDifference < 0 ? "Late" : "On Time";
      },
    },
    {
      width: "2%",
      title: "Action",
      dataIndex: "operation",
      render: (_, record) => {
        // const editable = isEditing(record);
        // const Assignable = isAssigning(record);
        return (
          <Space size="middle">
            {record.status.props.children === "Not Paid" ? (
              <Typography.Link
                onClick={() => {
                  //   console.log(record);
                  setModalTitle(`${record.feeName}`);
                  const amount = Number(record.amount);
                  setPaymentAmount(amount);
                  const dueDate = new Date(record.feeDueDate);
                  const todayDate = new Date();
                  const dateDifference =
                    dueDate.getTime() - todayDate.getTime();
                  if (dateDifference < 0) {
                    setIsFined(true);
                    setFineAmount(150);
                  }
                  setTotal(150 + amount);
                  //   console.log(dueDate);
                  setPayingRecord(record);
                  showModal();
                }}>
                <PlusOutlined
                  style={{ width: 15, border: "1px solid skyblue" }}
                />
              </Typography.Link>
            ) : (
              ""
            )}
            <Typography.Link>
              <PrinterOutlined />
            </Typography.Link>
          </Space>
        );
      },
    },
  ];
  const onFinish = (values) => {
    const indexValue = originData.indexOf(payingRecord);
    let due = "";
    if (values.fine > 0) {
      due = "Late";
    } else {
      due = "On Time";
    }
    let paymentMode;
    if (values.paymentType === "Cash") {
      paymentMode = "N/A";
    } else if (values.paymentType === "Bank Transfer") {
      paymentMode = values.transferId;
    } else if (values.paymentType === "Cheque") {
      paymentMode = values.chequeId;
    }
    const data = {
      key: Math.random(),
      feeName: payingRecord.feeName,
      feeCode: payingRecord.feeCode,
      feeStartDate: payingRecord.feeStartDate,
      feeDueDate: payingRecord.feeDueDate,
      status: (
        <span
          style={{
            background: "#1F8A70",
            borderRadius: 3,
            color: "white",
          }}>
          Paid
        </span>
      ),
      amount: payingRecord.amount,
      total: total,
      paymentId: paymentMode,
      paymentMode: values.paymentType,
      payedDate: todayDate.slice(4),
      paymentFine: fineAmount,
      due: due,
    };
    originData.splice(indexValue, 1, data);
    setTableData([...originData]);
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div className="AddFeeCss">
        <div className="StudentFeePageTitle">
          <Title
            level={3}
            style={{
              marginLeft: 5,
              textAlign: "left",
              marginTop: -10,
              marginBottom: 10,
            }}>
            Student Fees
          </Title>
        </div>
        <div
          className="BackAndBurgerTab"
          style={{ paddingTop: 3, textAlign: "right", marginTop: -10 }}>
          <Typography.Link style={{ fontSize: 15, marginRight: 10 }}>
            <Link to="/collectFees">
              <ArrowLeftOutlined />
              Back
            </Link>
          </Typography.Link>
          <Typography.Link style={{ fontSize: 15 }} onClick={showDrawer}>
            <MenuOutlined />
          </Typography.Link>
          <Drawer
            drawerStyle={{}}
            width={270}
            title="Class 2"
            placement="right"
            onClose={onClose}
            open={open}>
            <Tabs
              tabBarStyle={{
                marginTop: -20,
                backgroundColor: "#13005A",
                color: "white",
              }}
              size="large"
              defaultActiveKey="1"
              centered
              animated
              type="card">
              <Tabs.TabPane tab="A" key="1">
                Section A List
              </Tabs.TabPane>
              <Tabs.TabPane tab="B" key="2">
                Section B List
              </Tabs.TabPane>
              <Tabs.TabPane tab="C" key="3">
                Section C List
              </Tabs.TabPane>
            </Tabs>
          </Drawer>
        </div>
        <div className="StudentInformationTable">
          <div className="TheStudentsPhoto">
            <Image
              preview={false}
              style={{
                marginLeft: -60,
                marginTop: 4,
                // paddingBottom: 10,
                marginBottom: 5,
                boxShadow:
                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              }}
              width={120}
              height={120}
              src="https://s3.amazonaws.com/media.thecrimson.com/photos/2014/11/07/202918_1301040.jpg"
            />
          </div>
          <div className="StudentInformationDescription">
            <Descriptions
              style={{
                margin: 5,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
              bordered
              size="small"
              column={2}>
              <Descriptions.Item labelStyle={{ width: 150 }} label="Name:">
                Camila Cabello
              </Descriptions.Item>
              <Descriptions.Item
                labelStyle={{ width: 180 }}
                label="Class Section:">
                Grade 2 A
              </Descriptions.Item>
              <Descriptions.Item label="Father Name:">
                Cabello Wick
              </Descriptions.Item>
              <Descriptions.Item label="Admission Number">
                234567
              </Descriptions.Item>
              <Descriptions.Item label="Mobile Number">
                +25194063650
              </Descriptions.Item>
              <Descriptions.Item label="Roll Number">0346</Descriptions.Item>
            </Descriptions>
          </div>
        </div>
        <div className="FeeCollectionListTable">
          <div className="CollectSelectedAndDate">
            <div
              className="PrintAndCollectSelectedButton"
              style={{ textAlign: "left" }}>
              <Button size="small" type="primary" style={{ marginRight: 5 }}>
                <PrinterOutlined />
                Print Selected
              </Button>
              <Button size="small" type="primary">
                <MoneyCollectOutlined />
                Collect Selected
              </Button>
              <div
                style={{
                  background: "#dadada",
                  height: "1px",
                  width: "100%",
                  clear: "both",
                  marginTop: 6,
                  marginBottom: "10px",
                }}></div>
            </div>
            <div
              className="TodayDateShower"
              style={{ textAlign: "right", color: "red" }}>
              {todayDate}
              <div
                style={{
                  background: "#dadada",
                  height: "1px",
                  width: "100%",
                  clear: "both",
                  marginTop: 11.5,
                  marginBottom: "10px",
                }}></div>
            </div>
            <div className="TableSelectReloadButton">
              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  marginTop: -39,
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
                    marginTop: 5,
                    marginLeft: 8,
                  }}>
                  {hasSelected
                    ? `Selected ${selectedRowKeys.length} items`
                    : ""}
                </span>
              </div>
            </div>
            <div
              className="PrintAndLikeOptions"
              style={{ textAlign: "right", marginRight: 10, marginTop: -33 }}>
              <FilePdfOutlined />
            </div>
          </div>
          <div className="FeeCollectionTable">
            <Form form={form} component={false}>
              <Table
                size="small"
                rowSelection={rowSelection}
                bordered
                dataSource={tableData}
                columns={columns}
                rowClassName="editable-row"
                pagination={
                  {
                    //   onChange: cancel,
                  }
                }
              />
            </Form>
          </div>
          <>
            <Modal
              open={openFeeModal}
              title={modalTitle}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={false}>
              <Form onFinish={onFinish} layout="vertical" form={collectForm}>
                <Form.Item
                  initialValue={todayDate.toString().slice(4)}
                  label="Date"
                  name="paymentDate">
                  <Input readOnly />
                </Form.Item>
                <Row style={{ display: "flex" }}>
                  <Col style={{ width: "48%" }}>
                    <Form.Item
                      initialValue={paymentAmount}
                      label="Amount"
                      name="amount">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                  <Col style={{ marginLeft: 15, width: "48.5%" }}>
                    <Form.Item
                      initialValue={fineAmount}
                      label="Fine"
                      name="fine">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ display: "flex" }}>
                  <Col style={{ width: "48%" }}>
                    <Form.Item
                      initialValue={0.0}
                      label="Discount"
                      name="discount">
                      <InputNumber
                        onBlur={(e) => {
                          const discountedTotal = total - e.target.value;
                          setTotal(discountedTotal);
                        }}
                        onFocus={() => {
                          setTotal(paymentAmount + fineAmount);
                        }}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col style={{ marginLeft: 15, width: "48.5%" }}>
                    <Form.Item label="Total" name="total">
                      <div
                        style={{
                          paddingTop: 3,
                          border: "1px solid #ccc",
                          width: "100%",
                          height: 26,
                          borderRadius: 5,
                        }}>
                        <span style={{ paddingLeft: 5 }}>{total}</span>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item required label="Payment Type" name="paymentType">
                  <Select
                    onChange={(value) => {
                      if (value === "Cash") {
                        setPaymentRender("");
                      } else if (value === "Bank Transfer") {
                        setPaymentRender(
                          <Form.Item
                            name="transferId"
                            required
                            label="Transfer Id">
                            <Input />
                          </Form.Item>
                        );
                      } else if (value === "Cheque") {
                        setPaymentRender(
                          <Form.Item name="chequeId" required label="Cheque Id">
                            <Input />
                          </Form.Item>
                        );
                      }
                    }}>
                    <Option value="Cash">Cash</Option>
                    <Option value="Bank Transfer">Bank Transfer</Option>
                    <Option value="Cheque">Cheque</Option>
                  </Select>
                </Form.Item>
                {paymentRender}
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <Button
                    style={{ marginRight: 10 }}
                    key="back"
                    onClick={handleCancel}>
                    Return
                  </Button>
                  <Form.Item>
                    <Button
                      key="submit"
                      type="primary"
                      htmlType="submit"
                      loading={feeSubmitLoading}
                      onClick={handleOk}>
                      Collect Fees
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};

export default AddFee;
