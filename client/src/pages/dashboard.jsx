import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Space, Row, Col ,Button } from 'antd';
import {Bar, Pie, Doughnut, Line} from 'react-chartjs-2';
import {Chart} from 'chart.js/auto';
import '../App.css';

export default function Dashboard(){
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    
    return (
        <Space className='fullScreenStyle' direction='vertical'>
            <Row>
            <Col>
            <Bar className='dashboardStyle'
                data={{
                    labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                    datasets:[{
                        label: 'Almanara',
                        data:[10,5,4,2,7,11,8,7,9,3,4,1],
                        backgroundColor: 'cyan',
                        barThickness: 12
                    },
                    {
                        label: 'Oggo',
                        data:[1,2,3,4,5,6,7,8,9,10,11,12],
                        backgroundColor: 'teal',
                        barThickness: 12
                    },
                    {
                        label: 'Saint-Anne',
                        data:[12,11,10,9,8,7,6,5,4,3,2,1],
                        backgroundColor: 'grey',
                        barThickness: 12
                    }
                    ] 
                }}
                options={{
                    scales:{
                        xAxes:[{
                            scaleLabel:{
                                labelString: 'Months',
                                display: true,
                                fontColor: 'purple',
                                fontSize: 'meduim'
                            }
                        }],
                        yAxes:[{
                            scaleLabel:{
                                labelString: 'Associations',
                                display: true,
                                fontColor: 'purple',
                                fontSize: 'meduim'
                            },
                            ticks:{
                                beginAtZero: false
                            }
                        }]
                    }
                }}
             /></Col>
             <Col>
            <Pie className='dashboardStyle'
                data={{
                    labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                    datasets:[{
                        label: 'Almanara',
                        data:[10,5,4,2,7,11,8,7,9,3,4,1],
                        backgroundColor: ['red', 'yellow', 'orange', 'blue', 'green', 'teal', 'purple', 'black', 'cyan', 'darkgrey', 'gold', 'silver'],
                        barThickness: 12
                    },
                    {
                        label: 'Oggo',
                        data:[1,2,3,4,5,6,7,8,9,10,11,12],
                        backgroundColor: ['red', 'yellow', 'orange', 'blue', 'green', 'teal', 'purple', 'black', 'cyan', 'darkgrey', 'gold', 'silver'],
                        barThickness: 12
                    },
                    {
                        label: 'Saint-Anne',
                        data:[12,11,10,9,8,7,6,5,4,3,2,1],
                        backgroundColor: ['red', 'yellow', 'orange', 'blue', 'green', 'teal', 'purple', 'black', 'cyan', 'darkgrey', 'gold', 'silver'],
                        barThickness: 12
                    }
                ]}
            }
                options={{
                    scales:{
                        x:[
                            {
                                
                                scaleLabel:{
                                    labelString:'Months',
                                    display: true,
                                    fonrColor: 'purple',
                                    fontSize: 18
                                }
                            }
                        ],
                        y:[
                            {
                                scaleLabel:{
                                    labelString:'Associations',
                                    display: true,
                                    fonrColor: 'purple',
                                    fontSize: 18
                                }
                            }
                        ]
                    }
                }}
            /></Col>
            <Col>
            <Doughnut className='dashboardStyle'
                data={{
                    labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                    datasets:[{
                        label: 'Almanara',
                        data:[10,5,4,2,7,11,8,7,9,3,4,1],
                        backgroundColor: ['red', 'yellow', 'orange', 'blue', 'green', 'teal', 'purple', 'black', 'cyan', 'darkgrey', 'gold', 'silver'],
                        barThickness: 12
                    },
                    {
                        label: 'Oggo',
                        data:[1,2,3,4,5,6,7,8,9,10,11,12],
                        backgroundColor: ['red', 'yellow', 'orange', 'blue', 'green', 'teal', 'purple', 'black', 'cyan', 'darkgrey', 'gold', 'silver'],
                        barThickness: 12
                    },
                    {
                        label: 'Saint-Anne',
                        data:[12,11,10,9,8,7,6,5,4,3,2,1],
                        backgroundColor: ['red', 'yellow', 'orange', 'blue', 'green', 'teal', 'purple', 'black', 'cyan', 'darkgrey', 'gold', 'silver'],
                        barThickness: 12
                    }
                    ] 
                }}
                options={{
                    scales:{
                        xAxes:[{
                            scaleLabel:{
                                labelString: 'Months',
                                display: true,
                                fontColor: 'purple',
                                fontSize: 'meduim'
                            }
                        }],
                        yAxes:[{
                            scaleLabel:{
                                labelString: 'Associations',
                                display: true,
                                fontColor: 'purple',
                                fontSize: 'meduim'
                            },
                            ticks:{
                                beginAtZero: false
                            }
                        }]
                    }
                }}
             /></Col>
             <Col>
             <Line className='dashboardStyle'
                data={{
                    labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                    datasets:[{
                        label: 'Almanara',
                        data:[10,5,4,2,7,11,8,7,9,3,4,1],
                        backgroundColor: 'red',
                        barThickness: 12
                    },
                    {
                        label: 'Oggo',
                        data:[1,2,3,4,5,6,7,8,9,10,11,12],
                        backgroundColor: 'teal',
                        barThickness: 12
                    },
                    {
                        label: 'Saint-Anne',
                        data:[12,11,10,9,8,7,6,5,4,3,2,1],
                        backgroundColor: 'gold',
                        barThickness: 12
                    }
                    ] 
                }}
                options={{
                    scales:{
                        xAxes:[{
                            scaleLabel:{
                                labelString: 'Months',
                                display: true,
                                fontColor: 'purple',
                                fontSize: 'meduim'
                            }
                        }],
                        yAxes:[{
                            scaleLabel:{
                                labelString: 'Associations',
                                display: true,
                                fontColor: 'purple',
                                fontSize: 'meduim'
                            },
                            ticks:{
                                beginAtZero: false
                            }
                        }]
                    }
                }}
             /></Col>
             </Row>
             <Row>
            <Button className='buttonStyle' type='dashed' onClick={()=>navigate(-1)}>{t('Schedule.BACK')}</Button>
            </Row>
        </Space>
    )
}