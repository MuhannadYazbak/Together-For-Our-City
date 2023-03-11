import React, {useState} from "react";
import { Space, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const AddNewAssociation = () => {
    const [assocName, setAssocName] = useState('');
    const [description, setDescription] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [website, setWebsite] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const navigate = useNavigate();
    var contact = {}
    var association = {}

    const newAssociation = () => {
        contact = {
            name: contactName,
            email: contactEmail,
            phone: contactPhone
        }
        association = {
            name: assocName,
            speciality: speciality,
            contact: contact,
            website: website,
            description: description
        }
        if (association){
        console.log(association);
        navigate('/');
        } else {
            console.warn('Bad or missing input, Please check again');
            Form.resetFields([assocName, speciality, description, website, contactName, contactEmail, contactPhone])
        }
    }

    return (
        <Space direction='vertical'>
            <Form  onFinish={newAssociation} labelCol={{span: 12}} style={{display: 'contents'}}>
                <Space direction='horizontal'>
                < div className="centeredFormStyle">
                <Form className='formStyle'>
                <Form.Item  labelCol={{offset: 10}} >
                <span style={{fontSize: '20px', color: 'white'}}> Association Details</span>
                </Form.Item>
                <Form.Item label='Association Name' required={true}>
                    <Input value={assocName} type='text' onChange={(e) => setAssocName(e.target.value)} />
                </Form.Item>
                <Form.Item label='Association Description' required={true}>
                    <Input value={description} type='text' onChange={(e) => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item label='Association Speciality' required={false}>
                    <Input value={speciality} type='text' onChange={(e) => setSpeciality(e.target.value)} />
                </Form.Item>
                <Form.Item label='Association Website' required={false}>
                    <Input value={website} type='text' onChange={(e) => setWebsite(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{offset: 3}}>
                    <Button className="buttonStyle" type="primary" htmlType="submit">Add</Button>
                </Form.Item>
                </Form>
                </div>
                <div className="centeredFormStyle">
                <Form.Item />
                <Form className='formStyle'>
                <Form.Item labelCol={{offset: 10}}>
                <span style={{fontSize: '20px', color: 'white'}}> Contact Details</span>
                </Form.Item>
                <Form.Item label='Contact Name' required={true}>
                    <Input value={contactName} type='text' onChange={(e) => setContactName(e.target.value)}/>
                </Form.Item>
                <Form.Item label='Contact Email' required={true}>
                    <Input value={contactEmail} type='email' onChange={(e) => setContactEmail(e.target.value)}/>
                </Form.Item>
                <Form.Item label='Contact Phone' required={true}>
                    <Input value={contactPhone} type='number' onChange={(e) => setContactPhone(e.target.value)}/>
                    </Form.Item>
                    <Form.Item />
                    <Form.Item wrapperCol={{offset: 3}}>
                    <Button className="buttonStyle" type="dashed" onClick={()=> navigate(-1)}>Back</Button>
                </Form.Item>
                </Form>
                </div>
                </Space>
                </Form>
            
        </Space>
    )
}

export default AddNewAssociation;