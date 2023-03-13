import React, {useEffect, useState} from "react";
import { Table, Space } from "antd";
import '../App.css';

function MakeTable () {
    const dataType = "users";
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
            
        </Space>
    )
}

export default MakeTable;