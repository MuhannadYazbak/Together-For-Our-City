import React, { useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

const ForgotPassword = () => {
  const navigate = useNavigate();
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
      <Form className="formStyle" onFinish={sendEmail} labelCol={{span: 5}} wrapperCol={{span: 10}}>
        <br/>
        <Form.Item label="Email" required="true">
          <Input
            type="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8}}>
          <Button className="buttonStyle" type="primary" htmlType="submit">
            OK
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8}}>
        <Button className="buttonStyle" type="dashed" onClick={()=> navigate(-1)}>Back</Button>
      </Form.Item>
        <Form.Item wrapperCol={{offset: 5}}>
          <h1>{Response}</h1>
      </Form.Item>
      </Form>
  );
};

export default ForgotPassword;
