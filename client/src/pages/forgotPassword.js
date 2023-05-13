import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfigProvider , Space, Form,  Button, Input, message } from 'antd';
import {ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined} from '@ant-design/icons';
import axios from 'axios';
import '../Style.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const {t,i18n} = useTranslation();
    const [email, setEmail] = useState('');
    const {form} = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage(); 

    const success = () => {
        messageApi.open({
          type: 'success',
          content: "An email was sent, follow instructions to change password",
        });
      };
    
      const error = () => {
        messageApi.open({
          type: 'error',
          content: "Email not found, Please check again",
        });
      };
    
      const warning = () => {
        messageApi.open({
          type: 'warning',
          content: 'This is a warning message',
        });
      };

    const sendEmail = async () => {
        console.log("Trying to locate ", email);
        try {
          const res = await axios.post("http://localhost:3001/forgotPassword", {
            email,
          });
          if (res.status === 200) {
            // send email
            await axios.post("http://localhost:3001/SendEmail", {
              to: email,
              subject: "Password Reset",
              text: "Please click on this link to reset your password:",
            });
            message.open(success);
            console.log("Email sent to ", email);
            navigate("/resetPassword");
          }
        } catch (err) {
          message.open(error);
          console.log("Error happened " ,JSON.stringify(err));
        }
      };

    return (
        <ConfigProvider className='fullScreenStyle' direction={i18n.language === 'en' ? 'ltr' : 'rtl'}>
            <Space direction='vertical'>
                <Form className='formStyle' form={form} onFinish={sendEmail} labelCol={{span: 10}} wrapperCol={{span: 10}} scrollToFirstError={true}>
                    <Form.Item label='Email' name='email' rules={[{required: true, message: t('Messages.email')}]}>
                        <Input name='email' type='email' onChange={(e) =>setEmail(e.target.value)}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 0}}>
                        <Button className='buttonStyle' type='primary' htmlType='submit' icon={<CheckOutlined />}>Reset Password</Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 1}}>
                        <Space direction='horizontal'>
                            <Button className='buttonStlye' type='default' onClick={()=> navigate(-1)} icon={i18n.language === 'en' ? <ArrowRightOutlined/>  : <ArrowLeftOutlined />}>{t('Buttons.back')}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Space>
        </ConfigProvider>
    )
};

export default ForgotPassword;
