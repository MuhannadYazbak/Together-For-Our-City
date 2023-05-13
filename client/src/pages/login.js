import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Space, Form, Button, Input, ConfigProvider, Modal} from 'antd';
import {LoginOutlined, ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import axios from 'axios';
import '../Style.css';


const LoginPage = ({setUser}) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    let response = null;
    


//Define a function to handle login
async function Login() {
  try {
    // Send a POST request to your login endpoint with the user's credentials
     response = await axios.post('http://localhost:3001/login', {email, password});

    // If the login is successful, extract the token and user data from the response
    const { tkn, ru } = response.data;

    // Store the token and user data in local storage for later use
    localStorage.setItem('token', tkn);
    localStorage.setItem('user', JSON.stringify(ru));
    if (ru.userType === 'Admin'){
     localStorage.setItem('admin', true);
    }
    console.log('status: ',response.status, ' token: ', tkn, ' returned user: ', ru);
    setUser(ru);
    navigate('/');

    // Perform any other necessary tasks, such as redirecting to a dashboard page
  } catch (error) {
    setShowErrorMessage(true);
    // If the login fails, handle the error appropriately (e.g. display an error message)
  }
}

function onOk(){
    setShowErrorMessage(false);
    form.resetFields();
};

// useEffect(()=>{
//     console.log("useEffect");

// },[showErrorMessage, response])



    return (
        <ConfigProvider className='fullScreenStyle' direction={ i18n.language == 'en' ? "ltr": "rtl"}>
        <Space direction='vertical' >
            <Form className='formStyle' form={form} onFinish={Login} labelCol={{span: 10}} wrapperCol={{span: 10}} scrollToFirstError={true}>
                <Form.Item name='email' label={t('RegForm.email')} rules={[{required: true, message: t('Messages.email')}]}>
                    <Input type='text' name='email' onChange={(e)=> setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item name='password' label={t('RegForm.password')} rules={[{required: true, message: t('Messages.password')}]}>
                    <Input.Password name='password' onChange={(e)=>setPassword(e.target.value)} />
                </Form.Item>
                {showErrorMessage &&
          <Form.Item>
            <Modal
              title="Error"
              open={showErrorMessage}
              footer={[
                <Button className='buttonStyle' type='primary' onClick={()=> onOk()}>OK</Button>
              ]}
            >
              Invalid email and/or password. Please try again.
            </Modal>
          </Form.Item>
        }
                <Form.Item wrapperCol={{offset: 5}}>
                    <Space direction='horizontal'>
                    <Button className='buttonStyle' type='primary' htmlType='submit' icon={<LoginOutlined/>}>{t('Buttons.login')}</Button>
                    <Button type='link' onClick={()=>navigate('/forgotPassword')}>Forgot Your Password ?</Button>
                    </Space>
                </Form.Item>
            </Form>
            <Button className="buttonStyle" type='default' onClick={()=> navigate(-1)} icon={i18n.language === 'en' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}>{t('Buttons.back')}</Button>
        </Space>
        </ConfigProvider>
    )
}

export default LoginPage;