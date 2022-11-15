import React, { useEffect, useState, useRef } from 'react'

import { Typography, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import { SurveysSlice } from '../../../../reducers/SurveysSlice'
import TimeIsUpModal from '../../../../pages/tester/survey/components/modals/TimeIsUpModal'

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

const SoftBodyTester = ({ dataList }) => {
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

    return (
        <div className="survey-sidebar">
            {timer == '00:00' && (
                <TimeIsUpModal open={open} setOpen={setOpen} id={data.id} unit_type="SOFT" />
            )}
            <Text style={{ fontWeight: 600, wordWrap: 'break-word' }}>{data?.name}</Text>
            <div className="root">
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {data?.softquestions?.length
                        ? data.softquestions.map((item, index) => (
                              <div
                                  key={index}
                                  className="circul"
                                  style={{
                                      background: arrayIndex === index ? '#2f80ed' : 'white',
                                      color: arrayIndex === index ? 'white' : '#2f80ed',
                                      cursor: 'pointer',
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
                form="soft-tester-form"
                className="practical-form-button"
            >
                Завершить тест
            </Button>
        </div>
    )
}

SoftBodyTester.propTypes = {
    dataList: PropTypes.object,
}

export default SoftBodyTester
