import React from "react";
import {useNavigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Button, Space, ConfigProvider } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import '../Style.css';



const Profile = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    return (
    <ConfigProvider className='fullScreenStyle' direction={ i18n.language == 'en' ? "ltr": "rtl"}>
    <Space className="spaceStyle" direction="vertical">
        <div className="centered">
        <span className='spanStyle'>{t('Titles.profilePage')}</span>
        </div>
        <Button className="buttonStyle" type='default' onClick={()=> navigate(-1)} icon={i18n.language === 'en' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}>{t('Buttons.back')}</Button>
    </Space>
    </ConfigProvider>
    )}

export default Profile;