import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Card, Button, Pagination, Avatar} from "antd";
import nazareth from "../images/NAZARETH_LOGO3.jpg";
import boy from "../images/boyAvatar.png";
import girl from "../images/girlAvatar.png";
import { Modal } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../App.css";
const { Meta } = Card;
var no;

export const sendNo = (value) => {
   return value;
}

const MiniWindow = ({ content, visible, onClose }) => {
  return (
    <Modal
      title={content.title}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>{content.description}</p>
    </Modal>
  );
};

const Cards = () => {
  const navigate = useNavigate();
  const [miniWindowVisible, setMiniWindowVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardsGrid = [];


  for (no = 1; no <= 31; no++) {
    const i = no;
    const content = {
    title: `Content ${i}`,
      description: `This is content ${i}`,
    };
    cardsGrid.push(
      <Card.Grid
        key={['content',i]}
        onClick={() => {
          setSelectedCard(content);
          setMiniWindowVisible(true);
        }}
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
            {selectedCard && (
        <Modal
          visible={miniWindowVisible}
          onCancel={() => setMiniWindowVisible(false)}
          footer={null}
        >
          <h3>{`Content ${selectedCard}`}</h3>
          <p>{`This is content ${selectedCard}`}</p>
        </Modal>
      )}
    </Space>
  );
};

export default Cards;


