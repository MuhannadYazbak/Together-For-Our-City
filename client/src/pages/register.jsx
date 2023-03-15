import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Form, Input, Button, Layout } from "antd";
const { Content } = Layout;

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  var current;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetUser = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const createUser = () => {
    if (user.password === user.confirmPassword) {
      console.log("password matched");
      console.log("New user: ", user);
      form.resetFields();
    } else {
      console.warn("Passwords did not match");
      form.setFieldsValue({ password: "", confirmPassword: "" });
    }
  };

  useEffect(() => {
    // console.log(user)
  }, [user, ""]);

  useEffect(() => {
    console.log("Password change");
  }, [user.password, user.confirmPassword, ""]);

  return (
    <Content className="fullScreenStyle">
      <Form
        form={form}
        className="formStyle"
        onFinish={createUser}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item wrapperCol={{ offset: 10 }}>
          <span className="associationSubFormTitle">New User Register</span>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "First Name is required" }]}
          label="First Name"
          name="firstName"
        >
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Last Name is required" }]}
          label="Last Name"
          name="lastName"
        >
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Email should contain prefix, @ and suffix",
            },
          ]}
          label="Email"
          name="email"
        >
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item rules={[{ required: false }]} label="Phone" name="phone">
          <Input
            type="number"
            name="phone"
            placeholder="Phone Number"
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Password is required" }]}
          label="Password"
          name="password"
        >
          <Input
            value={user.password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Confirm Password is required, and must match password",
            },
          ]}
          label="Re-Password"
          name="confirmPassword"
        >
          <Input
            value={user.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Passowrd"
            onChange={(e) => handleChange(e)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button className="buttonStyle" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button
            className="buttonStyle"
            type="dashed"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Register;
