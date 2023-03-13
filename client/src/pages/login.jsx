import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Space } from "antd";
import {logg} from '../App';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [logg, setLogged] = useState(false);
  // const { form } = useForm();
  const login = () => {
    setLogged(! logged);
    console.log("logged in  ", { userName }, 'stauts: ', {logged});
    navigate('/MeetingsHistory');

  };
  return (
    <Space direction="vertical">
      <Form className='formStyle' form={form} onFinish={login} labelCol={{span: 8}} wrapperCol={{span: 8}}>
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
        <Form.Item wrapperCol={{offset: 8}}>
          <Button className="buttonStyle" type="primary" htmlType="submit">
            Log-In
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8}}>
        <Button
          className="buttonStyle"
          type="ghost"
          style={{ color: "blue", backgroundColor: 'transparent' }}
          onClick={() => navigate("/ForgotPassword")}
        >
          Forgot My Password
        </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8}}>
        <Button className="buttonStyle" type="dashed" onClick={() => navigate(-1)}  >
          Back
        </Button>
        </Form.Item>
        </Form>
    </Space>
  );
};

export default Login;
export const logged = true;