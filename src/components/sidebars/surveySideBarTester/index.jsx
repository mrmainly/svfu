import React, { useEffect, useState, useRef } from 'react'

import { Typography, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { SurveysSlice } from '../../../reducers/SurveysSlice'
import moment from 'moment'

import '../surveySideBar.css'

const { Text } = Typography

const SurveysSideBar = () => {
    const Ref = useRef(null)

    const [data, setData] = useState([])
    const [timer, setTimer] = useState(0)

    const { arrayIndex } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex, changeTimeStatus } = SurveysSlice.actions
    const dispatch = useDispatch()

    useEffect(() => {
        const newData = JSON.parse(localStorage.getItem('survey-datas'))
        setData(newData)
        setTimer(moment(newData?.time_exam, 'mm:ss').format('mm:ss'))
        clearTimer(getDeadTime(newData?.time_exam))
        console.log(data)
    }, [localStorage.getItem('survey-datas')])
    // console.log('SBData', data)
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date())
        const seconds = Math.floor((total / 1000) % 60)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        return {
            total,
            minutes,
            seconds,
        }
    }

    const startTimer = (e) => {
        let { total, minutes, seconds } = getTimeRemaining(e)
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) +
                    ':' +
                    (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        if (Ref.current) clearInterval(Ref.current)
        const id = setInterval(() => {
            startTimer(e)
        }, 1000)
        Ref.current = id
    }

    const getDeadTime = (newTime) => {
        let deadline = new Date()

        deadline.setSeconds(deadline.getSeconds() + newTime * 60)
        return deadline
    }

    const TimerIsAp = () => {
        document.querySelector('.theoretical-form-button').click()
        dispatch(changeTimeStatus(true))
    }

    timer == '00:00' && TimerIsAp()

    return (
        <div style={{ marginLeft: 28 }}>
            <Text style={{ fontWeight: 600 }}>{data.name}</Text>
            <div className="root">
                <Text style={{ marginLeft: 12 }}>Теоретическая часть:</Text>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {data?.surveyquest?.length
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
                        : ''}
                </div>
            </div>
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
                    <Text>{timer}</Text>
                </div>
            </div>
            {/* <Button onClick={onClickReset}>asd</Button> */}
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
            {/* <Button onClick={() => }>
                asd
            </Button> */}
        </div>
    )
}

export default SurveysSideBar
