import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfigProvider, Space, Form, Input, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import '../Style.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [password, SetPassword] = useState('');
    const [repass, SetRepass] = useState('');
    const { form } = Form.useForm();

    function onFinish() {
        if (password === repass) console.log('Changed Password to ', password);
        else console.warn(t('Messages.matching'));
    };

    return (
        <ConfigProvider className='fullScreenStyle' direction={i18n.language === 'en' ? 'ltr' : 'rtl'}>
            <Space direction='vertical'>
                <Form className='formStyle' form={form} onFinish={onFinish} labelCol={{ span: 10 }} wrapperCol={{ span: 10 }} scrollToFirstError={true}>
                    <Form.Item name='password' label={t('RegForm.password')} rules={[{ required: true, message: t('Messages.password') }]}>
                        <Input name='password' type='password' onChange={(e) => SetPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item name='repass' label={t('RegForm.repassword')} rules={[{ required: true, message: t('Messages.repassword') }]}>
                        <Input name='repass' type='password' onChange={(e) => SetRepass(e.target.value)} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 0 }}>
                        <Button className='buttonStyle' type='primary' htmlType='submit' icon={<CheckOutlined />}>Confirm new Password</Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 1 }}>
                        <Space direction='horizontal'>
                            <Button className='buttonStlye' type='default' onClick={() => navigate(-1)} icon={i18n.language === 'en' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}>{t('Buttons.back')}</Button>
                        </Space>
                    </Form.Item>
                </Form>

            </Space>
        </ConfigProvider>
    )
}

export default ResetPassword;