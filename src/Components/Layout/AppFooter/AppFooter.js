import { Footer } from "antd/es/layout/layout";
import React from "react";

const AppFooter = () => {
  return (
    <div>
      <Footer
        style={{
          position: "absolute",
          minHeight: "50px",
          background: "PapayaWhip",
          textAlign: "center",
          width: "100%",
        }}>
        SIRM ©2023 Created Eliyas Asefa
      </Footer>
    </div>
  );
};

export default AppFooter;
