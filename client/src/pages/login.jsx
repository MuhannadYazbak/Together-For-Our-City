import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Space } from "antd";


const Login = () => {
  const navigate = useNavigate();
  //const loggedIn = useContext(isLogged);
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  

  const login = () => {
    setLogged(!logged);
    console.log("logged in  ", { email }, "stauts: ", { logged });
    navigate("/MeetingsHistory");
  };

  return (
    <Space direction="vertical">
      <Form
        className="formStyle"
        form={form}
        onFinish={login}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item wrapperCol={{ offset: 8 }}>
          <span className="associationSubFormTitle">Log In</span>
        </Form.Item>
        <Form.Item label="Email" required={true}>
          <Input
            value={email}
            type="text"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
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
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button className="buttonStyle" type="primary" htmlType="submit">
            Log-In
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            className="buttonStyle"
            type="ghost"
            style={{ color: "blue", backgroundColor: "transparent" }}
            onClick={() => navigate("/ForgotPassword")}
          >
            Forgot My Password
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            className="buttonStyle"
            type="dashed"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Login;
