import React, { useEffect, useState } from 'react';
import './Style.css';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Space, Menu, ConfigProvider } from 'antd';
import { FlagIcon } from 'react-flag-kit';
import {
  HomeOutlined, ProfileOutlined, GroupOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined,
  GlobalOutlined, UserOutlined, NumberOutlined, BookOutlined, ContactsOutlined
} from '@ant-design/icons';
import Register from './pages/register';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import Activities from './pages/activities';
import Stats from './pages/stats';
import AddAssociation from './pages/addAssociation';
import Organizations from './pages/organizations';
import Users from './pages/users';
import UnAuthorized from './pages/unAuthorized';
import UpdateUser from './pages/updateUser';
import BookActivity from './pages/bookActivity';
import nazareth from './NAZARETH_LOGO3.jpg';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import Cards from './pages/associationsCards';

const { Header, Content, Footer, Sider } = Layout;


function App() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('');
  const { t, i18n } = useTranslation();
  const location = useLocation();
  let currentPath = location.pathname;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const userMenuItems = {

    Visitor: [
      {
        key: 'languages', label: t('SideNav.lang'), icon: <GlobalOutlined />,
        children: [
          { key: 'english', label: t('SideNav.english'), icon: <FlagIcon code='US' />, onClick: () => handleLanguage('en') },
          { key: 'arabic', label: t('SideNav.arabic'), icon: <FlagIcon code='SA' />, onClick: () => handleLanguage('ar') },
          { key: 'hebrew', label: t('SideNav.hebrew'), icon: <FlagIcon code='IL' />, onClick: () => handleLanguage('he') }
        ]
      },
      { key: 'home', label: t('SideNav.home'), icon: <HomeOutlined />, onClick: () => { navigate('/') } },
      { key: 'organizations', label: t('SideNav.organizations'), icon: <BookOutlined />, onClick: () => { navigate('/organizationsCards') } }
    ],
    Normal: [
      {
        key: 'languages', label: t('SideNav.lang'), icon: <GlobalOutlined />,
        children: [
          { key: 'english', label: t('SideNav.english'), icon: <FlagIcon code='US' />, onClick: () => handleLanguage('en') },
          { key: 'arabic', label: t('SideNav.arabic'), icon: <FlagIcon code='SA' />, onClick: () => handleLanguage('ar') },
          { key: 'hebrew', label: t('SideNav.hebrew'), icon: <FlagIcon code='IL' />, onClick: () => handleLanguage('he') }
        ]
      },
      { key: 'home', label: t('SideNav.home'), icon: <HomeOutlined />, onClick: () => { navigate('/') } },
      { key: 'organizations', label: t('SideNav.organizations'), icon: <BookOutlined />, onClick: () => { navigate('/organizationsCards') } },
      { key: 'profile', label: t('SideNav.profile'), icon: <ProfileOutlined />, onClick: () => { navigate('/profile') } },
      { key: 'activities', label: t('SideNav.activities'), icon: <GroupOutlined />, onClick: () => { navigate('/activites') } }
    ],
    Contact: [
      {
        key: 'languages', label: t('SideNav.lang'), icon: <GlobalOutlined />,
        children: [
          { key: 'english', label: t('SideNav.english'), icon: <FlagIcon code='US' />, onClick: () => handleLanguage('en') },
          { key: 'arabic', label: t('SideNav.arabic'), icon: <FlagIcon code='SA' />, onClick: () => handleLanguage('ar') },
          { key: 'hebrew', label: t('SideNav.hebrew'), icon: <FlagIcon code='IL' />, onClick: () => handleLanguage('he') }
        ]
      },
      { key: 'home', label: t('SideNav.home'), icon: <HomeOutlined />, onClick: () => { navigate('/') } },
      { key: 'organizations', label: t('SideNav.organizations'), icon: <BookOutlined />, onClick: () => { navigate('/organizationsCatds') } },
      { key: 'profile', label: t('SideNav.profile'), icon: <ProfileOutlined />, onClick: () => { navigate('/profile') } },
      { key: 'activities', label: t('SideNav.activities'), icon: <GroupOutlined />, onClick: () => { navigate('/activites') } },
      { key: 'contact', label: t('SideNav.contact'), icon: <ContactsOutlined />, onClick: () => { navigate('/contact') } }
    ],
    Admin: [
      {
        key: 'languages', label: t('SideNav.lang'), icon: <GlobalOutlined />,
        children: [
          { key: 'english', label: t('SideNav.english'), icon: <FlagIcon code='US' />, onClick: () => handleLanguage('en') },
          { key: 'arabic', label: t('SideNav.arabic'), icon: <FlagIcon code='SA' />, onClick: () => handleLanguage('ar') },
          { key: 'hebrew', label: t('SideNav.hebrew'), icon: <FlagIcon code='IL' />, onClick: () => handleLanguage('he') }
        ]
      },
      { key: 'home', label: t('SideNav.home'), icon: <HomeOutlined />, onClick: () => { navigate('/') } },
      { key: 'organizations', label: t('SideNav.organizations'), icon: <BookOutlined />, onClick: () => { navigate('/organizationsCards') } },
      { key: 'profile', label: t('SideNav.profile'), icon: <ProfileOutlined />, onClick: () => { navigate('/profile') } },
      { key: 'activities', label: t('SideNav.activities'), icon: <GroupOutlined />, onClick: () => { navigate('/activites') } },
      { key: 'contact', label: t('SideNav.contact'), icon: <ContactsOutlined />, onClick: () => { navigate('/contact') } },
      { key: 'stats', label: t('SideNav.stats'), icon: <NumberOutlined />, onClick: () => { navigate('/stats') } },
      { key: 'users', label: t('SideNav.users'), icon: <UserOutlined />, onClick: () => { navigate('/users') } }
    ]
  };


  function handleLanguage(lang) {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    console.log('handleLanguage: ', lang);
    window.location.reload(false);
  }

  function loggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    setUser(null);
    setToken(null);
    setSelectedUser(null);
  };

  function login() {
    navigate('/login');
  };

  function handleOnSelect(sk) {
    console.log('selected: ', sk);
  };

  useEffect(()=>{
    console.log('App.js useEffect, selectedUser is now ', selectedUser);
  },[selectedUser]);


  return (
    <ConfigProvider direction={i18n.language === 'en' ? 'ltr' : 'rtl'}>
    <Layout className='fullScreenStyle'>
      <Sider className='siderStyle' collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <Menu className='menuStyle' mode='vertical'
          items={!user ? userMenuItems['Visitor'] : user.userType === 'Normal' ?
            userMenuItems['Normal'] : user.userType === 'Contact' ? userMenuItems['Contacr'] : userMenuItems['Admin']}
          selectedKeys={[currentPath]} onSelect={handleOnSelect} />
      </Sider>
      <Layout>
        <Header className='headerStyle'>
          <Space direction='horizontal' size='large'>
            {user ?
              <Space direction='inline' size='middle' style={{ justifySelf: 'flex-start' }}>
                <p>{[t('UpperNav.welcome'),' ', user.firstName]}</p>
                <Link to='/' icon={<LogoutOutlined />} onClick={() => { loggedOut() }} element={<Home />}>{t('UpperNav.logout')}</Link>
              </Space>
              :
              <Space direction='inline' size='middle' >
                <Link to='/login' icon={<LoginOutlined />} >{t('UpperNav.login')}</Link>
                <Link to='/register' icon={<UserAddOutlined />} element={<Register />}>{t('UpperNav.register')}</Link>
              </Space>}
            <h1 style={{ justifySelf: 'center', textAlign: 'center', marginLeft: '37vw' }}>{t('Layouts.header')}</h1>
            <img src={nazareth} style={{ height: '60px', width: '80px' }} />
          </Space>
        </Header>
        <Content className='contentStyle'>
          <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/organizations' element={user ? <Organizations /> : <UnAuthorized />} />
            <Route path='/register' element={<Register selectedUser={selectedUser} setSelectedUser={setSelectedUser} />} />
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/activites' element={user ? <Cards /> : <UnAuthorized />} />
            <Route path='/stats' element={user && user.userType === 'Admin' ? <Stats /> : <UnAuthorized />} />
            <Route path='/addAssociation' element={user && user.userType === 'Normal' ? <UnAuthorized /> : <AddAssociation />} />
            <Route path='/users' element={user && user.userType === 'Admin' ? <Users selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> : <UnAuthorized /> } />
            <Route path='/update' element={<UpdateUser />} />
            <Route path='/bookActivity' element={<BookActivity logged={localStorage.getItem('user')} />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
            <Route path='/organizationsCards' element={user ? <Organizations /> : <UnAuthorized />} />
          </Routes>
        </Content>
        <Footer className='footerStyle'>{t('Layouts.footer')}</Footer>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
}

export default App;
