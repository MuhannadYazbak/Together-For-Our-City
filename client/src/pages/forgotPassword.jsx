import React, { useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
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
          <span className="associationSubFormTitle">Forgot Password</span>
        </Form.Item>
        <Form.Item label="Email" required="true">
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
            Reset Password
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 5}}>
        <Button className="buttonStyle" type="dashed" onClick={()=> navigate(-1)}>Back</Button>
      </Form.Item>
        <Form.Item wrapperCol={{offset: 5}}>
          <h1>{Response}</h1>
      </Form.Item>
      </Form>
  );
};

export default ForgotPassword;
