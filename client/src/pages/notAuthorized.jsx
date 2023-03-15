import React from "react";
import { useNavigate } from "react-router-dom";
import { Space, Button } from "antd";
import '../App.css';

const NotAuthorized = () => {
    const navigate = useNavigate();
    return(
        <Space className="fullScreenStyle" direction="vertical">
            <h1 className="red">Not Authorized, please sign-in</h1>
            <Button className="buttonStyle" type="primary" onClick={()=>navigate('/Login')}>Sign In</Button>
        </Space>
    )
}

export default NotAuthorized;