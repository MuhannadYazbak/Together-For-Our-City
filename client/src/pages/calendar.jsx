import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button,Space, Calendar} from "antd";
import {CalendarOutlined} from '@ant-design/icons'
import '../App.css';

const CalendarApi = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    let check;

    // function checkOldDate (date) {
    //     if (new Date(date) < new Date())
    //         return true;
    //     else
    //         return false;
    // }
    return (
        <Space className="fullScreenStyle" direction="vertical">
            <Calendar className="calendarStyle"
            //  style={{ overflow: 'auto', height: '68vh', width: '90vw'}}
            onSelect={(date) => {{setSelectedDate(date); console.log('Selected date ', date);}}}
             disabledDate={(date)=>{
                if (new Date(date) < new Date())
                    return true;
                else 
                    return false;
             }}
             dateCellRender={(date)=>{
                if (new Date(date) >= setSelectedDate && new Date(date).getMonth() === selectedDate.getMonth() && new Date(date).getFullYear === selectedDate.getFullYear())
                    return <h5>Activity</h5>
                // else 
                //     console.log("tried to render ", date, ' but selected ', selectedDate);
             }}
              />
            <Button className="buttonStyle" type="dashed" onClick={()=> navigate(-1)}>Back</Button>
        </Space>
    )
}

export default CalendarApi;