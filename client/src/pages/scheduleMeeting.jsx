import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Space, Button, Select, DatePicker, TimePicker } from "antd";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ScheduleMeeting = () => {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const [volunteerName, setVolunteerName] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();
  var meeting = {};
  var associations = [
    { value: "Almanara", label: t("Schedule.Associations.1") },
    { value: "Oggo", label: t("Schedule.Associations.2") },
    {
      value: "Saint-Anne",
      label: t("Schedule.Associations.3"),
      disabled: true,
    },
  ];

  const makeMeeting = () => {
    meeting = {
      volunteerName: volunteerName,
      associationName: associationName,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
    if (meeting) {
      console.log(meeting);
      navigate("/");
    } else {
      console.warn("Could not schedule, please check the data");
      form.resetFields([
        volunteerName,
        associationName,
        date,
        startTime,
        endTime,
      ]);
    }
  };

  const handleAssociationChange = (value) => {
    setAssociationName(associations[value]);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
  };

  return (
    <Space className="fullScreenStyle" direction="vertical">
      <Form
        className="formStyle"
        form={form}
        onFinish={makeMeeting}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 6 }}
      >
        <Form.Item wrapperCol={{ offset: 10 }}>
          <span className="associationSubFormTitle">{t("Schedule.title")}</span>
        </Form.Item>
        <Form.Item label={t("Schedule.assoc")} required={true}>
          <Select
            value={associationName}
            options={associations}
            defaultValue="Almanara"
            onChange={(e) => handleAssociationChange(e)}
          />
        </Form.Item>
        <Form.Item label={t("Schedule.date")} required={true}>
          <DatePicker value={date} onChange={(e) => handleDateChange(e)} />
        </Form.Item>
        <Form.Item label={t("Schedule.start")} required={true}>
          <TimePicker
            value={startTime}
            onChange={(e) => handleStartTimeChange(e)}
          />
        </Form.Item>
        <Form.Item label={t("Schedule.end")} required={false}>
          <TimePicker
            value={endTime}
            onChange={(e) => handleEndTimeChange(e)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button className="buttonStyle" type="primary" htmlType="submit">
            {t("Schedule.schedule")}
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button
            className="buttonStyle"
            type="dashed"
            onClick={() => navigate(-1)}
            icon={<ArrowLeftOutlined />}
          >
            {t("Schedule.BACK")}
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default ScheduleMeeting;
