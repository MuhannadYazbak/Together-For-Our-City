import React from "react";
import {useNavigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Button, Space, ConfigProvider } from "antd";
import {UserOutlined} from '@ant-design/icons';
import nazareth from '../NAZARETH_LOGO3.jpg';
import '../Style.css';

const Home = ({user }) => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    return (
        <ConfigProvider className='fullScreenStyle' direction={ i18n.language == 'en' ? "ltr": "rtl"}>
    <Space className="spaceStyle" direction="vertical">
        <div className="centered">
        <span className='spanStyle'>{t('Titles.homePage')}</span>
        </div>
        { !user ? <Button className="buttonStyle" type='default' onClick={() => navigate('/login')} icon={<UserOutlined/>}>{t('Buttons.login')}</Button>
        : <img src={nazareth} style={{width: '30vw', height: '30vh'}}/>
        }
    </Space>
    </ConfigProvider>
    )}

export default Home;