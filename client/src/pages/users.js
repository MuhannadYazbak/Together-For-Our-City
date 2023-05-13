import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Button, Space, ConfigProvider, Table, Modal } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import '../Style.css';


const Users = ({selectedUser, setSelectedUser}) => {
  const [address, setAddress] = useState([]);
  const [users, setUsers] = useState([
    // {firstName: 'Muhannad', lastName: 'Yazbak', email: 'Yazbakm@gmail.com', phone: '0548034062', city: 'Nazareth', neighborhood: 'Beer Alameer'},
    // {firstName: 'Ezz', lastName: 'Marie', email: '123@gmail.com', phone: '052', city: 'Mashahd', neighborhood: '----'},
    // {firstName: 'Aamer', lastName: 'Sajrawi', email: '-', phone: '-', city: '-', neighborhood: '-'},
    // {firstName: 'Elias', lastName: 'Hlees', email: '-', phone: '', city: '-', neighborhood: '-'},
    // {firstName: '-', lastName: '-', email: '-', phone: '-', city: '-', neighborhood: '-'},
    // {firstName: '-', lastName: '-', email: '-', phone: '-', city: '-', neighborhood: '-'},
    // {firstName: '-', lastName: '-', email: '-', phone: '-', city: '-', neighborhood: '-'},
    // {firstName: '-', lastName: '-', email: '-', phone: '-', city: '-', neighborhood: '-'},
  ]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = [
    {
      title: t('RegForm.firstName'),
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: t('RegForm.lastName'),
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => {
        if (a.lastName < b.lastName) return -1;
        else if (a.lastName > b.lastName) return 1;
        else return 0;
      }
    },
    {
      title: t('RegForm.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('RegForm.userType'),
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: t('RegForm.Address.city'),
      dataIndex: ['address', 'city'],
      key: 'address.city',
      filters: [
        { text: t('Cities.nazareth'), value: "nazareth" },
        { text: t('Cities.haifa'), value: "haifa" },
        { text: t('Cities.telaviv'), value: "tel-Aviv" },
        { text: t('Cities.beersheva'), value: "beerSheva" },
        { text: t('Cities.jerusalem'), value: "jerusalem" },
        { text: t('Cities.mashhad'), value: "mashhad" },
      ],
      filterSearch: ["sm"],
      onFilter: (value, record) => record.address && record.address.city && record.address.city.toLowerCase().includes(value.toLowerCase()),
      //: (value, record) => record.address.city.toLowerCase().startsWith(value.toLowerCase()),

    },
    {
      title: t('RegForm.Address.neighborhood'),
      dataIndex: ['address', 'neighborhood'],
      key: 'address.neighborhood',
    }
  ];

  async function getUsers() {
    await axios.get("http://localhost:3001/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      console.log("response = ", response.data);
      setUsers(response.data);
    }).catch((error) => {
      console.error('ERROR HERE ', error)
    })
  };


  useEffect(() => {
    getUsers();
  }, []);

  useEffect(()=>{
    console.log("useEffect, changed selectedUser to ", selectedUser);
  },[selectedUser]);

  // function to handle row click and show modal
  const handleRowClick = (record) => {
    setSelectedUser(record);
    console.log('you Clicked ', selectedUser);
    setIsModalVisible(true);
  };

  // function to hide modal
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  //function to update selecteduser
  const handleUpdate = () =>{
    localStorage.setItem('selected', selectedUser);
    console.log('The selected user is ', selectedUser);
    navigate('/register')
  }

  return (
    <ConfigProvider className='fullScreenStyle' direction={i18n.language == 'en' ? "ltr" : "rtl"}>
      <Space direction="vertical" className="spaceStyle" size='small' >
        <Space direction="inline" size='middle'>
          <span className='spanStyle'>{t('Titles.usersPage')}</span>
        </Space>
        <Table
         className="tableStyle"
        columns={columns}
        dataSource={users}
        
        pagination={{ pageSize: 10, position: ['bottomCenter']}}
        scroll={{ y: '35vh' }}
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record),
          };
        }}
      />
      {selectedUser && (
        
        <Modal
          open={isModalVisible}
          onCancel={handleModalClose}
          onOk={handleModalClose}
          footer = {[
            <Button className="buttonStyle" type='primary' onClick={handleUpdate}>Update</Button>,
            <Button className="buttonStyle" type='default' onClick={handleModalClose}>Back</Button>
          ]}
        >
          {Object.entries(selectedUser).map(([key, value])=>(
            key === 'address' ? Object.entries(selectedUser.address).map(([ka, va])=>(
              <p>{ka} : {va}</p>
            )) : key === 'activities' ? null :
            <p>{key} : {value}</p>
          ))}
          
        </Modal>
      )}
        <Button className="buttonStyle" type='default' onClick={()=> navigate(-1)} icon={i18n.language !== 'en' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}>{t('Buttons.back')}</Button>
      </Space>
    </ConfigProvider>
  )
};

export default Users;
