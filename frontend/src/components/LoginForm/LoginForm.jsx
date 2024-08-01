import { message, notification, Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../features/login/isLoggedIn/sessionSlice";
import axios from "axios";

// const loginCredentials = [
//   {
//     email: "ammar@admin.com",
//     password: "admin",
//     user_type: "admin",
//   },
//   {
//     email: "ammar.waheed@teacher.com",
//     password: "teacher",
//     user_type: "teacher",
//   },
// ];
const LoginForm = () => {

  //loading indicator message popup
  const [loadingApi, loadingContextHolder] = message.useMessage();
  const showLoading = () => {
    loadingApi.open({
      type: 'loading',
      content: 'Logging in, wait..',
      duration: 0,
    });
  };
  // Dismiss manually and asynchronously
  


  //incorrect login error popup
  const showMessage = () => {
    message.error('Login failed! incorrect username or password.');
  };
  
  
  //login notification popup
const showNotification = (username, ) => {
  notification.success({
    message: 'Successfully logged in!',
    description: `Hello ${username}! You have successfully logged in.`,
    placement: 'topLeft',
  });
};
//use the useSelector hook to get the value of isLoggedIn redux state
const {isLoggedIn, userType} = useSelector((state) => state.session); 

const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {    
    console.log("Success:", values);
    showLoading();

    try {
      const response = await axios.post("/login", values);
      const loginCredentials = response.data;
    const matchedCredentials = loginCredentials.find(
      (cred) => cred.username === values.username && cred.password === values.password
    );

    if (matchedCredentials) {
      // set the boolean in redux state
      dispatch(
        setSession({
          isLoggedIn: true,
          username: matchedCredentials.username,
          user_id: matchedCredentials.id,
        })
      );
        showNotification(matchedCredentials.username);
      navigate("/notes");
    } else {
      showMessage();  
      console.log("Invalid credentials");
    }
    } catch (error) {
      if(error.response){
        message.error(error.response.data.message);
      }
    } finally {
    // Dismiss manually and asynchronously
      setTimeout(() => loadingApi.destroy(), 250);
    }
  };

  // useNavigate to route to user views
  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //put the boolean in localstorage
  // localStorage.setItem("loggedIn", loggedIn);

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
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
