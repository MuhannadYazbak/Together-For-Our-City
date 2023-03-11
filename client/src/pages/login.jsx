import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Space } from "antd";
// import { useForm } from "antd/es/form/Form";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const { form } = useForm();
  const login = () => {
    console.log("logged in  ", { userName });
  };
  return (
    <Space direction="vertical">
      <Form className='formStyle' onFinish={login} labelCol={{span: 8}}>
        <Form.Item label="User Name" required={true}>
          <Input
            value={userName}
            type="text"
            placeholder="Enter Your User Name"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Password" required={true}>
          <Input
            value={password}
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 1}}>
          <Button className="buttonStyle" type="primary" htmlType="submit">
            Log-In
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 1}}>
        <Button
          className="buttonStyle"
          type="ghost"
          style={{ color: "blue", backgroundColor: 'transparent' }}
          onClick={() => navigate("/ForgotPassword")}
        >
          Forgot My Password
        </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 1}}>
        <Button className="buttonStyle" type="dashed" onClick={() => navigate(-1)}  >
          Back
        </Button>
        </Form.Item>
        </Form>
    </Space>
  );
};

export default Login;
