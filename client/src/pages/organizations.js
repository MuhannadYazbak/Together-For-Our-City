import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Button, Space, ConfigProvider, Table } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import '../Style.css';


const columns = [
  {
    title: 'Organization Name',
    dataIndex: ['assocDetails', 'assocName'],
    key: 'assocName',
  },
  {
    title: 'Organization Speciality',
    dataIndex: ['assocDetails', 'assocSpeciality'],
    key: 'assocSpeciality'
  },
  {
    title: 'Email',
    dataIndex: ['contactDetails', 'email'],
    key: 'email',
  },
  {
    title: 'City',
    dataIndex: ['addressDetails', 'city'],
    key: 'city',
  }
];

const Orgs = () => {
  const [orgs, setOrgs] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  async function getOrgs() {
      await axios.get("http://localhost:3001/organizations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response)=>{
        console.log("response = ", response.data);
      setOrgs(response.data);
    }).catch ((error)=>{ 
      console.error('ERROR HERE ', error)
    })
    };
  
  
  useEffect(() => {
    getOrgs();
  }, []);


  return (
    <ConfigProvider className='fullScreenStyle' direction={i18n.language == 'en' ? "ltr" : "rtl"}>
      <Space className="spaceStyle" direction="vertical" size='small' >
        <Space direction="inline" size='middle'>
          <span className='spanStyle'>{t('Titles.organizationsPage')}</span>
        </Space>
        <div className="tableStyle">
          <Table columns={columns} dataSource={orgs} scroll={{ y: '35vh' }} pagination={{ pageSize: 5, position: ['bottomCenter'] }} />
        </div>
        <Button className="buttonStyle" type='default' onClick={()=> navigate(-1)} icon={i18n.language === 'en' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}>{t('Buttons.back')}</Button>
      </Space>
    </ConfigProvider>
  )
};

export default Orgs;
