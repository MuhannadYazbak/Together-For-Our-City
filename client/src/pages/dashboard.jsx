import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Space, Row, Col, Button, Select } from "antd";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import "../App.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedName, setSelectedName] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [names, setAssocs] = useState([
    {
      key: "1",
      label: t("Schedule.Associations.1"),
      value: "Almanara",
    },
    {
      key: "2",
      label: t("Schedule.Associations.2"),
      value: "Oggo",
    },
    {
      key: "3",
      label: t("Schedule.Associations.3"),
      value: "Saint-Anne",
    },
  ]);

  const [specs, setSpecs] = useState([
    {
      key: "1",
      label: t("Speciality.1"),
      value: "Fun days with special need kids",
    },
    {
      key: "2",
      label: t("Speciality.2"),
      value: "Help mentally and physically ill kids",
    },
    {
      key: "3",
      label: t("Speciality.3"),
      value: "Socialize with teenagers in low socioeconomic situation",
    },
  ]);

  function handleNameSelection(e) {
    setSelectedName(e);
  }

  function handleSpecialitySelection(e) {
    setSelectedSpeciality(e);
  }

  useEffect(() => {
    console.log("Name: ", selectedName);
    console.log("Speciality: ", selectedSpeciality);
  }, [selectedName, selectedSpeciality, ""]);

  return (
    <Space className="fullScreenStyle" direction="vertical">
      <Space
        direction="inline"
        style={{ paddingTop: "2vh", paddingLeft: "5vw" }}
      >
        <Select
          placeholder="Filter by name"
          options={names}
          onChange={(e) => {
            handleNameSelection(e);
          }}
        />
        <Select
          placeholder="Filter by speciality"
          options={specs}
          onChange={(e) => {
            handleSpecialitySelection(e);
          }}
        />
      </Space>
      <Space className="chartsSpaceStyle" direction="vertical">
        <Row>
          <Col>
            <div
              style={{
                color: "#282c34",
                fontSize: "16px",
                fontWeight: "500",
                paddingTop: "10vh",
                paddingLeft: "8vw",
              }}
            >
              100 new volunteers this month
            </div>
          </Col>
          <Col>
            <Pie
              className="dashboardCircleStyle"
              data={{
                labels: [
                  "jan",
                  "feb",
                  "mar",
                  "apr",
                  "may",
                  "jun",
                  "jul",
                  "aug",
                  "sep",
                  "oct",
                  "nov",
                  "dec",
                ],
                datasets: [
                  {
                    label: "Almanara",
                    data: [10, 5, 4, 2, 7, 11, 8, 7, 9, 3, 4, 1],
                    backgroundColor: [
                      "red",
                      "yellow",
                      "brown",
                      "blue",
                      "green",
                      "teal",
                      "purple",
                      "black",
                      "cyan",
                      "darkgrey",
                      "gold",
                      "silver",
                    ],
                    barThickness: 12,
                  },
                  {
                    label: "Oggo",
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    backgroundColor: [
                      "red",
                      "yellow",
                      "brown",
                      "blue",
                      "green",
                      "teal",
                      "purple",
                      "black",
                      "cyan",
                      "darkgrey",
                      "gold",
                      "silver",
                    ],
                    barThickness: 12,
                  },
                  {
                    label: "Saint-Anne",
                    data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                    backgroundColor: [
                      "red",
                      "yellow",
                      "brown",
                      "blue",
                      "green",
                      "teal",
                      "purple",
                      "black",
                      "cyan",
                      "darkgrey",
                      "gold",
                      "silver",
                    ],
                    barThickness: 12,
                  },
                ],
              }}
            />
          </Col>
          <Col>
            <Doughnut
              className="dashboardCircleStyle"
              data={{
                labels: [
                  "jan",
                  "feb",
                  "mar",
                  "apr",
                  "may",
                  "jun",
                  "jul",
                  "aug",
                  "sep",
                  "oct",
                  "nov",
                  "dec",
                ],
                datasets: [
                  {
                    label: "Almanara",
                    data: [10, 5, 4, 2, 7, 11, 8, 7, 9, 3, 4, 1],
                    backgroundColor: [
                      "red",
                      "yellow",
                      "brown",
                      "blue",
                      "green",
                      "teal",
                      "purple",
                      "black",
                      "cyan",
                      "darkgrey",
                      "gold",
                      "silver",
                    ],
                    barThickness: 12,
                  },
                  {
                    label: "Oggo",
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    backgroundColor: [
                      "red",
                      "yellow",
                      "brown",
                      "blue",
                      "green",
                      "teal",
                      "purple",
                      "black",
                      "cyan",
                      "darkgrey",
                      "gold",
                      "silver",
                    ],
                    barThickness: 12,
                  },
                  {
                    label: "Saint-Anne",
                    data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                    backgroundColor: [
                      "red",
                      "yellow",
                      "brown",
                      "blue",
                      "green",
                      "teal",
                      "purple",
                      "black",
                      "cyan",
                      "darkgrey",
                      "gold",
                      "silver",
                    ],
                    barThickness: 12,
                  },
                ],
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Bar
              className="dashboardSqaureStyle"
              data={{
                labels: [
                  "jan",
                  "feb",
                  "mar",
                  "apr",
                  "may",
                  "jun",
                  "jul",
                  "aug",
                  "sep",
                  "oct",
                  "nov",
                  "dec",
                ],
                datasets: [
                  {
                    label: "Almanara",
                    data: [10, 5, 4, 2, 7, 11, 8, 7, 9, 3, 4, 1],
                    backgroundColor: "cyan",
                    barThickness: 12,
                  },
                  {
                    label: "Oggo",
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    backgroundColor: "teal",
                    barThickness: 12,
                  },
                  {
                    label: "Saint-Anne",
                    data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                    backgroundColor: "grey",
                    barThickness: 12,
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    title: {
                      text: "Months",
                      display: true,
                    },
                  },
                  y: {
                    title: {
                      text: "Associations",
                      display: true,
                    },
                  },
                },
              }}
            />
          </Col>
          <Col>
            <Line
              className="dashboardSqaureStyle"
              data={{
                labels: [
                  "jan",
                  "feb",
                  "mar",
                  "apr",
                  "may",
                  "jun",
                  "jul",
                  "aug",
                  "sep",
                  "oct",
                  "nov",
                  "dec",
                ],
                datasets: [
                  {
                    label: "Almanara",
                    data: [10, 5, 4, 2, 7, 11, 8, 7, 9, 3, 4, 1],
                    backgroundColor: "red",
                    barThickness: 12,
                  },
                  {
                    label: "Oggo",
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    backgroundColor: "teal",
                    barThickness: 12,
                  },
                  {
                    label: "Saint-Anne",
                    data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                    backgroundColor: "gold",
                    barThickness: 12,
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    title: {
                      text: "Months",
                      display: true,
                    },
                  },
                  y: {
                    title: {
                      text: "Associations",
                      display: true,
                    },
                  },
                },
              }}
            />
          </Col>
        </Row>
      </Space>
      <div className="center">
        <Button
          className="buttonStyle"
          style={{ marginTop: "15px" }}
          type="dashed"
          onClick={() => navigate(-1)}
          icon={<ArrowLeftOutlined />}
        >
          {t("Schedule.BACK")}
        </Button>
      </div>
    </Space>
  );
}
