import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Tooltip } from "antd";
import nazareth from "../images/NAZARETH_LOGO3.jpg";

const Home = () => {
  return (
    <Space className="fullScreenStyle" direction="vertical">
      {/* <div className="center"> */}
        <p className="textStyle">
          Since Nazareth is our beloved city, we want to feel more connected to
          it. <br />
          Here we are going to collect all diferrent associations to volunteer
          in, <br />
          and thus improve the city and maybe decrease violence
        </p>
      {/* </div> */}
      <div className="center">
        <Tooltip title="Nazareth">
          <img alt="Nazareth" src={nazareth} width="250px" height="200px" />
        </Tooltip>
      </div>
    </Space>
  );
};

export default Home;
