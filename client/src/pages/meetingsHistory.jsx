import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Affix ,Space, Pagination, Table, Button, Input } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useForm } from "rc-field-form";

const MeetingsHistory = () => {
  const navigate = useNavigate();
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "10%",
      sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    },
    {
      title: "Association",
      dataIndex: "association",
      key: "association",
      width: "50px",
      filters: [
        { text: "Almanara", value: "Almanara" },
        { text: "Oglo", value: "Oglo" },
        { text: "Saint-Hanne", value: "Saint-Hanne" },
      ],
      filterMode: "tree",
      filterSearch: ["sm"],
      onFilter: (value, record) => record.association.startsWith(value),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "50px",
      responsive: ["md"],
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: "50px",
      responsive: ["md"],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: "60px",
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
        placeholder="Search by association name"
        onChange={(e) => handleSearch(e.target.value)}
        // style={{ width: "70vw" }}
      />
      <Affix className='affixStyle' target={()=> container}>
        <Table
          className="tableStyleMobile"
          dataSource={dataSource}
          columns={columns}
          scroll={{x: 'max-content', y: '40vh'}}
          // pagination= {{pageSize: 3, position: 'top'}}
        />
        <Table
          className="tableStyle"
          dataSource={dataSource}
          columns={columns}
          scroll={{x: 'max-content', y: '40vh'}}
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
        Back
      </Button>
      </div>
    </Space>
  );
};

export default MeetingsHistory;
