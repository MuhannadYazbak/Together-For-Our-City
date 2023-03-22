import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tooltip } from "antd";
import nazareth from "../images/NAZARETH_LOGO3.jpg";
import { useTranslation } from "react-i18next";
import { UserAddOutlined, LoginOutlined } from "@ant-design/icons";

const Home = ({ user }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <Space className="fullScreenStyle" direction="vertical">
      <p>{user ? [t("INTRODUCTION.greeting"), user] : null}</p>
      <p className="textStyle">{t("INTRODUCTION.abstract")}</p>
      <div className="center">
        <Tooltip
          className="nazareth"
          title="Nazareth"
          style={{ placeContent: "start" }}
        >
          <img alt="Nazareth" src={nazareth} />
        </Tooltip>
      </div>
      <Space direction="vertical" className="center">
        <Button
          className="buttonStyle"
          type="primary"
          onClick={() => navigate("/Login")}
          icon={<LoginOutlined />}
        >
          {t("SideNav.login")}
        </Button>
        <span className="textStyle">{t("INTRODUCTION.reg")}</span>
        <Button
          className="buttonStyle"
          type="primary"
          onClick={() => navigate("/Register")}
          icon={<UserAddOutlined />}
        >
          {t("SideNav.register")}
        </Button>
      </Space>
    </Space>
  );
};

export default Home;
