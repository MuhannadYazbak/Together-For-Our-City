import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Space, Layout, Button, Menu } from 'antd';
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
import {HomeOutlined, LoginOutlined, UserAddOutlined, DatabaseOutlined, ClockCircleOutlined, TableOutlined, GroupOutlined} from '@ant-design/icons'
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  return (
    <Space direction='horizontal' className="fullScreenStyle">
      <Layout className='sideLayoutStyle'>
        <Sider className='siderStyle' collapsible collapsed={collapse} onCollapse={setCollapse}>
          <Menu className='menuStyle' key='menu' items={[
            { key: 'home', label: 'Home', icon:<HomeOutlined/>, onClick: () => { navigate('/') } },
            { key: 'login', label: 'Log In', icon: <LoginOutlined/>, onClick: () => { navigate('/Login') } },
            { key: 'register', label: 'Register',icon: <UserAddOutlined/>, onClick: () => { navigate('/Register') } },
            { key: 'addAssociation', label: 'Add Association', icon: <DatabaseOutlined/>, onClick: () => { navigate('/AddNewAssociation') } },
            { key: 'meetings', label: 'Meetings', icon: <ClockCircleOutlined/>, onClick: () => { navigate('/ScheduleMeeting') } },
            { key: 'table', label: 'Table', icon:<TableOutlined/>, onClick: () => { navigate('/MakeTable') } },
            { key: 'associations', label: 'Associations', icon: <GroupOutlined/>, onClick: () => { navigate('/Cards') } },

          ]} />
        </Sider>
      </Layout>
      <Layout className='mainLayoutStyle'>
        <Header className='headerStyle'>
          <h1 className='center' >Together for Nazareth, our magical city</h1>
        </Header>
        <Content className='contentStyle'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Login' element={< Login />} />
            <Route path='/Register' element={< Register />} />
            <Route path='/ForgotPassword' element={< Forget />} />
            <Route path='/AddNewAssociation' element={< AddNewAssociation />} />
            <Route path='/ScheduleMeeting' element={< ScheduleMeeting />} />
            <Route path='/MeetingsCalender' element={< MeetingsHistory />} />
            <Route path='/MakeTable' element={<MakeTable />} />
            <Route path='/Cards' element={<Cards />} />
          </Routes>
        </Content>
        <Footer className='footerStyle'>
          <h2 className='center'>Developed by Muhannad Yazbak and Ezz Marie © 2023</h2>
        </Footer>
      </Layout>
    </Space>
  );
}

export default App;
