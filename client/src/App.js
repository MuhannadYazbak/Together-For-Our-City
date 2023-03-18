import React, { useState, createContext } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import { Space, Layout, Menu } from "antd";
import { HomeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, DatabaseOutlined, ClockCircleOutlined, CalendarOutlined, GroupOutlined, GlobalOutlined, TableOutlined, SlidersOutlined, InfoOutlined } from '@ant-design/icons';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Forget from './pages/forgotPassword';
import NotAuthorized from "./pages/notAuthorized";
import AddNewAssociation from './pages/addNewAssociation';
import ScheduleMeeting from './pages/scheduleMeeting';
import MeetingsHistory from './pages/meetingsHistory';
import MakeTable from './pages/Table';
import Cards, {sendNo} from './pages/associationsCards';
import ContentI from './pages/content';
import CarouselGrid from './pages/carousel';
import CalendarApi from './pages/calendar';
import Try from './pages/trying';
import nazareth from './images/NAZARETH_LOGO3.jpg';
const { Header, Content, Footer, Sider } = Layout;
const gotNo = sendNo;


const App = () => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState(gotNo);
  const isLogged = createContext(logged);
  const [collapsed, setCollapsed] = useState(false);
  const {t, i18n} = useTranslation();

  function handleLanguage(lang){
    i18n.changeLanguage(lang);
  }
  const setSelected = (e) => {
  }
  const [items, setItems] = useState([
    {
      key: 'languages', label: t('SideNav.lang'), icon: <GlobalOutlined />,
      children: [{ key: 'english', label: 'English', onClick:()=>handleLanguage('en') },
      { key: 'arabic', label: 'Arabic', onClick:()=>handleLanguage('ar') },
      { key: 'hebrew', label: 'Hebrew', onClick:()=>handleLanguage('he') }]
    },
    { key: 'home', label: t('SideNav.home'), icon: <HomeOutlined />, onClick: () => { navigate('/') } },
    { key: 'login', label: t('SideNav.login'), icon: <LoginOutlined />, onClick: () => { navigate('/Login') } },
    { key: 'register', label: t('SideNav.register'), icon: <UserAddOutlined />, onClick: () => { navigate('/Register') } },
    { key: 'addAssociation', label: t('SideNav.addAssoc'), icon: <DatabaseOutlined />, onClick: () => { navigate('/AddNewAssociation') } },
    { key: 'bookMeeting', label: t('SideNav.newMeeting'), icon: <ClockCircleOutlined />, onClick: () => { navigate('/ScheduleMeeting') } },
    { key: 'meetings', label: t('SideNav.meetingsHistory'), icon: <CalendarOutlined />, onClick: () => { navigate('/MeetingsHistory') } },
    { key: 'table', label: t('SideNav.table'), icon: <TableOutlined />, onClick: () => { navigate('/MakeTable') } },
    { key: 'associations', label: t('SideNav.assocs'), icon: <GroupOutlined />, onClick: () => { navigate('/Cards') } },
    { key: 'carousel', label: t('SideNav.carousel'), icon: <SlidersOutlined />, onClick: () => { navigate('/carousel') } },
    { key: 'calendar', label: t('SideNav.calendar'), icon: <CalendarOutlined />, onClick: () => { navigate('/calendar') } },
    { key: 'try', label: t('SideNav.try'),icon: <InfoOutlined />, onClick: () => { navigate('/Try') } },
  ])

  const [itemsLogged, setItemsLogged] = useState([
    {
      key: 'languages', label: t('SideNav.lang'), icon: <GlobalOutlined />,
      children: [{ key: 'english', label: 'English', onClick: ()=>{handleLanguage('en')} },
      { key: 'arabic', label: 'Arabic', onClick: ()=>{handleLanguage('ar')} },
      { key: 'hebrew', label: 'Hebrew', onClick: ()=>{handleLanguage('he')} }]
    },
    { key: 'home', label: t('SideNav.home'), icon: <HomeOutlined />, onClick: () => { navigate('/') } },
    { key: 'addAssociation', label: t('SideNav.addAssoc'), icon: <DatabaseOutlined />, onClick: () => { navigate('/AddNewAssociation') } },
    { key: 'bookMeeting', label: t('SideNav.newMeeting'), icon: <ClockCircleOutlined />, onClick: () => { navigate('/ScheduleMeeting') } },
    { key: 'meetings', label: t('SideNav.meetingsHistory'), icon: <CalendarOutlined />, onClick: () => { navigate('/MeetingsHistory') } },
    { key: 'table', label: t('SideNav.table'), icon: <TableOutlined />, onClick: () => { navigate('/MakeTable') } },
    { key: 'associations', label: t('SideNav.assocs'), icon: <GroupOutlined />, onClick: () => { navigate('/Cards') } },
    { key: 'carousel', label: t('SideNav.carousel'), icon: <SlidersOutlined />, onClick: () => { navigate('/carousel') } },
    { key: 'calendar', label: t('SideNav.calendar'), icon: <CalendarOutlined />, onClick: () => { navigate('/calendar') } },
    { key: 'logout', label: t('SideNav.logout'), icon: <LogoutOutlined />, onClick: () => { setLogged(false); navigate('/') } },
    { key: 'try', label: t('SideNav.try'), icon: <InfoOutlined />, onClick: () => { navigate('/Try') } },
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
              <span className="spanStyle" placement='right'>{t('HEADTITLE.title')}</span>
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
              <Route path='/Content' state={{data: data}} element={<ContentI />} />
            </Routes>
          </Content>
          <Footer className="footerStyle">
            <span className="spanStyle">{t('FOOTER.dev')} 
            </span>
          </Footer>
        </Layout>
      </Layout>
    </Space>
  )
}

export default App;