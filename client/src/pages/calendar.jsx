import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button,Space, Calendar, Badge} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons'
import '../App.css';

const CalendarApi = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    let listData = [];
    
    function makeMeeting(date){
        listData.push({date: date, text: 'New Activity'});
        console.log('List Data: ', listData);
    }

    function dateCellRender (value) {
        const data = listData;
        return (
          <ul>
              <li key={value}>
                {data.map((item)=>
                <Badge status={item.date} text={item.text} />,
                () => makeMeeting(value)
                )}
                
              </li>
          </ul>
        );
      };

      useEffect(()=>{

      },[listData])

    return (
        <Space className="fullScreenStyle" direction="vertical">
            <Calendar className="calendarStyle"
            onSelect={(date) => {{setSelectedDate(date); dateCellRender(date)}}}
             disabledDate={(date)=>{
                if (new Date(date) < new Date())
                    return true;
                else 
                    return false;
             }}
             //dateCellRender={(date) => date === selectedDate ? dateCellRender(date): null}
                // if (new Date(date) >= selectedDate && new Date(date).getMonth() === selectedDate.getMonth() && new Date(date).getFullYear === selectedDate.getFullYear())
                //     return <h5>Activity</h5>
              >
                {/* <Button type='dashed' onClick={makeMeeting('11')}>+</Button> */}
              </Calendar>
            <Button className="buttonStyle" type="dashed" onClick={()=> navigate(-1)} icon={<ArrowLeftOutlined />}>Back</Button>
        </Space>
    )
}

export default CalendarApi;