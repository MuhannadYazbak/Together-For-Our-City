import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Space } from "antd";
import { HomeFilled } from "@ant-design/icons";
import "../App.css";

export default function PageNotFound() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Space className="fullScreenStyle" direction="vertical">
      <span className="textStyle">{t("NotFound.message")}</span>
      <Button
        className="buttonStyle"
        type="default"
        icon={<HomeFilled />}
        onClick={() => navigate("/")}
      />
    </Space>
  );
}
