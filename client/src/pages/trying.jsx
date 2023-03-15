import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Card, Button } from "antd";
import { CloseOutlined, ExpandOutlined} from '@ant-design/icons';
import "../App.css";
const { Meta } = Card;

const Try = () => {
  const navigate = useNavigate();
  var ii;
  const [opened, setOpened] = useState(false);

  return (
    <div>
        <Card
          className={opened ? "fullScreenStyle" : "none"}
          title="Card 1"
          key="card1"
          cover={
            <img
              alt={["Content"]}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <CloseOutlined key='Close' onClick={()=> setOpened(false)} />
          ]}
        >
          <Meta description="This is card 1" />
        </Card>
    <Space className={opened ? "none" : "fullScreenStyle"} direction="vertical">
      <Space direction="horizontal">
        <Card
          className={opened ? "fullScreenStyle" : ""}
          title="Card 1"
          key="card1"
          onClick={() => setOpened(!opened)}
          cover={
            <img
              alt={["Content"]}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <ExpandOutlined key='expand' onClick={setOpened(true)} />
          ]}
        >
          <Meta description="This is card 1" />
          {/* <Button
            className="buttonStyle"
            type="primary"
            onClick={setOpened(!opened)}
          >
            Change
          </Button> */}
        </Card>
        <Card
          title="Card 2"
          cover={
            <img
              alt={["Content"]}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <Meta description="This is card 2" />
        </Card>
        <Card
          title="Card 3"
          cover={
            <img
              alt={["Content"]}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        />
        <Card
          title="Card 4"
          cover={
            <img
              alt={["Content"]}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        />
      </Space>
      <Space direction="horizontal">
        <Card
          title="Card 5"
          cover={
            <img
              alt={["Content"]}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        />
        <Card
          title="Card 6"
          cover={
            <img
              alt={["Content"]}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        />
        <Card
          title="Card 7"
          cover={
            <img
              alt={["Content"]}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        />
        <Card
          title="Card 8"
          cover={
            <img
              alt={["Content"]}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        />
      </Space>
      <Button
        className="buttonStyle"
        type="dashed"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </Space>
    </div>
  );
};

export default Try;
