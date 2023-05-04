import {
  Button,
  Col,
  Form,
  Input,
  Row,
  DatePicker,
  Select,
  message,
} from "antd";
import React, { useState } from "react";
import axios from "axios";

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

const AddActivity = () => {
  const [form] = Form.useForm();

  const [activity, setActivity] = useState({
    associationName: "",
    associationSpeciality: "",
    associationDescription: "",
    activityName: "",
    activityDate: "",
    associationAddress: "",
    associationWebsite: "",
    associationContact: "",
  });

  async function addActivity(activity) {
    console.log(activity);
    try {
      const res = await axios.post(
        "http://localhost:3001/AddActivity",
        activity
      );
      if (res.status === 200) {
        showMessage("Activity Added Successfully!");
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
    <div className="register-container">
      <Form
        {...formItemLayout}
        form={form}
        className="register-form"
        name="addActivity"
        onFinish={addActivity}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="associationName"
          label="Association Name"
          rules={[
            {
              required: true,
              message: "Please input the association name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="associationSpeciality"
          label="Association Speciality"
          rules={[
            {
              required: true,
              message: "Please input the association speciality!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="associationDescription"
          label="Association Description"
          rules={[
            {
              required: true,
              message: "Please input the association description!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="activityName"
          label="Activity Name"
          rules={[
            {
              required: false,
              message: "Please input the activity name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="activityDate"
          label="Activity Date"
          rules={[
            { required: true, message: "Please input the activity date!" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="associationAddress"
          label="Association Address"
          rules={[
            {
              required: true,
              message: "Please input the association address!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="associationWebsite"
          label="Association Website"
          rules={[
            {
              required: true,
              message: "Please input the association website!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="associationContact"
          label="Association Contact"
          rules={[
            {
              required: true,
              message: "Please input the association contact!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add Activity
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddActivity;
