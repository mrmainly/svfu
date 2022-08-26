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
        console.log('newData', newData)
    }, [localStorage.getItem('side_bar_data_expert')])

    return (
        <div style={{ marginLeft: 28 }}>
            <Text style={{ fontWeight: 600 }}>{data.name}</Text>
            <div className="root">
                <Text style={{ marginLeft: 12 }}>Теоретическая часть:</Text>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
                Завершить тестовую часть
            </Button>
        </div>
    )
}

export default SurveysSideBar
