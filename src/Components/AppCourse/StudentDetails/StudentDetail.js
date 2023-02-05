import { Image, List, Tabs } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import React from "react";
import "./StudentDetail.css";
import Fee from "./Fee/Fee";
const StudentDetail = () => {
  return (
    <div>
      <div>
        <div class="StudentDetailContainerCss">
          <div class="StudentDetailTitle" style={{ display: "flex" }}>
            <Title level={3} style={{ textAlign: "left", marginTop: 0 }}>
              Student Detail
            </Title>
            <div
              style={{
                alignItems: "right",
                marginBottom: 5,
                marginLeft: "636px",
                marginTop: 3,
              }}>
              <Search
                style={{
                  width: 399,
                  borderRadius: 8,
                }}
                placeholder="input search text"
                // onSearch={onSearch}
                // onChange={onSearchChange}
                // onChange=
                enterButton
              />
            </div>
          </div>
          <div class="ProfilePhoto">
            <Image
              preview={false}
              width={200}
              height={200}
              src="https://s3.amazonaws.com/media.thecrimson.com/photos/2014/11/07/202918_1301040.jpg"
            />
          </div>
          <div class="RoughDetail">
            <div className="UpperEmptyDiv"></div>
            <div className="LowerDetailDiv">
              <div
                className="RoughtDetailsCss"
                style={{
                  borderRadius: 8,
                  textAlign: "center",
                  paddingTop: 5,
                  fontSize: 24,
                  color: "white",
                  width: "20%",
                  height: "30%",
                  marginLeft: "8%",
                  border: "1px solid white",
                }}>
                John Wick
              </div>
              <div
                className="RoughtDetailsCss"
                style={{
                  borderRadius: 8,
                  textAlign: "center",
                  paddingTop: 5,
                  fontSize: 24,
                  color: "white",
                  width: "20%",
                  height: "30%",
                  marginLeft: 15,
                  border: "1px solid white",
                }}>
                Grade 10
              </div>
              <div
                className="RoughtDetailsCss"
                style={{
                  borderRadius: 8,
                  textAlign: "center",
                  paddingTop: 5,
                  fontSize: 24,
                  color: "white",
                  width: "20%",
                  height: "30%",
                  marginLeft: 15,
                  border: "1px solid white",
                }}>
                Section B
              </div>
              <div
                className="RoughtDetailsCss"
                style={{
                  borderRadius: 8,
                  textAlign: "center",
                  paddingTop: 5,
                  fontSize: 24,
                  color: "white",
                  width: "20%",
                  height: "30%",
                  marginLeft: 15,
                  border: "1px solid white",
                }}>
                HIGH034611
              </div>
            </div>
          </div>
          <div class="TabsAndDetail">
            <div class="TabDetail">
              <Tabs
                style={{ marginTop: 10, marginLeft: "10px" }}
                defaultActiveKey="1">
                <Tabs.TabPane tab="Profile" key="1">
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "40%", border: "1px solid black" }}>
                      <Title
                        level={4}
                        style={{ textAlign: "left", marginTop: 0 }}>
                        Personal Details
                      </Title>
                    </div>
                    <div>hello 2</div>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Fee" key="2">
                  <Fee />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Other" key="3">
                  <div>Other</div>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
