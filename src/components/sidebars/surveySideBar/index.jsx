import React, { useEffect, useState } from 'react'

import { Typography, Button } from 'antd'

import { useSelector, useDispatch } from 'react-redux/es/exports'
import { SurveysSlice } from '../../../reducers/SurveysSlice'

import '../surveySideBar.css'

const { Text } = Typography

const SurveysSideBar = () => {
    const [data, setData] = useState([])

    const { arrayIndex, part } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex, openExpertTheoreticalPartOpen, changePartsStatus } =
        SurveysSlice.actions

    const dispatch = useDispatch()

    useEffect(() => {
        const newData = JSON.parse(localStorage.getItem('side_bar_data_ex_mo'))
        setData(newData)
    }, [localStorage.getItem('side_bar_data_ex_mo')])

    const colorSwitchDanger = (id) => {
        const newData = data.answers_first_part
            .map((itemAnswer) => {
                if (itemAnswer.question_id === id) {
                    return itemAnswer.score
                }
            })
            .filter((element) => element != undefined)
            .reduce((prev, curr) => prev + curr, 0)

        if (newData === 0) {
            return '#FE5860'
        } else {
            return '#2f80ed'
        }
    }

    return (
        <div className="survey-sidebar">
            <Text style={{ fontWeight: 600 }}>{data?.direction}</Text>
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
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}
                    >
                        {data?.survey?.surveyquest?.length &&
                            data.survey.surveyquest.map((item, index) => (
                                <div
                                    key={index}
                                    className="circul"
                                    style={{
                                        background:
                                            arrayIndex === index
                                                ? colorSwitchDanger(item.question.id)
                                                : 'white',
                                        color:
                                            arrayIndex === index
                                                ? 'white'
                                                : colorSwitchDanger(item.question.id),
                                        borderColor: colorSwitchDanger(item.question.id),
                                        opacity: part === 'practical-part' ? 0.6 : 1,
                                        cursor: part === 'practical-part' ? 'text' : 'pointer',
                                    }}
                                    onClick={() =>
                                        part === 'practical-part'
                                            ? ''
                                            : dispatch(handleArrayIndex(index))
                                    }
                                >
                                    {index + 1}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="time-block" style={{ marginTop: 12 }}>
                <div>
                    <Text>
                        {part === 'practical-part' ? 'Теоретическая часть' : 'Практическая часть:'}
                    </Text>
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
                        onClick={() =>
                            dispatch(
                                changePartsStatus(
                                    part === 'theoretical-part'
                                        ? 'practical-part'
                                        : 'theoretical-part'
                                )
                            )
                        }
                    >
                        Перейти
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
                onClick={() => dispatch(openExpertTheoreticalPartOpen(true))}
            >
                Завершить экспертизу
            </Button>
        </div>
    )
}

export default SurveysSideBar
