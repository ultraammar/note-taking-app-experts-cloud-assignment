import React from 'react'
import "./SignupForm.scss"
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();



  // useNavigate to route to user views
  

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>SignupForm</div>
  )
}

export default SignupForm