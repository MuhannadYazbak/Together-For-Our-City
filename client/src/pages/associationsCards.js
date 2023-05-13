import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Card, Button, Pagination, Avatar, Modal } from "antd";
import nazareth from "../images/NAZARETH_LOGO3.jpg";
import boy from "../images/boyAvatar.png";
import girl from "../images/girlAvatar.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "../Style.css";
import { t } from "i18next";
const { Meta } = Card;

export const sendNo = (value) => {
  return value;
};

const MiniWindow = ({ content, visible, onClose }) => {
  return (
    <Modal
      title={t("Content.content")}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>{t("Content.desc")}</p>
    </Modal>
  );
};

const Cards = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [i, setI] = useState(-1);
  const [miniWindowVisible, setMiniWindowVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardsGrid = [];

  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   // Fetch activities from the server and update the activities state
  //   fetch("http://localhost:3001/GetActivities")
  //     .then((response) => response.json())
  //     .then((data) => setActivities(data));
  // }, []);

  useEffect(() => {
    // Fetch activities from the server and update the activities state
    fetch("http://localhost:3001/getActivities")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((activity) => ({
          ...activity,
          activityDate: new Date(activity.activityDate),
        }));
        setActivities(formattedData);
        console.log("got Activites = ", activities);
      });
  }, []);

  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + 20;

  activities.slice(startIndex, endIndex).forEach((activity, index) => {
    cardsGrid.push(
      <Card.Grid
        key={`content-${index}`}
        onClick={() => {
          setSelectedCard(activity);
          setMiniWindowVisible(true);
          setI(index + 1);
          sendNo(index + 1);
        }}
        style={{
          width: 300,
        }}
        cover={
          <img
            alt={`Content-${index + 1}`}
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        {(index + 1) % 2 === 0 ? (
          <Meta
            avatar={<Avatar src={boy} />}
            title={activity.activityName} // Update the title here
            description={activity.associationName} // Update the description here
          />
        ) : (
          <Meta
            avatar={<Avatar src={girl} />}
            title={activity.activityName} // Update the title here
            description={activity.associationName} // Update the description here
          />
        )}
      </Card.Grid>
    );
  });

  const joinActivity = async (activityId, signedUser) => {
    console.log("Activity: " + activityId);
    signedUser = JSON.parse(localStorage.getItem('user'));
    console.log("User: " + signedUser._id, ' Token: ', localStorage.getItem('token'));
    try {
      const response = await axios.post("http://localhost:3001/joinActivity", {signedUser, activityId},  {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
  
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.warn("Bad response ", response);
        throw new Error("Error joining activity");
      }
    } catch (error) {
      console.error("Error joining activity:", error.message);
    }
  };
  
  return (
    <Space style={{ width: "100vw", height: "100vh" }} direction="vertical">
      <Card
        style={{
          height: "50vh",
          width: "100vw",
          overflow: "auto",
          marginBottom: "5vh",
        }}
      >
        {cardsGrid}
      </Card>
      <Space direction="horizontal" className="bottomHorizontalStyle">
        <Button
          className="buttonStyle"
          onClick={() => navigate(-1)}
          icon={<ArrowLeftOutlined />}
        >
          {t("Buttons.back")}
        </Button>
        <Pagination
          total={activities.length}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          pageSize={20}
          defaultCurrent={1}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
          }}
        />
      </Space>
      {selectedCard && (
        <Modal
          open={miniWindowVisible}
          onCancel={() => setMiniWindowVisible(false)}
          footer={[
            <Button
              key="joinActivity"
              type="primary"
              onClick={() => {
                console.log("Joining activity:", selectedCard.activityName);
                joinActivity(selectedCard._id);
                setMiniWindowVisible(false);
              }}
            >
              Join Activity
            </Button>,
            <Button key="close" onClick={() => setMiniWindowVisible(false)}>
              Close
            </Button>,
          ]}
        >
          <h3>{selectedCard.activityName}</h3>
          <p>
            <strong>Association Name:</strong> {selectedCard.associationName}
          </p>
          <p>
            <strong>Association Speciality:</strong>{" "}
            {selectedCard.associationSpeciality}
          </p>
          <p>
            <strong>Association Description:</strong>{" "}
            {selectedCard.associationDescription}
          </p>
          <p>
            <strong>Activity Date:</strong>{" "}
            {selectedCard.activityDate.toLocaleDateString()}
          </p>
          <p>
            <strong>Association Address:</strong>{" "}
            {selectedCard.associationAddress}
          </p>
          <p>
            <strong>Association Website:</strong>{" "}
            <a
              href={selectedCard.associationWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedCard.associationWebsite}
            </a>
          </p>
          <p>
            <strong>Association Contact:</strong>{" "}
            {selectedCard.associationContact}
          </p>
        </Modal>
      )}
    </Space>
  );
};

export default Cards;