import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Affix ,Space, Pagination, Table, Button, Input } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const MeetingsHistory = () => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const [meetings, setMeeting] = useState("");
  const [container, setContainer] = useState(null);
  const { Search } = Input;
  const dataSource = [
    {
      key: "1",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
    {
      key: "2",
      date: "2023-02-15",
      association: "Oglo",
      address: "Paulus 6th",
      comment: "Awesome",
      Actions: "",
    },
    {
      key: "3",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
    {
      key: "4",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
    {
      key: "5",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
    {
      key: "6",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
    {
      key: "7",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
    {
      key: "8",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
    {
      key: "9",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
    {
      key: "10",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
    {
      key: "11",
      date: "2023-02-09",
      association: "Almanara",
      address: "Safafreh",
      comment: "Cool",
      Actions: "",
    },
  ];

  const columns = [
    {
      title: t('MeetingsHistory.date'),
      dataIndex: "date",
      key: "date",
      width: "16.5vw",
      sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    },
    {
      title: t('MeetingsHistory.assoc'),
      dataIndex: "association",
      key: "association",
      width: "16.5vw",
      filters: [
        { text: t('Schedule.Associations.1'), value: "Almanara" },
        { text: t('Schedule.Associations.2'), value: "Oggo" },
        { text: t('Schedule.Associations.3'), value: "Saint-Anne" },
      ],
      filterMode: "tree",
      filterSearch: ["sm"],
      onFilter: (value, record) => record.association.startsWith(value),
    },
    {
      title: t('MeetingsHistory.adress'),
      dataIndex: "address",
      key: "address",
      width: "16.5vw",
      responsive: ["md"],
    },
    {
      title: t('MeetingsHistory.comment'),
      dataIndex: "comment",
      key: "comment",
      width: "16.5vw",
      responsive: ["md"],
    },
    {
      title: t('MeetingsHistory.actions'),
      dataIndex: "actions",
      key: "actions",
      width: "16.5vw",
      render: () => (
        <Space direction="vertical">
          <Button
            className="buttonStyle"
            type="dashed"
            icon={<EditFilled />}
            alt="Update"
          />
          <Button
            className="buttonStyle"
            type="dashed"
            icon={<DeleteFilled />}
          />
        </Space>
      ),
    },
  ];

  const showTotal = (total) => `Total ${total} dataSource`;

  const handleSearch = (value) => {
    console.log("You searched for ", value);
  };

  return (
    <Space direction="vertical" style={{width: '80vw', height: '70vh'}}>
      <Search
        className='searchStyle'
        type="search"
        placeholder={t('MeetingsHistory.search')}
        onChange={(e) => handleSearch(e.target.value)}
        // style={{ width: "70vw" }}
      />
      <Affix className='affixStyle' target={()=> container}>
        <Table
          className="tableStyleMobile"
          dataSource={dataSource}
          columns={columns}
          scroll={{x: '100vw', y: '50vh'}}
          // pagination= {{pageSize: 3, position: 'top'}}
        />
        <Table
          className="tableStyle"
          dataSource={dataSource}
          columns={columns}
          scroll={{y: '50vh'}}
          // pagination= {{pageSize: 3, position: 'top'}}
        />
      </Affix>

      <div className="center">
      <Button
        className="buttonStyle"
        style={{marginLeft: '-25px'}}
        type="dashed"
        onClick={() => navigate(-1)}
      >
        {t('Schedule.BACK')}
      </Button>
      </div>
    </Space>
  );
};

export default MeetingsHistory;
