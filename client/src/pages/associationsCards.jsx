import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Card, Button, Pagination, Avatar } from "antd";
import nazareth from "../images/NAZARETH_LOGO3.jpg";
import boy from "../images/boyAvatar.png";
import girl from "../images/girlAvatar.png";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../App.css";
const { Meta } = Card;

const Cards = () => {
  const navigate = useNavigate();
  const cardsGrid = [];

  for (let i = 1; i <= 31; i++) {
    cardsGrid.push(
      <Card.Grid
        style={{
          width: 300,
        }}
        cover={
          <img
            alt={["Content", i]}
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src={nazareth} />}
          title={["Content ", i]}
          description={["This is content ", i]}
        />
      </Card.Grid>
    );
  }

  return (
    <Space style={{ width: "100vw", height: "100vh" }} direction="vertical">
      <Card>{cardsGrid}</Card>
      <Space direction="horizontal" style={{width: '100vw', height: '2vh', textAlign: 'center'}}>
        <Button className="buttonStyle" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Pagination
          total={30}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          pageSize={5}
          defaultCurrent={1}
        />
      </Space>
    </Space>
  );
};

export default Cards;
