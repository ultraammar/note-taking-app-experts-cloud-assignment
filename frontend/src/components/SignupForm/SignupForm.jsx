import React from "react";
import "./SignupForm.scss";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    showLoading();
    try {
      const response = await axios.post("/signup", values);
      console.log(response);
      // 201 status code represents a successful creation
      if (response.status === 201) {
        message.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status) { // if there is a response object with a status code, use it
        const { status } = error.response;
        if (status === 400) {
          message.error(
            "Username already exists. Please choose another username."
          );
        } else if (status === 500) {
          message.error(
            "An error occurred while signing up. Please try again."
          );
        } else {
          message.error("An unexpected error occurred. Please try again.");
        }
      } else {
        // otherwise, use a generic error message
        message.error("An error occurred while signing up. Please try again.");
      }
    }
    // Dismiss manually and asynchronously
    setTimeout(loadingApi.destroy, 2500);
  };

  //loading indicator message popup
  const [loadingApi, loadingContextHolder] = message.useMessage();
  const showLoading = () => {
    loadingApi.open({
      type: "loading",
      content: "Signing up, wait..",
      duration: 0,
    });
  };

  // useNavigate to route to user views

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, width: "100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="login-form"
    >
      {loadingContextHolder}
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Signup!
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
