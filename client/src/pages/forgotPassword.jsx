import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");

  const onFinish = async () => {
    try {
      const res = await axios.post("http://localhost:3001/ForgotPassword", {
        email,
      });
      if (res.status === 200) {
        // send email
        await axios.post("http://localhost:3001/SendEmail", {
          to: email,
          subject: "Password Reset",
          text: "Please click on this link to reset your password:",
        });
        message.success(
          "An email was sent, follow instructions to change password"
        );
        navigate("/ResetPassword");
      }
    } catch (err) {
      message.error("Email not found, Please check again");
      console.log("Error happened " + err);
    }
  };

  return (
    <div className="forgot-container">
      <Form className="forgot-form" form={form} onFinish={onFinish}>
        <br />
        <Form.Item label={t("Forgot.email")} required="true">
          <Input
            type="Email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button className="forgot-button" type="primary" htmlType="submit">
            {t("Forgot.reset")}
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

export default ForgotPassword;
