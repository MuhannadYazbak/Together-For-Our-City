import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Card, Button, Pagination, Avatar, Modal} from "antd";
import nazareth from "../images/NAZARETH_LOGO3.jpg";
import boy from "../images/boyAvatar.png";
import girl from "../images/girlAvatar.png";
import { useTranslation } from "react-i18next";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../App.css";
import { t } from "i18next";
const { Meta } = Card;
 var no;

export const sendNo = (value) => {
   return value;
}

const MiniWindow = ({ content, visible, onClose }) => {
  return (
    <Modal
      title={t('Content.content')}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>{t('Content.desc')}</p>
    </Modal>
  );
};

const Cards = () => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const [i, setI] = useState(-1);
  const [miniWindowVisible, setMiniWindowVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardsGrid = [];


  for (no = 1; no <= 31; no++) {
    //const i = no;
    const content = {
    title: [t('Content.content'), ' ', no],
      description: [t('Content.desc'), ' ', no],
    };
    cardsGrid.push(
      <Card.Grid
        key={['content',no]}
        onClick={() => {
          setSelectedCard(content);
          setMiniWindowVisible(true);
          setI(no);
          sendNo(no);
        }}
        style={{
          width: 300,
        }}
        cover={
          <img
            alt={["Content", no]}
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
        title={[t('Content.content'),' ', no]}
        description={[t('Content.desc'), no]}
      /> :
      <Meta
          avatar={<Avatar src= {girl}/>}
          title={[t('Content.content'),' ', no]}
          description={[t('Content.desc'), no]}
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
          {t('Schedule.BACK')}
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


