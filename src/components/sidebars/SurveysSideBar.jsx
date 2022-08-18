import React, { useEffect, useState } from 'react'

import { Typography, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { SurveysSlice } from '../../reducers/SurveysSlice'

import './surveySideBar.css'

const { Text } = Typography

const SurveysSideBar = () => {
    const [data, setData] = useState([])

    const { arrayIndex } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex } = SurveysSlice.actions
    const dispatch = useDispatch()

    // useEffect(() => {
    //     setData()
    // }, [])

    console.log(window.localStorage.getItem('surveys-data'))

    const dataItems = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]
    return (
        <div style={{ marginLeft: 28 }}>
            <Text style={{ fontWeight: 600 }}>{data.name}</Text>
            <div className="root">
                <Text style={{ marginLeft: 12 }}>Теоретическая часть:</Text>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* {data
                        ? data.surveyquest.map((item, index) => (
                              <div
                                  key={index}
                                  className="circul"
                                  style={{
                                      background: arrayIndex === index ? '#2f80ed' : 'white',
                                      color: arrayIndex === index ? 'white' : '#2f80ed',
                                  }}
                                  onClick={() => dispatch(handleArrayIndex(index))}
                              >
                                  {index + 1}
                              </div>
                          ))
                        : dataItems.map((item, index) => (
                              <div key={index} className="circul">
                                  {index + 1}
                              </div>
                          ))} */}
                </div>
            </div>
            {/* <div className="practic-block">
                <Text>Практическая часть:</Text>
                <Button
                    type="default"
                    style={{
                        borderColor: "#0D6EFD",
                        color: "#0D6EFD",
                        width: "100%",
                        marginTop: 6,
                        borderRadius: 3,
                    }}
                    size="large"
                >
                    Задание П.Ч.
                </Button>
            </div> */}
            <div className="time-block">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Общее время:</Text>
                    <Text>{data.time_exam}:00</Text>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 8,
                    }}
                >
                    <Text>Осталось:</Text>
                    <Text>45:00</Text>
                </div>
            </div>
            <Button
                type="default"
                style={{
                    borderColor: '#BF4C25',
                    color: '#BF4C25',
                    width: '100%',
                    marginTop: 12,
                    borderRadius: 3,
                }}
                size="large"
                htmlType="submit"
                form="my-form"
            >
                Завершить тестовую часть
            </Button>
        </div>
    )
}

export default SurveysSideBar
