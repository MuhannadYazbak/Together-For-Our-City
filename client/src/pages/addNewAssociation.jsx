import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Steps, Form, Input, Space, message } from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  InfoCircleOutlined,
  HeatMapOutlined,
  ContactsOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "../App.css";
import axios from "axios";

export default function AddNewAssociation() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [assocDetails, setAssocDetails] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);
  const [contactDetails, setContactDetails] = useState(null);
  const [form] = Form.useForm();

  function disabledStep(stepNo) {
    if (stepNo === 0) return false;
    else if (stepNo === 1) return addressDetails === null;
    else if (stepNo === 2) return contactDetails === null;
    else
      return (
        assocDetails === null ||
        addressDetails === null ||
        contactDetails === null
      );
  }

  // Go back to previous step
  const goBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      navigate(-1);
    }
  };

  const onFinishStepOne = (values) => {
    setAssocDetails(values);
    setCurrent(1);
  };

  async function addOrganization(values) {
    console.log(values);
    try {
      const res = await axios.post(
        "http://localhost:3001/AddOrganization",
        values
      );
      if (res.status === 200) {
        message.success("Organization Added Successfully!");
      }
    } catch (err) {
      console.log("Error happened " + err.message);
      message.error("Error happened while adding organization");
    }
  }

  function AssocDetailsForm({ onFinish, initialValues }) {
    return (
      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          label="Association Name"
          name={"associationName"}
          rules={[{ required: true, message: "Please enter association name" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Association Description"
          name={"associationDescription"}
          rules={[
            { required: true, message: "Please enter association description" },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Association Speciality"
          name={"associationSpeciality"}
          rules={[
            { required: true, message: "Please enter association speciality" },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Association Website"
          name={"associationWebsite"}
          rules={[
            { required: true, message: "Please enter association website" },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11 }}>
          <Button
            type="default"
            onClick={goBack}
            icon={<ArrowLeftOutlined />}
            style={{ marginRight: "10px" }}
            disabled={current === 0}
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<ArrowRightOutlined />}
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    );
  }

  const onFinishStepTwo = (values) => {
    setAddressDetails(values);
    setCurrent(2);
  };

  function AddressDetailsForm({ onFinish, initialValues }) {
    return (
      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          label="City"
          name={"city"}
          rules={[{ required: true, message: "Please enter city name" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Neighborhood"
          name={"neighborhood"}
          rules={[
            { required: true, message: "Please enter  neighborhood name" },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Street No"
          name={"streetNo"}
          rules={[{ required: true, message: "Please enter street number" }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Postal code"
          name={"postalCode"}
          rules={[{ required: false, message: "Please enter postal code" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11 }}>
          <Button
            type="default"
            onClick={goBack}
            icon={<ArrowLeftOutlined />}
            style={{ marginRight: "10px" }}
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<ArrowRightOutlined />}
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    );
  }

  const onFinishStepThree = (values) => {
    setContactDetails(values);
    setCurrent(3);
  };

  function ContactDetailsForm({ onFinish, initialValues }) {
    return (
      <Form
        onFinish={onFinish}
        initialValues={initialValues}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          label="Full Name"
          name={"contactFullName"}
          rules={[{ required: true, message: "Please enter contact name" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Email"
          name={"contactEmail"}
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid contact email",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name={"contactPhone"}
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[0-9\b]+$/),
              message: "Please enter a valid phone number",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
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
        <Form.Item wrapperCol={{ offset: 11 }}>
          <Button
            type="default"
            onClick={goBack}
            icon={<ArrowLeftOutlined />}
            style={{ marginRight: "10px" }}
          >
            Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<ArrowRightOutlined />}
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    );
  }
  

  const onFinishLastStep = () => {
    const allDetails = {
      ...assocDetails,
      ...addressDetails,
      associationContact: {
        contactName: contactDetails.contactFullName,
        contactEmail: contactDetails.contactEmail,
        contactPhone: contactDetails.contactPhone,
        password: contactDetails.password,
      },
    };
    addOrganization(allDetails);
    navigate("/");
  };

  function LastForm({ onFinish }) {
    return (
      <Form onFinish={onFinish}>
        <Form.Item wrapperCol={{ offset: 10 }}>
          <h1>All set to add a new association</h1>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 11 }}>
          <Button type="primary" htmlType="submit">
            Add Association
          </Button>
        </Form.Item>
      </Form>
    );
  }

  const forms = [
    <AssocDetailsForm
      onFinish={onFinishStepOne}
      initialValues={assocDetails}
    />,
    <AddressDetailsForm
      onFinish={onFinishStepTwo}
      initialValues={addressDetails}
    />,
    <ContactDetailsForm
      onFinish={onFinishStepThree}
      initialValues={contactDetails}
    />,
    <LastForm onFinish={onFinishLastStep} />,
  ];

  const steps = [
    {
      title: "Association Details",
      icon: <InfoCircleOutlined />,
      disabled: disabledStep(0),
    },
    {
      title: "Association Address",
      icon: <HeatMapOutlined />,
      disabled: disabledStep(1),
    },
    {
      title: "Contact Details",
      icon: <ContactsOutlined />,
      disabled: disabledStep(2),
    },
    {
      title: "Finish",
      icon: <CheckCircleOutlined />,
      disabled: disabledStep(3),
    },
  ];

  return (
    <Space
      style={{ width: "80vw", height: "80vh", overflow: "auto" }}
      direction="vertical"
    >
      <Steps current={current} onChange={setCurrent} items={steps} />
      {forms[current]}
    </Space>
  );
}
