import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space, Button } from "antd";
import { useTranslation } from "react-i18next";
import '../App.css';
import { ArrowLeftOutlined } from '@ant-design/icons';

function MakeTable () {
    const dataType = "users";
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [columns, setColumns] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    useEffect(()=>{
        fetch(`https://dummyjson.com/${dataType}`)
        .then(res => res.json())
        .then((res)=>{
            const list = res[dataType] || [];
            const firstObject = list[0] || {};
            const cols = [];
            for (const key in firstObject){
                const name = String(key)
                const col = {
                    title: key,
                    dataIndex: key,
                    key: key,
                    fixed: name === 'id'? 'left' : null,
                    sorter: name === 'age'? (a,b) => parseInt(a.age) - parseInt(b.age): null,
                    filters: name ==='gender'? [
                        { text: "Male", value: "male" },
                        { text: "Female", value: "female" },
                      ]: null,
                      filterMode: name === 'gender'? "tree": null,
                      filterSearch: name === 'gender'? ["sm"]: null,
                      onFilter: name === 'gender' ? (value, record) => record.gender.startsWith(value): null,
                    render: (value) => {
                        return <span>{String(value)}</span>;
                    },
                }
                cols.push(col);
            }
            setColumns(cols);
            setDataSource(list);
            console.log('columns = ', columns, ' dataSource = ', dataSource);
        });
    },[])
    return (
        <Space className="fullScreenStyle" direction="vertical">
            <div className="center">
                <h1>Users Table</h1>
            </div>
            <Table className="tableStyle" pagination={{pageSize: 5}} dataSource={dataSource} columns={columns} scroll={{x:true}} />
            <Button className="buttonStyle" type='dashed' onClick={()=>navigate(-1)} icon={<ArrowLeftOutlined />}>{t('Schedule.BACK')}</Button>
            
        </Space>
    )
}

export default MakeTable;