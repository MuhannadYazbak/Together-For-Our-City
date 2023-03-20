import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Carousel, Card, Button, Avatar } from "antd";
import { useTranslation } from "react-i18next";
import "../App.css";
import boy from "../images/boyAvatar.png";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

const CarouselGrid = () => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const ref = useRef();
  const [cards, setCards] = useState([]);

  const GetCards = () => {
    for (let i = 1; i < 11; i++) {
      cards.push(<Card title={["Content", i]} />);
      // setCards((prevState) => [...prevState, <Card title={['Card ', i]} />]);
    }
    return cards;
  };

  return (
    <Space className="fullScreenStyle" direction="vertical">
      <div className="carousDiv">
        <Carousel
          autoplay
          autoplaySpeed={4000}
          draggable={true}
          dots={false}
          pauseOnHover={true}
          pauseOnDotsHover={true}
          ref={ref}
          className="carouselDiv"
        >
            <Card className="cardCarouselStyle" title={[t('Content.content'), ' 1']} />
            <Card className="cardCarouselStyle" title={[t('Content.content'), ' 2']} />
            <Card className="cardCarouselStyle" title={[t('Content.content'), ' 3']} />
            <Card className="cardCarouselStyle" title={[t('Content.content'), ' 4']} />
            <Card className="cardCarouselStyle" title={[t('Content.content'), ' 5']} />
            <Card className="cardCarouselStyle" title={[t('Content.content'), ' 6']} />
            <Card className="cardCarouselStyle" title={[t('Content.content'), ' 7']} />
        </Carousel>
      </div>
      <div>
        <Button onClick={() => ref.current.prev()}>Prev</Button>
        <Button onClick={() => ref.current.goTo(0)}>Reset</Button>
        <Button onClick={() => ref.current.next()}>Next</Button>
      </div>
      <Button
        className="buttonStyle"
        type="dashed"
        onClick={() => navigate(-1)}
        icon={<ArrowLeftOutlined />}
      >
        Back
      </Button>
    </Space>
  );
};

export default CarouselGrid;
