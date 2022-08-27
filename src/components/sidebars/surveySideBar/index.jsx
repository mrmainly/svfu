import React, { useEffect, useState } from 'react'

import { Typography, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { SurveysSlice } from '../../../reducers/SurveysSlice'

import '../surveySideBar.css'

const { Text } = Typography

const SurveysSideBar = () => {
    const [data, setData] = useState([])

    const { arrayIndex } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex, changeTimeStatus } = SurveysSlice.actions
    const dispatch = useDispatch()

    useEffect(() => {
        const newData = JSON.parse(localStorage.getItem('side_bar_data_expert'))
        setData(newData)
    }, [localStorage.getItem('side_bar_data_expert')])

    return (
        <div style={{ marginLeft: 28 }}>
            <Text style={{ fontWeight: 600 }}>{data.name}</Text>
            <div
                className="root"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <Text style={{ marginLeft: 7 }}>Теоретическая часть:</Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: 200 }}>
                        {data?.survey?.surveyquest?.length
                            ? data.survey.surveyquest.map((item, index) => (
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
                            : ''}
                    </div>
                </div>
                <div style={{ marginLeft: 8 }}>
                    <Button
                        type="default"
                        style={{
                            borderColor: '#0D6EFD',
                            color: ' #0D6EFD',
                            width: '100%',
                            borderRadius: 3,
                        }}
                        size="large"
                        htmlType="submit"
                        form="my-form"
                        className="theoretical-form-button"
                    >
                        Заключение
                    </Button>
                    <div
                        style={{
                            width: '100%',
                            background: '#E6E6E6',
                            height: 1,
                            marginTop: 12,
                            marginBottom: 12,
                        }}
                    />
                    <Text>Практическая часть:</Text>
                    <Button
                        type="default"
                        style={{
                            borderColor: '#0D6EFD',
                            color: ' #0D6EFD',
                            width: '100%',
                            borderRadius: 3,
                            marginTop: 5,
                        }}
                        size="large"
                        htmlType="submit"
                        form="my-form"
                        className="theoretical-form-button"
                    >
                        Заключение
                    </Button>
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
                className="theoretical-form-button"
            >
                Завершить экспертизу
            </Button>
        </div>
    )
}

export default SurveysSideBar
