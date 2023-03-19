import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Space } from "antd";
import { useTranslation } from "react-i18next";


const Login = ({setUser, setLogged}) => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    setLogged(true);
    console.log("logged in  ", { email }, "stauts: Logged");
    setUser(email);
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
          <span className="associationSubFormTitle">{t('Login.login')}</span>
        </Form.Item>
        <Form.Item label={t('Login.email')} required={true}>
          <Input
            value={email}
            type="text"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label={t('Login.password')} required={true}>
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
          {t('Login.login')}
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            className="buttonStyle"
            type="ghost"
            style={{ color: "blue", backgroundColor: "transparent" }}
            onClick={() => navigate("/ForgotPassword")}
          >
            {t('Login.forgot')}
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            className="buttonStyle"
            type="dashed"
            onClick={() => navigate(-1)}
          >
            {t('Login.BACK')}
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Login;
