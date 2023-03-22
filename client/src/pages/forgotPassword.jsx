import React, { useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from '@ant-design/icons';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");

  function sendEmail () {
    if (email != "yazbakm@gmail.com")
      setResponse('Email not found, Please check again');
    else 
      setResponse("An email was send, follow instructions to change password");
    return response;
  };
  return (
      <Form className="formStyle" form={form} onFinish={sendEmail} labelCol={{span: 5}} wrapperCol={{span: 8}}>
        <br/>
        <Form.Item wrapperCol={{offset: 5}}>
          <span className="associationSubFormTitle">{t('Forgot.title')}</span>
        </Form.Item>
        <Form.Item label={t('Forgot.email')} required="true">
          <Input
            type="Email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 5}}>
          <Button className="buttonStyle" type="primary" htmlType="submit">
            {t('Forgot.reset')}
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 5}}>
        <Button className="buttonStyle" type="dashed" onClick={()=> navigate(-1)} icon={<ArrowLeftOutlined />}>{t('Forgot.BACK')}</Button>
      </Form.Item>
        <Form.Item wrapperCol={{offset: 5}}>
          <h1>{Response}</h1>
      </Form.Item>
      </Form>
  );
};

export default ForgotPassword;
