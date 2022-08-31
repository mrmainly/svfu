import React, { useEffect, useState, useRef } from 'react'

import { Typography, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import moment from 'moment'

import { SurveysSlice } from '../../../reducers/SurveysSlice'
import TimeIsUpModal from '../../../pages/surveys/tester/components/modals/TimeIsUpModal'

import '../surveySideBar.css'

const { Text } = Typography

const SurveysSideBar = () => {
    const Ref = useRef(null)
    const [open, setOpen] = useState(true)

    const [data, setData] = useState([])
    const [timer, setTimer] = useState(0)

    const { arrayIndex, part_tester } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex } = SurveysSlice.actions
    const dispatch = useDispatch()

    useEffect(() => {
        const newData = JSON.parse(localStorage.getItem('survey-datas'))
        setData(newData)
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

    return (
        <div style={{ marginLeft: 28 }}>
            {timer == '00:00' && <TimeIsUpModal open={open} setOpen={setOpen} id={data.id} />}
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
                                      opacity: part_tester === 'p-p' ? 0.6 : 1,
                                      cursor: part_tester === 'p-p' ? 'text' : 'pointer',
                                  }}
                                  onClick={() =>
                                      part_tester === 'p-p' ? '' : dispatch(handleArrayIndex(index))
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
                        0
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
                            0
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
            {part_tester === 'p-p' ? (
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
        </div>
    )
}

export default SurveysSideBar
