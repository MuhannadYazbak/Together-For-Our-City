import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {ConfigProvider ,Button, Space, Input, Form} from 'antd';
import {ArrowLeftOutlined, ArrowRightOutlined, UserOutlined} from '@ant-design/icons';
import '../Style.css';

const UpdateUser = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const selected = localStorage.getItem('selected');
    const [user, setUser] = useState(selected);
    const {form} = Form.useForm();

    function handleOnChange(e){
        const {name, value} = e.target;
        setUser((prevState)=> ({
            ...prevState,
            [name]: value
        }))
    }

    function saveUpdate(){
        console.log('Update to: ', user);
    };

    useEffect(()=> {
        console.log('Token :', localStorage.getItem('token'));
        console.log(selected.firstName);
    },[])

    return (
        <ConfigProvider className='fullScreenStyle' direction={i18n.language == 'en' ? "ltr" : "rtl"}>
            <Space direction='vertical'>
                <Form className='formStyle' form={form}
                 onFinish={saveUpdate}  labelCol={{span: 10}}
                  wrapperCol={{span: 10}} scrollToFirstError={true}>
                    <Form.Item label={t('RegForm.firstName')} name='firstName'>
                        <Input name='firstName' type='text' onChange={(e)=> handleOnChange(e)} />
                    </Form.Item>
                    <Form.Item label={t('RegForm.lastName')} name='lastName'>
                        <Input name='lastName' type='text' onChange={(e)=> handleOnChange(e)} />
                    </Form.Item>
                    <Form.Item label={t('RegForm.email')} name='email'>
                        <Input name='email' type='email' onChange={(e)=> handleOnChange(e)} />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 0 }}>
                        <Button className='buttonStyle' type='primary' htmlType='submit' icon={<UserOutlined/>}>Save&Update</Button>
                    </Form.Item>
                </Form>
                <Button className='buttonStyle' type='default' onClick={()=> navigate(-1)}
                 icon={i18n.language !== 'en' ? <ArrowRightOutlined/> : <ArrowLeftOutlined/>}>
                    Back
                 </Button>
            </Space>
        </ConfigProvider>
    )
}

export default UpdateUser;