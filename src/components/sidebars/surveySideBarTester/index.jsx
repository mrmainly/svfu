/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react'

import { Typography, Button, Skeleton } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { SurveysSlice } from '../../../reducers/SurveysSlice'
import TimeIsUpModal from '../../../pages/tester/survey/components/modals/TimeIsUpModal'
import { useGetSurveyPartOneIdQuery } from '../../../services/tester/Surveys'

import '../surveySideBar.css'

const { Text } = Typography

const timerView = (data) => {
    const hours =
        moment.duration(data, 'minutes').hours() === 0
            ? ''
            : moment.duration(data, 'minutes').hours() + ':'
    const hoursZero =
        moment.duration(data, 'minutes').hours() < 9 &&
        moment.duration(data, 'minutes').hours() != 0
            ? 0
            : ''

    const minutes = moment.duration(data, 'minutes').minutes()
    const zerominute = moment.duration(data, 'minutes').minutes() < 9 && !0 ? 0 : ''

    return hoursZero + hours + zerominute + minutes
}

const subtractionTime = (first_time, second_time) => {
    const getDate = (string) => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1])
    const different = getDate(second_time) - getDate(first_time)

    const minutes = Math.round((different % 86400000) / 60000)
    const result = minutes

    return result
}

const localDate = (start_survey) => {
    const today = new Date()

    const now = today.toTimeString('en-US').substr(0, 5)
    const survey_start_format = moment(start_survey).format('HH:mm').toLocaleString()

    return subtractionTime(survey_start_format, now)
}

const subtractionExamTime = (first, second) => {
    const sub_value = second - first

    if (first > second) {
        return 0
    } else {
        return sub_value
    }
}

const SurveysSideBar = () => {
    const { data: dataList, isFetching } = useGetSurveyPartOneIdQuery({
        id: JSON.parse(localStorage.getItem('survey-datas')).id,
    })

    const Ref = useRef(null)
    const [open, setOpen] = useState(true)

    const [data, setData] = useState([])
    const [timer, setTimer] = useState(0)

    const { arrayIndex, part_tester } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex } = SurveysSlice.actions
    const dispatch = useDispatch()

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
        const { total, minutes, seconds, hours } = getTimeRemaining(e)
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
        const deadline = new Date()

        deadline.setSeconds(deadline.getSeconds() + newTime * 60)
        return deadline
    }

    useEffect(() => {
        setData(dataList)
        if (dataList?.start_survey) {
            clearTimer(
                getDeadTime(
                    localDate(dataList?.start_survey) <= 0
                        ? dataList?.time_exam
                        : subtractionExamTime(
                              localDate(dataList?.start_survey),
                              dataList?.time_exam
                          )
                )
            )
        }
    }, [dataList])

    if (isFetching) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton.Button style={{ width: 240, height: 320, marginLeft: 12 }} />
                <Skeleton.Button
                    style={{ width: 240, height: 50, marginLeft: 12, marginTop: 12 }}
                />
                <Skeleton.Button
                    style={{ width: 240, height: 50, marginLeft: 12, marginTop: 12 }}
                />
            </div>
        )
    }

    return (
        <div className="survey-sidebar">
            {timer == '00:00' && <TimeIsUpModal open={open} setOpen={setOpen} id={data.id} />}
            <Text style={{ fontWeight: 600 }}>{data?.name}</Text>

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
                    {timerView(data?.time_exam)}:00
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
                        timerView(
                            subtractionExamTime(localDate(data?.start_survey), data?.time_exam)
                        ) + ':00'
                    ) : (
                        <Text>{timer}</Text>
                    )}
                </div>
            </div>
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
