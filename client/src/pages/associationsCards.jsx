import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Card, Button, Pagination, Avatar} from "antd";
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
  var no;

  for (no = 1; no <= 31; no++) {
    const i = no;
    cardsGrid.push(
      <Card.Grid
        onClick={()=>navigate('/content')}
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
        {no%2 == 0 ? 
        <Meta
        avatar={<Avatar src= {boy}/>}
        title={["Content ", i]}
        description={["This is content ", i]}
      /> :
      <Meta
          avatar={<Avatar src= {girl}/>}
          title={["Content ", i]}
          description={["This is content ", i]}
        />
        }
      </Card.Grid>
    );
  }

  return (
    <Space style={{ width: "100vw", height: "100vh" }} direction="vertical">
      <Card style={{height: '50vh', width: '100vw', overflow: 'auto', marginBottom: '5vh'}}>
        {cardsGrid}
        </Card>
      <Space direction="horizontal"  className="bottomHorizontalStyle">
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
