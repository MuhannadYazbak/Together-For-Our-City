import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Space, Button, Select, DatePicker, TimePicker } from "antd";
import { useForm } from "rc-field-form";

const ScheduleMeeting = () => {
    const [volunteerName, setVolunteerName] = useState('');
    const [associationName, setAssociationName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const navigate = useNavigate();
    const {form} = useForm();
    var meeting = {}
    var associations = [
            {value: 'Almanara', label: 'Almanara'},
            {value: 'Oglo', label: 'Oglo'},
            {value: 'Saint-Hanne', label: 'Saint-Hanne', disabled: true},
        ];

    const makeMeeting = () => {
        meeting = {
            volunteerName: volunteerName,
            associationName: associationName,
            date: date,
            startTime: startTime,
            endTime: endTime,
        }
        if (meeting){
            console.log(meeting);
            navigate('/');
        } else {
            console.warn('Could not schedule, please check the data');
            form.resetFields([volunteerName, associationName, date, startTime, endTime]);
            }

        }

        const handleAssociationChange = (value) => {
            setAssociationName(associations[value]);
          };

        const handleDateChange = (value) => {
            setDate(value);
        }

        const handleStartTimeChange = (value) => {
            setStartTime(value);
        }

        const handleEndTimeChange = (value) => {
            setEndTime(value);
        }
    
    return (
        <Space direction="vertical">
            <Form form={form} onFinish={makeMeeting} labelCol={{span: 10}}>
                <Form.Item label='Association' required={true}>
                    <Select value={associationName} options={associations} defaultValue='Almanara' onChange={(e) => handleAssociationChange(e)}/>
                </Form.Item>
                <Form.Item label='Date' required={true}>
                    <DatePicker value={date} onChange={(e)=> handleDateChange(e)} />
                </Form.Item>
                <Form.Item label='Start Time' required={true}>
                    <TimePicker value={startTime} onChange={(e)=> handleStartTimeChange(e)}/>
                </Form.Item>
                <Form.Item label='End Time' required={false}>
                    <TimePicker value={endTime} onChange={(e)=> handleEndTimeChange(e)}/>
                </Form.Item>
                <Form.Item>
                    <Button className="buttonStyle" type="primary" htmlType="submit">Schedule</Button>
                </Form.Item>
            </Form>
            <Button className="buttonStyle" type="dashed" onClick={()=> navigate(-1)}>Back</Button>
        </Space>
    )
}
    


export default ScheduleMeeting;