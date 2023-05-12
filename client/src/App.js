import React, { useState } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Space, Layout, Menu } from "antd";
import {
  HomeOutlined,
  DatabaseOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  PieChartOutlined,
  GroupOutlined,
  GlobalOutlined,
  TableOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Forget from "./pages/forgotPassword";
import NotAuthorized from "./pages/notAuthorized";
import AddNewAssociation from "./pages/addNewAssociation";
import ScheduleMeeting from "./pages/scheduleMeeting";
import MeetingsHistory from "./pages/meetingsHistory";
import MakeTable from "./pages/Table";
import Cards, { sendNo } from "./pages/associationsCards";
import ContentI from "./pages/content";
import CalendarApi from "./pages/calendar";
import nazareth from "./images/NAZARETH_LOGO3.jpg";
import PageNotFound from "./pages/pageNotFound";
import Dashboard from "./pages/dashboard";
import READ from "./pages/read";
import ResetPassword from "./pages/resetPassword";
import AddActivity from "./pages/addActivity";

const { Header, Content, Footer, Sider } = Layout;
const gotNo = sendNo;

const App = () => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(true);
  const [data, setData] = useState(gotNo);
  const [collapsed, setCollapsed] = useState(false);
  const { t, i18n } = useTranslation();
  const [num, setNum] = useState(0); // to passdata between passdata and getdata routes
  const [user, setUser] = useState("");

  function handleLanguage(lang) {
    i18n.changeLanguage(lang);
  }
  const setSelected = (e) => {};
  const [items, setItems] = useState([
    {
      key: "languages",
      label: t("SideNav.lang"),
      icon: <GlobalOutlined />,
      children: [
        {
          key: "english",
          label: "English",
          onClick: () => handleLanguage("en"),
        },
        { key: "arabic", label: "Arabic", onClick: () => handleLanguage("ar") },
        { key: "hebrew", label: "Hebrew", onClick: () => handleLanguage("he") },
      ],
    },
    {
      key: "home",
      label: t("SideNav.home"),
      icon: <HomeOutlined />,
      onClick: () => {
        navigate("/");
      },
    },
    // { key: 'login', label: t('SideNav.login'), icon: <LoginOutlined />, onClick: () => { navigate('/Login') } },
    // { key: 'register', label: t('SideNav.register'), icon: <UserAddOutlined />, onClick: () => { navigate('/Register') } },
    {
      key: "addAssociation",
      label: t("SideNav.addAssoc"),
      icon: <DatabaseOutlined />,
      onClick: () => {
        navigate("/AddNewAssociation");
      },
    },
    {
      key: "bookMeeting",
      label: t("SideNav.newMeeting"),
      icon: <ClockCircleOutlined />,
      onClick: () => {
        navigate("/ScheduleMeeting");
      },
    },
    {
      key: "meetings",
      label: t("SideNav.meetingsHistory"),
      icon: <CalendarOutlined />,
      onClick: () => {
        navigate("/MeetingsHistory");
      },
    },
    {
      key: "table",
      label: t("SideNav.table"),
      icon: <TableOutlined />,
      onClick: () => {
        navigate("/MakeTable");
      },
    },
    {
      key: "activities",
      label: t("SideNav.activities"),
      icon: <GroupOutlined />,
      onClick: () => {
        navigate("/Cards");
      },
    },
    {
      key: "addActivity",
      label: "Add Activity", // Replace this with your desired label or a translation function
      icon: <PlusCircleOutlined  />, // Replace with an appropriate icon from '@ant-design/icons'
      onClick: () => {
        navigate("/AddActivity");
      },
    },
    {
      key: "calendar",
      label: t("SideNav.calendar"),
      icon: <CalendarOutlined />,
      onClick: () => {
        navigate("/calendar");
      },
    },
    {
      key: "dashboard",
      label: t("SideNav.dashboard"),
      icon: <PieChartOutlined />,
      onClick: () => {
        navigate("/dashboard");
      },
    },
  ]);

  return (
    <Space className="fullScreenStyle" direction="horizontal">
      <Layout className="sideLayoutStyle">
        <Sider
          className="siderStyle"
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <Menu
            className="menuStyle"
            mode="vertical"
            items={items}
            defaultChecked={"home"}
          />
        </Sider>
        <Layout className="mainLayoutStyle">
          <Header className="headerStyle">
            <Space className="horizontalStyle" direction="horizontal">
              <Space mode="inline">
                <Link
                  to="/Login"
                  element={<Login />}
                  style={{
                    color: "white",
                    textDecoration: "underline",
                    display: logged ? "none" : "flex",
                  }}
                >
                  {t("SideNav.login")}
                </Link>
                <Link
                  to="/Register"
                  element={<Register />}
                  style={{
                    color: "white",
                    textDecoration: "underline",
                    display: logged ? "none" : "flex",
                  }}
                >
                  {t("SideNav.register")}
                </Link>
                <Link
                  style={{
                    color: "white",
                    textDecoration: "underline",
                    display: logged ? "flex" : "none",
                  }}
                  onClick={() => {
                    setLogged(false);
                    navigate("/");
                  }}
                >
                  {t("SideNav.logout")}
                </Link>
              </Space>
              <span className="spanStyle">{t("HEADTITLE.title")}</span>
              <img src={nazareth} style={{ height: "8vh", width: "9vw" }} />
            </Space>
          </Header>
          <Content className="contentStyle">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route
                path="/Login"
                element={<Login setUser={setUser} setLogged={setLogged} />}
              />
              <Route path="/Register" element={<Register />} />
              <Route path="/ForgotPassword" element={<Forget />} />
              <Route
                path="/AddNewAssociation"
                element={<AddNewAssociation />}
              />
              <Route
                path="/ScheduleMeeting"
                element={logged ? <ScheduleMeeting /> : <NotAuthorized />}
              />
              <Route path="/MeetingsHistory" element={<MeetingsHistory />} />
              <Route path="/MeetingsCalender" element={<MeetingsHistory />} />
              <Route path="/MakeTable" element={<MakeTable />} />
              <Route path="/Cards" element={<Cards />} />
              <Route path={"/content/:sendNo"} element={<ContentI />} />
              <Route path="/calendar" element={<CalendarApi />} />
              <Route
                path="/Content"
                state={{ data: data }}
                element={<ContentI />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/read" element={<READ />} />
              <Route path="/ResetPassword" element={<ResetPassword />} />
              <Route
                path="/AddActivity"
                element={<AddActivity />}
              />
            </Routes>
          </Content>
          {/* <Footer className="footerStyle">
            <span className="spanStyle"> Developed by Muhannad Yazbak and Ezz Marie © 2023
            </span>
          </Footer> */}
        </Layout>
      </Layout>
    </Space>
  );
};

export default App;
