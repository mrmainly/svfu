import React, { useEffect, useState, useRef } from 'react'

import { Typography, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { useLocation } from 'react-router-dom'

import { SurveysSlice } from '../../../reducers/SurveysSlice'
import ROUTES from '../../../routes'
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
    const location = useLocation()

    useEffect(() => {
        const newData = JSON.parse(localStorage.getItem('survey-datas'))
        setData(newData)
        // setTimer(moment('10:00:00', 'HH:mm:ss').format('HH:mm:ss'))
        clearTimer(getDeadTime(newData?.time_exam))
    }, [localStorage.getItem('survey-datas')])

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date())
        const seconds = Math.floor((total / 1000) % 60)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        const hours = Math.floor((total / 1000 / 60 / 60) % 24)
        return {
            total,
            minutes,
            seconds,
            hours,
        }
    }

    const startTimer = (e) => {
        let { total, minutes, seconds, hours } = getTimeRemaining(e)
        if (total >= 0) {
            setTimer(
                (hours === 0 ? '' : hours > 9 ? hours : '0' + hours + ':') +
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
        document.querySelector('.practical-form-button').click()
        dispatch(changeTimeStatus(true))
    }

    timer == '00:00:00' && TimerIsAp()

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
                                      opacity:
                                          location.pathname === ROUTES.PRACTICAL_PART ? 0.6 : 1,
                                      cursor:
                                          location.pathname === ROUTES.PRACTICAL_PART
                                              ? 'text'
                                              : 'pointer',
                                  }}
                                  onClick={() =>
                                      location.pathname === ROUTES.PRACTICAL_PART
                                          ? ''
                                          : dispatch(handleArrayIndex(index))
                                  }
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
                    <Text>
                        {moment.duration(data.time_exam, 'minutes').hours() === 0 ? (
                            ''
                        ) : (
                            <span>{moment.duration(data.time_exam, 'minutes').hours()}:</span>
                        )}
                        {moment.duration(data.time_exam, 'minutes').minutes()}:00
                    </Text>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 8,
                    }}
                >
                    <Text>Осталось:</Text>
                    {timer === 0 ? (
                        <Text>
                            {moment.duration(data.time_exam, 'minutes').hours() === 0 ? (
                                ''
                            ) : (
                                <span>{moment.duration(data.time_exam, 'minutes').hours()}:</span>
                            )}
                            {moment.duration(data.time_exam, 'minutes').minutes()}:00
                        </Text>
                    ) : (
                        <Text>{timer}</Text>
                    )}
                </div>
            </div>
            {/* <Button onClick={onClickReset}>asd</Button> */}
            {location.pathname === ROUTES.PRACTICAL_PART ? (
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
                    form="form-practical-part"
                    className="practical-form-button"
                >
                    Завершить тест
                </Button>
            ) : (
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
            )}
            {/* <Button onClick={() => }>
                asd
            </Button> */}
        </div>
    )
}

export default SurveysSideBar
