import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import {no} from './associationsCards'

const ContentI = ({no}) => {
  const navigate = useNavigate();
  return (
    <Space className="fullScreenStyle" direction="vertical">
      <p>This is content {no} page</p>
      <Button
        className="buttonStyle"
        type="dashed"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </Space>
  );
};

export default ContentI;
