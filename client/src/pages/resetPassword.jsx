import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Routes, Route } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    residence: "",
    gender: "",
  });

  async function newPassword(user) {
    console.log("New Password: " + user.password);
    try {
      const res = await axios.post(
        "http://localhost:3001/UpdatePassword",
        user
      );
      if (res.status === 200) {
        showMessage("Password Reset Successfully!");
        navigate("/Login");
      }
    } catch (err) {
      console.log("Error happened " + err);
    }
  }

  // Initialize message
  message.config({
    duration: 2, // duration of each message display (in seconds)
    maxCount: 1, // maximum number of messages to display at once
  });

  const showMessage = (m) => {
    message.success(m);
  };

  return (
    <div className="forgot-container">
      <Form
        form={form}
        className="forgot-form"
        name="reset"
        onFinish={newPassword}
        scrollToFirstError
      >
        <br />
        <Form.Item
          name="password"
          label="Password"
          tooltip="Password must be at least 8 characters long and include at least one uppercase letter and one digit"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters long!",
            },
            {
              pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
              message:
                "Password must contain at least one uppercase letter and one number!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button className="forgot-button" type="primary" htmlType="submit">
            Reset
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            className="forgot-button"
            type="dashed"
            onClick={() => navigate(-1)}
            icon={<ArrowLeftOutlined />}
          >
            {t("Forgot.BACK")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
