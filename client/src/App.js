import React, { useState, createContext } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Space, Layout, Menu } from "antd";
import { HomeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, DatabaseOutlined, ClockCircleOutlined, CalendarOutlined, GroupOutlined, GlobalOutlined, TableOutlined, SlidersOutlined, InfoOutlined } from '@ant-design/icons';
import './App.css';
import Home from './pages/home';
import Login, { loggedIN } from './pages/login';
import Register from './pages/register';
import Forget from './pages/forgotPassword';
import NotAuthorized from "./pages/notAuthorized";
import AddNewAssociation from './pages/addNewAssociation';
import ScheduleMeeting from './pages/scheduleMeeting';
import MeetingsHistory from './pages/meetingsHistory';
import MakeTable from './pages/Table';
import Cards from './pages/associationsCards';
import ContentI from './pages/content';
import CarouselGrid from './pages/carousel';
import CalendarApi from './pages/calendar';
import Try from './pages/trying';
import nazareth from './images/NAZARETH_LOGO3.jpg';
const { Header, Content, Footer, Sider } = Layout;


const App = () => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(true);
  const isLogged = createContext(logged);
  const [collapsed, setCollapsed] = useState(false);

  const [items, setItems] = useState([
    {
      key: 'languages', label: 'Language', icon: <GlobalOutlined />,
      children: [{ key: 'english', label: 'English' },
      { key: 'arabic', label: 'Arabic' },
      { key: 'hebrew', label: 'Hebrew' }]
    },
    { key: 'home', label: 'Home', icon: <HomeOutlined />, onClick: () => { navigate('/') } },
    { key: 'login', label: 'Log In', icon: <LoginOutlined />, onClick: () => { navigate('/Login') } },
    { key: 'register', label: 'Register', icon: <UserAddOutlined />, onClick: () => { navigate('/Register') } },
    { key: 'addAssociation', label: 'Add Association', icon: <DatabaseOutlined />, onClick: () => { navigate('/AddNewAssociation') } },
    { key: 'bookMeeting', label: 'Book Meeting', icon: <ClockCircleOutlined />, onClick: () => { navigate('/ScheduleMeeting') } },
    { key: 'meetings', label: 'Meetings History', icon: <CalendarOutlined />, onClick: () => { navigate('/MeetingsHistory') } },
    { key: 'table', label: 'Table', icon: <TableOutlined />, onClick: () => { navigate('/MakeTable') } },
    { key: 'associations', label: 'Associations', icon: <GroupOutlined />, onClick: () => { navigate('/Cards') } },
    { key: 'carousel', label: 'Carousel', icon: <SlidersOutlined />, onClick: () => { navigate('/carousel') } },
    { key: 'calendar', label: 'Calendar', icon: <CalendarOutlined />, onClick: () => { navigate('/calendar') } },
    { key: 'try', label: 'Try', onClick: () => { navigate('/Try') } },
  ])

  const [itemsLogged, setItemsLogged] = useState([
    {
      key: 'languages', label: 'Language', icon: <GlobalOutlined />,
      children: [{ key: 'english', label: 'English' },
      { key: 'arabic', label: 'Arabic' },
      { key: 'hebrew', label: 'Hebrew' }]
    },
    { key: 'home', label: 'Home', icon: <HomeOutlined />, onClick: () => { navigate('/') } },
    { key: 'addAssociation', label: 'Add Association', icon: <DatabaseOutlined />, onClick: () => { navigate('/AddNewAssociation') } },
    { key: 'bookMeeting', label: 'Book Meeting', icon: <ClockCircleOutlined />, onClick: () => { navigate('/ScheduleMeeting') } },
    { key: 'meetings', label: 'Meetings History', icon: <CalendarOutlined />, onClick: () => { navigate('/MeetingsHistory') } },
    { key: 'table', label: 'Table', icon: <TableOutlined />, onClick: () => { navigate('/MakeTable') } },
    { key: 'associations', label: 'Associations', icon: <GroupOutlined />, onClick: () => { navigate('/Cards') } },
    { key: 'carousel', label: 'Carousel', icon: <SlidersOutlined />, onClick: () => { navigate('/carousel') } },
    { key: 'calendar', label: 'Calendar', icon: <CalendarOutlined />, onClick: () => { navigate('/calendar') } },
    { key: 'logout', label: 'Log-Out', icon: <LogoutOutlined />, onClick: () => { setLogged(false); navigate('/') } },
    { key: 'try', label: 'Try', icon: <InfoOutlined />, onClick: () => { navigate('/Try') } },
  ])

  return (
    <Space className="fullScreenStyle" direction="horizontal">
      <Layout className="sideLayoutStyle">
        <Sider className="siderStyle" collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <Menu className="menuStyle" mode="vertical" items={logged ? itemsLogged : items} defaultChecked={'home'} />
        </Sider>
        <Layout className="mainLayoutStyle">
          <Header className="headerStyle">
            <Space className="horizontalStyle" direction="horizontal">
              <span className="spanStyle" placement='right'> Together for Nazareth, our magical city
              </span>
              <img src={nazareth} style={{ height: '8vh', width: '9vw' }} placement='left' />
            </Space>
          </Header>
          <Content className="contentStyle">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Login' element={< Login />} />
              <Route path='/Register' element={< Register />} />
              <Route path='/ForgotPassword' element={< Forget />} />
              <Route path='/AddNewAssociation' element={logged ? < AddNewAssociation /> : < NotAuthorized />} />
              <Route path='/ScheduleMeeting' element={logged ? < ScheduleMeeting /> : <NotAuthorized />} />
              <Route path='/MeetingsHistory' element={< MeetingsHistory />} />
              <Route path='/MeetingsCalender' element={< MeetingsHistory />} />
              <Route path='/MakeTable' element={<MakeTable />} />
              <Route path='/Cards' element={<Cards />} />
              <Route path={'/content/:sendNo'} element={< ContentI />} />
              <Route path='/carousel' element={<CarouselGrid />} />
              <Route path='/calendar' element={<CalendarApi />} />
              <Route path='/Try' element={< Try />} />
            </Routes>
          </Content>
          <Footer className="footerStyle">
            <span className="spanStyle"> Developed by Muhannad Yazbak and Ezz Maree © 2023
            </span>
          </Footer>
        </Layout>
      </Layout>
    </Space>
  )
}

export default App;