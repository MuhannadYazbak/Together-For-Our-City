import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  DatePicker,
  Select,
  Modal,
  message,
} from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, Routes, Route } from "react-router-dom";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// A list of cities in Israel
const cities = [
  'Jerusalem',
  'Tel Aviv',
  'Haifa',
  'Beersheba',
  'Mashhad',
  'Nazareth',
  // Add more cities here
];

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthdate: moment(),
    residence: "",
    gender: "",
  });

  async function addUser(user){
    console.log(user.email + " "+ user.password + " " + user.birthdate);
    try{
        const res = await axios.post("http://localhost:3001/Register", user);
        if(res.status === 200){
          showMessage('Account Created Successfully!');
          navigate("/Login");
        }
    }catch(err){
        console.log("Error happened "+ err);
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
  

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const [showAgreementModal, setShowAgreementModal] = useState(false);

  const [birthdate, setBirthdate] = useState("");

  const handleAgreementClick = (e) => {
    e.preventDefault();
    setShowAgreementModal(true);
  };

  const handleAgreementModalClose = () => {
    setShowAgreementModal(false);
  };

  return (
    <div className="register-container">
    <Form
      {...formItemLayout}
      form={form}
      className="register-form"
      name="register"
      onFinish={addUser}
      initialValues={{ prefix: '86'}}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        tooltip="Password must be at least 8 characters long and include at least one uppercase letter and one digit"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 8,
            message: 'Password must be at least 8 characters long!',
          },
          {
            pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
            message: 'Password must contain at least one uppercase letter and one number!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="firstname"
        label="Firstname"
        rules={[{ required: true, message: 'Please input your firstname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastname"
        label="Lastname"
        rules={[{ required: true, message: 'Please input your lastname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
      name="birthdate"
      label="Birthdate"
      rules={[{ required: true, message: 'Please input your birthdate!'}]}
      >
        <DatePicker 
    style={{ width: '100%' }} 
  />

      </Form.Item>

      <Form.Item
        name="residence"
        label="Residence"
        rules={[
        { required: true, message: 'Please select your residence!' },
        ]}
      >
      <AutoComplete
      options={cities.map((city) => ({ value: city }))}
      filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      placeholder="Select your residence"
    />
</Form.Item>

      <Form.Item
  name="phone"
  label="Phone Number"
  rules={[
    { required: true, message: 'Please input your phone number!' },
    {
      validator: (_, value) => {
        const phoneNumberRegex = /^\+?\d{10,14}$/; // This matches a phone number with 10-14 digits, optionally starting with '+'
        if (value && !phoneNumberRegex.test(value)) {
          return Promise.reject(new Error('Please enter a valid phone number!'));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Input />
</Form.Item>


      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: 'Please input the captcha you got!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item> */}

<Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="#" onClick={handleAgreementClick}>agreement</a>
        </Checkbox>
      </Form.Item>

      <Modal
        title="Agreement"
        open={showAgreementModal}
        onCancel={handleAgreementModalClose}
        footer={null}
      >
        <p>
          Here's the agreement text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel sapien libero.
        </p>
      </Modal>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Register;
