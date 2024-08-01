import React from 'react'

import { Content } from "antd/es/layout/layout";

import { useNavigate } from "react-router-dom";
import { theme } from "antd";

const Signup = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
  return (
    <Content
      style={{
        margin: "0 16px",
      }}
    >
      <div
        className="site-layout-content"
        style={{
          marginTop: "16px",
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "50px" }}>Signup Page</h1>
        {/* <SignupForm/> */}
      </div>
    </Content>
  )
}

export default Signup