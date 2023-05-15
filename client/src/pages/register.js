import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  Space,
  Steps,
  Form,
  Input,
  ConfigProvider,
  Select,
  DatePicker,
  message,
} from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  InfoCircleOutlined,
  HeatMapOutlined,
  ContactsOutlined,
  CheckCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import _ from "lodash";
import "../Style.css";

const Register = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [updatedUser, setUpdatedUser] = useState(null);
  // const [personalDetails, setPersonalDetails] = useState(null);
  // const [addressDetails, setAddressDetails] = useState(null);
  // const [passwordDetails, setPasswordDetails] = useState(null);
  const [personalDetails, setPersonalDetails] = useState(
    selectedUser
      ? {
          firstName: selectedUser.firstName,
          lastName: selectedUser.lastName,
          email: selectedUser.email,
          phone: selectedUser.phone,
          userType: selectedUser.userType,
          userStatus: selectedUser.userStatus,
          joinedActivities: selectedUser.joinedActivities,
        }
      : null
  );
  const [addressDetails, setAddressDetails] = useState(
    selectedUser && selectedUser.address
      ? {
          city: selectedUser.address.city,
          neighborhood: selectedUser.address.neighborhood,
          postalCode: selectedUser.address.postalCode,
        }
      : null
  );
  const [passwordDetails, setPasswordDetails] = useState(
    selectedUser
      ? {
          password: selectedUser.password,
          repassword: selectedUser.password,
        }
      : null
  );

  // Go back to previous step
  const goBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      navigate(-1);
    }
  };

  function disabledStep(stepNo) {
    if (stepNo === 0 || stepNo === 1) return false;
    else if (stepNo === 2) return addressDetails === null;
    else if (stepNo === 3) return passwordDetails === null;
    else
      return (
        personalDetails === null ||
        addressDetails === null ||
        passwordDetails === null
      );
  }

  const onFinishStepZero = () => {
    setCurrent(1);
  };

  function Disclaimer({ onFinish }) {
    return (
      <Form
        className="formStyle"
        onFinish={onFinish}
        wrapperCol={{ offset: 0 }}
      >
        <Form.Item>
          <Space className="messageBoxStyle" direction="vertical">
            <h2>{t("Messages.normalUserReg")}</h2>
            <Button
              className="buttonStyle"
              type="default"
              onClick={() => navigate("/addAssociation")}
            >
              {t("Buttons.addAssoc")}
            </Button>
          </Space>
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
  useEffect(() => {
    console.log(
      "Register UseEffect : SelectedUser: ",
      selectedUser,
      " personal Details: ",
      personalDetails,
      " address Details: ",
      addressDetails,
      " password Details: ",
      passwordDetails
    );
  }, []);

  const onFinishStepOne = (values) => {
    setPersonalDetails(values);
    setUpdatedUser((prevState) => ({
      ...prevState,
      personalDetails: values,
    }));
    console.log("PersonalDetails: ", personalDetails);
    setCurrent(2);
  };

  function PersonalDetailsForm({ onFinish, initialValues }) {
    return (
      <Form
        className="formStyle"
        onFinish={onFinish}
        initialValues={initialValues}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          label={t("RegForm.firstName")}
          name="firstName"
          rules={[{ required: true, message: t("Messages.firstName") }]}
        >
          <Input name="firstName" type="text" />
        </Form.Item>
        <Form.Item
          label={t("RegForm.lastName")}
          name="lastName"
          rules={[{ required: true, message: t("Messages.lastName") }]}
        >
          <Input name="lastName" type="text" />
        </Form.Item>
        <Form.Item
          label={t("RegForm.email")}
          name="email"
          rules={[{ required: true, message: t("Messages.email") }]}
        >
          <Input name="email" type="email" />
        </Form.Item>
        <Form.Item
          label={t("RegForm.phone")}
          name="phone"
          rules={[{ required: true, message: t("Messages.phone") }]}
        >
          <Input name="phone" type="text" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name={"gender"}
          rules={[{ required: true, message: t("Messages.gender") }]}
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Unknown</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Birthdate"
          name={"birthdate"}
          rules={[
            {
              required: true,
              message: "Please select your birthdate",
            },
          ]}
        >
          <DatePicker />
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

  const onFinishStepTwo = (values) => {
    setAddressDetails(values);
    setUpdatedUser((prevState) => ({
      ...prevState,
      addressDetails: values,
    }));
    console.log("addressDetails: ", addressDetails);
    setCurrent(3);
  };

  function AddressDetailsForm({ onFinish, initialValues }) {
    return (
      <Form
        className="formStyle"
        onFinish={onFinish}
        initialValues={initialValues}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          label={t("RegForm.Address.city")}
          name="city"
          rules={[{ required: true, message: t("Messages.city") }]}
        >
          <Input type="text" name="city" />
        </Form.Item>
        <Form.Item
          label={t("RegForm.Address.neighborhood")}
          name="neighborhood"
          rules={[{ required: true, message: t("Messages.neighborhood") }]}
        >
          <Input type="text" name="neighborhood" />
        </Form.Item>
        <Form.Item
          label="Street"
          name="street"
          rules={[{ required: true, message: t("Messages.street") }]}
        >
          <Input type="text" name="street" />
        </Form.Item>
        <Form.Item
          label={t("RegForm.Address.postalCode")}
          name="postalCode"
          rules={[{ required: false, message: t("Messages.postalCode") }]}
        >
          <Input type="number" name="postalCode" />
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
    setPasswordDetails(values);
    setUpdatedUser((prevState) => ({
      ...prevState,
      passwordDetails: values,
    }));
    console.log("PasswordDetails: ", passwordDetails);
    setCurrent(4);
  };

  function PasswordDetailsForm({ onFinish, initialValues }) {
    return (
      <Form
        className="formStyle"
        onFinish={onFinish}
        initialValues={initialValues}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          label={t("RegForm.password")}
          name="password"
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
          <Input.Password name="password" />
        </Form.Item>
        <Form.Item
          name="repassword"
          label={t("RegForm.repassword")}
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
          <Input.Password name="repassword" />
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

  const onFinishLastStep = async () => {
    console.log("User: ", updatedUser);
    if (localStorage.getItem("token")) {
      //const userToUpdate = _.pick(updatedUser, ['firstName', 'lastName', 'email', 'phone', 'password', 'addressDetails']);
      await axios
        .put(`http://localhost:3001/users/${selectedUser._id}`, updatedUser)
        .then((response) => {
          if (response.status === 200) {
            console.log("Updated Successfuly", response.data);
            navigate("/");
          } else console.warn("Failed to update user");
        })
        .catch((err) => {
          console.error("Error updating user ", err);
        });
    } else {
      await axios
        .post("http://localhost:3001/register", updatedUser)
        .then((response) => {
          if (response.status == 200) {
            console.log("posted Successfully ", updatedUser);
            //setSelectedUser(null);
            //setIsAuth(true);
            message.success("Account Created Successfully!");
            navigate("/Login");
          } else {
            console.warn("Failed to Add new user, please check the data");
          }
        });
    }
  };

  function LastForm({ onFinish }) {
    return (
      <Form className="formStyle" onFinish={onFinish}>
        <h1>{t("AssocForm.allset")}</h1>
        <Form.Item wrapperCol={{ offset: 0 }}>
          <Button type="primary" htmlType="submit">
            {t("Buttons.addUser")}
          </Button>
        </Form.Item>
      </Form>
    );
  }

  const forms = [
    <Disclaimer onFinish={onFinishStepZero} />,
    <PersonalDetailsForm
      onFinish={onFinishStepOne}
      initialValues={personalDetails}
    />,
    <AddressDetailsForm
      onFinish={onFinishStepTwo}
      initialValues={addressDetails}
    />,
    <PasswordDetailsForm
      onFinish={onFinishStepThree}
      initialValues={passwordDetails}
    />,
    <LastForm onFinish={onFinishLastStep} />,
  ];

  return (
    <ConfigProvider
      className="fullScreenStyle"
      direction={i18n.language == "en" ? "ltr" : "rtl"}
    >
      <Space direction="vertical">
        <span className="spanStyle">{t("Titles.registerPage")}</span>
        <Steps
          className="stepsStyle"
          onChange={setCurrent}
          current={current}
          items={[
            {
              title: t("Steps.confirm"),
              icon: <UserSwitchOutlined />,
              disabled: disabledStep(0),
            },
            {
              title: t("Steps.userPersonal"),
              icon: <InfoCircleOutlined />,
              disabled: disabledStep(1),
            },
            {
              title: t("Steps.userAddress"),
              icon: <HeatMapOutlined />,
              disabled: disabledStep(2),
            },
            {
              title: t("Steps.userPassword"),
              icon: <ContactsOutlined />,
              disabled: disabledStep(3),
            },
            {
              title: t("Steps.assocFinish"),
              icon: <CheckCircleOutlined />,
              disabled: disabledStep(4),
            },
          ]}
        />
        {forms[current]}
      </Space>
    </ConfigProvider>
  );
};

export default Register;
