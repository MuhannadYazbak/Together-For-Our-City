import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ConfigProvider ,Space, Button, Form, Input, Select } from 'antd';
import {useTranslation} from 'react-i18next';
import {BookOutlined, ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import '../Style.css';

const BookActivity = (logged) =>{
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const [user, setUser] = useState(logged);
    const {form} = Form.useForm();
    const [organizations, setOrganizations] = useState([
        {key: '1', name: '1', value: '1'},
        {key: '2', name: '2', value: '2'},
        {key: '3', name: '3', value: '3'},
    ])

    function addActivity(){
        console.log(logged.firstName, ' Activities: ', logged.activities);
    }

    return (
        <ConfigProvider className='fullScreenStyle' direction={i18n.language === 'en' ? 'ltr' : 'rtl'}>
            <Space direction='vertical'>
                <Form className='formStyle' form={form} onFinish={addActivity} labelCol={{span: 10}} wrapperCol={{span: 10}} scrollToFirstError={true}>
                    <Form.Item label='Hello'>
                        <Input type='text' value={logged.firstName} />
                    </Form.Item>
                    <Form.Item label='Organization Name' name='assocName' rules={[{required: true, message: 'You have to chose an organization'}]}>
                        <Select options={organizations} />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 1}}>
                        <Button className='buttonStyle' type='primary' htmlType='submit' icon={<BookOutlined />}>Book Activity</Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 1}}>
                        <Button className='buttonStyle' type='default' icon={i18n.language === 'en' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />} onClick={()=> navigate(-1)}>Book Activity</Button>
                    </Form.Item>
                    
                </Form>
            </Space>
        </ConfigProvider>
    )
};

export default BookActivity;