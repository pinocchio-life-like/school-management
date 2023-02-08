import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import Title from "antd/es/typography/Title";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./AdmissionTwo.css";
import Search from "antd/es/input/Search";
const { Option } = Select;
const { Panel } = Collapse;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AdmissionTwo = () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [signupButtonClick, setSignupButtonClick] = useState("");
  const [isExists, setIsExists] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </div>
  );
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Record Does Not Exist!",
    });
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onExistingFinish = (values) => {
    console.log(values);
  };
  const onSearch = (value) => {
    console.log(value);
    if (value === "1234" || value === "abebe mola") {
      setIsExists(true);
    } else {
      error();
    }
  };

  return (
    <div>
      <div className="wholeAdmissionTwoContainer">
        <div
          className={`admissionTwoContainer ${signupButtonClick}`}
          id="admissionTwoContainer">
          <div className="form-admissionTwoContainer sign-up-admissionTwoContainer">
            <Form
              form={searchForm}
              onFinish={onExistingFinish}
              className="admissionForm"
              action="#">
              <Title
                className="admissionHOne"
                level={3}
                style={{
                  textAlign: "left",
                  marginTop: 5,
                  marginLeft: 15,
                }}>
                Student Admission
              </Title>
              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  marginBottom: 5,
                }}>
                <Search
                  style={{ marginLeft: 15, marginRight: 5 }}
                  placeholder="Enter Full Name Or ID to Search!"
                  onSearch={onSearch}
                  enterButton
                />
              </div>
              <div className="social-admissionTwoContainer">
                {isExists ? (
                  <div>
                    <>
                      <div style={{ marginTop: -15, display: "flex" }}>
                        <div style={{ width: "78%" }}>
                          <>
                            <div style={{ marginTop: "10px", display: "flex" }}>
                              <Col style={{ width: "50%", marginLeft: "15px" }}>
                                <div style={{ textAlign: "left" }}>
                                  First Name
                                </div>
                                <Form.Item
                                  initialValue="Abebe"
                                  style={{ textAlign: "left" }}
                                  name="firstNameExisiting">
                                  <Input
                                    style={{ width: "100%" }}
                                    placeholder="First Name"
                                    size="middle"
                                  />
                                </Form.Item>
                              </Col>
                              <Col style={{ width: "50%", marginLeft: "15px" }}>
                                <div style={{ textAlign: "left" }}>
                                  Last Name
                                </div>
                                <Form.Item
                                  initialValue="Mola"
                                  style={{ textAlign: "left" }}
                                  name="lastNameExisiting"
                                  rules={[]}>
                                  <Input
                                    placeholder="Last Name"
                                    size="middle"
                                  />
                                </Form.Item>
                              </Col>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Col style={{ width: "50%", marginLeft: "15px" }}>
                                <div style={{ textAlign: "left" }}>Gender</div>
                                <Form.Item
                                  initialValue="Male"
                                  // label="Courses"
                                  style={{ textAlign: "left" }}
                                  name="genderExisiting"
                                  rules={[]}>
                                  <Select placeholder="Gender" size="middle">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col style={{ width: "50%", marginLeft: "15px" }}>
                                <div style={{ textAlign: "left" }}>
                                  Birth Date
                                </div>
                                <Form.Item
                                  // initialValue="22-04-2000"
                                  // label="Courses"
                                  style={{ textAlign: "left" }}
                                  name="birthDateExisiting"
                                  rules={[]}>
                                  <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder="Birth Date"
                                  />
                                </Form.Item>
                              </Col>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Col style={{ width: "50%", marginLeft: "15px" }}>
                                <div style={{ textAlign: "left" }}>
                                  Religion
                                </div>
                                <Form.Item
                                  initialValue="Muslim"
                                  // label="Courses"
                                  style={{ textAlign: "left" }}
                                  name="religionExisiting"
                                  rules={[]}>
                                  <Input placeholder="Religion" size="middle" />
                                </Form.Item>
                              </Col>
                              <Col style={{ width: "50%", marginLeft: "15px" }}>
                                <div style={{ textAlign: "left" }}>
                                  Admission Number
                                </div>
                                <Form.Item
                                  initialValue="1234"
                                  // label="Courses"
                                  style={{ textAlign: "left" }}
                                  name="admissionNumberExisiting"
                                  rules={[]}>
                                  <Input
                                    placeholder="Admission Number"
                                    size="middle"
                                  />
                                </Form.Item>
                              </Col>
                            </div>
                          </>
                        </div>
                        <div style={{ width: "22%", marginTop: 17 }}>
                          <div>
                            <div
                              style={{
                                display: "flex",
                                marginLeft: 5,
                                height: 205,
                                width: 205,
                              }}>
                              <div className="setUploadSize setSizeClassName">
                                <ImgCrop rotate>
                                  <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}>
                                    {fileList.length < 1 && "+ Upload"}
                                  </Upload>
                                </ImgCrop>
                              </div>
                            </div>
                            <Modal
                              open={previewOpen}
                              title={previewTitle}
                              footer={null}
                              onCancel={handleCancel}>
                              <img
                                alt="example"
                                style={{
                                  width: "100%",
                                }}
                                src={previewImage}
                              />
                            </Modal>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Row style={{ marginTop: -5 }}>
                          <Col style={{ width: "37.7%", marginLeft: "15px" }}>
                            <div style={{ textAlign: "left" }}>Class</div>
                            <Form.Item
                              initialValue="Grade 9"
                              // label="Courses"
                              style={{ textAlign: "left" }}
                              name="classExisiting"
                              rules={[]}>
                              <Select placeholder="Class" size="middle">
                                <Option value="Grade 1">Grade 1</Option>
                                <Option value="Grade 2">Grade 2</Option>
                                <Option value="Grade 3">Grade 3</Option>
                                <Option value="Grade 4">Grade 4</Option>
                                <Option value="Grade 5">Grade 5</Option>
                                <Option value="Grade 6">Grade 6</Option>
                                <Option value="Grade 7">Grade 7</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col style={{ width: "37.7%", marginLeft: "15px" }}>
                            <div style={{ textAlign: "left" }}>Section</div>
                            <Form.Item
                              initialValue="B"
                              // label="Courses"
                              style={{ textAlign: "left" }}
                              name="sectionExisiting"
                              rules={[]}>
                              <Select placeholder="Section" size="middle">
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                                <Option value="D">D</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col style={{ width: "20.1%", marginLeft: "10px" }}>
                            <div style={{ textAlign: "left" }}>Roll Number</div>
                            <Form.Item
                              initialValue="0346"
                              // label="Courses"
                              style={{ textAlign: "left" }}
                              name="rollNumberExisiting"
                              rules={[]}>
                              <Input placeholder="Roll Number" size="middle" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <div>
                          <Title
                            level={4}
                            style={{
                              textAlign: "left",
                              marginTop: -10,
                              marginLeft: 15,
                            }}>
                            Parent Guardian information
                          </Title>
                        </div>

                        <div>
                          <Row style={{ marginTop: "0px" }}>
                            <Col style={{ width: "31.5%", marginLeft: "15px" }}>
                              <div style={{ textAlign: "left" }}>
                                First Name
                              </div>
                              <Form.Item
                                initialValue="Mola"
                                // label="Courses"
                                style={{ textAlign: "left" }}
                                name="parentFirstNameExisiting">
                                <Input placeholder="First Name" size="middle" />
                              </Form.Item>
                            </Col>
                            <Col style={{ width: "31.5%", marginLeft: "15px" }}>
                              <div style={{ textAlign: "left" }}>Last Name</div>
                              <Form.Item
                                // label="Courses"
                                initialValue="Shafi"
                                style={{ textAlign: "left" }}
                                name="parentLastNameExisiting"
                                rules={[]}>
                                <Input placeholder="Last Name" size="middle" />
                              </Form.Item>
                            </Col>
                            <Col style={{ width: "31.9%", marginLeft: "15px" }}>
                              <div style={{ textAlign: "left" }}>Relation</div>
                              <Form.Item
                                initialValue="Father"
                                // label="Courses"
                                style={{ textAlign: "left" }}
                                name="parentRelationExisiting"
                                rules={[]}>
                                <Input placeholder="Relation" size="middle" />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: "0px" }}>
                            <Col style={{ width: "31.5%", marginLeft: "15px" }}>
                              <div style={{ textAlign: "left" }}>
                                Phone Number
                              </div>
                              <Form.Item
                                initialValue="+25965778789"
                                // label="Courses"
                                style={{ textAlign: "left" }}
                                name="parentPhoneNumberExisiting"
                                rules={[]}>
                                <Input
                                  style={{ width: "100%" }}
                                  placeholder="Phone Number"
                                  size="middle"
                                />
                              </Form.Item>
                            </Col>
                            <Col style={{ width: "31.5%", marginLeft: "15px" }}>
                              <div style={{ textAlign: "left" }}>Email</div>
                              <Form.Item
                                initialValue="icbr19fl@gmail.com"
                                // label="Courses"
                                style={{ textAlign: "left" }}
                                name="emailExisiting"
                                rules={[]}>
                                <Input
                                  type="email"
                                  placeholder="default size"
                                  size="middle"
                                />
                              </Form.Item>
                            </Col>
                            <Col style={{ width: "31.9%", marginLeft: "15px" }}>
                              <div style={{ textAlign: "left" }}>Province</div>
                              <Form.Item
                                initialValue="Yeka"
                                // label="Courses"
                                style={{ textAlign: "left" }}
                                name="provinceExisiting"
                                rules={[]}>
                                <Input placeholder="Province" size="middle" />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row style={{ marginTop: "0px" }}>
                            <Col style={{ width: "31.5%", marginLeft: "15px" }}>
                              <div style={{ textAlign: "left" }}>Street</div>
                              <Form.Item
                                initialValue="Abado"
                                // label="Courses"
                                style={{ textAlign: "left" }}
                                name="streetExisiting"
                                rules={[]}>
                                <Input placeholder="street" size="middle" />
                              </Form.Item>
                            </Col>
                            <Col style={{ width: "31.5%", marginLeft: "15px" }}>
                              <div style={{ textAlign: "left" }}>
                                House Number
                              </div>
                              <Form.Item
                                initialValue="234/23"
                                // label="Courses"
                                style={{ textAlign: "left" }}
                                name="houseNumberExisiting"
                                rules={[]}>
                                <Input
                                  placeholder="default size"
                                  size="middle"
                                />
                              </Form.Item>
                            </Col>
                            <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                              {/* <div style={{ textAlign: "left" }}>Province</div> */}
                              <Form.Item shouldUpdate>
                                {() => (
                                  <Button
                                    style={{ width: "100%", marginTop: 22 }}
                                    type="primary"
                                    htmlType="submit">
                                    Save Student
                                  </Button>
                                )}
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </>
                  </div>
                ) : (
                  ""
                )}
                {contextHolder}
              </div>
            </Form>
          </div>
          <div className="form-admissionTwoContainer sign-in-admissionTwoContainer">
            <Form
              form={form}
              onFinish={onFinish}
              className="admissionForm"
              action="#">
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    <Title
                      level={3}
                      style={{
                        textAlign: "left",
                        marginTop: 5,
                        marginLeft: 15,
                      }}>
                      Student Admission
                    </Title>
                  </div>
                  <div style={{ textAlign: "right", marginLeft: 639 }}>
                    <Form.Item shouldUpdate>
                      {() => (
                        <Button
                          style={{ marginTop: 5 }}
                          type="primary"
                          htmlType="submit">
                          Save Student
                        </Button>
                      )}
                    </Form.Item>
                  </div>
                </div>

                <>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "22%", marginTop: 17 }}>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            marginLeft: 15,
                            height: 205,
                            width: 205,
                          }}>
                          <div className="setUploadSize setSizeClassName">
                            <ImgCrop rotate>
                              <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}>
                                {fileList.length < 1 && "+ Upload"}
                              </Upload>
                            </ImgCrop>
                          </div>
                        </div>
                        <Modal
                          open={previewOpen}
                          title={previewTitle}
                          footer={null}
                          onCancel={handleCancel}>
                          <img
                            alt="example"
                            style={{
                              width: "100%",
                            }}
                            src={previewImage}
                          />
                        </Modal>
                      </div>
                    </div>
                    <div style={{ width: "78%" }}>
                      <>
                        <div style={{ marginTop: "10px", display: "flex" }}>
                          <Col style={{ width: "50%", marginLeft: "15px" }}>
                            <div style={{ textAlign: "left" }}>First Name</div>
                            <Form.Item
                              style={{ textAlign: "left" }}
                              name="firstName">
                              <Input
                                style={{ width: "100%" }}
                                placeholder="First Name"
                                size="middle"
                              />
                            </Form.Item>
                          </Col>
                          <Col style={{ width: "50%", marginLeft: "15px" }}>
                            <div style={{ textAlign: "left" }}>Last Name</div>
                            <Form.Item
                              style={{ textAlign: "left" }}
                              name="lastName"
                              rules={[]}>
                              <Input placeholder="Last Name" size="middle" />
                            </Form.Item>
                          </Col>
                        </div>
                        <div style={{ display: "flex" }}>
                          <Col style={{ width: "50%", marginLeft: "15px" }}>
                            <div style={{ textAlign: "left" }}>Gender</div>
                            <Form.Item
                              // label="Courses"
                              style={{ textAlign: "left" }}
                              name="gender"
                              rules={[]}>
                              <Select placeholder="Gender" size="middle">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col style={{ width: "50%", marginLeft: "15px" }}>
                            <div style={{ textAlign: "left" }}>Birth Date</div>
                            <Form.Item
                              // label="Courses"
                              style={{ textAlign: "left" }}
                              name="birthDate"
                              rules={[]}>
                              <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Birth Date"
                              />
                            </Form.Item>
                          </Col>
                        </div>
                        <div style={{ display: "flex" }}>
                          <Col style={{ width: "50%", marginLeft: "15px" }}>
                            <div style={{ textAlign: "left" }}>Religion</div>
                            <Form.Item
                              // label="Courses"
                              style={{ textAlign: "left" }}
                              name="religion"
                              rules={[]}>
                              <Input placeholder="Religion" size="middle" />
                            </Form.Item>
                          </Col>
                          <Col style={{ width: "50%", marginLeft: "15px" }}>
                            <div style={{ textAlign: "left" }}>
                              Admission Number
                            </div>
                            <Form.Item
                              // label="Courses"
                              style={{ textAlign: "left" }}
                              name="admissionNumber"
                              rules={[]}>
                              <Input
                                placeholder="Admission Number"
                                size="middle"
                              />
                            </Form.Item>
                          </Col>
                        </div>
                      </>
                    </div>
                  </div>
                  <div>
                    <Row style={{ marginTop: -5 }}>
                      <Col style={{ width: "21.2%", marginLeft: "15px" }}>
                        <div style={{ textAlign: "left" }}>Class</div>
                        <Form.Item
                          // label="Courses"
                          style={{ textAlign: "left" }}
                          name="class"
                          rules={[]}>
                          <Select placeholder="Class" size="middle">
                            <Option value="Grade 1">Grade 1</Option>
                            <Option value="Grade 2">Grade 2</Option>
                            <Option value="Grade 3">Grade 3</Option>
                            <Option value="Grade 4">Grade 4</Option>
                            <Option value="Grade 5">Grade 5</Option>
                            <Option value="Grade 6">Grade 6</Option>
                            <Option value="Grade 7">Grade 7</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col style={{ width: "37.5%", marginLeft: "8px" }}>
                        <div style={{ textAlign: "left" }}>Section</div>
                        <Form.Item
                          // label="Courses"
                          style={{ textAlign: "left" }}
                          name="section"
                          rules={[]}>
                          <Select placeholder="Section" size="middle">
                            <Option value="A">A</Option>
                            <Option value="B">B</Option>
                            <Option value="C">C</Option>
                            <Option value="D">D</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col style={{ width: "37.3%", marginLeft: "15px" }}>
                        <div style={{ textAlign: "left" }}>Roll Number</div>
                        <Form.Item
                          // label="Courses"
                          style={{ textAlign: "left" }}
                          name="rollNumber"
                          rules={[]}>
                          <Input placeholder="Roll Number" size="middle" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <div>
                      <Title
                        level={4}
                        style={{
                          textAlign: "left",
                          marginTop: 0,
                          marginLeft: 15,
                        }}>
                        Parent Guardian information
                      </Title>
                    </div>

                    <div>
                      <Row style={{ marginTop: "0px" }}>
                        <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                          <div style={{ textAlign: "left" }}>First Name</div>
                          <Form.Item
                            // label="Courses"
                            style={{ textAlign: "left" }}
                            name="parentFirstName">
                            <Input placeholder="First Name" size="middle" />
                          </Form.Item>
                        </Col>
                        <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                          <div style={{ textAlign: "left" }}>Last Name</div>
                          <Form.Item
                            // label="Courses"
                            style={{ textAlign: "left" }}
                            name="parentLastName"
                            rules={[]}>
                            <Input placeholder="Last Name" size="middle" />
                          </Form.Item>
                        </Col>
                        <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                          <div style={{ textAlign: "left" }}>Relation</div>
                          <Form.Item
                            // label="Courses"
                            style={{ textAlign: "left" }}
                            name="parentRelation"
                            rules={[]}>
                            <Input placeholder="Relation" size="middle" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "0px" }}>
                        <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                          <div style={{ textAlign: "left" }}>Phone Number</div>
                          <Form.Item
                            // label="Courses"
                            style={{ textAlign: "left" }}
                            name="parentPhoneNumber"
                            rules={[]}>
                            <Input
                              style={{ width: "100%" }}
                              placeholder="Phone Number"
                              size="middle"
                            />
                          </Form.Item>
                        </Col>
                        <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                          <div style={{ textAlign: "left" }}>Email</div>
                          <Form.Item
                            // label="Courses"
                            style={{ textAlign: "left" }}
                            name="email"
                            rules={[]}>
                            <Input
                              type="email"
                              placeholder="default size"
                              size="middle"
                            />
                          </Form.Item>
                        </Col>
                        <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                          <div style={{ textAlign: "left" }}>Province</div>
                          <Form.Item
                            // label="Courses"
                            style={{ textAlign: "left" }}
                            name="province"
                            rules={[]}>
                            <Input placeholder="Province" size="middle" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "0px" }}>
                        <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                          <div style={{ textAlign: "left" }}>Street</div>
                          <Form.Item
                            // label="Courses"
                            style={{ textAlign: "left" }}
                            name="street"
                            rules={[]}>
                            <Input placeholder="street" size="middle" />
                          </Form.Item>
                        </Col>
                        <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                          <div style={{ textAlign: "left" }}>House Number</div>
                          <Form.Item
                            // label="Courses"
                            style={{ textAlign: "left" }}
                            name="houseNumber"
                            rules={[]}>
                            <Input placeholder="default size" size="middle" />
                          </Form.Item>
                        </Col>
                        <Col style={{ width: "30.5%", marginLeft: "15px" }}>
                          {/* <div style={{ textAlign: "left" }}>Province</div> */}
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div style={{ marginTop: 9 }}>
                    <Collapse
                      //   style={{ marginBottom: -30 }}
                      expandIcon={({ isActive }) => (
                        <PlusOutlined rotate={isActive ? 90 : 0} />
                      )}
                      bordered={false}
                      defaultActiveKey={["1"]}
                      onChange={(key) => {
                        console.log(key);
                      }}>
                      <Panel
                        style={{ textAlign: "left" }}
                        header="Add Sibling"
                        key="1">
                        <Col style={{ width: "100%" }}>
                          <div
                            style={{
                              textAlign: "left",
                              margin: 0,
                            }}>
                            Class
                          </div>
                          <Row>
                            <Form.Item
                              name="siblingClass"
                              style={{ width: "100%" }}>
                              <Select
                                style={{ textAlign: "left" }}
                                placeholder="Select Class">
                                <Option value="Grade 1">Grade 1</Option>
                                <Option value="Grade 2">Grade 2</Option>
                                <Option value="Grade 3">Grade 3</Option>
                                <Option value="Grade 4">Grade 4</Option>
                                <Option value="Grade 5">Grade 5</Option>
                                <Option value="Grade 6">Grade 6</Option>
                                <Option value="Grade 7">Grade 7</Option>
                              </Select>
                            </Form.Item>
                          </Row>
                          <div style={{ textAlign: "left", margin: 0 }}>
                            Section
                          </div>
                          <Row>
                            <Form.Item
                              name="siblingSection"
                              style={{ width: "100%" }}>
                              <Select
                                style={{ textAlign: "left", width: "100%" }}
                                placeholder="Select Section">
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                                <Option value="D">D</Option>
                              </Select>
                            </Form.Item>
                          </Row>
                          <div style={{ textAlign: "left", margin: 0 }}>
                            Name
                          </div>
                          <Row>
                            <Form.Item
                              name="siblingName"
                              style={{ width: "100%" }}>
                              <Input placeholder="Enter Name" />
                            </Form.Item>
                          </Row>
                        </Col>
                      </Panel>
                    </Collapse>
                  </div>
                </>
              </div>
            </Form>
          </div>
          <div className="admissionOverlay-admissionTwoContainer">
            <div className="admissionOverlay">
              <div
                className="admissionOverlay-panel admissionOverlay-left"
                style={{ marginTop: 160 }}>
                <h1 className="admissionHOne" style={{ marginTop: -610 }}>
                  Welcome Back!
                </h1>
                <p className="admissionP">
                  Please Search For Id To Check If Already Existing!
                </p>
                <button
                  style={{ marginTop: 330 }}
                  className="admissionButton ghost"
                  id="signIn"
                  onClick={() => {
                    setSignupButtonClick("");
                    setIsExists(false);
                  }}>
                  New Comer
                </button>
              </div>
              <div
                className="admissionOverlay-panel admissionOverlay-right"
                style={{ marginTop: 160 }}>
                <h1 className="admissionHOne" style={{ marginTop: -610 }}>
                  Hello, and Welcome!
                </h1>
                <p className="admissionP">
                  We Appreciate Your Decision To Join Us!
                </p>
                <div>
                  <button
                    style={{ marginTop: 330 }}
                    className="admissionButton ghost "
                    id="signUp"
                    onClick={() => {
                      setSignupButtonClick("right-panel-active");
                    }}>
                    Already Existing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionTwo;
