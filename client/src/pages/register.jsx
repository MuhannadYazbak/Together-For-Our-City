import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input, Space } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const regNewUser = () => {
    const user = {
      userName: userName,
      email: email,
      password: password,
    };
    console.log(user);
    navigate("/LogIn");
  };

  return (
    <Space direction="vertical">
      <Form className='formStyle' onFinish={regNewUser} labelCol={{span: 8}}>
        <Form.Item label="User Name" required={true}>
          <Input
            name="userName"
            value={userName}
            type="text"
            placeholder="Enter a User Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Email" required={true}>
          <Input
            name="Email"
            value={email}
            placeholder="Enter Your Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password" required={true}>
          <Input
            name="password"
            value={password}
            type="password"
            placeholder="Enter A Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8}}>
          <Button className="buttonStyle" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8}}>
        <Button className="buttonStyle" type="dashed" onClick={() => navigate(-1)}>
        Back
      </Button>
      </Form.Item>
      </Form>
      
    </Space>
  );
};

export default Register;
