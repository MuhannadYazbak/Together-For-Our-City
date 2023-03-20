import React, { useState } from "react";
import { Space, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import { ArrowLeftOutlined } from '@ant-design/icons';

const AddNewAssociation = () => {
  const [assocName, setAssocName] = useState("");
  const [description, setDescription] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [website, setWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const navigate = useNavigate();
  const {t, i18n}= useTranslation();
  var contact = {};
  var association = {};

  const newAssociation = () => {
    contact = {
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
    };
    association = {
      name: assocName,
      speciality: speciality,
      contact: contact,
      website: website,
      description: description,
    };
    if (association) {
      console.log(association);
      navigate("/");
    } else {
      console.warn("Bad or missing input, Please check again");
      Form.resetFields([
        assocName,
        speciality,
        description,
        website,
        contactName,
        contactEmail,
        contactPhone,
      ]);
    }
  };

  return (
    <div style={{width: '50vw', height: '50vh'}}>
      <Form
        className="formStyle"
        onFinish={newAssociation}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 10}}
      >
        <Form.Item wrapperCol={{ offset: 11 }}>
          <span className="associationSubFormTitle">
            {t('ADDASSOC.assocD')}
          </span>
        </Form.Item>
        <Form.Item className="formLabelStyle" label={t("ADDASSOC.assocName")} required={true}>
          <Input
            value={assocName}
            type="text"
            onChange={(e) => setAssocName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label={t("ADDASSOC.assocDesc")} required={true}>
          <Input
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item label={t("ADDASSOC.assocSpec")} required={false}>
          <Input
            value={speciality}
            type="text"
            onChange={(e) => setSpeciality(e.target.value)}
          />
        </Form.Item>
        <Form.Item label={t("ADDASSOC.assocWeb")} required={false}>
          <Input
            value={website}
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Form.Item>
        <Form.Item />
        <Form.Item wrapperCol={{ offset: 11 }}>
          <span className="associationSubFormTitle">
            {t('ADDASSOC.contactD')}
          </span>
        </Form.Item>
        <Form.Item label={t("ADDASSOC.contactName")} required={true}>
          <Input
            value={contactName}
            type="text"
            onChange={(e) => setContactName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label={t("ADDASSOC.contactEmail")} required={true}>
          <Input
            value={contactEmail}
            type="email"
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label={t("ADDASSOC.contactPhone")} required={true}>
          <Input
            value={contactPhone}
            type="number"
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 12}}>
          <Button className="buttonStyle" type="primary" htmlType="submit">{t("ADDASSOC.ADD")} </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 12}} >
          <Button
            className="buttonStyle"
            type="dashed"
            onClick={() => navigate(-1)}
            icon={<ArrowLeftOutlined/>}
          >
            {t('ADDASSOC.BACK')}
          </Button>
        </Form.Item>
      </Form>
      </div>
    // </Space>
  );
};

export default AddNewAssociation;
