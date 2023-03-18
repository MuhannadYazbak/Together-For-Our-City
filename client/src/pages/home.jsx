import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Tooltip } from "antd";
import nazareth from "../images/NAZARETH_LOGO3.jpg";
import {useTranslation} from 'react-i18next';

const Home = () => {
  const {t, i18n} = useTranslation();

  return (
    <Space className="fullScreenStyle" direction="vertical">
        <p className="textStyle">{t('INTRODUCTION.abstract')}</p>
      <div className="center">
        <Tooltip title="Nazareth">
          <img alt="Nazareth" src={nazareth} width="250px" height="200px" />
        </Tooltip>
      </div>
    </Space>
  );
};

export default Home;
