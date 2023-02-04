import Title from "antd/es/typography/Title";
import React from "react";
import "./StudentDetail.css";
const StudentDetail = () => {
  return (
    <div>
      <div>
        <div class="StudentDetailContainerCss">
          <div class="StudentDetailTitle">
            <Title level={3} style={{ textAlign: "left", marginTop: 0 }}>
              Student Admission
            </Title>
          </div>
          <div class="TabsAndDetail">
            <div class="AvailableTabs">Hello</div>
            <div class="TabDetail">Hello</div>
          </div>
          <div class="ProfilePhoto">Hello</div>
          <div class="RoughDetail">Hello</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
