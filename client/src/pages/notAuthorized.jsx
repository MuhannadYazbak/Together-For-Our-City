import React from "react";
import { useNavigate } from "react-router-dom";
import { Space, Button } from "antd";
import { useTranslation } from "react-i18next";
import '../App.css';

const NotAuthorized = () => {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    return(
        <Space className="fullScreenStyle" direction="vertical">
            <h1 className="red">{t('NotAuth.text')}</h1>
            <Button className="buttonStyle" type="primary" onClick={()=>navigate('/Login')}>{t('NotAuth.signin')}</Button>
        </Space>
    )
}

export default NotAuthorized;