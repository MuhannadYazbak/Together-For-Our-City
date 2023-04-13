import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Space, Button } from "antd";
import "../App.css";
import data from "../local-database/associations.json";
import { ArrowLeftOutlined, InfoOutlined } from "@ant-design/icons";

export default function READ() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [assocs, setAssocs] = useState([]);

  useEffect(() => {
    data.map((e) => {
      assocs.push(e);
    });
    console.log("Assocs: ", assocs);
  }, [assocs]);

  // function getData () {
  //     data.map((e)=>{
  //         assocs.push(e)
  //     })
  // }

  return (
    <Space className="fullScreenStyle" direction="vertical">
      {/* <Button className="buttonStyle" type="dashed" icon={<InfoOutlined/>} onClick={getData}>Show Data</Button> */}
      <p
        style={{
          width: "25vw",
          height: "25vh",
          backgroundColor: "cyan",
          color: "grey",
        }}
      >
        {assocs}
      </p>
      <Button
        className="buttonStyle"
        type="dashed"
        icon={<ArrowLeftOutlined />}
        onClick={() => {
          navigate(-1);
        }}
      >
        {t("Schedule.BACK")}
      </Button>
    </Space>
  );
}
