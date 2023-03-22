import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import nazareth from "../images/NAZARETH_LOGO3.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    // navigate to the associations page or sign-up page
  };

  return (
    <Space direction="vertical">
      <h1>Welcome to the Nazareth Volunteering Hub!</h1>
      <img alt="Nazareth" src={nazareth} width="35%" height="40%" />
      <p>
        Thank you for visiting our website! We're excited to help you find opportunities to volunteer and make a difference in Nazareth.
      </p>
      <p>
        Our platform connects you with a variety of associations in the area, providing you with the tools to find the perfect match for your skills, interests, and schedule.
      </p>
      <ul>
        <li>Discover new ways to give back to your community and make a positive impact.</li>
        <li>Develop new skills, gain valuable experience, and enhance your resume.</li>
        <li>Meet like-minded people, expand your social network, and have fun!</li>
      </ul>
      <Button type="primary" size="large" onClick={handleJoinClick}>
        Join an Association
      </Button>
    </Space>
  );
};

export default Home;
