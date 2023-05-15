import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Button, Space, Steps, Form, Input, ConfigProvider, message } from "antd";
import { ArrowRightOutlined,ArrowLeftOutlined, InfoCircleOutlined, HeatMapOutlined, ContactsOutlined, CheckCircleOutlined, UserSwitchOutlined} from '@ant-design/icons';
import axios from 'axios';
import '../Style.css';



const AddAssociation = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [current, setCurrent] = useState(0);
    const [assocDetails, setAssocDetails] = useState(null);
    const [addressDetails, setAddressDetails] = useState(null);
    const [contactDetails, setContactDetails] = useState(null);
    const [assoc, setAssoc] = useState(null);

    function disabledStep(stepNo){
        if (stepNo === 0  || stepNo === 1) return false;
        else if (stepNo === 2) return addressDetails === null;
        else if (stepNo === 3) return contactDetails === null;
        else return assocDetails === null || addressDetails === null || contactDetails === null;
    };

    const onFinishStepZero = () => {
        setCurrent(1);
    };

// Go back to previous step
  const goBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      navigate(-1);
    }
  };

    function Disclaimer ({onFinish}) {
        return (
            <Form className="formStyle" onFinish={onFinish} wrapperCol={{offset: 0}}>
                <Form.Item>
                    <Space className="messageBoxStyle" direction="vertical">
                        <h2>{t('Messages.orgReg')}</h2>
                        <Button className="buttonStyle" type='default' onClick={()=> navigate('/register')}>{t('Buttons.register')}</Button>
                        </Space>
                    </Form.Item>
                    <Form.Item>
                        <Button className="buttonStyle" type='primary' htmlType="submit" icon={i18n.language !== 'en'? <ArrowRightOutlined/>: <ArrowLeftOutlined/>}>{t('Buttons.next')}</Button>
                        <Button className="buttonStyle" type='default' onClick={()=> navigate(-1)} icon={i18n.language !== 'en' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}>{t('Buttons.back')}</Button>
                    </Form.Item>
            </Form>
        )
    }

    const  onFinishStepOne = (values) =>{
        console.log('values: ', values);
        setAssocDetails(values);
        setAssoc((prevState)=> ({
            ...prevState,
            assocDetails: values
        }));
        console.log('AssocDetails: ', assocDetails);
        setCurrent(2);
    }

    function AssocDetailsForm  ({onFinish, initialValues}) {
        return (
            <Form className="formStyle" onFinish={onFinish} initialValues={initialValues} labelCol={{span: 10}} wrapperCol={{span: 10}}>
                <Form.Item label={t('AssocForm.assocName')} name='assocName'  rules={[{ required: true, message: t('Messages.assocName')}]}>
                    <Input type='text' name='assocName' />
                </Form.Item>
                <Form.Item label={t('AssocForm.assocDescription')} name='assocDescription'  rules={[{ required: true, message: t('Messages.assocDescription')}]}>
                    <Input type='text' name='assocDescription' />
                </Form.Item>
                <Form.Item label={t('AssocForm.assocSpeciality')} name='assocSpeciality'  rules={[{ required: true, message: t('Messages.assocSpeciality')}]}>
                    <Input type='text' name='assocSpeciality' />
                </Form.Item>
                <Form.Item label={t('AssocForm.assocWebSite')} name='assocWebsite'  rules={[{ required: true, message: t('Messages.assocWebSite')}]}>
                    <Input type='text' name='assocWebsite'  />
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
        )
    }

    const  onFinishStepTwo = (values) =>{
        setAddressDetails(values);
        console.log('Address: ', addressDetails);
        setAssoc((prevState)=> ({
            ...prevState,
            addressDetails: values
        }));
        setCurrent(3);
    }

    function AddressDetailsForm  ({onFinish, initialValues}) {
        return (
            <Form className="formStyle" onFinish={onFinish} initialValues={initialValues} labelCol={{span: 10}} wrapperCol={{span: 10}}>
                <Form.Item label={t('AssocForm.assocAddressCity')} name='city'  rules={[{ required: true, message: t('Messages.city')}]}>
                    <Input type='text' name='city' />
                </Form.Item>
                <Form.Item label={t('AssocForm.assocAddressNeighborhood')} name='neighborhood' rules={[{ required: true, message: t('Messages.neighborhood')}]}>
                    <Input type='text' name='neighborhood' />
                </Form.Item>
                <Form.Item label={t('AssocForm.assocAddressStreet')} name='street' rules={[{ required: true, message: t('Messages.street')}]}>
                    <Input type='text' name='street' />
                </Form.Item>
                <Form.Item label={t('AssocForm.assocAddressPostalCode')} name='postalCode' rules={[{ required: false, message: t('Messages.postalCode')}]}>
                    <Input type='number' name='postalCode' />
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
        )
    }

    const  onFinishStepThree = (values) =>{
        setContactDetails(values);
        console.log('Contact: ', contactDetails);
        setAssoc((prevState)=> ({
            ...prevState,
            contactDetails: values
        }));
        setCurrent(4);
    }

    function ContactDetailsForm  ({onFinish, initialValues}) {
        return (
            <Form className="formStyle" onFinish={onFinish} initialValues={initialValues} labelCol={{span: 10}} wrapperCol={{span: 10}}>
                <Form.Item label={t('AssocForm.assocContactFirstName')} name='firstName'  rules={[{ required: true, message: t('Messages.firstName')}]}>
                    <Input type='text' name='firstName' />
                </Form.Item>
                <Form.Item label={t('AssocForm.assocContactLastName')} name='lastName'  rules={[{ required: true, message: t('Messages.lastName')}]}>
                    <Input type='text' name='lastName' />
                </Form.Item>
                <Form.Item label={t('AssocForm.assocContactEmail')} name='email' rules={[{ required: true, message: t('Messages.email')}]}>
                    <Input type='email' name='email' />
                </Form.Item>
                <Form.Item label={t('AssocForm.assocContactPhone')} name='phone' rules={[{ required: true, message: t('Messages.phone')}]}>
                    <Input type='text' name='phone' />
                </Form.Item>
                <Form.Item
          name="password"
          label={t('AssocForm.assocContactPassword')}
          tooltip="Password must be at least 8 characters long and include at least one uppercase letter and one digit"
          rules={[
            {
              required: true,
              message: t('Messages.password'),
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
          <Input.Password name='password'/>
        </Form.Item>
        <Form.Item
          name="repassword"
          label={t('AssocForm.assocContactRepassword')}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t('Messages.repassword'),
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
          <Input.Password name='repassword'/>
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
        )
    }

    const onFinishLastStep = async () => {
            await axios.post("http://localhost:3001/AddOrganization", assoc).then((response)=>{
                if (response.status == 200){
                    console.log("posted Successfully ", assoc);
                    message.success("Account Created Successfully!");
                    navigate("/Login");
                } else {
                    console.warn('Failed to Add new user, please check the data');
                }
            })
    };

    function LastForm ({onFinish}){
        return (
            <Form className="formStyle" onFinish={onFinish}>
                <Form.Item wrapperCol={{offset: 10}}>
                    <h1>{t('AssocForm.allset')}</h1>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 0}}>
                    <Button className="buttonStyle" type='primary' htmlType="submit">{t('Buttons.addAssoc')}</Button>
                </Form.Item>
            </Form>
        )
    }

    const forms = [
        <Disclaimer onFinish={onFinishStepZero} />,
        <AssocDetailsForm onFinish={onFinishStepOne} initialValues={assocDetails} />,
        <AddressDetailsForm onFinish={onFinishStepTwo} initialValues={addressDetails} />,
        <ContactDetailsForm onFinish={onFinishStepThree} initialValues={contactDetails} />,
        <LastForm onFinish={onFinishLastStep} />,
    ];

    return (
    <ConfigProvider className='fullScreenStyle' direction={ i18n.language == 'en' ? "ltr": "rtl"}>
    <Space direction="vertical">
        <span className='spanStyle'>{t('Titles.addAssociationPage')}</span>
        <Steps className="stepsStyle" onChange={setCurrent} current={current} items={[
            { title: t('Steps.confirm'), icon: <UserSwitchOutlined />, disabled: disabledStep(0) },
            { title: t('Steps.assocDetails'), icon: <InfoCircleOutlined />, disabled: disabledStep(1)},
            { title:t('Steps.assocAddress'), icon: <HeatMapOutlined />, disabled: disabledStep(2)},
            { title: t('Steps.assocContact'), icon: <ContactsOutlined />, disabled: disabledStep(3)},
            { title: t('Steps.assocFinish'), icon: <CheckCircleOutlined />, disabled: disabledStep(4)}
        ]}
            />
        {forms[current]}
    </Space>
    </ConfigProvider>
    )}

export default AddAssociation;