import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import {sendNo} from './associationsCards';
//var no1 = no;

const ContentI = (props) => {
  const navigate = useNavigate();
  const no = sendNo;
  useEffect(()=>{
    console.log(no);
  },[])
  return (
    <Space className="fullScreenStyle" direction="vertical">
      <p>This is content {props} page</p>
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
