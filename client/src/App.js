import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Space, Layout, Menu } from 'antd';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Forget from './pages/forgotPassword';
import AddNewAssociation from './pages/addNewAssociation';
import ScheduleMeeting from './pages/scheduleMeeting';
import MeetingsHistory from './pages/meetingsHistory';
import MakeTable from './pages/Table';
import Cards from './pages/associationsCards';
import ContentI from './pages/content';
import CarouselGrid from './pages/carousel';
import CalendarApi from './pages/calendar';
// import {sendNo} from './pages/associationsCards';
// import { logged } from './pages/login';
import {HomeOutlined, LoginOutlined, UserAddOutlined, DatabaseOutlined, ClockCircleOutlined,
   TableOutlined, GroupOutlined, CalendarOutlined, SlidersOutlined, LogoutOutlined, GlobalOutlined} from '@ant-design/icons'
const { Header, Content, Footer, Sider } = Layout;

export  const logg = false;
const no1 = 1;

const App = () => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const [no1, setNo] = useState(0);
  const [logged, setLogged] = useState(true);
  const [itemsLogged, setItemsLogged] = useState([
    { key: 'languages', label: 'Language', icon: <GlobalOutlined />,
      children : [{key:'english', label: 'English'},
        {key: 'arabic', label: 'Arabic'},
      {key: 'hebrew', label: 'Hebrew'}]},
    { key: 'home', label: 'Home', icon:<HomeOutlined/>, onClick: () => { navigate('/') } },
    { key: 'login', label: 'Log In', icon: <LoginOutlined/>, onClick: () => { navigate('/Login') } },
    { key: 'register', label: 'Register',icon: <UserAddOutlined/>, onClick: () => { navigate('/Register') } },
    { key: 'addAssociation', label: 'Add Association', icon: <DatabaseOutlined/>, onClick: () => { navigate('/AddNewAssociation') } },
    { key: 'bookMeeting', label: 'Book Meeting', icon: <ClockCircleOutlined/>, onClick: () => { navigate('/ScheduleMeeting') } },
    { key: 'meetings', label: 'Meetings History', icon: <CalendarOutlined/>, onClick: () => { navigate('/MeetingsHistory') } },
    { key: 'table', label: 'Table', icon:<TableOutlined/>, onClick: () => { navigate('/MakeTable') } },
    { key: 'associations', label: 'Associations', icon: <GroupOutlined/>, onClick: () => { navigate('/Cards') } },
    { key: 'carousel', label: 'Carousel', icon:<SlidersOutlined/>, onClick: () => { navigate('/carousel') } },
    {key: 'calendar', label: 'Calendar', icon:<CalendarOutlined/>, onClick: ()=> { navigate('/calendar')} },
  ])

  const [itemsNotLogged, setItemsNotLogged] = useState([
    { key: 'languages', label: 'Language', icon: <GlobalOutlined />,
      children : [{key: 'arabic', label: 'Arabic'},
      {key:'english', label: 'English'},
      {key: 'hebrew', label: 'Hebrew'}], className: 'menuStyle'},
    { key: 'home', label: 'Home', icon:<HomeOutlined/>, onClick: () => { navigate('/') } },
    { key : 'logout', label: 'Log-Out', icon:<LogoutOutlined/>, onClick: () => { setLogged(false); navigate('/')} },
    { key: 'addAssociation', label: 'Add Association', icon: <DatabaseOutlined/>, onClick: () => { navigate('/AddNewAssociation') } },
    { key: 'bookMeeting', label: 'Book Meeting', icon: <ClockCircleOutlined/>, onClick: () => { navigate('/ScheduleMeeting') } },
    { key: 'meetings', label: 'Meetings History', icon: <CalendarOutlined/>, onClick: () => { navigate('/MeetingsHistory') } },
    { key: 'table', label: 'Table', icon:<TableOutlined/>, onClick: () => { navigate('/MakeTable') } },
    { key: 'associations', label: 'Associations', icon: <GroupOutlined/>, onClick: () => { navigate('/Cards') } },
    { key: 'carousel', label: 'Carousel', icon:<SlidersOutlined/>, onClick: () => { navigate('/carousel') } },
    {key: 'calendar', label: 'Calendar', icon:<CalendarOutlined/>, onClick: ()=> { navigate('/calendar')} },
  ])

  return (
    <Space direction='horizontal' className="fullScreenStyle">
      <Layout >
        <Sider className='siderStyle'  collapsible collapsed={collapse} onCollapse={setCollapse} theme='dark'>
          <Menu className='menuStyle' key='menu' items={ logged ? itemsLogged : itemsNotLogged} />
        </Sider>
      </Layout>
      <Layout className='mainLayoutStyle'>
        <Header className='headerStyle'>
          <span className='spanStyle' >Together for Nazareth, our magical city</span>
        </Header>
        <Content className='contentStyle'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Login' element={< Login />} />
            <Route path='/Register' element={< Register />} />
            <Route path='/ForgotPassword' element={< Forget />} />
            <Route path='/AddNewAssociation' element={< AddNewAssociation />} />
            <Route path='/ScheduleMeeting' element={< ScheduleMeeting />} />
            <Route path='/MeetingsHistory' element={< MeetingsHistory />} />
            <Route path='/MeetingsCalender' element={< MeetingsHistory />} />
            <Route path='/MakeTable' element={<MakeTable />} />
            <Route path='/Cards' element={<Cards />} />
            <Route path={'/content/:sendNo'} element={< ContentI />} />
            <Route path='/carousel' element={<CarouselGrid />} />
            <Route path='/calendar' element={<CalendarApi />} />
          </Routes>
        </Content>
        <Footer className='footerStyle'>
          <span className='spanStyle'>Developed by Muhannad Yazbak and Ezz Marie © 2023</span>
        </Footer>
      </Layout>
    </Space>
  );
}

export default App;


